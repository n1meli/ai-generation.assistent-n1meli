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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
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
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      alert('Success: ' + JSON.stringify(data));
    } catch (err) {
      alert('Error generating: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <div className="top-buttons">
        <button className="orange">Queue</button>
        <button>Stop</button>
        <button>Continue</button>
        <button className="red">🔴</button>
        <button className="orange">STORY</button>
        <button className="gray">T</button>
      </div>

      <div className="form-grid">
        <div className="primary-inputs">
          <h3>Primary Inputs</h3>
          <input type="text" placeholder="e.g., 1,5,17..." value={queueIds} onChange={(e) => setQueueIds(e.target.value)} />
          <input type="text" placeholder="Enter topic reference" value={topicRef} onChange={(e) => setTopicRef(e.target.value)} />
          <textarea placeholder="Enter transcription" value={transcription} onChange={(e) => setTranscription(e.target.value)} />
        </div>

        <div className="additional-settings">
          <h3>Additional Settings</h3>
          <input type="text" placeholder="Enter story topic" value={storyTopic} onChange={(e) => setStoryTopic(e.target.value)} />
          <div className="checkbox-group">
            <label><input type="checkbox" checked={finished} onChange={() => setFinished(!finished)} /> Finished</label>
            <label><input type="checkbox" checked={geoReplace} onChange={() => setGeoReplace(!geoReplace)} /> Geo replace</label>
            <label><input type="checkbox" checked={test} onChange={() => setTest(!test)} /> Test</label>
          </div>
          <input type="text" placeholder="Ref. ID" value={refId} onChange={(e) => setRefId(e.target.value)} />
          <input type="text" placeholder="Ref. Type" value={refType} onChange={(e) => setRefType(e.target.value)} />
          <select value={geo} onChange={(e) => setGeo(e.target.value)}>
            <option value="">Choose geo</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="fr">French</option>
            <option value="pt">Portuguese</option>
            <option value="it">Italian</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
            <option value="pl">Polish</option>
            <option value="ar">Arabic</option>
            <option value="tr">Turkish</option>
            <option value="ro">Romanian</option>
            <option value="ko">Korean</option>
            <option value="nl">Dutch</option>
            <option value="el">Greek</option>
            <option value="id">Indonesian</option>
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
      </div>

      <div className="actions">
        <button onClick={handleSubmit} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
      </div>
    </div>
  );
}

export default App;
