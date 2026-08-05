from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.model.topic import Topic
from app.model.quiz import Quiz
from app.model.question import Question
from app.model.user import User
from app.model.quiz_attempt import QuizAttempt
from app.model.student_answer import StudentAnswer
from app.schema.quiz import CreateQuiz,UpdateQuiz,QuizResponse
from app.schema.question import CreateQuestion, UpdateQuestion, QuestionResponse
from app.schema.quiz_attempt import QuizAttemptCreate
from app.schema.student_answer import StudentAnswerCreate,StudentAnswerResponse
from .ai import generate_quiz_from_ai
from .notification import create_notification
#GenerateQuiz
def GenerateQuiz(quiz:CreateQuiz,topic_id:int,db:Session):
    topic = db.query(Topic).filter( Topic.id==topic_id).first()
    if not topic:
        raise HTTPException(
            status_code=404,
            detail="No topics found"
        )
    prompt_data = {
        "title": topic.title,
        "description": topic.description,
        "learning_objectives": topic.learning_objectives,
        "content": topic.content,
        "example": topic.example,
        "difficulty": quiz.difficulty,
        "exam_type": quiz.exam_type,
        "total_questions":quiz.total_questions
    }
    response = generate_quiz_from_ai(prompt_data)
    print("response from ai",response)
    

    # Create a new Quiz instance
    new_quiz = Quiz(
        topic_id=topic_id,
        title=response["title"],
        difficulty=quiz.difficulty,
        exam_type=quiz.exam_type,
        total_questions=quiz.total_questions
    )
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz) 

    # Create Question instances and associate them with the new quiz
    for question_data in response["questions"]:
        new_question = Question(
            quiz_id=new_quiz.id,
            question_text=question_data["question_text"],
            options=question_data.get("options", []),
            correct_answer=question_data["correct_answer"]
        )
        db.add(new_question)
    db.commit() 

    return new_quiz


#Delete Quiz
def DeleteQuiz(quiz_id:int,db:Session):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id, Quiz.isDeleted == False).first()
    if not quiz:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found"
        )
    quiz.isDeleted = True
    db.commit()
    return {"message": "Quiz deleted successfully"}


#Submit Quiz
async def AdminSubmitQuiz(quiz_id:int,db:Session):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id, Quiz.isDeleted == False).first()
    if not quiz:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found"
        )
    quiz.status ="Published"
    db.commit()
    db_users = db.query(User).filter(User.role.in_(["student", "admin"])).all()
    for student in db_users:
       await create_notification(db,student.id,"New Quiz", f"{quiz.title} quiz added")
    return {"message": "Quiz submitted successfully"}

#GET All Quizzes
def GetAllQuizzes(topic_id:int,db:Session):
    quizzes = db.query(Quiz).filter(Quiz.topic_id == topic_id, Quiz.isDeleted == False).all()
    
    for quiz in quizzes:
        active_questions = []

        for question in quiz.questions:
            if question.isDeleted == False:
                active_questions.append(question)

        quiz.questions = active_questions
    return quizzes


#Get Quiz by ID
def GetQuizById(quiz_id:int,user_id:int,db:Session):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id, Quiz.isDeleted == False).first()
    if not quiz:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found"
        )
    active_questions = []
    for question in quiz.questions:
        if question.isDeleted == False:
            active_questions.append(question)

    quiz.questions = active_questions
    student_attempts = []
    
    for attempt in quiz.attempts:
        if attempt.student_id == user_id:
            student_attempts.append(attempt)
    quiz.attempts = student_attempts
    return quiz

#GET quizzes of student

def GetQuizzes(topic_id: int, user_id: int, db: Session):

    quizzes = db.query(Quiz).filter(
        Quiz.topic_id == topic_id,
        Quiz.isDeleted == False
    ).all()
    for quiz in quizzes:
        active_questions = []
        for question in quiz.questions:
            if question.isDeleted == False:
                active_questions.append(question)
        quiz.questions = active_questions
        student_attempts = []
        for attempt in quiz.attempts:
            if attempt.student_id == user_id:
                student_attempts.append(attempt)
        quiz.attempts = student_attempts
        quiz.action = "Attempt"
        quiz.attempt_status = "Pending"
        quiz.score = 0

        if student_attempts:
            attempt = student_attempts[0]
            quiz.action = "Attempted"
            quiz.attempt_status = attempt.status
            quiz.score = attempt.score
    
        else:
            quiz.action = "Attempt"

    return quizzes

#Submit Quiz
def SubmitQuiz(quiz_id:int,data: QuizAttemptCreate, student_id: int, db: Session):

    quiz = db.query(Quiz).filter(
        Quiz.id == quiz_id,
        Quiz.isDeleted == False
    ).first()

    if not quiz:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found"
        )
    attempt = QuizAttempt(
        student_id=student_id,
        quiz_id=quiz_id,
        score=0,
        status="Fail",
        is_submitted=True,
        attempted_at = datetime.utcnow()
    )
    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    correct_answers = 0
    for ans in data.answers:
        question = db.query(Question).filter(
            Question.id == ans.question_id,
            Question.isDeleted == False
        ).first()
        if not question:
            continue
        is_correct = (
            ans.selected_answer.strip().lower()
            ==
            question.correct_answer.strip().lower()
        )
        if is_correct:
            correct_answers += 1
        student_answer = StudentAnswer(
            attempt_id=attempt.id,
            question_id=question.id,
            selected_answer=ans.selected_answer,
            correct_answer=question.correct_answer,
            is_correct=is_correct
        )
        db.add(student_answer)
    percentage = 0
    if quiz.total_questions > 0:
        percentage = (correct_answers / quiz.total_questions) * 100
    attempt.score = round(percentage, 2)
    if percentage >= 50:
        attempt.status = "Pass"
    else:
        attempt.status = "Fail"
    db.commit()
    db.refresh(attempt)

    return attempt