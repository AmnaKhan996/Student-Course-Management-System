from app.core.logger import logger
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_db
from app.dependency.auth import getRole
from app.schema.question import(
     CreateQuestion,
     UpdateQuestion
)
from app.service.question import(
    createQuestion,
    deleteQuestion,
    updateQuestion
)
router = APIRouter()

#Create Question
@router.post("/create/{quiz_id}")
def create_question(
      question:CreateQuestion,
       quiz_id:int,
       db:Session = Depends(get_db),
       role:str=Depends(getRole)
       ):
        if role!="admin":
            logger.warning(f"Access denied for user with role={role} attempting to create question")
            raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
        return createQuestion(question,quiz_id,db)


#Update Question
@router.put("/update/{question_id}")
def update_question(
    question_id:int,
    question:UpdateQuestion,
    db:Session = Depends(get_db),
    role:str=Depends(getRole)
):
    if role!="admin":
        logger.warning(f"Access denied for user with role={role} attempting to update question")
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    return updateQuestion(question_id,question,db)


#Delete Question
@router.delete("/delete/{question_id}")
def delete_question(
    question_id:int,
    db:Session = Depends(get_db),
    role:str=Depends(getRole)
):
    if role!="admin":
        logger.warning(f"Access denied for user with role={role} attempting to delete question")
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )

    return deleteQuestion(question_id,db)