// src/OcrScanner.js
import React, { useState } from 'react';
import ParticlesBackground from './ParticlesBackground';
import ImageOcrScanner from './ImageOcrScanner';
import PdfOcrScanner from './PdfOcrScanner';

const OcrScanner = () => {
  const [inputType, setInputType] = useState('pdf');
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('eng');

  const API_KEY = 'K88680791888957';

  const handleExtractedText = (extractedText) => {
    setText(extractedText);
  };

  return (
    <div className="ocr-scanner">
      <ParticlesBackground />
      <h1 className="ocr-title">Document Scanner</h1>
      <select onChange={(e) => setLanguage(e.target.value)} value={language} className="ocr-select">
        <option value="eng">English</option>
        <option value="vie">Vietnamese</option>
      </select>

      <div className="input-type-selector">
        <label>
          <input
            type="radio"
            value="image"
            checked={inputType === 'image'}
            onChange={() => setInputType('image')}
          />
          Image
        </label>
        <label>
          <input
            type="radio"
            value="pdf"
            checked={inputType === 'pdf'}
            onChange={() => setInputType('pdf')}
          />
          PDF
        </label>
      </div>

      {inputType === 'image' ? (
        <ImageOcrScanner onExtractedText={handleExtractedText} API_KEY={API_KEY} language={language} />
      ) : (
        <PdfOcrScanner onExtractedText={handleExtractedText} API_KEY={API_KEY} language={language} />
      )}

      {text && (
        <div className="ocr-result">
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default OcrScanner;
