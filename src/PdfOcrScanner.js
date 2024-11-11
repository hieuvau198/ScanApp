import React, { useEffect, useRef, useState } from 'react';
import './PdfOcrScanner.css';
import DataAnalyst from './DataAnalyst';

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

        const lines = [];
        for (const item of content.items) {
          lines.push(item.str);
        }

        text += lines.join(' ') + '\n\n';
      }

      setExtractedText(text); // Store the extracted text in state
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
        <div>
          
          <DataAnalyst extractedText={extractedText} /> {/* Pass extracted text */}
        </div>
      )}
      <div ref={pdfContainerRef}></div>
    </div>
  );
};

export default PdfOcrScanner;
