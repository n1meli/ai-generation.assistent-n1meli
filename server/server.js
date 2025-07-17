const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const edgeTTS = require('./edge-tts');
const openai = require('./openai');
const huggingface = require('./huggingface');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate-story', openai.generateStory);
app.post('/api/generate-image', huggingface.generateImage);
app.post('/api/generate-voice', edgeTTS.generateVoice);

app.listen(3001, () => console.log('Server listening on http://localhost:3001'));
