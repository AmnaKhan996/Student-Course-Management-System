from sqlalchemy import Column, Integer, Float, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.db import Base


class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"
    id = Column(Integer,primary_key=True,index=True)
    student_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    quiz_id = Column(Integer,ForeignKey("quizzes.id"),nullable=False)
    score = Column(Float,default=0)
    status = Column(String(255),default="Fail")
    is_submitted = Column(Boolean,default=False)
    attempted_at = Column(DateTime,default=datetime.utcnow)
    student = relationship( "User", back_populates="quiz_attempts")
    quiz = relationship("Quiz",back_populates="attempts")
    answers = relationship("StudentAnswer",back_populates="attempt")