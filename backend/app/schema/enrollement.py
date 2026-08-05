from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .course import CourseResponse

class CreateEnrollment(BaseModel):
    student_id: int
    course_id: int

class UpdateEnrollment(BaseModel):
    student_id: Optional[int] = None
    course_id: Optional[int] = None

class EnrollmentResponse(BaseModel):
    id: int
    course: CourseResponse
    class Config:
        from_attributes = True