import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PersonalStatementPolishing() {
  const [formData, setFormData] = useState({ personal_statement: '', comments: '' });
  const [polishedPS, setPolishedPS] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPolishedPS('');
    setIsLoading(true);
    console.log("Submitting data:", formData);
    try {
      const response = await fetch('http://localhost:5001/ps_polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setPolishedPS(data.polished_personal_statement);
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

  return (
    <div className="container">
      <style>{keyframesStyle}</style> {/* Add the keyframes to the document */}
      <h2 className="mb-4 page-title">Polish Personal Statement</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Paste Your Personal Statement Here</label>
            <textarea
              name="personal_statement"
              className="form-control"
              value={formData.personal_statement}
              onChange={handleChange}
              rows="10"
            ></textarea>
          </div>
          <div className="form-group col-md-6">
            <label>Comments or Requirements</label>
            <textarea
              name="comments"
              className="form-control"
              value={formData.comments}
              onChange={handleChange}
              rows="10"
            ></textarea>
          </div>
        </div>
        <div className='text-center mt-5'>
          <button type="submit" className="btn btn-primary mt-3">Polish Personal Statement</button> {/* Added margin-top class */}
        </div>
      </form>
      {isLoading && <div style={loaderStyle}></div>}
      {polishedPS && (
        <div className="mt-5">
          <h3>Polished Personal Statement:</h3>
          <p dangerouslySetInnerHTML={{ __html: polishedPS.replace(/\n/g, '<br>') }} className="border p-3"></p>
        </div>
      )}
    </div>
  );
}

export default PersonalStatementPolishing;
