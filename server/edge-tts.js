const express = require('express');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

const router = express.Router();

router.post('/generate-voice', async (req, res) => {
  const { text, voice } = req.body;

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.WEBM_24KHZ_16BIT_MONO_OPUS);
    const { audioStream } = await tts.toStream(text);

    const chunks = [];
    audioStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    audioStream.on('close', () => {
      const audioBuffer = Buffer.concat(chunks);
      const base64 = audioBuffer.toString('base64');
      const audioUrl = `data:audio/webm;base64,${base64}`;
      res.json({ audioUrl });
    });

    audioStream.on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate voice' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate voice' });
  }
});

module.exports = router;
