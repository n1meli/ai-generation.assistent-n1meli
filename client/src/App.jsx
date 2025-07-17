import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("Spanish");
  const [voice, setVoice] = useState("female");
  const [music, setMusic] = useState("None");
  const [geo, setGeo] = useState("Spain");
  const [transcription, setTranscription] = useState("");
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const generateText = async () => {
    try {
      const res = await axios.post("/api/generate", {
        topic,
        language,
        geo,
        transcription,
      });
      setStory(res.data.story);
    } catch (err) {
      alert("Text generation failed");
    }
  };

  const generateImage = async () => {
    try {
      const res = await axios.post("/api/image", {
        story,
        geo,
        language,
      });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      alert("Image generation failed");
    }
  };

  const generateVoice = async () => {
    try {
      const res = await axios.post("/api/voice", {
        story,
        voice,
      });
      setAudioUrl(res.data.audioUrl);
    } catch (err) {
      alert("Voice generation failed");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Primary Inputs</h2>
          <input
            className="w-full mb-2 p-2 bg-neutral-800"
            placeholder="Story topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <textarea
            className="w-full mb-2 p-2 bg-neutral-800"
            placeholder="Enter transcription"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
          />
          <select
            className="w-full mb-2 p-2 bg-neutral-800"
            value={geo}
            onChange={(e) => setGeo(e.target.value)}
          >
            <option>Spain</option>
            <option>Mexico</option>
            <option>Brazil</option>
            <option>Ukraine</option>
          </select>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <select
            className="w-full mb-2 p-2 bg-neutral-800"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>Spanish</option>
            <option>Portuguese</option>
            <option>Ukrainian</option>
            <option>English</option>
          </select>
          <select
            className="w-full mb-2 p-2 bg-neutral-800"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <select
            className="w-full mb-2 p-2 bg-neutral-800"
            value={music}
            onChange={(e) => setMusic(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Romantic">Romantic</option>
            <option value="Drama">Drama</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={generateText} className="bg-orange-500 px-4 py-2 rounded">
          Generate Text
        </button>
        <button onClick={generateImage} className="bg-blue-500 px-4 py-2 rounded">
          Generate Image
        </button>
        <button onClick={generateVoice} className="bg-green-500 px-4 py-2 rounded">
          Generate Voice
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Generated Story:</h3>
        <p className="bg-neutral-800 p-3 whitespace-pre-wrap">{story}</p>
        {imageUrl && <img src={imageUrl} alt="Generated" className="mt-4 rounded" />}
        {audioUrl && (
          <audio controls className="mt-4">
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
        )}
      </div>
    </div>
  );
}
