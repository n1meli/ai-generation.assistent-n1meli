import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [topic, setTopic] = useState("");
  const [geo, setGeo] = useState("");
  const [voice, setVoice] = useState("");
  const [gender, setGender] = useState("female");
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAll = async () => {
    if (!topic || !geo || !voice || !gender) return alert("Please fill all fields");

    try {
      setLoading(true);

      const textRes = await axios.post("/api/generate", {
        topic,
        geo,
        gender
      });
      const storyText = textRes.data.story;
      setStory(storyText);

      const imageRes = await axios.post("/api/image", {
        story: storyText,
        geo
      });
      setImageUrl(imageRes.data.url);

      const voiceRes = await axios.post("/api/voice", {
        text: storyText,
        voice,
        gender
      });
      setAudioUrl(voiceRes.data.url);

    } catch (err) {
      console.error("Generation error:", err);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-lg font-semibold mb-4">Story Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <input
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded"
            placeholder="Enter story topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <select
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded"
            value={geo}
            onChange={(e) => setGeo(e.target.value)}
          >
            <option value="">Select Language/Geo</option>
            <option value="Ukrainian">Ukrainian</option>
            <option value="Spanish">Spanish</option>
            <option value="Japanese">Japanese</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Korean">Korean</option>
          </select>

          <select
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <select
            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            <option value="">Select Voice</option>
            <option value="en-US-AriaNeural">Aria (US)</option>
            <option value="uk-UA-PolinaNeural">Polina (UA)</option>
            <option value="es-ES-ElviraNeural">Elvira (ES)</option>
            <option value="ko-KR-SunHiNeural">SunHi (KR)</option>
            <option value="pt-BR-FranciscaNeural">Francisca (BR)</option>
          </select>

          <button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold"
            onClick={generateAll}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Story"}
          </button>
        </div>

        <div className="space-y-4">
          {story && (
            <div>
              <h2 className="text-base font-bold mb-2">Story:</h2>
              <p className="whitespace-pre-wrap text-sm bg-neutral-800 p-3 rounded border border-neutral-700">
                {story}
              </p>
            </div>
          )}

          {imageUrl && (
            <div>
              <h2 className="text-base font-bold mb-2">Image:</h2>
              <img src={imageUrl} alt="Generated" className="rounded shadow" />
            </div>
          )}

          {audioUrl && (
            <div>
              <h2 className="text-base font-bold mb-2">Voiceover:</h2>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
