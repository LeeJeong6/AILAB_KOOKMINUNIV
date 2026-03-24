// Vercel Serverless Function for Audio Transcription
const Anthropic = require('@anthropic-ai/sdk');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { sessionTitle, speakerCount } = req.body;

    // Initialize Claude API
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Simulated transcription (in production, use speech-to-text service)
    const simulatedTranscription = `[This is a simulated transcription]

Speaker 1: Let's discuss today's paper about GroupViT. The key innovation is using text supervision for semantic segmentation.

Speaker 2: That's interesting. How does it compare to traditional methods that require pixel-level annotations?

Speaker 1: It achieves 52.3% mIoU on PASCAL VOC without any dense annotations. The grouping mechanism allows the model to learn visual segments from image-text pairs alone.

Speaker 3: What about the computational cost? Is it practical for real-world applications?

Speaker 1: The paper shows it's comparable to CLIP in terms of computation. The hierarchical grouping adds minimal overhead.

Speaker 2: We should implement this in our next project. The zero-shot capability could be very useful.`;

    // Summarize with Claude
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Please analyze this study session transcription and provide:

1. Overall Summary: A concise overview of the discussion (2-3 sentences)
2. Key Points: Main points discussed (bullet list)
3. Speaker Contributions: Brief summary of what each speaker contributed
4. Action Items: Any follow-up tasks mentioned (if any)

Session Title: ${sessionTitle || 'Study Session'}
Expected Speakers: ${speakerCount || 3}

Transcription:
${simulatedTranscription}

Format your response clearly with section headers.`
      }]
    });

    const analysis = message.content[0].text;

    res.status(200).json({
      success: true,
      transcription: simulatedTranscription,
      summary: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process audio recording'
    });
  }
};
