import React, { useState } from 'react';
import axios from 'axios';
import './TextInput.css';

function TextInput() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await axios.post('http://localhost:5000/api/text/text-to-speech', {
        text: text
      });

      if (response.data.success) {
        // Construct the full URL for the audio file
        const fullAudioUrl = `http://localhost:5000${response.data.audioUrl}`;
        setAudioUrl(fullAudioUrl);
        
        // Optional: Automatically play the audio
        const audio = new Audio(fullAudioUrl);
        audio.play();
      } else {
        setError('Failed to generate speech');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error generating speech');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">

      <main className="main-content">
        <h1>Emotion-Infused Speech Synthesis</h1>
        <p className="subtitle">
          Convert your text into lifelike, emotionally rich speech. Select emotions 
          to make your speech sound happy, sad, or surprised.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Fast Audio Processing</h3>
          </div>
          <div className="feature-card">
            <h3>Multi-Language Support</h3>
          </div>
          <div className="feature-card">
            <h3>High Conversion Accuracy</h3>
          </div>
          <div className="feature-card">
            <h3>Secure Data Handling</h3>
          </div>
        </div>

        <div className="input-section">
          <h2>Start Generating Speech Now!</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text"
                className="text-input"
              />
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading || !text.trim()}
              >
                →
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message">{error}</div>
          )}

          {audioUrl && (
            <div className="audio-player">
              <audio controls src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
              <div>
                <a href={audioUrl} download className="download-button">
                  Download Audio
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TextInput;
