// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

const GA_ID = 'G-S7W9XQSF8K';

export default defineConfig({
  site: 'https://9bow.github.io',
  base: '/learn-ontology',
  integrations: [
    starlight({
      title: 'learn-ontology',
      description: '온톨로지의 개념·표현 언어·산업 적용·LLM 결합까지 — 65챕터로 정리한 한국어 학습 사이트',
      defaultLocale: 'root',
      locales: { root: { label: '한국어', lang: 'ko' } },
      head: [
        { tag: 'script', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` } },
        {
          tag: 'script',
          content:
            "window.dataLayer = window.dataLayer || [];\n" +
            "function gtag(){dataLayer.push(arguments);}\n" +
            "gtag('js', new Date());\n" +
            `gtag('config', '${GA_ID}');`,
        },
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/9bow/learn-ontology' },
      ],
      sidebar: [
        { label: '01. 온톨로지란 무엇인가', items: [{ autogenerate: { directory: '01-intro' } }] },
        { label: '02. 구성요소와 추론', items: [{ autogenerate: { directory: '02-components' } }] },
        { label: '03. 표현 언어 (RDF~SHACL)', items: [{ autogenerate: { directory: '03-languages' } }] },
        { label: '04. SPARQL과 질의', items: [{ autogenerate: { directory: '04-sparql' } }] },
        { label: '05. 개발 방법론과 거버넌스', items: [{ autogenerate: { directory: '05-methodology' } }] },
        { label: '06. Palantir Foundry & AIP', items: [{ autogenerate: { directory: '06-palantir' } }] },
        { label: '07. 구현 기술 스택', items: [{ autogenerate: { directory: '07-techstack' } }] },
        { label: '08. LLM × Ontology × KG', items: [{ autogenerate: { directory: '08-llm-kg' } }] },
        { label: '09. 산업 심화 — 의료·생명과학', items: [{ autogenerate: { directory: '09-healthcare' } }] },
        { label: '10. 산업 심화 — 금융', items: [{ autogenerate: { directory: '10-finance' } }] },
        { label: '11. 산업 심화 — 제조·공급망·과학', items: [{ autogenerate: { directory: '11-manufacturing' } }] },
        { label: '12. 한국의 온톨로지/KG 사례', items: [{ autogenerate: { directory: '12-korea' } }] },
        { label: '13. 도입·운영 전략', items: [{ autogenerate: { directory: '13-strategy' } }] },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    react(),
  ],
});
