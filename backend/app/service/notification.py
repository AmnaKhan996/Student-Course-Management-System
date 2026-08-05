from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.model.notification import Notification
from app.core.websocket import manager

async def create_notification(db,user_id,title,message):
    notification = Notification(
        user_id=user_id,
        title=title,
        description=message,
        created_at=datetime.now(),
        updated_at=datetime.now()
        )
    db.add(notification)
    db.commit()
    await manager.send(
        user_id,
        { 
        "id": notification.id,
        "title":title,
         "message":message,
         "user_id":user_id
        })

    