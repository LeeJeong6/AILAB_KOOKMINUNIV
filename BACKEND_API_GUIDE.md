# Backend API Integration Guide

This document explains how to implement the backend server to support Claude AI integration for the Lab Seminar Archive system.

## Overview

The Lab Seminar Archive system requires a backend server to:
1. **Extract text from uploaded files** (PDF, PPT, PPTX)
2. **Summarize content using Claude API**
3. **Transcribe and summarize audio recordings** from study sessions

## Architecture

```
Frontend (Browser)
    ↓
Backend Server (Node.js/Python/etc)
    ↓
Claude API (Anthropic)
```

## Required Endpoints

### 1. File Summarization API

**Endpoint:** `POST /api/summarize-file`

**Request:**
```javascript
// Form data with file upload
FormData {
  file: File (PDF, PPT, or PPTX),
  title: string,
  description: string,
  category: string,
  presenter: string,
  date: string
}
```

**Response:**
```json
{
  "success": true,
  "summary": "AI-generated summary of the document...",
  "keyPoints": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ]
}
```

**Implementation Steps:**
1. Extract text from uploaded file
2. Send text to Claude API for summarization
3. Return structured summary

---

### 2. Audio Transcription & Summarization API

**Endpoint:** `POST /api/transcribe-audio`

**Request:**
```javascript
// Form data with audio file
FormData {
  audio: File (WebM audio),
  sessionTitle: string,
  speakerCount: number  // Number of participants
}
```

**Response:**
```json
{
  "success": true,
  "transcription": "Full transcription with speaker labels...",
  "summary": "Summary of the discussion...",
  "speakers": {
    "speaker1": "Main points discussed...",
    "speaker2": "Main points discussed..."
  },
  "keyTopics": [
    "Topic 1",
    "Topic 2"
  ]
}
```

**Implementation Steps:**
1. Convert WebM to supported format if needed
2. Use speech-to-text service (e.g., AssemblyAI, Deepgram) for transcription with speaker diarization
3. Send transcription to Claude API for summarization
4. Return structured results

---

## Example Backend Implementation (Node.js + Express)

### Prerequisites

```bash
npm install express multer pdf-parse pptx-parser @anthropic-ai/sdk
```

### Server Setup

```javascript
// server.js
const express = require('express');
const multer = require('multer');
const Anthropic = require('@anthropic-ai/sdk');
const pdf = require('pdf-parse');
const cors = require('cors');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Initialize Claude API client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// File summarization endpoint
app.post('/api/summarize-file', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const file = req.file;

    // Extract text from file
    let extractedText = '';

    if (file.mimetype === 'application/pdf') {
      const data = await pdf(file.buffer);
      extractedText = data.text;
    } else if (file.mimetype.includes('presentation')) {
      // Use appropriate library for PPT/PPTX extraction
      // extractedText = await extractPPTText(file.buffer);
      extractedText = '[PPT extraction placeholder]';
    }

    // Summarize with Claude
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Please summarize this ${category} presentation titled "${title}".

Description: ${description}

Content:
${extractedText.substring(0, 50000)}

Provide:
1. A concise summary (3-4 sentences)
2. Key points (bullet list)
3. Main topics covered`
      }]
    });

    const summary = message.content[0].text;

    res.json({
      success: true,
      summary: summary,
      keyPoints: extractKeyPoints(summary)
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Audio transcription endpoint
app.post('/api/transcribe-audio', upload.single('audio'), async (req, res) => {
  try {
    const { sessionTitle, speakerCount } = req.body;
    const audioFile = req.file;

    // Step 1: Transcribe audio with speaker diarization
    // Using AssemblyAI, Deepgram, or similar service
    const transcription = await transcribeAudio(audioFile, speakerCount);

    // Step 2: Summarize with Claude
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Please analyze this study session transcription and provide:

1. Overall summary of the discussion
2. Key points discussed by each speaker
3. Main topics covered
4. Action items (if any)

Session Title: ${sessionTitle}

Transcription:
${transcription.text}`
      }]
    });

    const analysis = message.content[0].text;

    res.json({
      success: true,
      transcription: transcription.text,
      summary: analysis,
      speakers: transcription.speakers,
      keyTopics: extractKeyTopics(analysis)
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper functions
function extractKeyPoints(text) {
  // Simple extraction - parse bullet points or numbered lists
  const lines = text.split('\n');
  return lines
    .filter(line => line.trim().match(/^[-•*\d.]/))
    .map(line => line.replace(/^[-•*\d.]\s*/, '').trim())
    .slice(0, 5);
}

function extractKeyTopics(text) {
  // Extract main topics from summary
  return ['Topic extraction placeholder'];
}

async function transcribeAudio(audioFile, speakerCount) {
  // Implement audio transcription with speaker diarization
  // Example using AssemblyAI:
  /*
  const AssemblyAI = require('assemblyai');
  const client = new AssemblyAI.Client(process.env.ASSEMBLYAI_API_KEY);

  const transcript = await client.transcripts.create({
    audio_url: uploadedAudioURL,
    speaker_labels: true,
    speakers_expected: speakerCount
  });

  return {
    text: transcript.text,
    speakers: transcript.utterances
  };
  */

  return {
    text: '[Transcription placeholder - implement with speech-to-text service]',
    speakers: {}
  };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Frontend Integration

Update the frontend code to call your backend API:

```javascript
// In category.html - Update summarizeWithAI function
async function summarizeWithAI(file, title) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('presenter', presenter);
  formData.append('date', date);

  const response = await fetch('http://localhost:3000/api/summarize-file', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  return result.summary;
}

// In index.html - Update saveRecording function
async function processRecording(audioBlob) {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('sessionTitle', 'Study Session');
  formData.append('speakerCount', 3);  // Adjust as needed

  const response = await fetch('http://localhost:3000/api/transcribe-audio', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  return result;
}
```

---

## Environment Variables

Create a `.env` file:

```bash
# Required API Keys
ANTHROPIC_API_KEY=your_claude_api_key_here
ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here  # or other transcription service

# Server Configuration
PORT=3000
NODE_ENV=development
```

---

## Deployment Considerations

### Option 1: Simple Deployment (Vercel/Netlify Functions)
- Deploy frontend as static site
- Use serverless functions for API endpoints
- Store files temporarily in cloud storage (S3, etc.)

### Option 2: Full Backend (AWS, GCP, Azure)
- Deploy Node.js/Python backend on VM or container
- Use load balancer for scaling
- Store files in cloud storage
- Use CDN for frontend assets

### Option 3: Local Development
- Run backend server locally
- Access from same network
- Good for testing and internal use

---

## Security Considerations

1. **API Key Protection**: Never expose Anthropic API key in frontend
2. **File Size Limits**: Set reasonable limits (e.g., 50MB)
3. **File Type Validation**: Validate file types on backend
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Authentication**: Add user authentication if needed
6. **CORS**: Configure CORS properly for production

---

## Cost Optimization

1. **Cache summaries**: Store generated summaries to avoid re-processing
2. **Batch processing**: Process multiple files in batches
3. **Text extraction limits**: Limit text sent to Claude API
4. **Monitor usage**: Track Claude API usage and costs

---

## Testing

```bash
# Test file summarization
curl -X POST http://localhost:3000/api/summarize-file \
  -F "file=@test.pdf" \
  -F "title=Test Presentation" \
  -F "description=Test description" \
  -F "category=paper"

# Test audio transcription
curl -X POST http://localhost:3000/api/transcribe-audio \
  -F "audio=@recording.webm" \
  -F "sessionTitle=Study Session" \
  -F "speakerCount=3"
```

---

## Next Steps

1. Set up backend server with the endpoints above
2. Get Claude API key from https://console.anthropic.com
3. Choose and integrate an audio transcription service
4. Update frontend API URLs to point to your backend
5. Test the full workflow
6. Deploy to production

For questions or issues, refer to:
- [Claude API Documentation](https://docs.anthropic.com)
- [AssemblyAI Documentation](https://www.assemblyai.com/docs)
- [Deepgram Documentation](https://developers.deepgram.com)
