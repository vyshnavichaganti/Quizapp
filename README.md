# 📝 Quiz.com — AI Exam Generator

An AI-powered exam generator for teachers and educators. Upload a PDF or paste chapter text and instantly generate a complete question paper with MCQs, short answers, case studies, and an answer key — all tagged with Bloom's Taxonomy levels.

![Quiz.com](https://img.shields.io/badge/AI-Groq%20Llama%203-blue) ![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green) ![React](https://img.shields.io/badge/Frontend-React-61dafb)

---

## ✨ Features

- 📄 Upload PDF or paste chapter text
- 🤖 AI-powered question generation using Groq (Llama 3.3 70B)
- 📊 Three question types — MCQs, Short Answers, Case Studies
- 🧠 Bloom's Taxonomy tagging (Remember → Create)
- 🎯 Difficulty levels — Easy, Medium, Hard
- 📥 Export as DOCX — Question Paper + Answer Key
- ⚡ Ultra-fast generation with Groq API
- 🌙 Clean dark theme UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Axios |
| Backend | FastAPI, Python 3.10 |
| AI Model | Groq — Llama 3.3 70B |
| Export | python-docx |
| PDF Parse | PyPDF2 |
| Deploy | Railway (backend) + Vercel (frontend) |

---

## 📁 Project Structure
quiz-app/
├── backend/
│   ├── main.py          # FastAPI app & routes
│   ├── models.py        # Pydantic data models
│   ├── generator.py     # Groq AI exam generation
│   ├── exporter.py      # DOCX export logic
│   ├── requirements.txt
│   └── .env             # GROQ_API_KEY (never commit)
└── frontend/
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── components/
│       ├── UploadPanel.jsx
│       ├── ExamConfig.jsx
│       ├── ResultsView.jsx
│       └── QuestionCard.jsx
├── public/
├── index.html
└── package.json

---

## 🚀 Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/vyshnavichaganti/Quizapp.git
cd Quizapp
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt
```

Create `.env` file in backend folder:
```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your free API key at [console.groq.com](https://console.groq.com)

Start backend:
```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` 🎉

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/generate` | Generate exam from text |
| POST | `/upload-pdf` | Extract text from PDF |
| POST | `/export/docx` | Download exam as DOCX |

### Example Request
```json
POST /generate
{
  "text": "Chapter content here...",
  "subject": "Biology",
  "difficulty": "medium",
  "mcq_count": 5,
  "short_count": 3,
  "case_count": 1,
  "grade_level": "undergraduate"
}
```

### Example Response
```json
{
  "title": "Biology Exam",
  "subject": "Biology",
  "total_marks": 100,
  "duration_minutes": 120,
  "mcqs": [...],
  "short_answers": [...],
  "case_studies": [...]
}
```

---

## ☁️ Deployment

### Backend → Railway
1. Push to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set root directory to `backend`
4. Add environment variable: `GROQ_API_KEY=your_key`
5. Generate domain

### Frontend → Vercel
1. Update `API` in `src/App.jsx` with Railway URL
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Set root directory to `frontend`
4. Deploy

---

## 🧠 How It Works
Teacher pastes text / uploads PDF
↓
FastAPI receives & validates input
↓
Groq (Llama 3.3 70B) generates structured JSON
↓
Questions tagged with Bloom's Taxonomy
↓
React renders interactive exam preview
↓
Teacher downloads DOCX paper + answer key

---

## 📸 Screenshots

| Upload & Config | Generated Exam |
|---|---|
| Paste text or upload PDF, set difficulty | MCQs with correct answers highlighted |

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch `git checkout -b feature/amazing-feature`
3. Commit changes `git commit -m "Add amazing feature"`
4. Push `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use and modify.

---

## 👩‍💻 Author

**Vyshnavi Chaganti**  
GitHub: [@vyshnavichaganti](https://github.com/vyshnavichaganti)

---

## ⭐ If this helped you, give it a star on GitHub!

Then push it:
powershellgit add README.md
git commit -m "Add README"
git push origin main --force