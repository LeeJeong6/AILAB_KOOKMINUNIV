# GitHub Push 가이드

## 🚨 현재 상황

Git push가 인증 문제로 실패하고 있습니다. 아래 방법 중 하나를 선택하세요.

---

## ✅ 방법 1: GitHub Desktop 사용 (가장 쉬움)

### 단계:
1. **GitHub Desktop 설치**: https://desktop.github.com/
2. **File** → **Add Local Repository**
3. `/raid/lab-seminar` 선택
4. **Publish repository** 클릭
5. Repository name: `AILAB_KOOKMINUNIV` (기존 저장소 이름)
6. **Publish** 클릭

---

## ✅ 방법 2: Personal Access Token 사용

### 1단계: Token 생성
1. GitHub 로그인
2. 우측 상단 프로필 → **Settings**
3. 왼쪽 메뉴 맨 아래 → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**
6. Note: `lab-seminar-push`
7. Expiration: `90 days` (원하는 기간)
8. 권한 선택:
   - ✅ `repo` (전체 선택)
9. **Generate token** 클릭
10. **토큰 복사** (다시 볼 수 없으니 복사해두세요!)

### 2단계: Token으로 Push
터미널에서:
```bash
cd /raid/lab-seminar

# HTTPS URL로 변경
git remote set-url origin https://github.com/LeeJeong6/AILAB_KOOKMINUNIV.git

# Push (Username과 Password 입력 요구됨)
git push -u origin main

# Username: LeeJeong6
# Password: [복사한 Personal Access Token 붙여넣기]
```

---

## ✅ 방법 3: SSH 키 설정 (고급)

### 1단계: SSH 키 생성
```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your_email@example.com"

# Enter file: [그냥 Enter]
# Passphrase: [그냥 Enter 또는 비밀번호 입력]

# 공개키 복사
cat ~/.ssh/id_ed25519.pub
```

### 2단계: GitHub에 SSH 키 추가
1. GitHub → **Settings** → **SSH and GPG keys**
2. **New SSH key** 클릭
3. Title: `lab-server`
4. Key: 위에서 복사한 공개키 붙여넣기
5. **Add SSH key** 클릭

### 3단계: SSH로 Push
```bash
cd /raid/lab-seminar

# SSH URL 사용 (이미 설정됨)
git push -u origin main
```

---

## ✅ 방법 4: GitHub 웹에서 직접 업로드

### 단계:
1. GitHub 저장소 페이지: https://github.com/LeeJeong6/AILAB_KOOKMINUNIV
2. **Add file** → **Upload files** 클릭
3. 파일 선택 또는 드래그:
   ```
   - index.html
   - category.html
   - 2026-03-20-groupvit.html
   - config.js
   - vercel.json
   - api/ 폴더 전체
   - *.md 파일들
   ```
4. **claudeapi.txt는 절대 업로드 금지!**
5. Commit message: `Add Lab Seminar Archive files`
6. **Commit changes** 클릭

---

## 🎯 권장 방법

**초보자**: 방법 1 (GitHub Desktop) 또는 방법 4 (웹 업로드)
**일반**: 방법 2 (Personal Access Token)
**고급**: 방법 3 (SSH 키)

---

## 📝 업로드할 파일 목록

### ✅ 반드시 업로드:
```
index.html
category.html
2026-03-20-groupvit.html
config.js
vercel.json
package.json
api/transcribe-audio.js
api/summarize-file.js
api/health.js
.gitignore
README.md
DEPLOY_GUIDE.md
배포_요약.md
```

### ❌ 절대 업로드 금지:
```
claudeapi.txt    ← API 키!
.env
node_modules/
server.js
```

---

## 🔍 업로드 확인

업로드 후 GitHub 저장소에서 확인:
1. `claudeapi.txt`가 없는지 확인
2. `api/` 폴더에 3개 파일이 있는지 확인
3. `vercel.json`이 있는지 확인

---

## 다음 단계

파일 업로드가 완료되면:

### 1️⃣ Vercel 배포
1. https://vercel.com 접속
2. GitHub로 로그인
3. Import Project → `AILAB_KOOKMINUNIV` 선택
4. Environment Variable 추가:
   - `ANTHROPIC_API_KEY` = [claudeapi.txt 내용]
5. Deploy!

### 2️⃣ GitHub Pages 활성화
1. GitHub 저장소 → Settings → Pages
2. Source: main branch
3. Save

### 3️⃣ config.js 업데이트
Vercel URL을 받으면:
```javascript
API_BASE_URL: 'https://your-vercel-url.vercel.app/api'
```

---

**선택한 방법으로 진행하시면 됩니다!**
