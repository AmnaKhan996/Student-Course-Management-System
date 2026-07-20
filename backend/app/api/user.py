#this is routes in this we will pass requestbody to the apis as a pedantics and also a db session
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

#for session management
from app.db.db import get_db

#pydantics used for validation
from app.schema.user import(
    CreateUser,
    UpdateUser,
    UserResponse,
    LoginSchema
)

#crud operations 
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
def registerUser(user:CreateUser,db:Session = Depends(get_db)):
    createUser(db,user)
    print("User created successfully")


#loginUser
@router.post("/login")
def login(user:LoginSchema, db:Session=Depends(get_db)):
    return loginUser(db,user)


#getAllUsers
@router.get("/",response_model = list[UserResponse])
def getAllUsers(db:Session=Depends(get_db)):
    return getUsers(db)



# # roleBasedAccess
# @router.get("/admin")
# def accessAdmin(role:str=Depends(getRole)):
#         if role != "admin":
#             raise HTTPException(
#             status_code=403,
#             detail="Access denied"
#         )
#         else:
#              return {"message": "Welcome Admin"}
             

#getSpecificUser
@router.get("/{user_id}",response_model=UserResponse)
def getUser(user_id:int, db:Session=Depends(get_db)):

    user=getSpecificUser(db,user_id)
    
    if not user:
        raise HTTPException(status_code=404,detail="User not found")

    else:
        return user
    
#deleteUser
@router.delete("/delete/{user_id}")
def delete(user_id:int, db:Session = Depends(get_db)):
    deleted_user = deleteUser(user_id,db)

    if not deleted_user:
        raise HTTPException(status_code=404,detail="User not found")



#updateUser
@router.put("/{user_id}")
def update(user_id:int, user:UpdateUser, db:Session=Depends(get_db)):

    updated_user = updateUser(user_id,user,db)

    if not updated_user:
        raise HTTPException(status_code=404,detail="User not found")

    print("User updated successfully")












