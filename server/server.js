const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  // Тут встав API-запит до OpenAI або просто тестовий текст
  const story = `Історія на тему: "${prompt}"\nЦе тестова відповідь AI.`;

  res.json({ story });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Express backend placeholder
