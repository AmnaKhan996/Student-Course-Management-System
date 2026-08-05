from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.db import engine, Base
from slowapi.errors import RateLimitExceeded
from app.core.limiter import limiter, rate_limit_handler
from app.model.user import User
from app.model.enrollement import Enrollment
from app.model.course import Course
from app.model.topic import Topic
from app.model.quiz import Quiz
from app.model.question import Question
from app.model.quiz_attempt import QuizAttempt
from app.model.student_answer import StudentAnswer
from app.api import user
from app.api import course
from app.api import enrollement
from app.api import notification
from app.api import topic
from app.api import quiz
from app.api import question
from app.core.middleware import logging_middleware

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.middleware("http")(logging_middleware)
app.include_router(user.router,prefix="/user",tags=["User"])
app.include_router(course.router,prefix="/course", tags=["Course"])
app.include_router(enrollement.router,prefix="/course", tags=["Enrollment"])
app.include_router(notification.router,prefix="/notifications", tags=["Notification"])
app.include_router(topic.router,prefix="/topics", tags=["Topic"])
app.include_router(quiz.router,prefix="/quiz", tags=["Quiz"])
app.include_router(question.router,prefix="/quiz/question", tags=["Question"])