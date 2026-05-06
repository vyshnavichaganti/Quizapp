import { useState, useRef } from 'react'
import axios from 'axios'
import { Upload, FileText, X } from 'lucide-react'

export default function UploadPanel({ text, setText, api }) {
  const [dragging, setDragging] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const inputRef = useRef()

  const handlePDF = async (file) => {
    if (!file || !file.name.endsWith('.pdf')) return
    setPdfLoading(true)
    setFileName(file.name)
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await axios.post(`${api}/upload-pdf`, form)
      setText(res.data.text)
    } catch (e) {
      alert('PDF extraction failed: ' + (e.response?.data?.detail || e.message))
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handlePDF(e.dataTransfer.files[0]) }}
        onClick={() => inputRef.current.click()}
        style={{
          border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)', padding: '1.5rem',
          textAlign: 'center', cursor: 'pointer',
          background: dragging ? '#1a1730' : 'var(--surface)',
          transition: 'all 0.2s',
        }}
      >
        <input ref={inputRef} type="file" accept=".pdf" hidden onChange={(e) => handlePDF(e.target.files[0])} />
        {pdfLoading
          ? <><span className="spinner" style={{ borderTopColor: 'var(--accent)' }} /><p style={{ marginTop: '0.5rem', color: 'var(--muted)' }}>Extracting PDF…</p></>
          : <>
              <Upload size={28} color={dragging ? 'var(--accent)' : 'var(--muted)'} style={{ marginBottom: '0.5rem' }} />
              <p style={{ color: dragging ? 'var(--accent)' : 'var(--muted)', fontWeight: 500 }}>
                {fileName ? <><FileText size={14} style={{ display: 'inline', marginRight: 4 }} />{fileName}</> : 'Drop PDF or click to upload'}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Supports text-based PDFs</p>
            </>
        }
      </div>

      {/* Text Area */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Or paste your chapter content here…&#10;&#10;The more content you provide, the better the exam quality."
          style={{
            width: '100%', minHeight: 360, padding: '1rem',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', color: 'var(--text)',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem',
            resize: 'vertical', lineHeight: 1.7,
            outline: 'none',
          }}
        />
        {text && (
          <button onClick={() => { setText(''); setFileName('') }}
            style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
            <X size={16} />
          </button>
        )}
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
        {text.length.toLocaleString()} characters {text.length < 100 && text.length > 0 && <span style={{ color: 'var(--accent2)' }}>· Need 100+ to generate</span>}
      </p>
    </div>
  )
}