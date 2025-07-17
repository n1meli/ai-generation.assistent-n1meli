import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setStory('');

    try {
      const response = await fetch('http://localhost:3001/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setStory(data.story);
    } catch (error) {
      console.error('Помилка генерації:', error);
      setStory('⚠️ Помилка при запиті до сервера.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌐 Multilang AI Story App</h1>

      <textarea
        className="prompt-box"
        placeholder="Введи тему або сюжет..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button className="generate-button" onClick={handleGenerate} disabled={loading}>
        {loading ? '⏳ Генерується...' : '✨ Згенерувати історію'}
      </button>

      {story && <div className="result-box">{story}</div>}
    </div>
  );
}

export default App;
