import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setStory(data.story);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🌍 Multilang AI Story App</h1>
      <textarea
        placeholder="Введи тему або сюжет..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateStory} disabled={loading}>
        {loading ? 'Генерація...' : '✨ Згенерувати історію'}
      </button>
      <div className="story-output">
        {story && <p>{story}</p>}
      </div>
    </div>
  );
}

export default App;
