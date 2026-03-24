// API Configuration
// Change this after deploying to Vercel
const API_CONFIG = {
  // For local development:
  // API_BASE_URL: 'http://localhost:3000/api'

  // For production (update after Vercel deployment):
  // API_BASE_URL: 'https://your-project-name.vercel.app/api'

  // Auto-detect:
  API_BASE_URL: window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://YOUR_VERCEL_PROJECT.vercel.app/api' // ← 배포 후 이 부분을 수정하세요!
};
