// src/ImageOcrScanner.js
import React, { useState } from 'react';
import Webcam from 'react-webcam';

const ImageOcrScanner = ({ onExtractedText, API_KEY, language }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
        onExtractedText(extractedText);
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
    <div className="image-ocr-scanner">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="ocr-upload" />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Captured or Uploaded"
          className="ocr-preview"
        />
      )}

      <button onClick={handleExtractText} disabled={!image || loading} className="ocr-button">
        {loading ? 'Extracting Text...' : 'Extract Text'}
      </button>

      <WebcamCapture onCapture={handleCapture} />
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

export default ImageOcrScanner;
