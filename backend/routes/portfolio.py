from fastapi import APIRouter, HTTPException
from database import db
from models.portfolio_model import Portfolio

router = APIRouter()

portfolio_collection = db["portfolios"]

@router.post("/create-portfolio")
def create_portfolio(portfolio: Portfolio):

    existing = portfolio_collection.find_one({
        "user_email": portfolio.user_email
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Portfolio already exists"
        )

    portfolio_collection.insert_one(
        portfolio.dict()
    )

    return {
        "message": "Portfolio created successfully"
    }

@router.get("/get-portfolio/{email}")
def get_portfolio(email: str):

    portfolio = portfolio_collection.find_one({
        "user_email": email
    })

    if not portfolio:
        raise HTTPException(
            status_code=404,
            detail="Portfolio not found"
        )

    portfolio["_id"] = str(portfolio["_id"])

    return portfolio

@router.put("/update-portfolio/{email}")
def update_portfolio(
    email: str,
    portfolio: Portfolio
):

    updated = portfolio_collection.update_one(
        {"user_email": email},
        {"$set": portfolio.dict()}
    )

    if updated.modified_count == 0:
        raise HTTPException(
            status_code=400,
            detail="No changes made"
        )

    return {
        "message": "Portfolio updated successfully"
    }

@router.delete("/delete-portfolio/{email}")
def delete_portfolio(email: str):

    deleted = portfolio_collection.delete_one({
        "user_email": email
    })

    if deleted.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Portfolio not found"
        )

    return {
        "message": "Portfolio deleted successfully"
    }