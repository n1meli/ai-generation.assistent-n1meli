const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

exports.generateVoice = async (req, res) => {
  const { text, voice } = req.body;

  const filePath = path.join(__dirname, 'output.mp3');

  const child = spawn('edge-tts', ['--text', text, '--voice', voice, '--write-media', filePath]);

  child.on('close', () => {
    const audio = fs.readFileSync(filePath);
    res.set({ 'Content-Type': 'audio/mpeg' });
    res.send(audio);
  });
};
