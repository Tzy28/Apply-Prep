import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PersonalStatementCreation() {
  const [formData, setFormData] = useState({
    degree: '',
    program: '',
    institution_applying: '',
    current_degree: '',
    current_program: '',
    institution: '',
    additional_education: [],
    internship: '',
    research: '',
    other_requirements: '',
    word_count: '',
  });

  const [generatedPS, setGeneratedPS] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load saved information from localStorage when the user clicks the load button
  const handleLoadSavedInfo = () => {
     const savedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (savedInfo) {
      setFormData({
        degree: formData.degree,
        program: formData.program,
        institution_applying: formData.institution_applying,
        current_degree: savedInfo.currentEducation?.degree || '',
        current_program: savedInfo.currentEducation?.program || '',
        institution: savedInfo.currentEducation?.institution || '',
        additional_education: savedInfo.additionalEducation || [],
        internship: savedInfo.internships?.[0]?.description || '',  // Handle if internships is empty
        research: savedInfo.researches?.[0]?.description || '',    // Handle if researches is empty
        other_requirements: formData.other_requirements,
        word_count: formData.word_count,
      });
    } else {
      alert('No saved user information found.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = formData.additional_education.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    );
    setFormData({ ...formData, additional_education: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      additional_education: [...formData.additional_education, { degree: '', program: '', institution: '' }]
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.additional_education.filter((_, i) => i !== index);
    setFormData({ ...formData, additional_education: updatedEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedPS(''); // Clear previous generated result
    console.log("Submitting data:", formData);
    try {
      const response = await fetch('http://localhost:5001/ps_create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log("Response data:", data);
      setGeneratedPS(data.personal_statement);
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
      <style>{keyframesStyle}</style>
      <h2 className="mb-4 page-title">Create Personal Statement</h2>
      <button type="button" className="btn btn-secondary mb-4" onClick={handleLoadSavedInfo}>
        Load Saved Information
      </button>
      <form onSubmit={handleSubmit}>
        {/* Applying For Section */}
        <div className="row">
          <div className="form-group col-md-4">
            <label>Degree Applying For</label>
            <input
              type="text"
              name="degree"
              className="form-control"
              value={formData.degree}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Program Applying For</label>
            <input
              type="text"
              name="program"
              className="form-control"
              value={formData.program}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Institution Applying To</label>
            <input
              type="text"
              name="institution_applying"
              className="form-control"
              value={formData.institution_applying}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Current Education Info Section */}
        <div className="row">
          <div className="form-group col-md-4">
            <label>Current Degree</label>
            <input
              type="text"
              name="current_degree"
              className="form-control"
              value={formData.current_degree}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Current Program</label>
            <input
              type="text"
              name="current_program"
              className="form-control"
              value={formData.current_program}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Institution</label>
            <input
              type="text"
              name="institution"
              className="form-control"
              value={formData.institution}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Additional Education History Section */}
        {formData.additional_education.map((edu, index) => (
          <div className="row" key={index}>
            <div className="form-group col-md-4">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                className="form-control"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div className="form-group col-md-4">
              <label>Program</label>
              <input
                type="text"
                name="program"
                className="form-control"
                value={edu.program}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                className="form-control"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div className="form-group col-md-1 d-flex align-items-end">
              <button type="button" className="btn btn-danger" onClick={() => removeEducation(index)}>
                -
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary mt-3 mb-3" onClick={addEducation}>
          + Add Education History
        </button>

        {/* Internship, Research, and Other Requirements */}
        <div className="form-group">
          <label>Internship Experience</label>
          <textarea
            name="internship"
            className="form-control"
            value={formData.internship}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Research Experience</label>
          <textarea
            name="research"
            className="form-control"
            value={formData.research}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Other Requirements</label>
          <input
            type="text"
            name="other_requirements"
            className="form-control"
            value={formData.other_requirements}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Word Count</label>
          <input
            type="text"
            name="word_count"
            className="form-control"
            value={formData.word_count}
            onChange={handleChange}
          />
        </div>
        <div className='text-center mt-5'>
          <button type="submit" className="btn btn-primary mt-3">Generate Personal Statement</button>
        </div>
      </form>
      {isLoading && <div style={loaderStyle}></div>}
      {generatedPS && (
        <div className="mt-5">
          <h3>Generated Personal Statement:</h3>
          <p dangerouslySetInnerHTML={{ __html: generatedPS.replace(/\n/g, '<br>') }} className="border p-3"></p>
        </div>
      )}
    </div>
  );
}

export default PersonalStatementCreation;
