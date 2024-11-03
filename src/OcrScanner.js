// src/OcrScanner.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Webcam from 'react-webcam';

const OcrScanner = () => {
  const [image, setImage] = useState(null);  // For holding uploaded or captured image
  const [text, setText] = useState('');      // To store extracted text
  const [loading, setLoading] = useState(false);  // For showing loading status

  // For handling image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));  // Convert image file to URL for display
  };

  // For handling text extraction using Tesseract
  const handleExtractText = () => {
    if (!image) return;
    setLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      { logger: (m) => console.log(m) }  // Logs the progress in console
    ).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  // For capturing an image from webcam
  const handleCapture = (webcamRef) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  return (
    <div>
      <h1>Image to Text Scanner</h1>

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* Camera Capture */}
      <WebcamCapture onCapture={handleCapture} />

      {/* Display selected image */}
      {image && <img src={image} alt="Captured or Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}

      {/* Button to start OCR */}
      <button onClick={handleExtractText} disabled={!image || loading}>
        {loading ? 'Extracting Text...' : 'Extract Text'}
      </button>

      {/* Display extracted text */}
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

// Subcomponent for Webcam capture
const WebcamCapture = ({ onCapture }) => {
  const webcamRef = React.useRef(null);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button onClick={() => onCapture(webcamRef)}>Capture from Camera</button>
    </div>
  );
};

export default OcrScanner;
