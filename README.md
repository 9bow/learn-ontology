# learn-ontology

온톨로지(Ontology)의 개념·표현 언어·산업 적용·LLM 결합까지, 65챕터로 정리한 한국어 학습 사이트입니다. Palantir Foundry/AIP, GraphRAG, FIBO·SNOMED CT 같은 실제 적용 사례와 RDF/OWL/SHACL/SPARQL 같은 핵심 기술을 한 호흡으로 다룹니다.

배포 URL: <https://9bow.github.io/learn-ontology>

## 대상

- 지식그래프·시맨틱 데이터 인프라를 설계하는 데이터/AI 엔지니어
- Palantir Foundry·AIP 또는 유사 플랫폼 도입을 검토하는 솔루션 아키텍트
- LLM의 환각·다중 홉 추론 문제를 KG로 보강하려는 AI 엔지니어
- 도메인 온톨로지(의료·금융·제조)를 다루는 도메인 전문가와 PM

## 구성

- 13개 섹션 / 65개 MDX 챕터 / 13개 섹션별 퀴즈 (총 ~150 문항)
- Astro 6 + Starlight + React 19 기반, 한국어 단일 로캘
- Mermaid 다이어그램, 인터랙티브 퀴즈, 펼침 개념 카드 지원
- Google Analytics 4 통합

## 커리큘럼

1. **온톨로지란 무엇인가** — 철학에서 정보과학까지, Gruber의 정의, KG와의 차이
2. **구성요소와 추론** — Class·Property·Axiom·Reasoning·OWA/CWA
3. **표현 언어** — RDF / RDFS / OWL 2 / SHACL / SKOS / RDF-star
4. **SPARQL과 질의** — SELECT~Federated Query, GQL 표준 비교
5. **개발 방법론과 거버넌스** — METHONTOLOGY·NeOn·Ontology 101·FAIR
6. **Palantir Foundry & AIP의 Ontology** — Objects·Links·Actions와 도입 사례
7. **구현 기술 스택** — Protégé·GraphDB·Neptune·Ontop·HermiT·Cloud 비교
8. **LLM × Ontology × Knowledge Graph** — GraphRAG·Text-to-SPARQL·Neuro-symbolic
9. **산업 심화: 의료·생명과학** — SNOMED CT·FHIR·GO·NHS Federated Data Platform
10. **산업 심화: 금융** — FIBO·Bloomberg KG·AML·ESG 통합
11. **산업 심화: 제조·공급망·과학** — Siemens·Digital Twin·Open Research KG
12. **한국의 온톨로지/KG 사례** — ETRI·네이버·카카오·공공데이터·한국어 특수성
13. **도입·운영 전략** — ROI·거버넌스·실패 패턴·2025~2027 로드맵

## 로컬 개발

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build
pnpm preview
```

## 주요 경로

- 문서 본문: `src/content/docs/<section>/`
- 퀴즈 데이터: `public/data/quiz/<section>.json`
- 인터랙티브 컴포넌트: `src/components/learning/`
- 사이트 설정: `astro.config.mjs`
- 배포 워크플로: `.github/workflows/deploy.yml`

## 기여

오탈자·사실 오류·예시 보강은 PR 환영합니다. 참고문헌은 가능한 한 stable primary source(arXiv, W3C, Wikipedia oldid, 공식 블로그)를 사용합니다.

## 라이선스

학습 콘텐츠는 CC BY-SA 4.0, 소스 코드는 MIT를 따릅니다.
