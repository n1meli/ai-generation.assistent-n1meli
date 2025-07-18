const express = require('express');
const { TTSClient } = require('msedge-tts');

const router = express.Router();

router.post('/generate-voice', async (req, res) => {
  const { text, voice } = req.body;

  try {
    const tts = new TTSClient();
    const audioBuffer = await tts.synthesize(text, voice);
    const base64 = audioBuffer.toString('base64');
    const audioUrl = `data:audio/mp3;base64,${base64}`;
    res.json({ audioUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate voice' });
  }
});

module.exports = router;
