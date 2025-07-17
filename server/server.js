const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const ttsRoute = require('./tts');
const imageGenRoute = require('./imageGen');
const textGenRoute = require('./textGen');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/tts', ttsRoute);
app.use('/api/image', imageGenRoute);
app.use('/api/story', textGenRoute);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
