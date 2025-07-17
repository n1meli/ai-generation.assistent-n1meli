const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  try {
    const { topic } = req.body;
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: `Напиши цікаву історію на тему: ${topic}` }]
    });
    const story = completion.data.choices[0].message.content;
    res.json({ story });
  } catch (err) {
    console.error('Error generating story:', err.message);
    res.status(500).json({ error: 'Story generation failed' });
  }
});

module.exports = router;
