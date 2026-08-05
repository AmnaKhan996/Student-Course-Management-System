from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,Boolean,JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.db import Base

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer,primary_key=True,index=True)
    quiz_id = Column(Integer,ForeignKey("quizzes.id"),nullable=False,index=True)
    question_text = Column(String(255),nullable=False)
    options= Column(JSON, nullable = True)
    correct_answer = Column(String(255), nullable=False)
    created_at = Column(DateTime,default=datetime.utcnow)
    updated_at = Column(DateTime,default=datetime.utcnow)
    isDeleted = Column(Boolean, default=False)
    quiz = relationship( "Quiz", back_populates="questions")