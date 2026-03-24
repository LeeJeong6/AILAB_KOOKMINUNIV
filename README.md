# Lab Seminar Archive

A comprehensive web application for managing and archiving lab seminar materials with AI-powered summarization using Claude API.

## Features

✨ **File Upload & Management**
- Upload PDF, PPT, PPTX files
- Download and view uploaded materials
- Delete uploaded files

🤖 **AI-Powered Summarization**
- Automatic content summarization using Claude API
- Smart extraction of key points and topics

🎙️ **Study Session Recording**
- Record audio during study sessions
- Automatic transcription and summarization
- Speaker identification support

🎨 **Modern UI**
- Clean, professional design matching KMU AI Lab theme
- Responsive layout for all devices
- Smooth animations and transitions

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Claude API key (stored in `claudeapi.txt`)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Ensure API key is set**
   Your Claude API key should already be in `claudeapi.txt`. The server will read it automatically.

3. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`

4. **Open the application**
   - Open your browser
   - Navigate to `http://localhost:3000/index.html`

## Usage Guide

### 1. Main Page (index.html)

**Start Study Session**
- Click the "🎙️ Start Study Session" button
- Grant microphone permissions
- Recording starts automatically with timer
- Click "Stop Recording" when done
- Audio is automatically transcribed and summarized using Claude AI
- Results are saved to the archive

**Browse Categories**
- Click on any category card (Paper Seminar, Vibe Coding, Math Study)
- View materials for that category

**Navigation**
- Click "Lab Seminar Archive" title to return to main page from anywhere

### 2. Category Pages (category.html)

**Upload Materials**
1. Select date, presenter name
2. Enter title and description
3. Choose file (PDF, PPT, or PPTX)
4. Click "Upload & Summarize with AI"
5. Wait for AI processing (takes 5-10 seconds)
6. File is saved with AI-generated summary

**View Materials**
- All uploaded materials appear in chronological order
- Click "Open File" to view in browser
- Click "Download" to save locally
- Click "Delete" to remove from archive

### 3. Individual Session Pages

- View detailed information about specific seminars
- See presenter, date, venue, authors
- Read abstract, key points, and discussion notes

## API Endpoints

The backend server provides these endpoints:

### POST /api/transcribe-audio
Transcribes and summarizes audio recordings.

**Request:**
- `audio`: Audio file (WebM format)
- `sessionTitle`: Title of the session
- `speakerCount`: Number of speakers

**Response:**
```json
{
  "success": true,
  "transcription": "Full transcription...",
  "summary": "AI-generated summary...",
  "timestamp": "2026-03-23T..."
}
```

### POST /api/summarize-file
Summarizes uploaded documents.

**Request:**
- `file`: Document file (PDF, PPT, PPTX)
- `title`: Document title
- `description`: User-provided description
- `category`: Category (paper/vibe/math)
- `presenter`: Presenter name
- `date`: Presentation date

**Response:**
```json
{
  "success": true,
  "summary": "AI-generated summary...",
  "timestamp": "2026-03-23T..."
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "claudeApiInitialized": true,
  "timestamp": "2026-03-23T..."
}
```

## Project Structure

```
/raid/lab-seminar/
├── index.html              # Main page
├── category.html           # Category listing page
├── 2026-03-20-groupvit.html # Example seminar session page
├── server.js               # Backend API server
├── package.json            # Node.js dependencies
├── claudeapi.txt          # Claude API key (keep secure!)
├── README.md              # This file
└── BACKEND_API_GUIDE.md   # Detailed API documentation
```

## Data Storage

The application uses **IndexedDB** for client-side storage:
- Database: `lab-seminar-archive-db`
- Object Store: `uploads`
- Stores uploaded files as Blobs with metadata
- Persists across browser sessions
- No server-side database required

## Security Notes

⚠️ **Important:**
- Keep `claudeapi.txt` secure and never commit to public repositories
- The backend server reads the API key from this file
- Consider adding authentication for production use
- Implement rate limiting to prevent API abuse

## Development

**Run in development mode with auto-reload:**
```bash
npm run dev
```

**Project uses:**
- Express.js for backend server
- Anthropic SDK for Claude API integration
- Multer for file upload handling
- CORS enabled for development

## Troubleshooting

**"Failed to process audio" error:**
- Check that the backend server is running (`npm start`)
- Verify Claude API key in `claudeapi.txt`
- Check browser console for detailed errors

**"AI Processing failed" message:**
- Ensure backend server is accessible at `http://localhost:3000`
- Check server logs for API errors
- Verify API key is valid

**Microphone not working:**
- Grant microphone permissions when prompted
- Check browser settings (chrome://settings/content/microphone)
- Ensure no other application is using the microphone

**Files not uploading:**
- Check file size (max 50MB)
- Verify file type (PDF, PPT, PPTX only)
- Check browser console for errors

## Future Enhancements

Potential improvements:
- [ ] Real speech-to-text integration (AssemblyAI, Deepgram)
- [ ] Multi-speaker diarization
- [ ] PDF text extraction for better summarization
- [ ] User authentication and permissions
- [ ] Cloud storage integration
- [ ] Search and filtering capabilities
- [ ] Export to PDF/Markdown

## License

MIT License - KMU AI Lab 2026

## Support

For issues or questions:
1. Check console logs (F12 in browser)
2. Verify server is running
3. Check API key validity
4. Review `BACKEND_API_GUIDE.md` for API details

---

**Developed for KMU AI Lab**
Powered by Claude AI
