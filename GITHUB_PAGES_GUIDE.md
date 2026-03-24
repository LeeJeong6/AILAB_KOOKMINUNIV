# GitHub Pages 배포 가이드

## 📋 개요

GitHub Pages로 Lab Seminar Archive를 배포하는 방법입니다.

**중요:** GitHub Pages는 정적 사이트만 호스팅하므로, AI 기능(Claude API)을 사용하려면 백엔드를 별도로 배포해야 합니다.

---

## 🎯 배포 옵션

### 옵션 1: 정적 사이트만 (AI 기능 없이)
- ✅ 무료
- ✅ 설정 간단
- ❌ AI 요약 기능 없음
- ❌ 녹음 요약 기능 없음
- ✅ 파일 업로드/다운로드/삭제 가능 (브라우저 저장소 사용)

### 옵션 2: 정적 사이트 + 백엔드 서버 (AI 기능 포함)
- ✅ 모든 AI 기능 사용 가능
- ✅ 녹음 자동 요약
- ✅ 파일 자동 요약
- 💰 백엔드 호스팅 비용 발생 (Vercel/Railway/Render 등)
- 🔧 설정 복잡

---

## 🚀 옵션 1: 정적 사이트 배포 (권장 - 빠르고 간단)

### 1단계: GitHub 저장소 생성

1. GitHub에 로그인
2. 새 저장소 생성: `lab-seminar-archive`
3. Public으로 설정

### 2단계: 코드 정리 및 업로드

```bash
cd /raid/lab-seminar

# Git 초기화 (이미 되어있다면 생략)
git init

# .gitignore 파일 생성
cat > .gitignore << 'EOF'
# Node modules
node_modules/

# API Keys (절대 업로드 금지!)
claudeapi.txt

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
.env
EOF

# GitHub에 업로드할 파일들만 추가
git add index.html category.html 2026-03-20-groupvit.html
git add *.md

# 커밋
git commit -m "Initial commit: Lab Seminar Archive"

# GitHub 저장소 연결 (본인의 저장소 URL로 변경)
git remote add origin https://github.com/YOUR_USERNAME/lab-seminar-archive.git

# 푸시
git branch -M main
git push -u origin main
```

### 3단계: GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. Source: **Deploy from a branch** 선택
5. Branch: **main** 선택, 폴더: **/ (root)** 선택
6. **Save** 클릭

### 4단계: 접속

5분 정도 기다린 후:
```
https://YOUR_USERNAME.github.io/lab-seminar-archive/index.html
```

---

## ⚙️ 정적 버전 설정 (AI 기능 비활성화)

GitHub Pages에서는 백엔드가 없으므로, AI 기능을 비활성화해야 합니다.

### index.html 수정

```javascript
// 이 부분을 찾아서:
const API_BASE_URL = 'http://localhost:3000/api';

// 이렇게 변경:
const API_BASE_URL = ''; // 비활성화

// saveRecording 함수에서 try-catch의 catch 블록만 실행되도록
// 또는 "AI 기능은 백엔드 필요" 메시지 표시
```

### category.html 수정

```javascript
// summarizeWithAI 함수를 단순화:
async function summarizeWithAI(file, title, description, presenter, date) {
  // GitHub Pages에서는 AI 기능 없음
  return `User Description: ${description}\n\n[Note: AI summarization requires backend server]`;
}
```

이렇게 수정된 파일을 업로드하세요.

---

## 🌐 옵션 2: 풀스택 배포 (AI 기능 포함)

### A. 백엔드 배포 (여러 옵션)

#### 옵션 2-1: Vercel (권장 - 무료 티어)

1. **Vercel 계정 생성**: https://vercel.com

2. **프로젝트 구조 수정**:
```bash
cd /raid/lab-seminar

# api 폴더 생성
mkdir -p api

# server.js를 Vercel serverless 함수로 변경
```

3. **vercel.json 생성**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "ANTHROPIC_API_KEY": "@anthropic-api-key"
  }
}
```

4. **Vercel CLI로 배포**:
```bash
npm install -g vercel
vercel login
vercel --prod
```

5. **환경 변수 설정**:
```bash
vercel env add ANTHROPIC_API_KEY
# claudeapi.txt의 내용 입력
```

#### 옵션 2-2: Railway (간단함)

1. **Railway 계정**: https://railway.app
2. **GitHub 저장소 연결**
3. **환경 변수 설정**: `ANTHROPIC_API_KEY`
4. **자동 배포**

#### 옵션 2-3: Render (무료 티어)

1. **Render 계정**: https://render.com
2. **New Web Service** 선택
3. **GitHub 저장소 연결**
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **환경 변수**: `ANTHROPIC_API_KEY` 추가

### B. 프론트엔드 수정

백엔드 URL을 배포된 주소로 변경:

```javascript
// index.html, category.html에서:
const API_BASE_URL = 'https://your-backend.vercel.app/api';
// 또는
const API_BASE_URL = 'https://your-app.railway.app/api';
```

### C. GitHub Pages 배포

위의 "옵션 1" 단계 그대로 진행

---

## 📝 완성된 구조

### 정적 버전 (AI 없음)
```
GitHub Pages
  ↓
https://username.github.io/lab-seminar-archive/
  ↓
- index.html (메인 페이지)
- category.html (카테고리)
- IndexedDB (브라우저 저장소)
```

### 풀스택 버전 (AI 포함)
```
GitHub Pages (프론트엔드)
  ↓
https://username.github.io/lab-seminar-archive/
  ↓
[API 요청]
  ↓
Vercel/Railway (백엔드)
  ↓
https://your-backend.vercel.app
  ↓
Claude API
```

---

## 🔒 보안 주의사항

### ❌ 절대 GitHub에 올리면 안 되는 것:

1. **claudeapi.txt** - API 키 파일
2. **node_modules/** - 의존성 패키지
3. **.env** - 환경 변수 파일

### ✅ .gitignore 필수 설정:

```gitignore
node_modules/
claudeapi.txt
.env
*.log
.DS_Store
```

### 🔐 API 키 보호:

- 백엔드 서버의 환경 변수로만 설정
- 프론트엔드 코드에 절대 하드코딩 금지
- GitHub Secrets 또는 Vercel Environment Variables 사용

---

## 🎯 권장 방법 (단계별)

### 단계 1: 일단 GitHub Pages로 정적 배포 (5분)
```bash
cd /raid/lab-seminar
git init
echo "node_modules/
claudeapi.txt
.env" > .gitignore
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/lab-seminar-archive.git
git push -u origin main
```

GitHub Settings → Pages → Branch: main 선택

### 단계 2: 나중에 백엔드 추가 (필요시)
- Vercel 또는 Railway에 백엔드 배포
- API_BASE_URL 수정
- 다시 커밋 & 푸시

---

## 🆘 문제 해결

### localhost 연결 거부 문제

**원인:**
- 방화벽 차단
- 네트워크 설정
- 서버가 외부 접속을 허용하지 않음

**해결:**
1. 파일을 직접 열기:
   ```
   file:///raid/lab-seminar/index.html
   ```
   브라우저에서 Ctrl+O → 파일 선택

2. 또는 Python 간단 서버:
   ```bash
   cd /raid/lab-seminar
   python3 -m http.server 8000
   ```
   그 다음 `http://localhost:8000/index.html` 접속

### GitHub Pages가 안 보임

- 5-10분 대기
- Settings → Pages에서 빌드 상태 확인
- 저장소가 Public인지 확인

---

## 📊 비교표

| 기능 | 로컬 | GitHub Pages (정적) | GitHub Pages + 백엔드 |
|------|------|---------------------|----------------------|
| 파일 업로드 | ✅ | ✅ | ✅ |
| 파일 다운로드 | ✅ | ✅ | ✅ |
| AI 요약 | ✅ | ❌ | ✅ |
| 녹음 기능 | ✅ | ✅ | ✅ |
| 녹음 AI 요약 | ✅ | ❌ | ✅ |
| 비용 | 무료 | 무료 | 무료~유료 |
| 설정 난이도 | 쉬움 | 쉬움 | 보통 |

---

## 💡 추천

**지금 당장:** GitHub Pages 정적 배포 (AI 없이)
- 빠르고 무료
- 파일 관리 기능은 모두 작동
- 나중에 필요하면 백엔드 추가

**나중에:** Vercel로 백엔드 추가
- 무료 티어로 충분
- 설정 간단
- AI 기능 활성화

---

## 🚀 지금 바로 시작

```bash
# 1. 현재 디렉토리로 이동
cd /raid/lab-seminar

# 2. Git 초기화
git init

# 3. .gitignore 생성
echo "node_modules/
claudeapi.txt
.env
server.js
package.json
package-lock.json" > .gitignore

# 4. HTML 파일들만 추가
git add index.html category.html 2026-03-20-groupvit.html *.md

# 5. 커밋
git commit -m "Deploy to GitHub Pages"

# 6. GitHub에 푸시
git remote add origin https://github.com/YOUR_USERNAME/lab-seminar-archive.git
git branch -M main
git push -u origin main
```

GitHub Settings → Pages에서 활성화!

---

**5분 후면 전 세계 어디서나 접속 가능합니다!** 🌍
