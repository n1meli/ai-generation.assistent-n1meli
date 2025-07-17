import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageResult, setImageResult] = useState(null);
  const [language, setLanguage] = useState('uk');
  const [loading, setLoading] = useState(false);

  const handleGenerateStory = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setStory('');

    try {
      const response = await fetch('http://localhost:3001/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, language }),
      });

      const data = await response.json();
      setStory(data.story);
    } catch (error) {
      console.error('Помилка генерації історії:', error);
      setStory('⚠️ Помилка при запиті до сервера.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setLoading(true);
    setImageResult(null);

    try {
      const response = await fetch('http://localhost:3001/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: imagePrompt, language }),
      });

      const data = await response.json();
      setImageResult(data.imageUrl);
    } catch (error) {
      console.error('Помилка генерації зображення:', error);
      setImageResult('⚠️ Помилка при запиті до сервера.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌐 Multilang AI Story App</h1>

      <select className="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="uk">Українська</option>
        <option value="es">Іспанська</option>
        <option value="ru">Російська</option>
        <option value="fr">Французька</option>
        <option value="pt">Португальська</option>
        <option value="it">Італійська</option>
        <option value="de">Німецька</option>
        <option value="ja">Японська</option>
        <option value="pl">Польська</option>
        <option value="ar">Арабська</option>
        <option value="tr">Турецька</option>
        <option value="ro">Румунська</option>
        <option value="ko">Корейська</option>
        <option value="nl">Нідерландська</option>
        <option value="el">Грецька</option>
        <option value="id">Індонезійська</option>
      </select>

      <div className="section">
        <h2>📝 Генерація історії</h2>
        <textarea
          className="prompt-box"
          placeholder="Введи тему або сюжет..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="generate-button" onClick={handleGenerateStory} disabled={loading}>
          {loading ? '⏳ Генерується...' : '✨ Згенерувати історію'}
        </button>
        {story && <div className="result-box">{story}</div>}
      </div>

      <div className="section">
        <h2>🎨 Генерація зображення</h2>
        <input
          className="prompt-box"
          placeholder="Опис зображення..."
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
        />
        <button className="generate-button" onClick={handleGenerateImage} disabled={loading}>
          {loading ? '⏳ Генерується...' : '🖼️ Згенерувати зображення'}
        </button>
        {imageResult && <div className="result-box"><img src={imageResult} alt="Generated visual" /></div>}
      </div>
    </div>
  );
}

export default App;
