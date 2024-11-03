// src/OcrScanner.js
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './OcrScanner.css'; // Create this CSS file for styling
import ParticlesBackground from './ParticlesBackground';

const OcrScanner = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('eng');

  const API_KEY = 'K88680791888957';

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleExtractText = () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('apikey', API_KEY);
    formData.append('language', language);
    formData.append('file', image);

    fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const extractedText = data.ParsedResults?.[0]?.ParsedText || 'No text found';
        setText(extractedText);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handleCapture = (webcamRef) => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const base64toBlob = (dataURL) => {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    };

    const blob = base64toBlob(imageSrc);
    setImage(blob);
  };

  return (
    <div className="ocr-scanner">
        <ParticlesBackground />
      <h1 className="ocr-title">Image to Text Scanner</h1>
      <select
        onChange={(e) => setLanguage(e.target.value)}
        value={language}
        className="ocr-select"
      >
        <option value="eng">English</option>
        <option value="vie">Other (undeveloped)</option>
      </select>

      <div className="ocr-controls">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="ocr-upload" />
        {/* <WebcamCapture onCapture={handleCapture} /> */}
      </div>

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Captured or Uploaded"
          className="ocr-preview"
        />
      )}

      <button
        onClick={handleExtractText}
        disabled={!image || loading}
        className="ocr-button"
      >
        {loading ? 'Extracting Text...' : 'Extract Text'}
      </button>

      {text && (
        <div className="ocr-result">
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = React.useRef(null);

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        className="webcam"
      />
      <button onClick={() => onCapture(webcamRef)} className="ocr-button">
        Capture from Camera
      </button>
    </div>
  );
};

export default OcrScanner;
