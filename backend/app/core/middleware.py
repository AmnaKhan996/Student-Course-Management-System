from requests import Request
from app.core.logger import logger
async def logging_middleware (request: Request, call_next):
     if request.method == "OPTIONS":
        return await call_next(request)
     logger.info(f"Request: {request.method} {request.url}")
     response = await call_next(request)
     logger.info(f"Response: {response.status_code} for {request.method} {request.url}")
     return response 


