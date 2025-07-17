const axios = require('axios');

exports.generateStory = async (req, res) => {
  try {
    const { prompt, language } = req.body;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    res.json({ story: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send("OpenAI error: " + error.message);
  }
};
