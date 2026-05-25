# [포트폴리오 기험 및 지원서] 조세훈 | 프론트엔드 엔지니어 (6년 차)

> **"무거운 성능 병목을 해결하고 사용자 경험을 가볍게 띄웁니다."**
> [cite_start]제품과 비즈니스의 무게를 가중시키는 대용량 데이터 처리 문제와 프론트엔드 병목을 구조적으로 해결해 온 6년 차 엔지니어 조세훈입니다. [cite: 3, 119, 217, 219]

---

## 📌 CONTACT & LINKS

- [cite_start]**Email:** tpgnsjth@gmail.com [cite: 2, 111, 218]
- [cite_start]**Phone:** +82 10-8968-9274 [cite: 2, 110, 218]
- [cite_start]**GitHub:** [github.com/951jth/pandytalk](https://github.com/951jth/pandytalk) [cite: 112, 218]
- [cite_start]**Notion Portfolio:** [상세 프로젝트 아키텍처 및 엔지니어링 로그](https://admitted-flamingo-2a3.notion.site/Engineering-Log-30159549cbc0800286f9faf3a378fda2) [cite: 103]

---

## 🚀 핵심 역량 (Core Competencies)

- [cite_start]**대용량 데이터 UI 렌더링 최적화:** Chrome Performance API 기반 병목 분석 및 Virtualization 구조 설계 역량 [cite: 8, 123, 234]
- [cite_start]**브라우저 연산 분산 처리:** Web Worker, SheetJS 기반 대용량 클라이언트 사이드 데이터 청킹 및 압축 구조 구현 [cite: 9, 152, 161]
- [cite_start]**비즈니스 인터페이스 단순화:** 복잡한 입력 플로우의 선언적 폼(JSON 기반) 구조 전환 및 UI 단절 없는 검증 흐름 설계 [cite: 44, 186, 256]
- [cite_start]**크로스 플랫폼 및 인프라 연동:** React Native 앱 단독 빌드·배포 및 Offline-First 동기화 파이프라인 구축 [cite: 5, 10, 236]

---

## 🛠 기술 스택 (Technical Stacks)

- [cite_start]**Frontend:** TypeScript, JavaScript, React, Next.js (App/Pages Router), React Native (CLI) [cite: 12, 125, 227, 228]
- [cite_start]**State & Data:** Zustand, React Query, Redux, MobX, SQLite, Firebase (Firestore) [cite: 13, 14, 124, 229]
- [cite_start]**Performance & UI:** React Virtuoso, Chrome Performance, Web Worker, Tailwind CSS, MUI, Ant Design [cite: 15, 34, 126, 221]

---

## 💼 주요 경력 (Professional Experience)

### (주)델피콤 (Delphicom)

- [cite_start]**직급/직무:** 프론트엔드 엔지니어 대리 (정규직) [cite: 18, 114, 238]
- [cite_start]**재직 기간:** 2021.05 ~ 현재 [cite: 18, 115, 239]
- [cite_start]**주요 업무:** B2B 050 가상번호 통신 플랫폼(BizCall) 관리자 웹, 결제 솔루션, 운영 시스템 개발 및 유지보수 [cite: 3, 116, 117]

---

## 📂 프로젝트 상세 (Project Description)

### [cite_start]1. Mozzle - 대용량 회원명부 관리 시스템 리팩토링 (2026.01 ~ 2026.02) [cite: 19, 20, 129]

- [cite_start]**개요:** 대량 회원 데이터를 동시 편집할 때 발생하는 렌더링 지연과 대형 컴포넌트 구조를 개선한 리팩토링 프로젝트 [cite: 21, 130, 136]
- **주요 기여 및 해결 전략:**
  - [cite_start]Chrome Performance 프로파일링을 통해 메인 스레드를 점유하는 Long Task 및 전체 리스트 Re-render 병목 진단 [cite: 26, 133, 134]
  - [cite_start]`react-virtuoso` 기반 가상화 테이블(Virtualization) 구조를 공통 컴포넌트화하여 화면 영역 내 Row만 렌더링하도록 격리 [cite: 22, 27, 139]
  - [cite_start]복잡한 편집 로직을 커스텀 훅으로 분리하여 단일 페이지 코드 구조 경량화 [cite: 140]
- **정량적 성과:**
  - [cite_start]**텍스트 입력 UI 반영 지연 개선:** `1860ms` ➡️ `28ms` (즉시 반영 수준) [cite: 31, 145]
  - [cite_start]**초기 렌더링 속도 향상:** `2.8s` ➡️ `0.3s` (약 90% 개선) [cite: 32, 144]
  - [cite_start]**자원 절감:** Total DOM Node 수 약 97% 감소 (`168,483개` ➡️ `3,706개`) 및 Long Task 대폭 감소 (`46건` ➡️ `1건`) [cite: 29, 30, 142, 143]
  - [cite_start]**유지보수성 확보:** 메인 페이지 코드량 88% 감소 (`1,200줄` ➡️ `140줄`) [cite: 33, 140]
- [cite_start]**기술 스택:** React, CRA(Webpack), React Virtuoso, Chrome Performance [cite: 34]

### [cite_start]2. 050 BizCall 관리자 웹 - 대용량 엑셀 다운로드 구조 개선 (2023.05 ~ 2023.06) [cite: 148, 149]

- [cite_start]**개요:** 30만 건 이상의 방대한 통화 내역(Call Log) 다운로드 시 발생하는 서버 메모리 부족 및 응답 지연 문제를 해결하기 위한 아키텍처 재설계 [cite: 55, 150, 155]
- **주요 기여 및 해결 전략:**
  - [cite_start]엑셀 파일 생성 책임을 서버에서 클라이언트로 분산하는 하이브리드 스트리밍 구조 제안 [cite: 56, 158]
  - [cite_start]서버 데이터를 페이징 단위(5,000건씩)로 연속 수신하여 브라우저의 대기 오버헤드 방지 [cite: 60, 159]
  - [cite_start]메인 스레드 블로킹을 막기 위해 `Web Worker` 기반 백그라운드 스레드에서 `SheetJS`를 활용해 10만 건 단위 분할 워크북 생성 및 최종 `ZIP` 압축 다운로드 파이프라인 구축 [cite: 57, 61, 62, 161]
- **성과:**
  - [cite_start]인프라 비용(서버 증설) 없이 최대 60만 건 규모의 대용량 통화 로그 다운로드 완벽 안정화 [cite: 66, 167]
  - [cite_start]다운로드 실패율 제로화 및 실시간 진행률(Progress UI) 제공을 통해 사용자 UX 전면 개선 [cite: 64, 68, 69]
- [cite_start]**기술 스택:** React, SheetJS, Web Worker, ZIP [cite: 70]

### [cite_start]3. Payking - PG 기반 결제 링크 서비스 및 통합 관리자 시스템 (2025.06 ~ 2025.11) [cite: 35, 36, 169]

- [cite_start]**개요:** 소상공인을 위한 비대면 SMS/URL 결제 링크 서비스 및 백오피스 시스템 프론트엔드 아키텍처 구축 [cite: 38, 170]
- **주요 기여 및 해결 전략:**
  - [cite_start]Next.js 기반 결제 화면 단독 구현 및 외부 PG 리다이렉트 결과 검증을 위한 BFF 연동 흐름 설계 [cite: 39, 41, 42, 175]
  - [cite_start]기존의 복잡했던 3단계 입력 폼 구조를 2단계(수정 ➡️ 저장)로 단순화할 것을 기획·PM 조직에 역제안하여 상태 관리 복잡도 완화 [cite: 43, 176, 179, 184]
  - [cite_start]반복적인 JSX 레이아웃 파편화를 방지하기 위해 JSON 설정 기반의 선언적 폼 구조 도입 및 CSS Grid 기반 반응형 수용력 확보 [cite: 44, 45, 181, 186, 187]
- **성과:**
  - [cite_start]입력 단계 축소 및 JSON 설정화로 인해 폼 관련 페이지 코드량(LOC) 평균 약 23% 감소 [cite: 48, 188, 189]
  - [cite_start]프로젝트 도중 디자이너 교체로 시안이 전면 수정되었으나, 소스코드 변경 없이 JSON 설정값 수정만으로 UI 대응 성공 [cite: 190]
- [cite_start]**기술 스택:** React, Next.js (SSR), React Native, Tailwind CSS [cite: 172]

### [cite_start]4. PandyTalk - 오프라인 퍼스트 기반 AI 비서 채팅 앱 (개인 프로젝트, 2025.06 ~ 운영 중) [cite: 5, 200]

- [cite_start]**개요:** 네트워크 단절 상황에서도 연속성을 유지하는 Offline-First 구조의 1인 개발 모바일 애플리케이션 [cite: 5, 200, 201]
- **주요 기여 및 해결 전략:**
  - [cite_start]장기간 미접속 사용자의 대량 데이터 동기화 비용을 줄이기 위해 메시지 순번(SEQ) 기반 '데이터 간극 탐지(Data Gap Detection)' 로직 설계 및 20건 단위 페이징 최적화 [cite: 203, 208, 209]
  - [cite_start]HTTP 기반 SSE(Server-Sent Events) 엔드포인트를 구축하여 실시간 AI 답변 스트리밍 구현 (완료 시점에만 원격 DB 저장 구조로 Read/Write 비용 절감) [cite: 5, 210, 211]
  - [cite_start]`SQLite`를 단일 진실 공급원(Source of Truth)으로 삼아 Service ➡️ Data 레이어로 이어지는 레이어드 아키텍처 강제 및 데이터 흐름 가시성 확보 [cite: 212, 213]
- [cite_start]**기술 스택:** React Native (CLI), TypeScript, SQLite, Firebase (Firestore, FCM), OpenAI [cite: 266]

---

## 🎓 학력 및 자격 사항 (Education & Certifications)

- [cite_start]**순천대학교:** 식품공학과 학사 졸업 (2013.03 - 2019.08) [cite: 88, 89, 272, 274]
- [cite_start]**자격증:** 정보처리기사 (2025.06) [cite: 99, 100, 277, 278] [cite_start]/ 컴퓨터활용능력 1급 (2018.12) [cite: 279, 280]
- [cite_start]**병역:** 군필 (사회복무요원 소집해제, 2014.06 - 2016.06) [cite: 278]
