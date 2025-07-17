import React, { useState } from 'react';
import './App.css';

function App() {
  const [queueIds, setQueueIds] = useState('');
  const [topicRef, setTopicRef] = useState('');
  const [transcription, setTranscription] = useState('');
  const [storyTopic, setStoryTopic] = useState('');
  const [finished, setFinished] = useState(false);
  const [geoReplace, setGeoReplace] = useState(false);
  const [test, setTest] = useState(false);
  const [refId, setRefId] = useState('');
  const [refType, setRefType] = useState('');
  const [geo, setGeo] = useState('');
  const [voice, setVoice] = useState('');
  const [bgMusic, setBgMusic] = useState('');

  const handleSubmit = async () => {
    const payload = {
      queueIds,
      topicRef,
      transcription,
      storyTopic,
      finished,
      geoReplace,
      test,
      refId,
      refType,
      geo,
      voice,
      bgMusic
    };

    try {
      const res = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      alert('Success: ' + JSON.stringify(data));
    } catch (err) {
      alert('Error generating: ' + err.message);
    }
  };

  return (
    <div className="app-container">
      <div className="input-section">
        <h2>Primary Inputs</h2>
        <input
          type="text"
          placeholder="e.g., 1,5,17..."
          value={queueIds}
          onChange={(e) => setQueueIds(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter topic reference"
          value={topicRef}
          onChange={(e) => setTopicRef(e.target.value)}
        />
        <textarea
          placeholder="Enter transcription"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
        ></textarea>
      </div>

      <div className="input-section">
        <h2>Additional Settings</h2>
        <input
          type="text"
          placeholder="Enter story topic"
          value={storyTopic}
          onChange={(e) => setStoryTopic(e.target.value)}
        />
        <div className="checkbox-row">
          <label><input type="checkbox" checked={finished} onChange={() => setFinished(!finished)} /> Finished</label>
          <label><input type="checkbox" checked={geoReplace} onChange={() => setGeoReplace(!geoReplace)} /> Geo replace</label>
          <label><input type="checkbox" checked={test} onChange={() => setTest(!test)} /> Test</label>
        </div>
        <input
          type="text"
          placeholder="Ref. ID"
          value={refId}
          onChange={(e) => setRefId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ref. Type"
          value={refType}
          onChange={(e) => setRefType(e.target.value)}
        />
        <select value={geo} onChange={(e) => setGeo(e.target.value)}>
          <option value="">Choose geo</option>
          <option value="UA">Ukraine</option>
          <option value="ES">Spain</option>
          <option value="KR">Korea</option>
        </select>
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="">Select voice</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <select value={bgMusic} onChange={(e) => setBgMusic(e.target.value)}>
          <option value="">Choose a background music</option>
          <option value="calm">Calm</option>
          <option value="dramatic">Dramatic</option>
          <option value="romantic">Romantic</option>
        </select>
      </div>

      <div className="actions">
        <button onClick={handleSubmit}>Generate</button>
      </div>
    </div>
  );
}

export default App;
