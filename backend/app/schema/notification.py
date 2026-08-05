from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class CreateNotification(BaseModel):
    title: str
    description: str
    user_id: int
    is_read: Optional[bool] = False
    is_expired: Optional[bool] = False


class UpdateNotification(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_read: Optional[bool] = None
    is_expired: Optional[bool] = None
    read_at: Optional[datetime] = None


class NotificationResponse(BaseModel):
    id: int
    title: str
    description: str
    user_id: int
    is_read: bool
    is_expired: bool
    read_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    isDeleted: bool
    class Config:
        from_attributes = True