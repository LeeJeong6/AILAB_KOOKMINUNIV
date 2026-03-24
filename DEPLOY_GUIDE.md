# 🚀 GitHub Pages + Vercel 배포 가이드 (AI 기능 포함)

## 📋 배포 구조

```
사용자 브라우저
    ↓
GitHub Pages (프론트엔드)
https://username.github.io/lab-seminar-archive
    ↓
Vercel (백엔드 API)
https://your-project.vercel.app/api
    ↓
Claude AI API
```

---

## 🎯 1단계: Vercel에 백엔드 배포

### 1-1. Vercel 계정 생성

1. https://vercel.com 접속
2. **Sign Up** 클릭
3. **Continue with GitHub** 선택 (권장)
4. GitHub 계정으로 로그인

### 1-2. GitHub 저장소 생성

```bash
cd /raid/lab-seminar

# Git 초기화
git init

# .gitignore 생성
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# API Keys - 절대 업로드 금지!
claudeapi.txt
.env

# Server (Vercel이 사용하지 않음)
server.js

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db
EOF

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Lab Seminar Archive with AI"

# GitHub 저장소 생성 후 연결 (저장소 URL 변경 필요!)
git remote add origin https://github.com/YOUR_USERNAME/lab-seminar-archive.git
git branch -M main
git push -u origin main
```

### 1-3. Vercel에 프로젝트 배포

#### 방법 A: Vercel 웹사이트에서 배포 (권장 - 간단함)

1. https://vercel.com/dashboard 접속
2. **Add New...** → **Project** 클릭
3. **Import Git Repository** → GitHub 저장소 선택
4. **Import** 클릭
5. **Configure Project**:
   - Project Name: `lab-seminar-archive` (원하는 이름)
   - Framework Preset: **Other** 선택
   - Root Directory: `./` (기본값)
6. **Environment Variables** 섹션에서:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `claudeapi.txt` 파일의 내용 복사해서 붙여넣기
   - **Add** 클릭
7. **Deploy** 클릭!

#### 방법 B: Vercel CLI로 배포 (고급 사용자)

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
cd /raid/lab-seminar
vercel

# 환경 변수 추가
vercel env add ANTHROPIC_API_KEY
# claudeapi.txt의 내용을 붙여넣기

# Production 배포
vercel --prod
```

### 1-4. Vercel 배포 URL 확인

배포가 완료되면 URL이 표시됩니다:
```
✅ https://lab-seminar-archive-xxx.vercel.app
```

이 URL을 복사해두세요!

### 1-5. config.js 업데이트

```bash
cd /raid/lab-seminar
nano config.js
```

다음 부분을 수정:
```javascript
// 이 부분을 찾아서:
API_BASE_URL: 'https://YOUR_VERCEL_PROJECT.vercel.app/api'

// Vercel에서 받은 URL로 변경:
API_BASE_URL: 'https://lab-seminar-archive-xxx.vercel.app/api'
```

저장 후:
```bash
git add config.js
git commit -m "Update API URL for production"
git push
```

---

## 🌐 2단계: GitHub Pages에 프론트엔드 배포

### 2-1. GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source**: **Deploy from a branch** 선택
5. **Branch**: **main** 선택
6. 폴더: **/ (root)** 선택
7. **Save** 클릭

### 2-2. 배포 완료 대기

- 5-10분 정도 소요
- 상단에 배포 URL 표시:
  ```
  ✅ Your site is live at https://YOUR_USERNAME.github.io/lab-seminar-archive/
  ```

---

## ✅ 3단계: 테스트

### 3-1. Vercel API 테스트

브라우저나 터미널에서:
```bash
# Health check
curl https://lab-seminar-archive-xxx.vercel.app/api/health

# 예상 응답:
# {"status":"ok","claudeApiInitialized":true,"timestamp":"..."}
```

### 3-2. GitHub Pages 접속

브라우저에서:
```
https://YOUR_USERNAME.github.io/lab-seminar-archive/index.html
```

### 3-3. AI 기능 테스트

1. **녹음 테스트**:
   - "🎙️ Start Study Session" 버튼 클릭
   - 마이크 권한 허용
   - 몇 초 말하기
   - "Stop Recording" 클릭
   - AI 요약 확인!

2. **파일 업로드 테스트**:
   - 카테고리 선택
   - 파일 업로드
   - AI 요약 자동 생성 확인!

---

## 🔧 4단계: 업데이트 방법

### 코드 수정 후 배포

```bash
cd /raid/lab-seminar

# 파일 수정...

# Git 커밋
git add .
git commit -m "Update: 수정 내용"
git push

# GitHub Pages는 자동 재배포
# Vercel도 자동 재배포 (GitHub 연동 시)
```

### 환경 변수 변경 (API 키 등)

1. Vercel Dashboard 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables**
4. 변수 수정
5. **Redeploy** 필요 (Deployments 탭에서 재배포)

---

## 📊 완료 체크리스트

- [ ] Vercel 계정 생성
- [ ] GitHub 저장소 생성 및 푸시
- [ ] Vercel에 프로젝트 배포
- [ ] `ANTHROPIC_API_KEY` 환경 변수 설정
- [ ] Vercel 배포 URL 확인
- [ ] `config.js`에 Vercel URL 업데이트
- [ ] GitHub에 config.js 푸시
- [ ] GitHub Pages 활성화
- [ ] Vercel API health check 테스트
- [ ] GitHub Pages 접속 테스트
- [ ] 녹음 기능 테스트
- [ ] 파일 업로드 & AI 요약 테스트

---

## 🎯 최종 결과

배포가 완료되면:

1. **프론트엔드**: `https://YOUR_USERNAME.github.io/lab-seminar-archive/`
2. **백엔드 API**: `https://your-project.vercel.app/api`
3. **AI 기능**: 완전 작동! ✨

전 세계 어디서나 접속 가능하고, AI 요약 기능이 포함된 Lab Seminar Archive를 사용할 수 있습니다!

---

## 💡 비용

- **GitHub Pages**: 무료 (Public 저장소)
- **Vercel**:
  - 무료 티어: 월 100GB bandwidth, 100시간 실행 시간
  - 개인 프로젝트로는 충분함
  - 초과 시 유료 플랜 필요

---

## 🐛 문제 해결

### "API 요청 실패" 에러

**확인:**
```bash
# Vercel API 상태 확인
curl https://your-project.vercel.app/api/health
```

**해결:**
- Vercel Dashboard에서 환경 변수 확인
- Deployment Logs 확인
- `config.js`의 URL이 올바른지 확인

### "CORS 에러"

**해결:**
- `vercel.json`에 CORS 헤더가 있는지 확인
- 브라우저 콘솔에서 정확한 에러 메시지 확인

### GitHub Pages가 안 보임

**해결:**
- Settings → Pages에서 빌드 상태 확인
- 5-10분 대기
- Actions 탭에서 배포 진행 상황 확인

---

## 🔐 보안 주의사항

### ✅ 해야 할 것:
- `.gitignore`에 `claudeapi.txt` 포함
- Vercel 환경 변수로만 API 키 설정
- 정기적으로 API 키 로테이션

### ❌ 하지 말아야 할 것:
- API 키를 코드에 하드코딩
- `claudeapi.txt`를 GitHub에 커밋
- 환경 변수를 public으로 설정

---

## 📞 도움말

문제가 있으면:

1. **Vercel Logs 확인**: Dashboard → Deployments → 최신 배포 → Logs
2. **GitHub Actions 확인**: 저장소 → Actions 탭
3. **브라우저 콘솔 확인**: F12 → Console 탭

---

**축하합니다! 🎉**

이제 AI 기능이 포함된 Lab Seminar Archive가 전 세계에 배포되었습니다!
