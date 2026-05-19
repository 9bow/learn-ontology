import { useEffect, useState, type ReactNode } from 'react';

interface QuizItem {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface QuizProps {
  section: string;
}

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /`([^`]+)`/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(<code key={`c-${i++}`}>{match[1]}</code>);
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderText(text: string): ReactNode {
  if (!text) return null;
  const blockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const segments: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = blockRegex.exec(text)) !== null) {
    if (match.index > last) {
      const before = text.slice(last, match.index);
      segments.push(<span key={`t-${i++}`}>{renderInlineMultiline(before)}</span>);
    }
    segments.push(
      <pre key={`b-${i++}`} style={{ overflowX: 'auto' }}>
        <code>{match[2]}</code>
      </pre>
    );
    last = blockRegex.lastIndex;
  }
  if (last < text.length) {
    segments.push(<span key={`t-${i++}`}>{renderInlineMultiline(text.slice(last))}</span>);
  }
  return <>{segments}</>;
}

function renderInlineMultiline(text: string): ReactNode {
  return text.split('\n').map((line, idx, arr) => (
    <span key={idx}>
      {renderInline(line)}
      {idx < arr.length - 1 ? <br /> : null}
    </span>
  ));
}

export default function Quiz({ section }: QuizProps) {
  const [items, setItems] = useState<QuizItem[]>([]);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : import.meta.env.BASE_URL + '/';
    fetch(`${base}data/quiz/${section}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed: ${r.status}`);
        return r.json();
      })
      .then((data: QuizItem[]) => setItems(data))
      .catch((e) => setError(e.message));
  }, [section]);

  if (error) return <div className="quiz">퀴즈 로드 실패: {error}</div>;
  if (items.length === 0) return <div className="quiz">퀴즈 로딩 중…</div>;

  return (
    <div className="quiz">
      <h3 style={{ marginTop: 0 }}>섹션 퀴즈 ({items.length}문항)</h3>
      {items.map((q, idx) => {
        const sel = answers[q.id] ?? null;
        const isSubmitted = submitted[q.id] ?? false;
        return (
          <div key={q.id} style={{ marginBottom: '1.5rem' }}>
            <div className="quiz-question">
              {idx + 1}. {renderText(q.question)}
            </div>
            {q.options.map((opt, i) => {
              let cls = 'quiz-option';
              if (isSubmitted) {
                if (i === q.answer) cls += ' correct';
                else if (i === sel) cls += ' incorrect';
              } else if (sel === i) {
                cls += ' correct';
              }
              return (
                <label key={i} className={cls}>
                  <input
                    type="radio"
                    name={q.id}
                    checked={sel === i}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                    disabled={isSubmitted}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {renderInline(opt)}
                </label>
              );
            })}
            {!isSubmitted ? (
              <button
                type="button"
                onClick={() => setSubmitted((s) => ({ ...s, [q.id]: true }))}
                disabled={sel === null}
                style={{ marginTop: '0.5rem' }}
              >
                정답 확인
              </button>
            ) : (
              <div className="quiz-explanation">
                <strong>{sel === q.answer ? '✓ 정답' : '✗ 오답'}</strong>
                {q.explanation ? (
                  <div style={{ marginTop: '0.5rem' }}>{renderText(q.explanation)}</div>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
