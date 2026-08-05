from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.model.course import Course
from app.model.user import User
from app.model.topic import Topic
from app.model.enrollement import Enrollment
from app.schema.course import CreateCourse, UpdateCourse
from .notification import create_notification

#CreateCourse
async def createCourse(db:Session,course:CreateCourse):
    new_course = Course(
        title=course.title,
        description=course.description,
        capacity = course.capacity,
        available_capacity =course.capacity,
        duration = course.duration,
        created_at=datetime.now(),
        updated_at=datetime.now()

    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    db_users = db.query(User).filter(User.role.in_(["student", "admin"])).all()
    for student in db_users:
       await create_notification(db,student.id,"New Course", f"{course.title} course added")
    return new_course

#getSpecificCourse
def getSpecificCourse(db:Session,course_id:int):
    course = db.query(Course).filter(Course.id==course_id).first()
    if not course:
        raise HTTPException(
        status_code=404,
        detail="Course not found"
        )
    total_topics = db.query(Topic).filter(
        Topic.course_id == course_id
    ).count()
    total_students = db.query(Enrollment).filter(
        Enrollment.course_id == course_id,
        Enrollment.isDeleted == False
    ).count()
    new_data = {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "duration": course.duration,
        "capacity": course.capacity,
        "available_capacity":course.available_capacity,
        "created_at": course.created_at,
        "updated_at": course.updated_at,
        "isDeleted": course.isDeleted,
        "total_topics": total_topics,
        "enrolled_students": total_students

    }
    return new_data

#getSpecificCourse
def getSpecificCourseById(db:Session,course_id:int):
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
    return (db.query(Course).filter(Course.isDeleted == False).count())

#UpdateCourse
def updateCourse(course_id:int, course:UpdateCourse, db:Session):
    db_course = getSpecificCourseById(db,course_id)
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
    course= getSpecificCourseById(db,course_id)
    if course:
        course.isDeleted=True
        db.commit()
        db.refresh(course)
    return course

