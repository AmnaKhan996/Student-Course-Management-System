from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class CreateCourse(BaseModel):
    title: str
    description: str
    duration: int
    capacity: int


class UpdateCourse(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[int] = None
    capacity: Optional[int] = None
    isDeleted: Optional[bool] = None


class CourseResponse(BaseModel):
    id: int
    title: str
    description: str
    duration: int
    capacity: int
    created_at: datetime
    updated_at: datetime
    isDeleted: bool

    class Config:
        from_attributes = True