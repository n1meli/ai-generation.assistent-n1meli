const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/generate-text', async (req, res) => {
  try {
    const { topic } = req.body;
    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: `Напиши історію на тему: ${topic}` }]
    });
    const story = response.data.choices[0].message.content;
    res.json({ story });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Generation failed' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
