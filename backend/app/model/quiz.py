from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.db import Base

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer,primary_key=True,index=True)
    title = Column( String(255), nullable=False)
    topic_id = Column(Integer,ForeignKey("topics.id"),nullable=False,index=True)
    difficulty = Column(String(255),nullable=False, default="Easy")
    exam_type = Column(String(255),default="MCQS")
    total_questions = Column(Integer,nullable=False)
    status = Column(String(255),default="Draft")
    created_at = Column(DateTime,default=datetime.utcnow)
    updated_at = Column(DateTime,default=datetime.utcnow)
    isDeleted = Column(Boolean,default=False)
    topic = relationship("Topic",back_populates="quizzes")
    questions = relationship("Question",back_populates="quiz")
    attempts = relationship("QuizAttempt",back_populates="quiz")