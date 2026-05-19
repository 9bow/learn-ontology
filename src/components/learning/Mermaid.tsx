import { useEffect, useRef, useState } from 'react';

interface Props {
  chart: string;
}

export default function Mermaid({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [id] = useState(() => `mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: { fontFamily: 'inherit' },
        securityLevel: 'loose',
      });
      try {
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = `<pre>Mermaid render error: ${(e as Error).message}</pre>`;
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={ref} className="mermaid-diagram" style={{ margin: '1rem 0' }} />;
}
