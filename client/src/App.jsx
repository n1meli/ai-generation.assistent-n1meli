import React, { useState } from 'react';
import './App.css'; // якщо хочеш винести стилі

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerate = async () => {
    // Тут ти підставляєш свій endpoint до сервера
    const res = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.result); // або data.text — дивись, як у тебе
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌍 Multilang AI Story App</h1>

      <textarea
        style={styles.textarea}
        placeholder="Введи тему або сюжет..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button style={styles.button} onClick={handleGenerate}>
        ✨ Згенерувати історію
      </button>

      {response && (
        <div style={styles.result}>
          <h3>📖 Результат:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    resize: 'vertical',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  result: {
    marginTop: '30px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
  },
};

export default App;
// React App placeholder
