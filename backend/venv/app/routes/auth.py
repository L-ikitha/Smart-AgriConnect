# app/routes/auth.py

from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import UserCreate, UserOut
from app.config import db
from app.services.auth_service import hash_password, verify_password, create_token

router = APIRouter()
users = db["users"]

@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate):
    if users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    
    hashed = hash_password(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed,
        "role": user.role
    }
    users.insert_one(new_user)
    return {"name": user.name, "email": user.email, "role": user.role}

@router.post("/login")
def login(data: UserCreate):
    user = users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token({"email": user["email"], "role": user["role"]})
    return {"access_token": token, "role": user["role"]}
