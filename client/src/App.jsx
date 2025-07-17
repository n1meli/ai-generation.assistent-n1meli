import React, { useState } from 'react';

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
  const [music, setMusic] = useState('');

  const handleGenerate = () => {
    console.log({
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
      music,
    });
    // Тут додай запит до API, якщо потрібно
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Primary Inputs */}
        <div>
          <h2 className="text-xl font-bold mb-4">Primary Inputs</h2>
          <div className="mb-4">
            <label className="block text-sm mb-1">Queue of queues IDs</label>
            <input type="text" value={queueIds} onChange={e => setQueueIds(e.target.value)} className="w-full bg-gray-800 p-2 rounded" placeholder="e.g., 1,5,17..." />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Topic reference</label>
            <input type="text" value={topicRef} onChange={e => setTopicRef(e.target.value)} className="w-full bg-gray-800 p-2 rounded" placeholder="Enter topic reference" />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Transcription</label>
            <textarea value={transcription} onChange={e => setTranscription(e.target.value)} className="w-full bg-gray-800 p-2 rounded" rows={6} placeholder="Enter transcription" />
          </div>
        </div>

        {/* Additional Settings */}
        <div>
          <h2 className="text-xl font-bold mb-4">Additional Settings</h2>
          <div className="mb-4">
            <label className="block text-sm mb-1">Story Topic</label>
            <input type="text" value={storyTopic} onChange={e => setStoryTopic(e.target.value)} className="w-full bg-gray-800 p-2 rounded" placeholder="Enter story topic" />
          </div>
          <div className="flex space-x-4 mb-4">
            <label><input type="checkbox" checked={finished} onChange={e => setFinished(e.target.checked)} className="mr-2" />Finished</label>
            <label><input type="checkbox" checked={geoReplace} onChange={e => setGeoReplace(e.target.checked)} className="mr-2" />Geo replace</label>
            <label><input type="checkbox" checked={test} onChange={e => setTest(e.target.checked)} className="mr-2" />Test</label>
          </div>
          <div className="flex space-x-4 mb-4">
            <input type="text" value={refId} onChange={e => setRefId(e.target.value)} className="w-1/2 bg-gray-800 p-2 rounded" placeholder="Ref. ID" />
            <input type="text" value={refType} onChange={e => setRefType(e.target.value)} className="w-1/2 bg-gray-800 p-2 rounded" placeholder="Ref. Type" />
          </div>
          <div className="flex space-x-4 mb-4">
            <select value={geo} onChange={e => setGeo(e.target.value)} className="w-1/2 bg-gray-800 p-2 rounded">
              <option value="">Choose geo</option>
              <option value="uk">Ukraine</option>
              <option value="es">Spain</option>
              <option value="it">Italy</option>
            </select>
            <select value={voice} onChange={e => setVoice(e.target.value)} className="w-1/2 bg-gray-800 p-2 rounded">
              <option value="">Select voice</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div className="mb-4">
            <select value={music} onChange={e => setMusic(e.target.value)} className="w-full bg-gray-800 p-2 rounded">
              <option value="">Choose a background music</option>
              <option value="calm">Calm</option>
              <option value="dramatic">Dramatic</option>
              <option value="romantic">Romantic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <div className="text-center mt-8">
        <button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-bold">
          Generate
        </button>
      </div>
    </div>
  );
}

export default App;
