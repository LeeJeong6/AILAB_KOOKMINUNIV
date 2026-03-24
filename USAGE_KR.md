# Lab Seminar Archive 사용 가이드

## 🎉 시작하기

### 서버 실행

터미널에서 다음 명령어를 실행하세요:

```bash
cd /raid/lab-seminar
npm start
```

서버가 성공적으로 시작되면 다음 메시지가 표시됩니다:

```
╔════════════════════════════════════════╗
║   Lab Seminar Archive Server Started   ║
╠════════════════════════════════════════╣
║  Server: http://localhost:3000       ║
║  Status: http://localhost:3000/api/health
╚════════════════════════════════════════╝
```

### 웹 브라우저 열기

웹 브라우저에서 다음 주소로 접속하세요:

```
http://localhost:3000/index.html
```

---

## 📖 기능별 사용법

### 1. 스터디 세션 녹음 및 AI 요약

**목적:** 세미나 토론을 녹음하고 자동으로 내용을 정리합니다.

**단계:**

1. 메인 페이지에서 **"🎙️ Start Study Session"** 버튼 클릭
2. 브라우저가 마이크 권한을 요청하면 **"허용"** 클릭
3. 녹음이 시작되면 타이머가 표시됩니다
4. 토론이 끝나면 **"Stop Recording"** 버튼 클릭
5. 잠시 기다리면 Claude AI가 자동으로:
   - 대화 내용을 텍스트로 변환 (Transcription)
   - 핵심 내용을 요약 (Summary)
   - 주요 토픽과 발언 내용 정리
6. 완료되면 "Recording saved and summarized successfully!" 메시지 표시
7. 메인 페이지의 "Recent Uploads"에서 결과 확인

**결과 예시:**
```
Overall Summary:
The discussion focused on GroupViT paper...

Key Points:
- Zero-shot segmentation approach
- Text supervision methodology
- Performance metrics discussion

Speaker Contributions:
Speaker 1 explained the core concept...
Speaker 2 raised questions about...
```

---

### 2. 파일 업로드 및 AI 요약

**목적:** PDF, PPT 등의 자료를 업로드하고 AI가 내용을 요약합니다.

**단계:**

1. 메인 페이지에서 원하는 카테고리 선택
   - **Paper Seminar**: 논문 발표 자료
   - **Vibe Coding**: 코딩 실습 자료
   - **Math Study**: 수학 스터디 자료

2. 카테고리 페이지에서 업로드 폼 작성:
   - **Date**: 발표 날짜 선택
   - **Presenter**: 발표자 이름 입력
   - **Title**: 자료 제목 입력
   - **Description**: 간단한 설명 작성
   - **File**: PDF, PPT, PPTX 파일 선택

3. **"Upload & Summarize with AI"** 버튼 클릭

4. 처리 중 "AI Processing..." 배지 표시

5. 완료되면:
   - "Successfully uploaded and summarized!" 메시지 표시
   - 업로드한 자료가 목록에 추가됨
   - AI 요약이 Description에 자동 추가됨

**AI 요약 예시:**
```
[원래 작성한 설명]

[AI Summary]
This presentation covers GroupViT, a novel approach to
semantic segmentation using only text supervision...

Key Topics:
1. Vision-Language models
2. Grouping mechanism
3. Zero-shot capabilities

Potential Learning Outcomes:
- Understanding text-supervised segmentation
- Implementation strategies
- Practical applications
```

---

### 3. 업로드된 자료 관리

**파일 보기:**
- **"Open File"** 버튼: 브라우저에서 바로 열기
- **"Download"** 버튼: 파일을 컴퓨터에 저장

**파일 삭제:**
- **"Delete"** 버튼 클릭
- 확인 대화상자에서 "확인" 클릭

---

### 4. 네비게이션

**메인 페이지로 돌아가기:**
- 어느 페이지에서든 상단의 **"Lab Seminar Archive"** 제목 클릭
- 또는 "← Back to Home" 링크 클릭

**카테고리 페이지 이동:**
- 메인 페이지의 카테고리 카드 클릭
- 또는 "View More →" 링크 클릭

---

## 🔍 자주 묻는 질문 (FAQ)

### Q: AI 요약이 작동하지 않아요

**A:** 다음을 확인하세요:
1. 백엔드 서버가 실행 중인지 확인 (`npm start`)
2. 터미널에 에러 메시지가 없는지 확인
3. Claude API 키가 `claudeapi.txt` 파일에 올바르게 저장되어 있는지 확인

### Q: 마이크 권한이 안 나타나요

**A:**
1. 브라우저 설정에서 마이크 권한을 확인하세요
   - Chrome: `chrome://settings/content/microphone`
2. HTTPS 또는 localhost에서만 마이크 사용 가능
3. 다른 프로그램이 마이크를 사용 중인지 확인

### Q: 파일 업로드가 안 돼요

**A:**
1. 파일 크기가 50MB 이하인지 확인
2. 파일 형식이 PDF, PPT, PPTX 중 하나인지 확인
3. 브라우저 콘솔(F12)에서 에러 메시지 확인

### Q: 업로드한 파일이 사라졌어요

**A:**
- 데이터는 브라우저의 IndexedDB에 저장됩니다
- 브라우저 캐시를 지우면 데이터가 삭제될 수 있습니다
- 중요한 자료는 "Download" 버튼으로 백업하세요

---

## 💡 팁과 요령

### 스터디 세션 녹음 팁

1. **조용한 환경** 사용
2. **마이크를 가까이** 배치
3. **발언자 구분을 위해** 발언 전에 이름 말하기
4. **중요한 내용은 반복**해서 명확하게

### AI 요약 품질 향상

1. **Description 작성 시:**
   - 자료의 핵심 내용을 간단히 설명
   - 주요 키워드 포함
   - 학습 목표나 목적 언급

2. **제목 작성 시:**
   - 명확하고 구체적으로
   - 논문/기술 이름 포함

### 효율적인 자료 관리

1. **일관된 명명 규칙** 사용
   - 예: "CVPR2022_GroupViT_Summary"

2. **카테고리 올바르게 선택**
   - Paper: 논문 리뷰, 이론 발표
   - Vibe: 코딩 실습, 데모
   - Math: 수식 유도, 증명

3. **날짜 정확히 입력**
   - 자동으로 시간순 정렬됩니다

---

## 🚀 고급 기능

### 커스텀 카테고리 추가

`index.html`과 `category.html`의 `CATEGORY_META` 객체를 수정하여 새로운 카테고리 추가 가능

### API 직접 사용

서버 API를 직접 호출할 수 있습니다:

```bash
# 파일 요약
curl -X POST http://localhost:3000/api/summarize-file \
  -F "file=@presentation.pdf" \
  -F "title=My Presentation" \
  -F "description=About AI"

# 오디오 처리
curl -X POST http://localhost:3000/api/transcribe-audio \
  -F "audio=@recording.webm" \
  -F "sessionTitle=Study Session"
```

---

## 📞 문제 해결

### 서버 재시작

문제가 있을 때는 서버를 재시작하세요:

```bash
# 터미널에서 Ctrl+C로 서버 중지
# 다시 시작
npm start
```

### 로그 확인

서버 터미널에서 실시간 로그를 확인할 수 있습니다:
- API 요청 정보
- 에러 메시지
- 처리 상태

### 브라우저 캐시 삭제

문제가 계속되면 브라우저 캐시를 삭제하세요:
1. F12로 개발자 도구 열기
2. Application 탭 → Storage → Clear site data

---

## 🎓 학습 리소스

- [Claude API 문서](https://docs.anthropic.com)
- [IndexedDB 튜토리얼](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

**즐거운 세미나 되세요! 🎉**

문제가 있으면 README.md의 Troubleshooting 섹션을 참고하세요.
