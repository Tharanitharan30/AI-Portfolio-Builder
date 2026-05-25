from fastapi import APIRouter, HTTPException
from database import db
from models.user_model import UserRegister, UserLogin
from utils.hash import hash_password, verify_password
from utils.jwt_handler import create_token

router = APIRouter()

users_collection = db["users"]

@router.post("/register")
def register(user: UserRegister):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(user.password)

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    }

    users_collection.insert_one(user_data)

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login(user: UserLogin):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if not existing_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    password_correct = verify_password(
        user.password,
        existing_user["password"]
    )

    if not password_correct:
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    token = create_token({
        "email": existing_user["email"]
    })

    return {
        "token": token,
        "name": existing_user["name"]
    }