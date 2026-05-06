import QuestionCard from './QuestionCard'

// Replace the MCQ map with:
{exam.mcqs.map((q, i) => (
  <QuestionCard key={i} type="mcq" question={q} index={i} showAnswer={true} />
))}

// Short answers:
{exam.short_answers.map((q, i) => (
  <QuestionCard key={i} type="short" question={q} index={i} showAnswer={true} />
))}

// Case studies:
{exam.case_studies.map((cs, i) => (
  <QuestionCard key={i} type="case" question={cs} index={i} showAnswer={true} />
))}