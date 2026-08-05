from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.schema.student_answer import StudentAnswerCreate, StudentAnswerResponse

class QuizAttemptCreate(BaseModel):
    answers: List[StudentAnswerCreate]

class QuizAttemptResponse(BaseModel):
    id: int
    student_id: int
    quiz_id: int
    score: float
    status: str
    is_submitted: bool
    attempted_at: datetime
    answers: Optional[List[StudentAnswerResponse]] = []
    class Config:
        from_attributes = True