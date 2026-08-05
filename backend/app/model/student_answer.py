from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.db import Base

class StudentAnswer(Base):
    __tablename__ = "student_answers"
    id = Column(Integer,primary_key=True,index=True)
    attempt_id = Column(Integer,ForeignKey("quiz_attempts.id"),nullable=False)
    question_id = Column(Integer,ForeignKey("questions.id"),nullable=False)
    selected_answer = Column(String(255),nullable=False)
    correct_answer = Column(String(255))
    is_correct = Column(Boolean,default=False)
    attempt = relationship("QuizAttempt", back_populates="answers")