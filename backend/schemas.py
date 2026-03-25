from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime

# User Schemas
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

    @validator('username')
    def username_valid(cls, v):
        v = v.strip()
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters')
        if len(v) > 20:
            raise ValueError('Username must be less than 20 characters')
        if not v.isalnum():
            raise ValueError('Username must contain only letters and numbers')
        return v

    @validator('email')
    def email_valid(cls, v):
        v = v.strip().lower()
        if '@' not in v or '.' not in v:
            raise ValueError('Invalid email format')
        return v

    @validator('password')
    def password_valid(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        if len(v) > 72:
            raise ValueError('Password too long')
        return v

class UserLogin(BaseModel):
    email: str
    password: str

    @validator('email')
    def email_valid(cls, v):
        return v.strip().lower()

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str

    class Config:
        from_attributes = True

# Task Schemas
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

    @validator('title')
    def title_valid(cls, v):
        v = v.strip()
        if len(v) < 1:
            raise ValueError('Title cannot be empty')
        if len(v) > 100:
            raise ValueError('Title must be less than 100 characters')
        return v

    @validator('description')
    def description_valid(cls, v):
        if v:
            v = v.strip()
            if len(v) > 500:
                raise ValueError('Description must be less than 500 characters')
        return v

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

    @validator('title')
    def title_valid(cls, v):
        if v:
            v = v.strip()
            if len(v) < 1:
                raise ValueError('Title cannot be empty')
            if len(v) > 100:
                raise ValueError('Title too long')
        return v

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    owner_id: int

    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str