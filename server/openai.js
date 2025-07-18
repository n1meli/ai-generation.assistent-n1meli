const express = require('express');
const OpenAI = require('openai');

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate-text', async (req, res) => {
  const { queueIds, topicReference, transcription, storyTopic, finished, geoReplace, test, refId, refType, language } = req.body;

  let systemPrompt = `Generate a story in ${language} language, themed around ${storyTopic}. `;
  if (geoReplace) {
    systemPrompt += `Adapt names, locations, and cultural elements to fit ${language} culture. `;
  }
  if (finished) {
    systemPrompt += 'Make sure the story has a complete ending. ';
  }
  if (test) {
    systemPrompt += 'Keep it short for testing. ';
  }

  const userPrompt = `Queue IDs: ${queueIds}\nTopic reference: ${topicReference}\nTranscription: ${transcription}\nReference ID: ${refId}\nReference Type: ${refType}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });
    const text = completion.choices[0].message.content || '';
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

module.exports = router;
