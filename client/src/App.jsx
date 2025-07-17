import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function App() {
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
    // тут буде логіка генерації
    alert('Генерація запущена!');
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 font-sans">
      <div className="flex gap-3 mb-4">
        <Button variant="destructive">Queue</Button>
        <Button variant="secondary">Stop</Button>
        <Button variant="secondary">Continue</Button>
        <Button variant="default" className="bg-orange-600">STORY</Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Primary Inputs</h2>
          <input className="w-full mb-2 p-2 rounded bg-zinc-800" placeholder="Queue of queues IDs" value={queueIds} onChange={e => setQueueIds(e.target.value)} />
          <input className="w-full mb-2 p-2 rounded bg-zinc-800" placeholder="Topic reference" value={topicRef} onChange={e => setTopicRef(e.target.value)} />
          <textarea className="w-full p-2 h-32 rounded bg-zinc-800" placeholder="Enter transcription" value={transcription} onChange={e => setTranscription(e.target.value)} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Additional Settings</h2>
          <input className="w-full mb-2 p-2 rounded bg-zinc-800" placeholder="Story Topic" value={storyTopic} onChange={e => setStoryTopic(e.target.value)} />
          <div className="flex items-center gap-4 mb-2">
            <label><input type="checkbox" checked={finished} onChange={() => setFinished(!finished)} /> Finished</label>
            <label><input type="checkbox" checked={geoReplace} onChange={() => setGeoReplace(!geoReplace)} /> Geo replace</label>
            <label><input type="checkbox" checked={test} onChange={() => setTest(!test)} /> Test</label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input className="p-2 rounded bg-zinc-800" placeholder="Ref. ID" value={refId} onChange={e => setRefId(e.target.value)} />
            <input className="p-2 rounded bg-zinc-800" placeholder="Ref. Type" value={refType} onChange={e => setRefType(e.target.value)} />
            <select className="p-2 rounded bg-zinc-800" value={geo} onChange={e => setGeo(e.target.value)}>
              <option value="">Choose geo</option>
              <option value="UA">Ukraine</option>
              <option value="ES">Spain</option>
            </select>
            <select className="p-2 rounded bg-zinc-800" value={voice} onChange={e => setVoice(e.target.value)}>
              <option value="">Select voice</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <select className="col-span-2 p-2 rounded bg-zinc-800" value={music} onChange={e => setMusic(e.target.value)}>
              <option value="">Choose a background music</option>
              <option value="calm">Calm</option>
              <option value="tense">Tense</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleGenerate} className="w-full bg-blue-600 text-white text-lg py-3">Згенерувати</Button>
      </div>

      <div className="mt-8">
        <h3 className="text-md font-bold mb-2">Story History</h3>
        <table className="w-full text-sm bg-zinc-800 rounded overflow-hidden">
          <thead>
            <tr className="bg-zinc-700">
              <th className="p-2">ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Topic</th>
              <th className="p-2">Finished</th>
              <th className="p-2">Geo</th>
              <th className="p-2">Test</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">157</td>
              <td className="p-2">17/07/2025</td>
              <td className="p-2">Su mano tocó mi rodilla...</td>
              <td className="p-2">No</td>
              <td className="p-2">No</td>
              <td className="p-2">No</td>
              <td className="p-2"><Button size="sm">Apply</Button> <Button size="sm" variant="destructive">Delete</Button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
