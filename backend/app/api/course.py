#this is routes in this we will pass requestbody to the apis as a pedantics and also a db session
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

#for session management
from app.db.db import get_db

from app.dependency.auth import getRole

#pydantics used for validation
from app.schema.course import(
    CreateCourse,
    UpdateCourse,
    CourseResponse
)

#crud operations 
from app.service.course import(
    createCourse,
    getSpecificCourse,
    getCourses,
    updateCourse,
    deleteCourse
)

from app.db.db import get_db


router = APIRouter()


#CreateCourse
@router.post("/admin/create")
def registerCourse(course:CreateCourse,db:Session = Depends(get_db),role:str=Depends(getRole)):
    if role!="admin":
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    createCourse(db,course)
    print("User created successfully")



#getAllCourses
@router.get("/",response_model = list[CourseResponse])
def getAllCourses(db:Session = Depends(get_db)):
    return getCourses(db)

             

#getSpecificCourse
@router.get("/admin/{course_id}",response_model=CourseResponse)
def getCourse(course_id:int, db:Session = Depends(get_db),role:str=Depends(getRole)):
    if role!="admin":
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )

    course=getSpecificCourse(db,course_id)
    
    if not course:
        raise HTTPException(status_code=404,detail="Course not found")

    else:
        return course
    
#deleteCourse
@router.delete("/admin/delete/{course_id}")
def delete(course_id:int,db:Session = Depends(get_db),role:str=Depends(getRole)):
    if role!="admin":
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    deleted_course = deleteCourse(course_id,db)

    if not deleted_course:
        raise HTTPException(status_code=404,detail="Course not found")



#updateCourse
@router.put("/admin/{course_id}")
def update(course_id:int, course:UpdateCourse,db:Session = Depends(get_db),role:str=Depends(getRole)):
    if role!="admin":
            raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    updated_course = updateCourse(course_id,course,db)

    if not updated_course:
        raise HTTPException(status_code=404,detail="Course not found")

    print("User updated successfully")












