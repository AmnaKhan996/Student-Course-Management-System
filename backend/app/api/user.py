from app.core.logger import logger
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.core.limiter import limiter
from app.db.db import get_db
from app.schema.user import(
    CreateUser,
    UpdateUser,
    UserResponse,
    LoginSchema
)
from app.service.user import(
    createUser,
    getSpecificUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser
)
from app.db.db import get_db
router = APIRouter()

#registerUser
@router.post("/create")
@limiter.limit("3/minute")
def registerUser(
    request: Request,
    user:CreateUser,
    db:Session = Depends(get_db)
    ):
    new_user = createUser(db,user)
    logger.info(
    f"User created successfully: user_id={new_user.id}"
)
    return {
        "message": "User created successfully",
        "user": new_user
    }


#loginUser
@router.post("/login")
@limiter.limit("5/minute")
def login(
    request:Request,
    user:LoginSchema, 
    db:Session=Depends(get_db)):
    print("Login request received",request.client)
    return loginUser(db,user)

#getAllUsers
@router.get("/",response_model = list[UserResponse])
def getAllUsers(
    db:Session=Depends(get_db)):
    return getUsers(db)

#getSpecificUser
@router.get("/{user_id}",response_model=UserResponse)
def getUser(
    user_id:int, 
    db:Session=Depends(get_db)
    ):
    user=getSpecificUser(db,user_id)
    if not user:
        raise HTTPException(status_code=404,detail="User not found")
    else:
        return user
    
#deleteUser
@router.delete("/delete/{user_id}")
def delete(
    user_id:int, 
    db:Session = Depends(get_db)
    ):
    deleted_user = deleteUser(user_id,db)
    if not deleted_user:
        raise HTTPException(status_code=404,detail="User not found")

#updateUser
@router.put("/{user_id}")
def update(
    user_id:int,
    user:UpdateUser,
    db:Session=Depends(get_db)):
    updated_user = updateUser(user_id,user,db)
    if not updated_user:
        raise HTTPException(status_code=404,detail="User not found")












