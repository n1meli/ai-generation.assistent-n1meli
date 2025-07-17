import { useState } from 'react';

export default function Dashboard() {
  const [storyTopic, setStoryTopic] = useState('');
  const [geo, setGeo] = useState('');
  const [voice, setVoice] = useState('');
  const [backgroundMusic, setBackgroundMusic] = useState('');
  const [transcription, setTranscription] = useState('');
  const [queueIDs, setQueueIDs] = useState('');
  const [referenceID, setReferenceID] = useState('');
  const [referenceType, setReferenceType] = useState('');
  const [finished, setFinished] = useState(false);
  const [geoReplace, setGeoReplace] = useState(false);
  const [test, setTest] = useState(false);

  const handleGenerate = () => {
    // Call API to generate story
    console.log('Generating with:', { storyTopic, transcription, geo, voice });
  };

  return (
    <div className="min-h-screen bg-[#1a1d24] text-white px-8 py-6">
      <div className="mb-4 text-lg font-semibold text-center text-green-300">
        Stories fetched successfully!
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <h3 className="mb-2 font-semibold">Primary Inputs</h3>
          <input
            className="w-full mb-2 p-2 bg-[#2a2d36] rounded"
            placeholder="e.g., 1,5,17..."
            value={queueIDs}
            onChange={(e) => setQueueIDs(e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 bg-[#2a2d36] rounded"
            placeholder="Enter topic reference"
          />
          <textarea
            className="w-full p-2 bg-[#2a2d36] rounded"
            placeholder="Enter transcription"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <h3 className="mb-2 font-semibold">Additional Settings</h3>
          <input
            className="w-full mb-2 p-2 bg-[#2a2d36] rounded"
            placeholder="Enter story topic"
            value={storyTopic}
            onChange={(e) => setStoryTopic(e.target.value)}
          />

          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={finished} onChange={() => setFinished(!finished)} />
              Finished
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={geoReplace} onChange={() => setGeoReplace(!geoReplace)} />
              Geo replace
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={test} onChange={() => setTest(!test)} />
              Test
            </label>
          </div>

          <input
            className="w-full mb-2 p-2 bg-[#2a2d36] rounded"
            placeholder="Ref. ID"
            value={referenceID}
            onChange={(e) => setReferenceID(e.target.value)}
          />
          <input
            className="w-full mb-2 p-2 bg-[#2a2d36] rounded"
            placeholder="Ref. Type"
            value={referenceType}
            onChange={(e) => setReferenceType(e.target.value)}
          />

          <select
            className="w-full mb-2 p-2 bg-[#2a2d36] rounded"
            value={geo}
            onChange={(e) => setGeo(e.target.value)}
          >
            <option value="">Choose geo</option>
            <option value="ukraine">Ukraine</option>
            <option value="brazil">Brazil</option>
            <option value="japan">Japan</option>
          </select>

          <select
            className="w-full mb-2 p-2 bg-[#2a2d36] rounded"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            <option value="">Select voice</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <select
            className="w-full p-2 bg-[#2a2d36] rounded"
            value={backgroundMusic}
            onChange={(e) => setBackgroundMusic(e.target.value)}
          >
            <option value="">Choose background music</option>
            <option value="none">None</option>
            <option value="soft">Soft piano</option>
            <option value="drama">Dramatic</option>
          </select>
        </div>

        <div className="col-span-1 flex flex-col gap-2 justify-end">
          <button
            onClick={handleGenerate}
            className="bg-orange-500 hover:bg-orange-600 rounded p-2 text-lg font-bold"
          >
            Generate STORY
          </button>
          <button className="bg-red-600 hover:bg-red-700 rounded p-2">Stop</button>
          <button className="bg-gray-600 hover:bg-gray-700 rounded p-2">Continue</button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Story History</h3>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Topic</th>
              <th className="p-2">Finished</th>
              <th className="p-2">Geo Replace</th>
              <th className="p-2">Test</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="p-2">157</td>
              <td className="p-2">17/07/2025 10:38</td>
              <td className="p-2">Su mano tocó mi rodilla bajo la mesa…</td>
              <td className="p-2">No</td>
              <td className="p-2">No</td>
              <td className="p-2">No</td>
              <td className="p-2">
                <button className="bg-blue-500 px-2 py-1 rounded">Apply</button>
                <button className="bg-red-500 px-2 py-1 ml-2 rounded">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
