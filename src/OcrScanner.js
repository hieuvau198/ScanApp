// src/OcrScanner.js
import React, { useState } from 'react';
import Webcam from 'react-webcam';

const OcrScanner = () => {
  const [image, setImage] = useState(null);  // For holding uploaded or captured image
  const [text, setText] = useState('');      // To store extracted text
  const [loading, setLoading] = useState(false);  // For showing loading status
  const [language, setLanguage] = useState('eng');  // Default to English

  const API_KEY = 'K88680791888957';

  // For handling image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);  // Set the file itself for sending to OCR.space
  };

  // For handling text extraction using OCR.space API
  const handleExtractText = () => {
    if (!image) return;
    setLoading(true);
  
    const formData = new FormData();
    formData.append('apikey', API_KEY);
    formData.append('language', language);  // Use the selected language
    formData.append('file', image);
  
    fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("OCR API Response:", data);  // Log full OCR API response
        const extractedText = data.ParsedResults?.[0]?.ParsedText || 'No text found';
        setText(extractedText);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };
  

  // For capturing an image from webcam
  const handleCapture = (webcamRef) => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    // Log the base64 string (data URL) for debugging
  console.log("Captured Image (data URL):", imageSrc);
    // Convert base64 data URL to Blob for OCR.space compatibility
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
    // Show the captured image immediately for visual inspection
  const tempUrl = URL.createObjectURL(blob);
  console.log("Captured Image (Blob URL):", tempUrl);  // Log Blob URL
  window.open(tempUrl, "_blank");  // Open the image in a new tab to inspect it
  };
  

  return (
    <div>
      <h1>Image to Text Scanner</h1>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
      <option value="eng">English</option>
      <option value="vie">Vietnamese</option>
      {/* Add more languages as needed */}
    </select>
      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* Camera Capture */}
      <WebcamCapture onCapture={handleCapture} />

      {/* Display selected image */}
      {image && <img src={URL.createObjectURL(image)} alt="Captured or Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}

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
  width={640}  // Increase width for better resolution
  height={480}  // Increase height for better resolution
/>
      <button onClick={() => onCapture(webcamRef)}>Capture from Camera</button>
    </div>
  );
};

export default OcrScanner;
