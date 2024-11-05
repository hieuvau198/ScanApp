import React, { useEffect, useRef, useState } from 'react';
import './PdfOcrScanner.css'; // Import CSS file

const PdfOcrScanner = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const pdfContainerRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const extractTextFromPdf = async (file) => {
    setLoading(true);
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await window.pdfjsLib.getDocument(typedArray).promise;

      let text = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();

        // Create an array to store lines of text for this page
        const lines = [];
        for (const item of content.items) {
          // Push each item's text into lines array
          lines.push(item.str);
        }

        // Join lines with newlines to create a structured output
        text += lines.join(' ') + '\n\n'; // Add two new lines between pages for separation
      }

      setExtractedText(text);  // Store the extracted text in state
      setLoading(false);
    };

    fileReader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    if (pdfFile) {
      extractTextFromPdf(pdfFile);
    }
  }, [pdfFile]);

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {loading && <p>Loading...</p>}
      {extractedText && (
        <div >
          <h3>Extracted Text:</h3>
          <div className='extracted-container'>
          <pre className="extracted-text">{extractedText}</pre> {/* Use CSS class for styling */}
          </div>
          
        </div>
      )}
      <div ref={pdfContainerRef}></div>
    </div>
  );
};

export default PdfOcrScanner;
