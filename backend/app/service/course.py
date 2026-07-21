from datetime import datetime

from fastapi import HTTPException

from sqlalchemy.orm import Session
from app.model.course import Course
from app.schema.course import CreateCourse, UpdateCourse



#CreateCourse
def createCourse(db:Session,course:CreateCourse):
    new_course = Course(
        title=course.title,
        description=course.description,
        capacity = course.capacity,
        duration = course.duration,
        created_at=datetime.now(),
        updated_at=datetime.now()

    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


#getSpecificCourse
def getSpecificCourse(db:Session,course_id:int):
    course = db.query(Course).filter(Course.id==course_id).first()
    if not course:
        raise HTTPException(
        status_code=404,
        detail="Course not found"
        )
    return course



#getAllCourses
def getCourses(db:Session,skip:int=0,limit:int=10):
    return db.query(Course).filter(Course.isDeleted == False).offset(skip).limit(limit).all()



#Total Courses
def getCourseCount(db):

    return (
        db.query(Course)
        .filter(Course.isDeleted == False)
        .count()
    )




#UpdateCourse
def updateCourse(course_id:int, course:UpdateCourse, db:Session):
    db_course = getSpecificCourse(db,course_id)
    print(course.title)
    if db_course:
        if course.title is not None:
            db_course.title = course.title

        if course.description is not None:
            db_course.description = course.description

        if course.capacity is not None:
            db_course.capacity = course.capacity      
        
        if course.duration is not None:
            db_course.duration = course.duration
        
        db.commit()
        db.refresh(db_course)

    return db_course



#deleteCourse
def deleteCourse(course_id:int, db:Session):
    course= getSpecificCourse(db,course_id)
    if course:
        course.isDeleted=True

        db.commit()
        db.refresh(course)

    return course

