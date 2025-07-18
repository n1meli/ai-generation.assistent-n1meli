require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const openai = require('./openai.js');
const huggingface = require('./huggingface.js');
const edgeTts = require('./edge-tts.js');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', openai);
app.use('/api', huggingface);
app.use('/api', edgeTts);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
