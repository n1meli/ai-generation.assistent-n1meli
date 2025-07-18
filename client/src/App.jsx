import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [queueIds, setQueueIds] = useState('');
  const [topicReference, setTopicReference] = useState('');
  const [transcription, setTranscription] = useState('');
  const [storyTopic, setStoryTopic] = useState('');
  const [finished, setFinished] = useState(false);
  const [geoReplace, setGeoReplace] = useState(false);
  const [test, setTest] = useState(false);
  const [refId, setRefId] = useState('');
  const [refType, setRefType] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [voiceGender, setVoiceGender] = useState('Male');
  const [backgroundMusic, setBackgroundMusic] = useState('Calm');

  const [generatedText, setGeneratedText] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [generatedAudio, setGeneratedAudio] = useState('');

  const languages = [
    'Spanish', 'Russian', 'French', 'Portuguese', 'Italian', 'German', 'Japanese', 'Polish',
    'Arabic', 'Turkish', 'Romanian', 'Korean', 'Dutch', 'Greek', 'Indonesian'
  ];

  const voiceMap = {
    Spanish: { Male: 'es-ES-AlvaroNeural', Female: 'es-ES-ElviraNeural' },
    Russian: { Male: 'ru-RU-DmitryNeural', Female: 'ru-RU-SvetlanaNeural' },
    French: { Male: 'fr-FR-HenriNeural', Female: 'fr-FR-DeniseNeural' },
    Portuguese: { Male: 'pt-BR-AntonioNeural', Female: 'pt-BR-FranciscaNeural' },
    Italian: { Male: 'it-IT-DiegoNeural', Female: 'it-IT-ElsaNeural' },
    German: { Male: 'de-DE-ConradNeural', Female: 'de-DE-AmalaNeural' },
    Japanese: { Male: 'ja-JP-KeitaNeural', Female: 'ja-JP-NanamiNeural' },
    Polish: { Male: 'pl-PL-MarekNeural', Female: 'pl-PL-AgnieszkaNeural' },
    Arabic: { Male: 'ar-SA-HamedNeural', Female: 'ar-SA-ZariyahNeural' },
    Turkish: { Male: 'tr-TR-AhmetNeural', Female: 'tr-TR-EmelNeural' },
    Romanian: { Male: 'ro-RO-EmilNeural', Female: 'ro-RO-AlinaNeural' },
    Korean: { Male: 'ko-KR-InJoonNeural', Female: 'ko-KR-SunHiNeural' },
    Dutch: { Male: 'nl-NL-MaartenNeural', Female: 'nl-NL-FennaNeural' },
    Greek: { Male: 'el-GR-NestorasNeural', Female: 'el-GR-AthinaNeural' },
    Indonesian: { Male: 'id-ID-ArdiNeural', Female: 'id-ID-GadisNeural' },
  };

  const musicOptions = [
    { name: 'Calm', url: 'https://www.free-stock-music.com/music/escp/mp3/escp-sky-mall.mp3' },
    { name: 'Dramatic', url: 'https://www.free-stock-music.com/music/punch-deck/mp3/punch-deck-100-seconds.mp3' },
    { name: 'Romantic', url: 'https://www.free-stock-music.com/music/rexlambo/mp3/rexlambo-take-care.mp3' },
  ];

  const handleGenerateText = async () => {
    try {
      const response = await axios.post('/api/generate-text', {
        queueIds, topicReference, transcription, storyTopic, finished, geoReplace, test, refId, refType, language,
      });
      setGeneratedText(response.data.text);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const prompt = `realistic photo of the main scene or character from the story: ${generatedText.substring(0, 200)}`;
      const response = await axios.post('/api/generate-image', { prompt });
      setGeneratedImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleGenerateVoice = async () => {
    try {
      const voice = voiceMap[language][voiceGender] || 'es-ES-AlvaroNeural';
      const response = await axios.post('/api/generate-voice', { text: generatedText, voice });
      let audioUrl = response.data.audioUrl;

      const selectedMusic = musicOptions.find(m => m.name === backgroundMusic);
      if (selectedMusic && selectedMusic.url) {
        audioUrl = await mixAudioWithMusic(audioUrl, selectedMusic.url);
      }

      setGeneratedAudio(audioUrl);
    } catch (error) {
      console.error('Error generating voice:', error);
    }
  };

  const mixAudioWithMusic = async (ttsDataUrl, musicUrl) => {
    const ttsArrayBuffer = await fetch(ttsDataUrl).then(res => res.arrayBuffer());
    const musicArrayBuffer = await fetch(musicUrl).then(res => res.arrayBuffer());

    const audioCtx = new AudioContext();
    const ttsBuffer = await audioCtx.decodeAudioData(ttsArrayBuffer);
    const musicBuffer = await audioCtx.decodeAudioData(musicArrayBuffer);

    const length = Math.max(ttsBuffer.length, musicBuffer.length);
    const offlineCtx = new OfflineAudioContext(2, length, audioCtx.sampleRate);

    const ttsSource = offlineCtx.createBufferSource();
    ttsSource.buffer = ttsBuffer;
    ttsSource.connect(offlineCtx.destination);
    ttsSource.start(0);

    const musicSource = offlineCtx.createBufferSource();
    musicSource.buffer = musicBuffer;
    const gainNode = offlineCtx.createGain();
    gainNode.gain.value = 0.3;
    musicSource.connect(gainNode);
    gainNode.connect(offlineCtx.destination);
    musicSource.start(0);

    const renderedBuffer = await offlineCtx.startRendering();
    const wavBuffer = audioBufferToWav(renderedBuffer);
    const blob = new Blob([wavBuffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  };

  const audioBufferToWav = (buffer) => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const arrayBuffer = new ArrayBuffer(length);
    const view = new DataView(arrayBuffer);
    let offset = 0;

    const writeString = (str) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset++, str.charCodeAt(i));
      }
    };

    writeString('RIFF');
    view.setUint32(offset, length - 8, true);
    offset += 4;
    writeString('WAVE');
    writeString('fmt ');
    view.setUint32(offset, 16, true);
    offset += 4;
    view.setUint16(offset, 1, true);
    offset += 2;
    view.setUint16(offset, numOfChan, true);
    offset += 2;
    view.setUint32(offset, buffer.sampleRate, true);
    offset += 4;
    view.setUint32(offset, buffer.sampleRate * 2 * numOfChan, true);
    offset += 4;
    view.setUint16(offset, numOfChan * 2, true);
    offset += 2;
    view.setUint16(offset, 16, true);
    offset += 2;
    writeString('data');
    view.setUint32(offset, length - 44, true);
    offset += 4;

    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChan; channel++) {
        let sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i] || 0));
        sample = (sample < 0 ? sample * 32768 : sample * 32767) | 0;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
    }

    return arrayBuffer;
  };

  return (
    <div className="container">
      <div className="flex-container">
        <div className="flex-half">
          <h3>Primary Inputs</h3>
          <input
            type="text"
            placeholder="Queue of queues IDs e.g., 1,5,17..."
            value={queueIds}
            onChange={(e) => setQueueIds(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter topic reference"
            value={topicReference}
            onChange={(e) => setTopicReference(e.target.value)}
          />
          <textarea
            placeholder="Enter transcription"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
          />
        </div>
        <div className="flex-half">
          <h3>Additional Settings</h3>
          <input
            type="text"
            placeholder="Enter story topic"
            value={storyTopic}
            onChange={(e) => setStoryTopic(e.target.value)}
          />
          <div className="checkbox-group">
            <label>
              <input type="checkbox" checked={finished} onChange={(e) => setFinished(e.target.checked)} />
              Finished
            </label>
            <label>
              <input type="checkbox" checked={geoReplace} onChange={(e) => setGeoReplace(e.target.checked)} />
              Geo replace
            </label>
            <label>
              <input type="checkbox" checked={test} onChange={(e) => setTest(e.target.checked)} />
              Test
            </label>
          </div>
          <div className="flex-row">
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
          </div>
          <div className="flex-row">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>Choose geo</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <select value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)}>
              <option>Select voice</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <select value={backgroundMusic} onChange={(e) => setBackgroundMusic(e.target.value)}>
            <option>Choose a background music</option>
            <option value="Calm">Calm</option>
            <option value="Dramatic">Dramatic</option>
            <option value="Romantic">Romantic</option>
          </select>
        </div>
      </div>

      <div style={{ margin: '20px 0' }}>
        <button onClick={handleGenerateText}>Generate Text</button>
        <button onClick={handleGenerateImage}>Generate Image</button>
        <button onClick={handleGenerateVoice}>Generate Voice</button>
      </div>

      <div className="output-section">
        <h3>Generated Text</h3>
        <textarea value={generatedText} readOnly style={{ height: '200px' }} />

        <h3>Generated Image</h3>
        {generatedImage && <img src={generatedImage} alt="Generated Image" style={{ maxWidth: '100%' }} />}

        <h3>Generated Audio</h3>
        {generatedAudio && <audio controls src={generatedAudio} />}
      </div>
    </div>
  );
}

export default App;
