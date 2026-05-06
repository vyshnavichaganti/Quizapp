import os
import json
import re
from groq import Groq
from models import ExamPaper
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

BLOOM_LEVELS = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"]

def generate_exam(text: str, subject: str, difficulty: str,
                  mcq_count: int, short_count: int, case_count: int,
                  grade_level: str) -> dict:

    prompt = f"""You are an expert educator. Generate a complete exam paper from the following content.

CONTENT:
{text[:4000]}

REQUIREMENTS:
- Subject: {subject}
- Difficulty: {difficulty}
- Grade Level: {grade_level}
- MCQs: {mcq_count} questions (4 options each, mark correct answer)
- Short Answer: {short_count} questions
- Case Studies: {case_count} scenario-based questions (2-3 sub-questions each)

IMPORTANT: Tag each question with a Bloom's Taxonomy level: {", ".join(BLOOM_LEVELS)}

Return ONLY valid JSON in this exact structure:
{{
  "title": "Exam Title",
  "subject": "{subject}",
  "total_marks": <number>,
  "duration_minutes": <number>,
  "mcqs": [
    {{
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A",
      "bloom_level": "Remember",
      "difficulty": "{difficulty}"
    }}
  ],
  "short_answers": [
    {{
      "question": "...",
      "answer": "...",
      "bloom_level": "Understand",
      "difficulty": "{difficulty}"
    }}
  ],
  "case_studies": [
    {{
      "scenario": "...",
      "questions": ["...", "..."],
      "answers": ["...", "..."],
      "bloom_level": "Analyze",
      "difficulty": "{difficulty}"
    }}
  ]
}}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=4000,
    )

    raw = response.choices[0].message.content.strip()

    # Extract JSON from response
    json_match = re.search(r'\{.*\}', raw, re.DOTALL)
    if not json_match:
        raise ValueError("No valid JSON found in AI response")

    exam_data = json.loads(json_match.group())
    return exam_data