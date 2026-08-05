from app.core.logger import logger
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_db
from app.dependency.auth import getRole,getUser
from app.schema.enrollement import(
    EnrollmentResponse
)
from app.service.enrollement import(
    enrollement,
    unenrollement,
    getMyCourses,
    getEnrolledStudents
)
from app.schema.user import(
    UserResponse
)
router = APIRouter()

#enrollement
@router.post("/{course_id}/enroll")
def enrollCourse(
    course_id:int,
    db:Session = Depends(get_db),
    role:str=Depends(getRole),
    user_id:str=Depends(getUser)):
    if role!="student":
        logger.warning(f"Access denied for user with role={role} attempting to enroll in course_id={course_id}")
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    enrollement(
        db,course_id,
        user_id
    )
    logger.info(f"User enrolled successfully in course: course_id={course_id}, user_id={user_id}")

#unenrollement
@router.delete("/{course_id}/unenroll")
def unenrollCourse(
    course_id:int,
    db:Session = Depends(get_db),
    role:str=Depends(getRole),
    user_id:str=Depends(getUser)):
    if role!="student":
        logger.warning(f"Access denied for user with role={role} attempting to unenroll from course_id={course_id}")
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )
    unenrollement(
        db,
        course_id,
        user_id
    )

#myCourses
@router.get("/my_courses",response_model=list[EnrollmentResponse])
def getCourses(
    db:Session = Depends(get_db),
    role:str=Depends(getRole),
    user_id:str=Depends(getUser)):
    if role!="student":
        logger.warning(f"Access denied for user with role={role} attempting to access enrolled courses")
        raise HTTPException(
            status_code =403,
            detail="Access denied"
        )

    return getMyCourses(
        db,
        user_id
    )

#getEnrolledStudentInSpecificCourse
@router.get("/{courseId}/students", response_model=list[UserResponse])
def getEnrolledStudentInSpecificCourse(
    courseId: int,
    db: Session = Depends(get_db),
    role: str = Depends(getRole),
):

    if role != "admin":
        logger.warning("Access denied")
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return getEnrolledStudents(
        db,
        courseId,
    )
    
















