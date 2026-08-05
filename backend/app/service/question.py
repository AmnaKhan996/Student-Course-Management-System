from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.model.question import Question
from app.model.quiz import Quiz
from app.schema.question import CreateQuestion, UpdateQuestion


#CreateQuestion
def createQuestion(question:CreateQuestion,quiz_id:int,db:Session):
    new_question = Question(
        question_text=question.question_text,
        options=question.options,
        correct_answer=question.correct_answer,
        quiz_id=quiz_id
    )
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    quiz.total_questions += 1
    quiz.updated_at = datetime.utcnow()
    db.add(new_question)
    db.commit()
    db.refresh(new_question)
    return new_question


#DeleteQuestion
def deleteQuestion(question_id:int,db:Session):
    question = db.query(Question).filter(Question.id == question_id, Question.isDeleted == False).first()
    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )
    question.isDeleted = True
    quiz = db.query(Quiz).filter(Quiz.id == question.quiz_id).first()
    quiz.total_questions -= 1
    quiz.updated_at = datetime.utcnow()
    db.commit()
    return {"message": "Question deleted successfully"} 


#UpdateQuestion
def updateQuestion(question_id:int,question:UpdateQuestion,db:Session):
    existing_question = db.query(Question).filter(Question.id == question_id, Question.isDeleted == False).first()
    if not existing_question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )
    if question.question_text is not None:
        existing_question.question_text = question.question_text
    if question.options is not None:
        existing_question.options = question.options
    if question.correct_answer is not None:
        existing_question.correct_answer= question.correct_answer
    existing_question.updated_at = datetime.utcnow()
    quiz = db.query(Quiz).filter(Quiz.id == existing_question.quiz_id).first()
    quiz.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(existing_question)
    return existing_question






