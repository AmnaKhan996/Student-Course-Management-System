from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    def __init__(self):
        self.connections = {}
    async def connect(self,user_id:int, websocket:WebSocket):
        await websocket.accept()
        self.connections[user_id] = websocket
    def disconnect(self,user_id:int):
        if user_id in self.connections:
            del self.connections[user_id]
    async def send(self,user_id:int,data:dict):
        print("websockets",data)
        websocket = self.connections.get(user_id)
        if websocket:
            try:
                await websocket.send_json(data)
            except (WebSocketDisconnect, RuntimeError):
                self.disconnect(user_id)
manager = ConnectionManager()