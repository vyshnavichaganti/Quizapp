from pydantic import BaseModel
from typing import List, Optional, Literal

class MCQQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str
    bloom_level: str
    difficulty: str

class ShortAnswerQuestion(BaseModel):
    question: str
    answer: str
    bloom_level: str
    difficulty: str

class CaseStudyQuestion(BaseModel):
    scenario: str
    questions: List[str]
    answers: List[str]
    bloom_level: str
    difficulty: str

class ExamPaper(BaseModel):
    title: str
    subject: str
    total_marks: int
    duration_minutes: int
    mcqs: List[MCQQuestion]
    short_answers: List[ShortAnswerQuestion]
    case_studies: List[CaseStudyQuestion]

class GenerateRequest(BaseModel):
    text: str
    subject: str = "General"
    difficulty: Literal["easy", "medium", "hard"] = "medium"
    mcq_count: int = 5
    short_count: int = 3
    case_count: int = 1
    grade_level: str = "undergraduate"