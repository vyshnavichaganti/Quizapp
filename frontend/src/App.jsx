import { useState } from 'react'
import axios from 'axios'
import { BookOpen, Zap, Download, RotateCcw } from 'lucide-react'
import ExamConfig from './components/TEMP'
import UploadPanel from './components/UploadPanel'
import ResultsView from './components/ResultsView'

const API = 'http://localhost:8000'

export default function App() {
  const [text, setText] = useState('')
  const [config, setConfig] = useState({
    subject: 'Science',
    difficulty: 'medium',
    mcq_count: 5,
    short_count: 3,
    case_count: 1,
    grade_level: 'undergraduate',
  })
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!text.trim() || text.length < 100) {
      setError('Please provide at least 100 characters of content.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(`${API}/generate`, { text, ...config })
      setExam(res.data)
    } catch (e) {
      setError(e.response?.data?.detail || 'Generation failed. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (withAnswers) => {
    const form = new FormData()
    form.append('exam_json', JSON.stringify(exam))
    form.append('include_answers', withAnswers)
    const res = await axios.post(`${API}/export/docx`, form, { responseType: 'blob' })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exam.title?.replace(/ /g, '_') || 'exam'}.docx`
    a.click()
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <BookOpen size={32} color="#6c63ff" />
          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, background: 'linear-gradient(135deg, #6c63ff, #ff6584)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Quiz.com
          </h1>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
          AI-powered exam generator for educators · Paste chapter text or upload PDF
        </p>
      </div>

      {!exam ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>

          {/* Left: Upload Panel */}
          <UploadPanel text={text} setText={setText} api={API} />

          {/* Right: Config */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ExamConfig config={config} setConfig={setConfig} />

            {error && (
              <div style={{ padding: '0.85rem 1rem', background: '#2e1a1a', border: '1px solid #5a2a2a', borderRadius: 'var(--radius)', color: '#ff8080', fontSize: '0.88rem' }}>
                ⚠ {error}
              </div>
            )}

            <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem' }}>
              {loading ? <><span className="spinner" /> Generating…</> : <><Zap size={18} /> Generate Exam</>}
            </button>

            <p style={{ color: 'var(--muted)', fontSize: '0.78rem', textAlign: 'center' }}>
              Powered by Groq · Llama 3 70B · Bloom's Taxonomy
            </p>
          </div>
        </div>
      ) : (
        <div className="fade-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>{exam.title}</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                {exam.subject} · {exam.total_marks} marks · {exam.duration_minutes} min
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-outline" onClick={() => setExam(null)}>
                <RotateCcw size={16} /> New Exam
              </button>
              <button className="btn btn-outline" onClick={() => handleExport(false)}>
                <Download size={16} /> Paper (No Answers)
              </button>
              <button className="btn btn-success" onClick={() => handleExport(true)}>
                <Download size={16} /> Answer Key
              </button>
            </div>
          </div>
          <ResultsView exam={exam} />
        </div>
      )}
    </div>
  )
}