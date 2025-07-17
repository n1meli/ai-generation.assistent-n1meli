import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [storyTopic, setStoryTopic] = useState('');
  const [transcription, setTranscription] = useState('');
  const [geo, setGeo] = useState('');
  const [voice, setVoice] = useState('');
  const [music, setMusic] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data } = await axios.post('/api/generate', {
        storyTopic,
        transcription,
        geo,
        voice,
        music,
      });
      setGeneratedStory(data.story);
    } catch (error) {
      alert('Story generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImage = async () => {
    try {
      const { data } = await axios.post('/api/image', { story: generatedStory, geo });
      setImageUrl(data.imageUrl);
    } catch (error) {
      alert('Image generation failed');
    }
  };

  const handleVoice = async () => {
    try {
      const { data } = await axios.post('/api/voice', {
        text: generatedStory,
        voice,
      });
      const audio = new Audio(data.audioUrl);
      audio.play();
    } catch (error) {
      alert('Voice generation failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#151b28] text-white p-4">
      <div className="mb-6 text-center text-2xl font-bold">AI Story App</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Story Topic"
            value={storyTopic}
            onChange={(e) => setStoryTopic(e.target.value)}
            className="w-full p-2 rounded bg-gray-800"
          />
          <textarea
            placeholder="Transcription"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 h-32"
          />
          <select onChange={(e) => setGeo(e.target.value)} className="w-full p-2 rounded bg-gray-800">
            <option>Choose geo</option>
            <option value="uk">Ukraine</option>
            <option value="es">Spain</option>
          </select>
          <select onChange={(e) => setVoice(e.target.value)} className="w-full p-2 rounded bg-gray-800">
            <option>Select voice</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <select onChange={(e) => setMusic(e.target.value)} className="w-full p-2 rounded bg-gray-800">
            <option>Choose a background music</option>
            <option value="soft">Soft</option>
            <option value="epic">Epic</option>
          </select>
        </div>
        <div className="space-y-4">
          <button
            onClick={handleGenerate}
            className="w-full p-3 bg-orange-500 rounded hover:bg-orange-600"
          >
            {isGenerating ? 'Generating...' : 'Generate Story'}
          </button>
          <button onClick={handleImage} className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700">
            Generate Image
          </button>
          <button onClick={handleVoice} className="w-full p-3 bg-green-600 rounded hover:bg-green-700">
            Play Voice
          </button>
          {generatedStory && (
            <div className="p-4 bg-gray-900 rounded text-sm whitespace-pre-wrap">
              {generatedStory}
            </div>
          )}
          {imageUrl && <img src={imageUrl} alt="Generated" className="rounded w-full" />}
        </div>
      </div>
    </div>
  );
}
