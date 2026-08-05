from pydantic import BaseModel
from typing import Optional

class StudentAnswerCreate(BaseModel):
    question_id: int
    selected_answer: str

class StudentAnswerResponse(BaseModel):
    id: int
    question_id: int
    selected_answer: str
    correct_answer: Optional[str] = None
    is_correct: bool
    class Config:
        from_attributes = True