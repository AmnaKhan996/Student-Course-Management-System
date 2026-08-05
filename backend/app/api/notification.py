from fastapi import APIRouter, WebSocket, Depends,WebSocketDisconnect
from app.db.db import get_db
from app.schema.notification import NotificationResponse
from app.model.notification import Notification
from app.core.websocket import manager
from app.dependency.auth import getUser
from sqlalchemy.orm import Session
router = APIRouter()

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id:int
    ):
    await manager.connect(user_id, websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(user_id)

@router.get("/",response_model=list[NotificationResponse])
def get_notifications(db:Session=Depends(get_db),user_id:int=Depends(getUser)):
    notifications = (db.query(Notification)
        .filter(
            Notification.user_id == user_id, 
            Notification.is_read == False
        )
        .order_by(Notification.created_at.desc())
        .all()
    )
    return notifications

@router.put("/{notification_id}/read")
def mark_read(notification_id:int,db:Session = Depends(get_db),user_id:int=Depends(getUser)):
    notification = db.query(Notification).filter( Notification.id == notification_id, Notification.user_id == user_id).first()
    if notification:
        notification.is_read = True
        db.commit()
        db.refresh(notification)
    return {
        "message":"Notification marked as read"
    }