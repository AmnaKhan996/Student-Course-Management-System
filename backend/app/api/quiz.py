from app.core.logger import logger
from fastapi import APIRouter, Depends, HTTPException
from app.model.quiz import Quiz
from sqlalchemy.orm import Session
from app.db.db import get_db
from app.dependency.auth import getRole
from app.dependency.auth import getUser
from app.schema.quiz import(
     CreateQuiz,
     UpdateQuiz,
     QuizResponse
)
from app.schema.quiz_attempt import(
    QuizAttemptCreate,
    QuizAttemptResponse
)
from app.service.quiz import(
    GenerateQuiz,
    DeleteQuiz,
    UpdateQuiz,
    SubmitQuiz,
    GetAllQuizzes,
    GetQuizById,
    GetQuizzes,
    AdminSubmitQuiz
)
router = APIRouter()

#GenerateQUiz
@router.post("/generate/{topic_id}")
def generate_quiz(
      quiz:CreateQuiz,
       topic_id:int,
       db:Session = Depends(get_db),
       role:str=Depends(getRole)
       ):
        if role!="admin":
            logger.warning(f"Access denied for user with role={role} attempting to generate quiz")
            raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
        return GenerateQuiz(quiz,topic_id,db)

#Display Quizzes
@router.get("/{topic_id}", response_model=list[QuizResponse])
def display_quizzes(
    topic_id:int,
    db:Session = Depends(get_db),
    role:str=Depends(getRole)
):
    return GetAllQuizzes(topic_id,db)

#Delete Quiz
@router.delete("/delete/{quiz_id}")
def delete_quiz(
    quiz_id:int,
    db:Session = Depends(get_db),
    role:str=Depends(getRole)
):
    if role!="admin":
        logger.warning(f"Access denied for user with role={role} attempting to delete quiz")
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )

    return DeleteQuiz(quiz_id,db)

#Submit Quiz
@router.put("/submit/{quiz_id}")
async def submit_quiz(
    quiz_id:int,
    db:Session = Depends(get_db),
    role:str=Depends(getRole)
):
    if role!="admin":
        logger.warning(f"Access denied for user with role={role} attempting to submit quiz")
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    return await AdminSubmitQuiz(quiz_id,db)

#get Quiz by ID
@router.get("/view/{quiz_id}", response_model=QuizResponse)
def view_quiz(
    quiz_id:int,
    db:Session = Depends(get_db),
    user_id:str=Depends(getUser)
):
    return GetQuizById(quiz_id,user_id,db)


#display quizzes of specific student
@router.get("/student/{topic_id}", response_model=list[QuizResponse])
def display_quizzes_for_student(
    topic_id: int,
    db: Session = Depends(get_db),
    user_id = Depends(getUser)
):
    return GetQuizzes(topic_id, user_id, db)


#Quiz Attempted
@router.post("/attempt/{quiz_id}", response_model=QuizAttemptResponse)
def attempt_quiz(
    quiz_id:int, 
    data: QuizAttemptCreate,
    db: Session = Depends(get_db),
    student_id= Depends(getUser)
):
    return SubmitQuiz(quiz_id, data, student_id, db)