from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from enum import Enum

class CreateQuestion(BaseModel):
    question_text : str
    options: Optional[list[str]] = None
    correct_answer:str

class UpdateQuestion(BaseModel):
    question_text:Optional[str]=None
    options: Optional[list[str]]=None
    correct_answer: Optional[str]=None

class QuestionResponse(BaseModel):
    id : int 
    quiz_id:int   
    question_text: str
    options:Optional[list[str]]=None
    correct_answer:str
    created_at: datetime
    updated_at: datetime
    isDeleted: bool
    class Config:
        from_attributes = True