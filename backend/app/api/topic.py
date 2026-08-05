#this is routes in this we will pass requestbody to the apis as a pedantics and also a db session
from app.core.logger import logger
import math
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_db
from app.dependency.auth import getRole
from app.schema.topic import(
     CreateTopic,
     UpdateTopic,
     TopicResponse
)
from app.service.topic import(
    createTopic,
    getAllTopics
)
router = APIRouter()

#createTopic
@router.post("/create/{course_id}",response_model=TopicResponse)
def create_Topic(
       course_id:int,
       topic:CreateTopic,
       db:Session = Depends(get_db),
       role:str=Depends(getRole)
       ):
        if role!="admin":
            logger.warning(f"Access denied for user with role={role} attempting to update course_id={course_id}")
            raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
        return createTopic(course_id,db,topic)

#getTopics
@router.get("/{course_id}",response_model=list[TopicResponse])
def get_Topics(
       course_id:int,
       db:Session = Depends(get_db)):
       return getAllTopics(course_id,db)









