# Lab Seminar Archive

논문 세미나 · 바이브코딩 세미나 · 수학스터디 기록 아카이브

## 📁 폴더 구조

```
lab-seminar/
├── index.html              ← 메인 목록 페이지
├── sessions/
│   ├── YYYY-MM-DD-title.html   ← 각 세션 페이지
│   └── ...
├── assets/
│   ├── pdfs/               ← 슬라이드 PDF 업로드 위치
│   └── (이미지 등)
└── README.md
```

## 🚀 GitHub Pages 배포 방법

1. 이 레포를 GitHub에 push
2. Settings → Pages → Source: `main` branch, `/ (root)` 선택
3. Save → 1~2분 후 `https://[username].github.io/[repo-name]/` 접속

## ➕ 새 세션 추가하는 법

1. `sessions/` 폴더에 `YYYY-MM-DD-제목.html` 파일 추가 (기존 파일 복사 후 수정)
2. `index.html`의 session-grid에 카드 항목 한 줄 추가
3. PDF는 `assets/pdfs/`에 업로드 후 세션 HTML에서 경로 연결

## 🏷️ 카테고리 색상

| 카테고리 | data-cat 값 | 색상 |
|---|---|---|
| 논문 세미나 | `paper` | 번트 시에나 |
| 바이브코딩 | `vibe` | 딥 틸 |
| 수학스터디 | `math` | 포레스트 그린 |
