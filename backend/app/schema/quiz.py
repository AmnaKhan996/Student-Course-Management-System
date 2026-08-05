from datetime import datetime
from typing import Optional,List
from pydantic import BaseModel
from enum import Enum
from .question import QuestionResponse
from .quiz_attempt import QuizAttemptResponse
class DifficultyLevel(str, Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"

class ExamType(str, Enum):
    MCQS = "MCQS",
    TRUE_FALSE= "TRUE_FALSE",
    SHORT_ANSWER ="SHORT_ANSWER"

class QuizStatus(str, Enum):
    DRAFT = "Draft"
    PUBLISHED = "Published"

class CreateQuiz(BaseModel):
    difficulty: DifficultyLevel
    exam_type: ExamType
    total_questions: int

class UpdateQuiz(BaseModel):
    title: Optional[str] = None
    difficulty: Optional[DifficultyLevel] = None
    exam_type: Optional[ExamType] = None
    total_questions: Optional[int] = None
    status: Optional[QuizStatus] = None

class QuizResponse(BaseModel):
    id: int
    title: str
    topic_id: int
    difficulty: DifficultyLevel
    exam_type: ExamType
    total_questions: int
    status: QuizStatus
    created_at: datetime
    updated_at: datetime
    isDeleted: bool
    questions:List[QuestionResponse] = []
    attempts: Optional[List["QuizAttemptResponse"]] = []
    action: str | None = None
    attempt_status:str | None = None
    score:float | None = 0
    class Config:
        from_attributes = True