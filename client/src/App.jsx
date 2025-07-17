import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [gender, setGender] = useState('female');
  const [result, setResult] = useState('');
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = `Hi, sending you a story, your task is to:\n1. Rewrite the story in third person, adapting to the ${language} context.\n2. Change most events, locations, characters to ${language} names, while keeping the main idea of the story and chronology.\n3. Add jokes where appropriate.\n4. Make sure all names are ${language}, and the locations should also be culturally appropriate.\n5. Write me the same story in ${language} language, and write it in 5 parts of 6000 letters.\nWrite one part at a time.\nDo not write anything else.\nstory: ${text}`;

      const storyRes = await axios.post('/api/generate-story', { prompt, language });
      setResult(storyRes.data.story);

      const imagePrompt = `high detail, photorealistic, natural lighting, realistic textures, shallow depth of field, cinematic look, soft shadows, lifelike colors, 35mm lens, ${language} characters`;
      const imgRes = await axios.post('/api/generate-image', { prompt: imagePrompt }, { responseType: 'blob' });
      setImage(URL.createObjectURL(imgRes.data));

      const voice = gender === 'female' ? 'en-US-JennyNeural' : 'en-US-GuyNeural';
      const audioRes = await axios.post('/api/generate-voice', { text: storyRes.data.story, voice }, { responseType: 'blob' });
      setAudio(URL.createObjectURL(audioRes.data));

    } catch (error) {
      console.error('Generation failed:', error);
      alert('Something went wrong. Check the console.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Story Generator</h1>

      <input
        type="text"
        placeholder="Enter story title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />

      <textarea
        placeholder="Paste your story here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textarea"
      />

      <div className="controls">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {['Spanish', 'Russian', 'French', 'Portuguese', 'Italian', 'German', 'Japanese', 'Polish', 'Arabic', 'Turkish', 'Romanian', 'Korean', 'Dutch', 'Greek', 'Indonesian'].map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {result && (
        <>
          <h2>Result:</h2>
          <div className="output">{result}</div>
        </>
      )}

      {image && (
        <div>
          <h2>Image:</h2>
          <img src={image} alt="Generated" className="image" />
        </div>
      )}

      {audio && (
        <div>
          <h2>Voiceover:</h2>
          <audio controls src={audio}></audio>
        </div>
      )}
    </div>
  );
};

export default App;
