# app/schemas/user_schema.py

from pydantic import BaseModel, EmailStr
from typing import Literal

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Literal["farmer", "laborer", "expert", "leader"]

class UserOut(BaseModel):
    name: str
    email: EmailStr
    role: str
