#this is routes in this we will pass requestbody to the apis as a pedantics and also a db session
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

#for session management
from app.db.db import get_db

from app.dependency.auth import getRole,getUser

#pydantics used for validation
from app.schema.enrollement import(
    EnrollmentResponse
)

#crud operations 
from app.service.enrollement import(
    enrollement,
    unenrollement,
    getMyCourses,
)

from app.db.db import get_db


router = APIRouter()


#enrollement
@router.post("/{course_id}/enroll")
def enrollCourse(course_id:int,db:Session = Depends(get_db),role:str=Depends(getRole),user_id:str=Depends(getUser)):
    if role!="student":
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    enrollement(db,course_id,user_id)
    print("User created successfully")



#unenrollement
@router.delete("/{course_id}/unenroll")
def unenrollCourse(course_id:int,db:Session = Depends(get_db),role:str=Depends(getRole),user_id:str=Depends(getUser)):
    if role!="student":
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    unenrollement(db,course_id,user_id)

             

#myCourses
@router.get("/my_courses",response_model=list[EnrollmentResponse])
def getCourses(db:Session = Depends(get_db),role:str=Depends(getRole),user_id:str=Depends(getUser)):
    if role!="student":
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )

    return getMyCourses(db,user_id)
    
















