export default function ResultsView({ exam }) {
  const bloomColors = {
    Remember: '#ff6b6b', Understand: '#ffa94d', Apply: '#ffd43b',
    Analyze: '#69db7c', Evaluate: '#4dabf7', Create: '#cc5de8'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Section A: MCQs */}
      {exam.mcqs?.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="tag tag-mcq">Section A</span>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700 }}>Multiple Choice Questions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {exam.mcqs.map((q, i) => (
              <div key={i} className="card fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                  <p style={{ fontWeight: 500 }}><span style={{ color: 'var(--accent)', fontFamily: 'Syne', fontWeight: 700 }}>Q{i + 1}.</span> {q.question}</p>
                  <span style={{ ...bloomBadge(q.bloom_level, bloomColors), flexShrink: 0 }}>{q.bloom_level}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  {q.options.map((opt, j) => (
                    <div key={j} style={{
                      padding: '0.4rem 0.75rem', borderRadius: 8, fontSize: '0.88rem',
                      background: opt.startsWith(q.answer) ? '#1a2e1a' : 'var(--surface2)',
                      border: `1px solid ${opt.startsWith(q.answer) ? '#2a5a2a' : 'var(--border)'}`,
                      color: opt.startsWith(q.answer) ? 'var(--success)' : 'var(--text)',
                    }}>{opt}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section B: Short Answers */}
      {exam.short_answers?.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="tag tag-short">Section B</span>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700 }}>Short Answer Questions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {exam.short_answers.map((q, i) => (
              <div key={i} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                  <p style={{ fontWeight: 500 }}><span style={{ color: '#ffaa7d', fontFamily: 'Syne', fontWeight: 700 }}>Q{i + 1}.</span> {q.question}</p>
                  <span style={{ ...bloomBadge(q.bloom_level, bloomColors), flexShrink: 0 }}>{q.bloom_level}</span>
                </div>
                <div style={{ padding: '0.75rem', background: 'var(--surface2)', borderRadius: 8, borderLeft: '3px solid var(--success)', fontSize: '0.88rem', color: 'var(--muted)' }}>
                  ✓ {q.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section C: Case Studies */}
      {exam.case_studies?.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="tag tag-case">Section C</span>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700 }}>Case Studies</h3>
          </div>
          {exam.case_studies.map((cs, i) => (
            <div key={i} className="card" style={{ marginBottom: '1rem' }}>
              <div style={{ padding: '0.85rem 1rem', background: 'var(--surface2)', borderRadius: 8, marginBottom: '1rem', borderLeft: '3px solid #7dceff', fontSize: '0.92rem' }}>
                {cs.scenario}
              </div>
              {cs.questions.map((q, j) => (
                <div key={j} style={{ marginBottom: '0.85rem' }}>
                  <p style={{ fontWeight: 500, marginBottom: '0.4rem' }}><span style={{ color: '#7dceff', fontFamily: 'Syne', fontWeight: 700 }}>{j + 1}.</span> {q}</p>
                  <div style={{ padding: '0.6rem 0.85rem', background: '#1a2e1a', borderRadius: 8, fontSize: '0.85rem', color: 'var(--success)', borderLeft: '2px solid var(--success)' }}>
                    ✓ {cs.answers[j]}
                  </div>
                </div>
              ))}
              <span style={{ ...bloomBadge(cs.bloom_level, bloomColors), marginTop: '0.5rem' }}>{cs.bloom_level}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

function bloomBadge(level, colors) {
  const color = colors[level] || '#888'
  return {
    display: 'inline-block', padding: '0.2rem 0.6rem',
    borderRadius: 20, fontSize: '0.7rem', fontWeight: 700,
    fontFamily: 'Syne, sans-serif', textTransform: 'uppercase',
    background: color + '22', color, border: `1px solid ${color}55`
  }
}