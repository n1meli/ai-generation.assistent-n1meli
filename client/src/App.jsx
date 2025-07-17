import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [storyTopic, setStoryTopic] = useState('');
  const [topicRef, setTopicRef] = useState('');
  const [transcription, setTranscription] = useState('');
  const [geo, setGeo] = useState('');
  const [voice, setVoice] = useState('');
  const [music, setMusic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/generate', {
        storyTopic,
        topicRef,
        transcription,
        geo,
        voice,
        music,
      });
      setResult(response.data.result);
    } catch (err) {
      setResult('Error generating content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 font-sans">
      <h1 className="text-lg font-semibold mb-4 text-center">AI Story Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Inputs */}
        <div>
          <h2 className="text-xl font-bold mb-2">Primary Inputs</h2>
          <div className="mb-3">
            <label className="block text-sm mb-1">Queue of queues IDs</label>
            <input type="text" className="w-full p-2 rounded bg-zinc-800 border border-zinc-700" placeholder="e.g., 1,5,17..." />
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-1">Topic reference</label>
            <input type="text" value={topicRef} onChange={(e) => setTopicRef(e.target.value)} className="w-full p-2 rounded bg-zinc-800 border border-zinc-700" placeholder="Enter topic reference" />
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-1">Transcription</label>
            <textarea value={transcription} onChange={(e) => setTranscription(e.target.value)} className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 h-28" placeholder="Enter transcription" />
          </div>
        </div>

        {/* Additional Settings */}
        <div>
          <h2 className="text-xl font-bold mb-2">Additional Settings</h2>
          <div className="mb-3">
            <label className="block text-sm mb-1">Story Topic</label>
            <input type="text" value={storyTopic} onChange={(e) => setStoryTopic(e.target.value)} className="w-full p-2 rounded bg-zinc-800 border border-zinc-700" placeholder="Enter story topic" />
          </div>

          <div className="flex items-center gap-4 mb-3">
            <label><input type="checkbox" className="mr-1" /> Finished</label>
            <label><input type="checkbox" className="mr-1" /> Geo replace</label>
            <label><input type="checkbox" className="mr-1" /> Test</label>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <input type="text" className="p-2 rounded bg-zinc-800 border border-zinc-700" placeholder="Ref. ID" />
            <input type="text" className="p-2 rounded bg-zinc-800 border border-zinc-700" placeholder="Ref. Type" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <select value={geo} onChange={(e) => setGeo(e.target.value)} className="p-2 rounded bg-zinc-800 border border-zinc-700">
              <option>Choose geo</option>
              <option value="Ukraine">Ukraine</option>
              <option value="Mexico">Mexico</option>
              <option value="Korea">Korea</option>
              <option value="Germany">Germany</option>
            </select>
            <select value={voice} onChange={(e) => setVoice(e.target.value)} className="p-2 rounded bg-zinc-800 border border-zinc-700">
              <option>Select voice</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <select value={music} onChange={(e) => setMusic(e.target.value)} className="w-full p-2 rounded bg-zinc-800 border border-zinc-700">
            <option>Choose a background music</option>
            <option value="romantic">Romantic</option>
            <option value="dramatic">Dramatic</option>
            <option value="suspense">Suspense</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={handleGenerate} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-zinc-800 rounded border border-zinc-700">
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
