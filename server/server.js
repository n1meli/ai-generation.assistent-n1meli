const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const generateTextRoute = require('./routes/generateText');
// Додатково: const generateImageRoute = require('./routes/generateImage');
// Додатково: const ttsRoute = require('./routes/tts');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/generate-text', generateTextRoute);
// app.use('/generate-image', generateImageRoute);
// app.use('/tts', ttsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
