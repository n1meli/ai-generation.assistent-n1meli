import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const languages = [
  "Spanish", "Russian", "French", "Portuguese", "Italian",
  "German", "Japanese", "Polish", "Arabic", "Turkish",
  "Romanian", "Korean", "Dutch", "Greek", "Indonesian"
];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [gender, setGender] = useState('female');
  const [resultText, setResultText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Генерація тексту
      const prompt = `Hi, sending you a story, your task is to:\n...\n\nstory:\n${inputText}`.replace(/~LANGUAGE~/g, language);
      const storyRes = await axios.post('/api/generate-story', { prompt, language });
      setResultText(storyRes.data.story);

      // Генерація зображення
      const imagePrompt = `high detail, photorealistic, natural lighting, ${title} scene in ${language} culture, cinematic look, 35mm lens`;
      const imageRes = await axios.post('/api/generate-image', { prompt: imagePrompt }, { responseType: 'blob' });
      setImageUrl(URL.createObjectURL(imageRes.data));

      // Озвучка
      const voice = gender === 'female' ? 'en-US-JennyNeural' : 'en-US-GuyNeural';
      const voiceRes = await axios.post('/api/generate-voice', { text: storyRes.data.story, voice }, { responseType: 'blob' });
      setAudioBlob(URL.createObjectURL(voiceRes.data));
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Story Generator</h1>

      <input
        type="text"
        placeholder="Назва історії"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Встав сюди свою історію або промт..."
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />

      <div className="controls">
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {languages.map(lang => <option key={lang}>{lang}</option>)}
        </select>

        <label>
          <input
            type="radio"
            value="female"
            checked={gender === 'female'}
            onChange={() => setGender('female')}
          /> Жіночий голос
        </label>

        <label>
          <input
            type="radio"
            value="male"
            checked={gender === 'male'}
            onChange={() => setGender('male')}
          /> Чоловічий голос
        </label>
      </div>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Генерація...' : 'Згенерувати'}
      </button>

      {resultText && <div className="result">
        <h3>Згенерований текст</h3>
        <p>{resultText}</p>
      </div>}

      {imageUrl && <div className="image-block">
        <h3>Генероване зображення</h3>
        <img src={imageUrl} alt="AI generated" />
      </div>}

      {audioBlob && <div className="audio-block">
        <h3>Озвучка</h3>
        <audio controls src={audioBlob} />
      </div>}
    </div>
  );
}
