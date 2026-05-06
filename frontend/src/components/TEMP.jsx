export default function ExamConfig({ config, setConfig }) {
  const set = (k, v) => setConfig(prev => ({ ...prev, [k]: v }))

  const inputStyle = {
    background: 'var(--surface2)', border: '1px solid var(--border)',
    color: 'var(--text)', borderRadius: 8, padding: '0.5rem 0.75rem',
    fontSize: '0.88rem', width: '100%', outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
  }

  const labelStyle = {
    fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    fontFamily: 'Syne, sans-serif', display: 'block', marginBottom: 6,
  }

  const field = (label, key, el) => (
    <div key={key}>
      <span style={labelStyle}>{label}</span>
      {el}
    </div>
  )

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>⚙ Exam Config</h3>

      {field('Subject', 'subject',
        <input style={inputStyle} value={config.subject} onChange={e => set('subject', e.target.value)} placeholder="e.g. Biology" />
      )}

      {field('Grade Level', 'grade_level',
        <select style={inputStyle} value={config.grade_level} onChange={e => set('grade_level', e.target.value)}>
          {['primary', 'secondary', 'high school', 'undergraduate', 'postgraduate'].map(g =>
            <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
          )}
        </select>
      )}

      {field('Difficulty', 'difficulty',
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['easy', 'medium', 'hard'].map(d => (
            <button key={d} onClick={() => set('difficulty', d)}
              style={{
                flex: 1, padding: '0.45rem', borderRadius: 8, border: '1px solid',
                borderColor: config.difficulty === d ? 'var(--accent)' : 'var(--border)',
                background: config.difficulty === d ? '#1e1a4e' : 'var(--surface2)',
                color: config.difficulty === d ? '#a89cff' : 'var(--muted)',
                fontFamily: 'Syne', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                textTransform: 'capitalize',
              }}>
              {d}
            </button>
          ))}
        </div>
      )}

      {field('MCQs', 'mcq_count',
        <input style={inputStyle} type="number" min={1} max={20} value={config.mcq_count} onChange={e => set('mcq_count', +e.target.value)} />
      )}
      {field('Short Answers', 'short_count',
        <input style={inputStyle} type="number" min={1} max={10} value={config.short_count} onChange={e => set('short_count', +e.target.value)} />
      )}
      {field('Case Studies', 'case_count',
        <input style={inputStyle} type="number" min={0} max={5} value={config.case_count} onChange={e => set('case_count', +e.target.value)} />
      )}
    </div>
  )
}