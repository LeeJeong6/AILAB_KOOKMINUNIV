// Vercel Serverless Function for File Summarization
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
    const { title, description, category } = req.body;

    // Initialize Claude API
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Summarize with Claude
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Please create a comprehensive summary for this ${category} presentation.

Title: ${title}
Description: ${description}

Provide:
1. A concise summary (2-3 sentences)
2. Key topics that are likely covered based on the title and description
3. Potential learning outcomes

Keep it professional and academic.`
      }]
    });

    const summary = message.content[0].text;

    res.status(200).json({
      success: true,
      summary: summary,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error summarizing file:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to summarize file'
    });
  }
};
