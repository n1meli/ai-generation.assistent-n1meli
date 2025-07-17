// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3001;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  const {
    queueIds,
    topicRef,
    transcription,
    storyTopic,
    finished,
    geoReplace,
    test,
    refId,
    refType,
    geo,
    voice,
    bgMusic
  } = req.body;

  try {
    // Generate story text
    const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful story generator.' },
        { role: 'user', content: `Write a story based on this topic: ${storyTopic}. Transcription: ${transcription}` }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const story = openaiResponse.data.choices[0].message.content;

    // Generate image (HuggingFace)
    const imagePrompt = `Illustration for the story: ${storyTopic}`;
    const imageResponse = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
      { inputs: imagePrompt },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    const imageBase64 = imageResponse.data?.[0]?.image ?? null;

    // Text to Speech (Edge TTS)
    const edgeVoice = voice === 'female' ? 'en-US-JennyNeural' : 'en-US-GuyNeural';
    const ttsText = encodeURIComponent(story);
    const audioUrl = `https://speech.platform.bing.com/synthesize?voice=${edgeVoice}&text=${ttsText}`;

    res.json({
      story,
      image: imageBase64,
      audioUrl
    });
  } catch (error) {
    console.error('Generation error:', error.message);
    res.status(500).json({ error: 'Generation failed', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
