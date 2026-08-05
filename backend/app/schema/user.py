from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserRole(str, Enum):
    ADMIN="admin"
    STUDENT="student"

class CreateUser(BaseModel):
    name: str
    username: EmailStr
    password: str = Field(..., min_length=8)
    role: Optional[UserRole] = None

class LoginSchema(BaseModel):
    username: EmailStr
    password: str

class UpdateUser(BaseModel):
    name: Optional[str] = None
    username: Optional[EmailStr] = None
    role: Optional[UserRole] = None

class UserResponse(BaseModel):
    id: int
    name: str
    username: EmailStr
    role: UserRole
    created_at: datetime
    updated_at: datetime
    isDeleted: bool
    class Config:
        from_attributes = True