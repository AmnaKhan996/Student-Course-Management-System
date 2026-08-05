from datetime import datetime
from app.core.logger import logger
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.model.enrollement import Enrollment
from app.model.user import User
from app.schema.enrollement import CreateEnrollment
from .course import getSpecificCourseById

#enrollement
def enrollement(db: Session, course_id:int, user_id:int):
    course = getSpecificCourseById(db, course_id)
    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )
    if course.available_capacity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Capacity is full"
        )
    enrollment = db.query(Enrollment).filter(
        Enrollment.course_id == course_id,
        Enrollment.student_id == user_id
    ).first()
    if enrollment:
        if enrollment.isDeleted == True:
            enrollment.isDeleted = False
            enrollment.updated_at = datetime.now()
        else:
            logger.debug(f"User with user_id={user_id} attempted to enroll in course_id={course_id} but is already enrolled")
            raise HTTPException(
                status_code=400,
                detail="Already enrolled"
            )
    else:
        enrollment = Enrollment(
            student_id=user_id,
            course_id=course_id,
            isDeleted=False,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.add(enrollment)
    course.available_capacity -= 1
    db.commit()
    db.refresh(enrollment)
    return enrollment



#Unenrollement
def unenrollement(db: Session, course_id:int, user_id:int):
    course = getSpecificCourseById(db, course_id)
    course.available_capacity += 1
    enrollment = db.query(Enrollment).filter(
        Enrollment.course_id == course_id,
        Enrollment.student_id == user_id
    ).first()
    if not enrollment:
        raise HTTPException(
            status_code=404,
            detail="Enrollment not found"
        )
    enrollment.isDeleted=True
    db.commit()
    db.refresh(enrollment)
    return enrollment

#getMyCourse
def getMyCourses(db:Session,user_id:int):
    courses= db.query(Enrollment).filter(Enrollment.student_id==user_id,Enrollment.isDeleted == False).all()
    return courses



#getStudentsEnrolledInSpecificCourse
def getEnrolledStudents(
    db: Session,
    courseId: int,
):

    students = (
        db.query(User)
        .join(
            Enrollment,
            Enrollment.student_id == User.id
        )
        .filter(
            Enrollment.course_id == courseId
        )
        .all()
    )

    return students