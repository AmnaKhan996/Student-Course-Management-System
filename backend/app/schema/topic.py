from datetime import datetime
from typing import Optional,List
from pydantic import BaseModel
class CreateTopic(BaseModel):
    title: str
    description: str
    learning_objectives: str
    content: str
    example: str

class UpdateTopic(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    learning_objectives: Optional[str] = None
    content: Optional[str] = None
    example: Optional[str] = None

class TopicResponse(BaseModel):
    id: int
    title: str
    description: str
    learning_objectives: str
    content: str
    example: Optional[str]
    course_id:int
    created_at: datetime
    updated_at: datetime
    isDeleted: bool
    class Config:
        from_attributes = True