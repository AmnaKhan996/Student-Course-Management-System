from sqlalchemy import Column, Integer, Boolean, DateTime, String, ForeignKey
from app.db.db import Base

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255),nullable=False)
    description = Column(String(255),nullable=False)
    user_id = Column(Integer,ForeignKey("users.id"), nullable=False,index=True)
    is_read = Column(Boolean,default=False)
    is_expired = Column(Boolean,default=False)
    read_at = Column(DateTime)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    isDeleted = Column(Boolean,default=False) 
