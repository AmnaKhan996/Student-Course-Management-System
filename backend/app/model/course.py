from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.db.db import Base

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    duration = Column(Integer, nullable=False)
    capacity = Column(Integer, nullable=False)
    available_capacity = Column(Integer, nullable=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    isDeleted = Column(Boolean, default=False) 
    enrollments = relationship("Enrollment",back_populates="course")
    topics = relationship("Topic", back_populates="course")