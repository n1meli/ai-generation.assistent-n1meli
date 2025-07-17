import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [language, setLanguage] = useState('en');
  const [voice, setVoice] = useState('male');
  const [theme, setTheme] = useState('fantasy');
  const [isFinished, setIsFinished] = useState(false);
  const [geoReplace, setGeoReplace] = useState(false);
  const [isTest, setIsTest] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [generatedAudio, setGeneratedAudio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'th', name: 'Thai' },
    { code: 'he', name: 'Hebrew' },
    { code: 'uk', name: 'Ukrainian' },
  ];

  const themes = ['fantasy', 'sci-fi', 'mystery', 'adventure', 'romance', 'historical'];

  const handleGenerateText = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, language, theme, isFinished, geoReplace, isTest }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setGeneratedText(data.text);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt, language }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setGeneratedImage(data.imageUrl);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGenerateVoice = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: generatedText, voice, language }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setGeneratedAudio(data.audioUrl);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* Primary Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Story Prompt</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your story prompt..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image Prompt</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Enter your image prompt..."
            />
          </div>
        </div>

        {/* Additional Settings */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Voice</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={isFinished}
                onChange={(e) => setIsFinished(e.target.checked)}
              />
              Finished
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={geoReplace}
                onChange={(e) => setGeoReplace(e.target.checked)}
              />
              Geo Replace
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={isTest}
                onChange={(e) => setIsTest(e.target.checked)}
              />
              Test
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
            onClick={handleGenerateText}
            disabled={loading || !prompt}
          >
            Generate Text
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
            onClick={handleGenerateImage}
            disabled={loading || !imagePrompt}
          >
            Generate Image
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
            onClick={handleGenerateVoice}
            disabled={loading || !generatedText}
          >
            Generate Voice
          </button>
        </div>

        {/* Outputs */}
        {error && <div className="text-red-500">{error}</div>}
        {loading && <div className="text-gray-400">Loading...</div>}
        {generatedText && (
          <div className="mt-6">
            <h3 className="text-lg font-medium">Generated Story</h3>
            <div className="bg-gray-800 p-4 rounded-md">{generatedText}</div>
          </div>
        )}
        {generatedImage && (
          <div className="mt-6">
            <h3 className="text-lg font-medium">Generated Image</h3>
            <img src={generatedImage} alt="Generated" className="w-full rounded-md" />
          </div>
        )}
        {generatedAudio && (
          <div className="mt-6">
            <h3 className="text-lg font-medium">Generated Audio</h3>
            <audio controls src={generatedAudio} className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
