import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateStory } from './openai.js';
import { generateImage } from './sdxl.js';
import { generateVoice } from './voice.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Генерація історії
app.post('/api/story', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await generateStory(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Story generation error' });
  }
});

// 🔹 Генерація зображення
app.post('/api/image', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await generateImage(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Image generation error' });
  }
});

// 🔹 Озвучка
app.post('/api/voice', async (req, res) => {
  try {
    const { text, voice, language } = req.body;
    const audioUrl = await generateVoice(text, voice, language);
    res.json({ audioUrl });
  } catch (err) {
    res.status(500).json({ error: 'Voice generation error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
