import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    topic: '',
    reference: '',
    transcription: '',
    geo: '',
    voice: '',
    music: '',
    refId: '',
    refType: '',
    finished: false,
    geoReplace: false,
    test: false,
  });

  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGenerate = () => {
    const newItem = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      topic: form.topic,
      finished: form.finished ? 'Yes' : 'No',
      geoReplace: form.geoReplace ? 'Yes' : 'No',
      test: form.test ? 'Yes' : 'No',
      refId: form.refId,
      refType: form.refType,
    };
    setHistory([newItem, ...history]);
  };

  const handleDelete = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  return (
    <div className="container">
      <h1>🧠 Story Control Panel</h1>

      <div className="form-group">
        <input name="topic" placeholder="Enter story topic" value={form.topic} onChange={handleChange} />
        <input name="reference" placeholder="Topic reference" value={form.reference} onChange={handleChange} />
        <textarea name="transcription" placeholder="Enter transcription" value={form.transcription} onChange={handleChange} />

        <label><input type="checkbox" name="finished" checked={form.finished} onChange={handleChange} /> Finished</label>
        <label><input type="checkbox" name="geoReplace" checked={form.geoReplace} onChange={handleChange} /> Geo replace</label>
        <label><input type="checkbox" name="test" checked={form.test} onChange={handleChange} /> Test</label>

        <input name="refId" placeholder="Ref. ID" value={form.refId} onChange={handleChange} />
        <input name="refType" placeholder="Ref. Type" value={form.refType} onChange={handleChange} />

        <select name="geo" value={form.geo} onChange={handleChange}>
          <option value="">Choose geo</option>
          <option value="UA">Ukraine</option>
          <option value="ES">Spain</option>
        </select>

        <select name="voice" value={form.voice} onChange={handleChange}>
          <option value="">Select voice</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select name="music" value={form.music} onChange={handleChange}>
          <option value="">Choose background music</option>
          <option value="calm">Calm</option>
          <option value="epic">Epic</option>
        </select>

        <button onClick={handleGenerate}>📝 Story</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Date</th><th>Topic</th><th>Finished</th><th>Geo Replace</th><th>Test</th><th>Ref ID</th><th>Ref Type</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.date}</td>
              <td>{row.topic}</td>
              <td>{row.finished}</td>
              <td>{row.geoReplace}</td>
              <td>{row.test}</td>
              <td>{row.refId}</td>
              <td>{row.refType}</td>
              <td>
                <button>Apply</button>
                <button onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
