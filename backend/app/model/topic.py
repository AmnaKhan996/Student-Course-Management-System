from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey,Text,JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.db import Base

class Topic(Base):
    __tablename__ = "topics"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    learning_objectives = Column(Text,nullable=False)
    content = Column(Text,nullable=False)
    example = Column(Text,nullable=True)
    course_id = Column(Integer,ForeignKey("courses.id"),nullable=False,index=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    isDeleted = Column(Boolean, default=False)
    course = relationship("Course",back_populates="topics")
    quizzes = relationship("Quiz",back_populates="topic")