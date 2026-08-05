from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.db.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    username = Column(String(100), unique=True, nullable=False , index=True)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    isDeleted = Column(Boolean, default=False)
    enrollments = relationship("Enrollment",back_populates="student")
    quiz_attempts = relationship("QuizAttempt", back_populates="student")