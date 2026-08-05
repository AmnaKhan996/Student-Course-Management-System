from sqlalchemy import Column, Integer, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db.db import Base
class Enrollment(Base):
    __tablename__ = "enrollments"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer,ForeignKey("users.id"),nullable=False,index=True)
    course_id = Column(Integer,ForeignKey("courses.id"),nullable=False,index=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    isDeleted = Column(Boolean,default=False)
    student = relationship("User", back_populates="enrollments")
    course = relationship("Course",back_populates="enrollments")