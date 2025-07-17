// src/App.jsx
import { useState } from 'react';
import './App.css';

const LANGUAGES = [
  'Spanish', 'Russian', 'French', 'Portuguese', 'Italian', 'German',
  'Japanese', 'Polish', 'Arabic', 'Turkish', 'Romanian', 'Korean',
  'Dutch', 'Greek', 'Indonesian'
];

export default function App() {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [voice, setVoice] = useState('female');
  const [output, setOutput] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');

  const generateAll = async () => {
    setOutput('Генерація...');
    try {
      const res = await fetch('https://your-backend.onrender.com/api/full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          story,
          language,
          voice,
        })
      });
      const data = await res.json();
      setOutput(data.result || 'No result');
    } catch (err) {
      console.error(err);
      setOutput('Помилка генерації');
    }
  };

  const generateImage = async () => {
    try {
      const res = await fetch('https://your-backend.onrender.com/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt })
      });
      const data = await res.json();
      alert('Image task created. Check console.');
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>🌍 AI Story App</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Назва історії" />
      <textarea rows={6} value={story} onChange={e => setStory(e.target.value)} placeholder="Встав текст або історію..." />

      <div className="controls">
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {LANGUAGES.map(l => <option key={l}>{l}</option>)}
        </select>

        <label>
          <input type="radio" name="voice" value="female" checked={voice === 'female'} onChange={() => setVoice('female')} /> Female
        </label>
        <label>
          <input type="radio" name="voice" value="male" checked={voice === 'male'} onChange={() => setVoice('male')} /> Male
        </label>

        <button onClick={generateAll}>Згенерувати</button>
      </div>

      <pre>{output}</pre>

      <div className="image-gen">
        <h2>🖼 Генерація зображення</h2>
        <input value={imagePrompt} onChange={e => setImagePrompt(e.target.value)} placeholder="Опис зображення..." />
        <button onClick={generateImage}>Згенерувати зображення</button>
      </div>
    </div>
  );
}
