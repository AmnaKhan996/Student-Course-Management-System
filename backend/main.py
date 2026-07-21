from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.db import engine, Base

# Import models so SQLAlchemy registers them
from app.model.user import User
from app.model.enrollement import Enrollment
from app.model.course import Course

from app.api import user
from app.api import course
from app.api import enrollement

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




app.include_router(user.router,prefix="/user",tags=["User"])
app.include_router(course.router,prefix="/course", tags=["Course"])
app.include_router(enrollement.router,prefix="/course", tags=["Enrollment"])