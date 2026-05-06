from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import PyPDF2
import io
import json

from models import GenerateRequest
from generator import generate_exam
from exporter import export_to_docx

app = FastAPI(title="Quiz.com API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Quiz.com API 🚀", "status": "running"}

@app.post("/generate")
async def generate(request: GenerateRequest):
    if len(request.text.strip()) < 100:
        raise HTTPException(400, "Text too short.")
    try:
        exam = generate_exam(
            text=request.text,
            subject=request.subject,
            difficulty=request.difficulty,
            mcq_count=request.mcq_count,
            short_count=request.short_count,
            case_count=request.case_count,
            grade_level=request.grade_level,
        )
        return exam
    except Exception as e:
        raise HTTPException(500, f"Generation failed: {str(e)}")

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(400, "Only PDF files allowed.")
    content = await file.read()
    reader = PyPDF2.PdfReader(io.BytesIO(content))
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    if len(text.strip()) < 50:
        raise HTTPException(422, "Could not extract text from PDF.")
    return {"text": text[:15000], "pages": len(reader.pages)}

@app.post("/export/docx")
async def export_docx(
    exam_json: str = Form(...),
    include_answers: bool = Form(False)
):
    try:
        exam = json.loads(exam_json)
    except:
        raise HTTPException(400, "Invalid exam JSON.")
    docx_bytes = export_to_docx(exam, include_answers=include_answers)
    filename = f"{exam.get('title', 'exam').replace(' ', '_')}.docx"
    return Response(
        content=docx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )