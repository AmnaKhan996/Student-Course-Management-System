from datetime import datetime

from fastapi import HTTPException

from sqlalchemy.orm import Session
from app.model.enrollement import Enrollment
from app.schema.enrollement import CreateEnrollment

from .course import getSpecificCourse



#enrollement
def enrollement(db: Session, course_id:int, user_id:int):

    course = getSpecificCourse(db, course_id)

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )


    if course.capacity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Capacity is full"
        )


    # check old enrollment
    enrollment = db.query(Enrollment).filter(
        Enrollment.course_id == course_id,
        Enrollment.student_id == user_id
    ).first()



    # agar pehle enroll kiya hua tha aur phir unenroll kiya
    if enrollment:

        if enrollment.isDeleted == True:

            enrollment.isDeleted = False
            enrollment.updated_at = datetime.now()

        else:

            raise HTTPException(
                status_code=400,
                detail="Already enrolled"
            )


    # agar kabhi enroll hi nahi kiya
    else:

        enrollment = Enrollment(
            student_id=user_id,
            course_id=course_id,
            isDeleted=False,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.add(enrollment)



    course.capacity -= 1


    db.commit()
    db.refresh(enrollment)


    return enrollment



#Unenrollement
def unenrollement(db: Session, course_id:int, user_id:int):

    course = getSpecificCourse(db, course_id)

    course.capacity += 1

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



