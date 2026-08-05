import os
import logging
logger = logging.getLogger("student_management")
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    "%(asctime)s | %(levelname)s | %(message)s"
)
file_handler = logging.FileHandler("logs/app.log")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)