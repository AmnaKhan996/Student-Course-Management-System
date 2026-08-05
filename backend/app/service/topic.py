from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.model.topic import Topic
from app.schema.topic import CreateTopic,UpdateTopic,TopicResponse

#CreateTopic
def createTopic(course_id:int,db:Session,topic:CreateTopic):
    new_topic = Topic(
        course_id=course_id,
        title = topic.title,
        description = topic.description,
        learning_objectives=topic.learning_objectives,
        content=topic.content,
        example=topic.example,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(new_topic)
    db.commit()
    db.refresh(new_topic)
    return new_topic


#getAllTopics
def getAllTopics(course_id:int,db:Session):
    topics= db.query(Topic).filter(Topic.course_id== course_id).all()
    if not topics:
        raise HTTPException(
            status_code=404,
            detail="No topics found"
        )
    return topics



