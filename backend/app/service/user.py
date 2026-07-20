from datetime import datetime

from fastapi import HTTPException

from sqlalchemy.orm import Session
from app.model.user import User
from app.schema.user import CreateUser, UpdateUser,LoginSchema
from pwdlib import PasswordHash
from app.dependency.jwt import create_access_token


password_hash = PasswordHash.recommended()

#HashPassword
def hash_password(password: str):
    return password_hash.hash(password)


#CreateUser
def createUser(db:Session,user:CreateUser):
    new_user = User(
        name=user.name,
        username = user.username,
        password=hash_password(user.password),
        role = user.role,
        created_at=datetime.now(),
        updated_at=datetime.now()

    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


#getSpecificUser
def getSpecificUser(db:Session,user_id:int):
    user = db.query(User).filter(User.id==user_id).first()
    if not user:
        raise HTTPException(
        status_code=404,
        detail="User not found"
        )
    return user


#LoginUser
def loginUser(db,user:LoginSchema):
    # findUser
    db_user=db.query(User).filter(User.username==user.username).first()
    if not db_user:
        raise HTTPException(
        status_code=404,
        detail="User not found"
        )
    if not password_hash.verify(user.password, db_user.password):
        raise HTTPException(
        status_code=404,
        detail="Invalid Password"
        )
    
    token = create_access_token(
        {
         "user_id":db_user.id,
         "username":db_user.username,
         "role":db_user.role
        }
    )

    return({
        "access_token": token,
        "token_type": "bearer"
    })



#getAllUsers
def getUsers(db:Session):
    return db.query(User).filter(User.isDeleted == False).all()


#UpdateUser
def updateUser(user_id:int, user:UpdateUser, db:Session):
    db_user = getSpecificUser(db,user_id)
    if db_user:
        if user.name is not None:
            db_user.name = user.name

        if user.username is not None:
            db_user.username = user.username
            
        db.commit()
        db.refresh(db_user)

    return db_user



#deleteUser
def deleteUser(user_id:int, db:Session):
    user = getSpecificUser(db,user_id)
    if user:
        user.isDeleted=True

        db.commit()
        db.refresh(user)

    return user

