type Ref = string | { title: string; url: string; accessed?: string };

interface Props {
  items: Ref[];
}

export default function References({ items }: Props) {
  if (!items || items.length === 0) return null;
  return (
    <section style={{ marginTop: '2rem', borderTop: '1px solid var(--sl-color-gray-5)', paddingTop: '1rem' }}>
      <h2>참고문헌</h2>
      <ol>
        {items.map((r, i) => {
          if (typeof r === 'string') {
            return (
              <li key={i}>
                <a href={r} target="_blank" rel="noopener noreferrer">
                  {r}
                </a>
              </li>
            );
          }
          return (
            <li key={i}>
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {r.title}
              </a>
              {r.accessed ? <span style={{ color: 'var(--sl-color-gray-3)' }}> (접속: {r.accessed})</span> : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
