from app.core.logger import logger
import os
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import JWTError, jwt
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
security = HTTPBearer()
def getRole(credentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        print("Decoded JWT payload:", payload)  # Debugging line
        role = payload.get("role")
        return role
    except JWTError:
        logger.warning("Invalid or expired token")
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )
    
def getUser(credentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        user_id = payload.get("user_id")
        return user_id
    except JWTError:
        logger.warning("Invalid or expired token")
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )