import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ResumePolishing() {
  const [file, setFile] = useState(null);
  const [polishedResume, setPolishedResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a PDF file.');
      return;
    }

    setIsLoading(true);
    setPolishedResume(''); // Clear previous polished result

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5001/resume_polish', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPolishedResume(data.polished_resume);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loaderStyle = {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
    margin: '20px auto',
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const formatResume = (text) => {
    const sections = text.split('\n').map((section, index) => (
      <p key={index} style={{ textAlign: 'left', marginBottom: '1em' }}>
        {section.trim()}
      </p>
    ));
    return sections;
  };

  return (
    <div className="container">
      <style>{keyframesStyle}</style> {/* Add the keyframes to the document */}
      <h2 className="mb-4 page-title">Polish Resume</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload Your Resume (PDF only)</label>
          <input
            type="file"
            className="form-control mb-3"
            onChange={handleFileChange}
            accept=".pdf"
          />
        </div>
        <div className='text-center'>
          <button type="submit" className="btn btn-primary mb-4">Polish My Resume</button>
        </div>
      </form>
      {isLoading && <div style={loaderStyle}></div>}
      {polishedResume && (
        <div className="mt-5">
          <h3>Polished Resume:</h3>
          <div className="border p-3">
            {formatResume(polishedResume)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePolishing;
