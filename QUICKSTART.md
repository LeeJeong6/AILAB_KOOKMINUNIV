# 🚀 Lab Seminar Archive - 빠른 시작 가이드

## ✅ 현재 상태

서버가 **정상적으로 실행 중**입니다!

```
✅ Server: http://localhost:3000
✅ Claude API: 연결됨
✅ Status: 정상 작동
```

---

## 🌐 웹 브라우저에서 접속하기

### 1️⃣ 브라우저 열기
- Chrome, Firefox, Edge 등 아무 브라우저나 사용 가능

### 2️⃣ 주소 입력
주소창에 다음 주소를 입력하세요:
```
http://localhost:3000/index.html
```

또는 파일 탐색기에서 직접 열기:
```
/raid/lab-seminar/index.html
```
파일을 더블클릭하면 됩니다!

---

## 🎯 기능 테스트하기

### ✨ 기능 1: 스터디 세션 녹음 & AI 요약

1. **메인 페이지**에서 녹색 버튼 찾기
   ```
   🎙️ Start Study Session
   ```

2. **버튼 클릭**

3. **마이크 권한** 허용 (브라우저가 물어볼 때)

4. **말하기 시작** - 예시:
   ```
   "안녕하세요, 오늘은 GroupViT 논문에 대해 논의하겠습니다.
   이 논문은 텍스트 감독만으로 semantic segmentation을 수행합니다."
   ```

5. **녹음 중지** - "Stop Recording" 버튼 클릭

6. **잠시 대기** (5-10초)

7. **결과 확인**
   - "Recording saved and summarized successfully!" 메시지 표시
   - 메인 페이지 아래 "Recent Uploads"에서 요약 확인

**예상 결과:**
```
Overall Summary:
The discussion focused on GroupViT paper, which performs
semantic segmentation using only text supervision...

Key Points:
- GroupViT uses text supervision
- Semantic segmentation approach
- Discussion about methodology
```

---

### 📄 기능 2: 파일 업로드 & AI 요약

1. **카테고리 선택** - 메인 페이지에서 카드 클릭
   - `Paper Seminar` (논문 발표)
   - `Vibe Coding` (코딩 실습)
   - `Math Study` (수학 스터디)

2. **업로드 폼 작성**
   ```
   Date: 2026-03-24 (오늘 날짜 선택)
   Presenter: 홍길동
   Title: GroupViT 논문 리뷰
   Description: CVPR 2022에 발표된 GroupViT 논문에 대한 발표 자료입니다.
   File: [PDF/PPT 파일 선택]
   ```

3. **업로드 버튼 클릭**
   ```
   Upload & Summarize with AI
   ```

4. **처리 대기** (5-10초)
   - "AI Processing..." 배지 표시

5. **결과 확인**
   - "Successfully uploaded and summarized!" 메시지
   - 자동 생성된 AI 요약이 Description에 추가됨

**AI 요약 예시:**
```
[원래 작성한 설명]

[AI Summary]
This presentation covers GroupViT, a hierarchical grouping
Vision Transformer for semantic segmentation...

Key Topics:
1. Text-supervised learning
2. Grouping mechanism
3. Zero-shot capabilities
```

---

### 📥 기능 3: 파일 관리

**파일 보기:**
- `Open File` 버튼 → 브라우저에서 바로 보기
- `Download` 버튼 → 파일 다운로드

**파일 삭제:**
- `Delete` 버튼 → 삭제 확인 → 완료

---

## 🧭 네비게이션

### 메인으로 돌아가기
- 상단의 **"Lab Seminar Archive"** 제목 클릭
- 또는 **"← Back to Home"** 링크 클릭

### 카테고리 이동
- 카테고리 카드 클릭
- 또는 "View More →" 링크 클릭

---

## 🐛 문제 해결

### 문제 1: "AI Processing failed" 에러

**원인:** 서버가 중지됨

**해결:**
```bash
cd /raid/lab-seminar
npm start
```

### 문제 2: 마이크 권한이 안 뜸

**해결:**
1. 브라우저 주소창 왼쪽의 🔒 아이콘 클릭
2. 마이크 권한 → "허용" 선택
3. 페이지 새로고침 (F5)

### 문제 3: 페이지가 안 열림

**확인 사항:**
```bash
# 서버 실행 확인
curl http://localhost:3000/api/health

# 정상 응답:
# {"status":"ok","claudeApiInitialized":true,...}
```

**해결:**
- 터미널에서 서버가 실행 중인지 확인
- 새 터미널을 열어서 `npm start` 실행

### 문제 4: 업로드한 파일이 사라짐

**원인:** 브라우저 캐시 삭제

**예방:**
- 중요한 파일은 "Download" 버튼으로 백업
- IndexedDB는 브라우저 저장소 사용

---

## 💡 팁

### 더 나은 AI 요약을 받으려면:

1. **Description을 상세하게 작성**
   ```
   ❌ 나쁜 예: "GroupViT 논문"
   ✅ 좋은 예: "CVPR 2022에 발표된 GroupViT 논문으로,
                텍스트 감독만으로 semantic segmentation을
                수행하는 방법을 제안합니다."
   ```

2. **제목에 핵심 키워드 포함**
   ```
   ❌ 나쁜 예: "논문 발표"
   ✅ 좋은 예: "GroupViT: Text-supervised Semantic Segmentation"
   ```

3. **녹음 시 명확하게 말하기**
   - 중요한 내용은 천천히
   - 발언자 바뀔 때 이름 말하기
   - 조용한 환경에서 녹음

---

## 📊 서버 상태 확인

### 방법 1: 터미널 확인
서버를 실행한 터미널 창에서 로그 확인:
```
Received audio transcription request
Sending transcription to Claude for summarization...
Analysis completed successfully
```

### 방법 2: API 직접 호출
```bash
# 터미널에서 실행
curl http://localhost:3000/api/health

# 정상 응답:
# {
#   "status": "ok",
#   "claudeApiInitialized": true,
#   "timestamp": "2026-03-24T..."
# }
```

---

## 🎯 다음 단계

1. ✅ **서버 실행 완료**
2. 🌐 **브라우저에서 http://localhost:3000/index.html 접속**
3. 🎙️ **스터디 세션 녹음 테스트**
4. 📄 **파일 업로드 테스트**
5. 📚 **자료 축적 및 관리**

---

## 📞 추가 도움말

더 자세한 정보는 다음 파일들을 참고하세요:

- `USAGE_KR.md` - 상세 사용 가이드 (한글)
- `README.md` - 전체 프로젝트 문서 (영문)
- `BACKEND_API_GUIDE.md` - API 개발자 문서

---

## 🎉 시작하세요!

서버가 실행 중이니 바로 사용 가능합니다!

**브라우저를 열고 시작하세요:**
```
http://localhost:3000/index.html
```

**또는 파일 탐색기에서:**
```
/raid/lab-seminar/index.html
```

**즐거운 세미나 되세요! 🚀**
