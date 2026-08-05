from app.prompt.quiz import QUIZ_GENERATION_PROMPT
from google import genai
from app.core.config import GEMINI_API_KEY
import json


client = genai.Client(api_key=GEMINI_API_KEY)

def generate_quiz_from_ai(prompt_data):

    prompt = QUIZ_GENERATION_PROMPT.format(
        title=prompt_data["title"],
        description=prompt_data["description"],
        learning_objectives=prompt_data["learning_objectives"],
        content=prompt_data["content"],
        example=prompt_data["example"],
        difficulty=prompt_data["difficulty"],
        exam_type=prompt_data["exam_type"],
        total_questions=prompt_data["total_questions"]
    )

    response = client.models.generate_content(
        model="gemini-flash-lite-latest",
        contents=prompt,
        config={
        "temperature": 0.2,
        "response_mime_type": "application/json"
    }
    )
    print(response.text)

    if not response.text:
        raise ValueError("Gemini returned an empty response")

    print("Gemini output:")
    print(response.text)

    try:
        quiz = json.loads(response.text)
        return quiz

    except json.JSONDecodeError:
        raise ValueError("Gemini returned invalid JSON")