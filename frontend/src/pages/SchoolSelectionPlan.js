import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SchoolSelection() {
  const [formData, setFormData] = useState({
    degree: '',
    program: '',
    preferredRegion: '',
    currentEducation: {
      degree: '',
      program: '',
      institution: '',
      startDate: '',
      endDate: '',
      gpa: '',
    },
    pastEducation: [],
    internships: '',
    researches: '',
  });

  const [schoolSuggestions, setSchoolSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load saved user information
  const handleLoadSavedInfo = () => {
    const savedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (savedInfo) {
      setFormData({
        ...formData,
        currentEducation: savedInfo.currentEducation || { degree: '', program: '', institution: '', startDate: '', endDate: '', gpa: '' },
        pastEducation: savedInfo.additionalEducation || [],
        internships: savedInfo.internships?.map((intern) => intern.description).join(', ') || '',
        researches: savedInfo.researches?.map((research) => research.description).join(', ') || ''
      });
    } else {
      alert('No saved user information found.');
    }
  };

  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (savedInfo) {
      setFormData({
        ...formData,
        currentEducation: savedInfo.currentEducation || { degree: '', program: '', institution: '', startDate: '', endDate: '', gpa: '' },
        pastEducation: savedInfo.additionalEducation || [],
        internships: savedInfo.internships?.[0]?.description || '',
        researches: savedInfo.researches?.[0]?.description || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = formData.pastEducation.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    );
    setFormData({ ...formData, pastEducation: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      pastEducation: [...formData.pastEducation, { degree: '', program: '', institution: '', startDate: '', endDate: '', gpa: '' }]
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.pastEducation.filter((_, i) => i !== index);
    setFormData({ ...formData, pastEducation: updatedEducation });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSchoolSuggestions(''); // Clear previous suggestions
    try {
      const response = await fetch('http://localhost:5001/school_selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setSchoolSuggestions(data.school_suggestions);
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

  // Function to render school suggestions in table format
  const renderSuggestions = () => {
    if (!schoolSuggestions) return null;

    // Split suggestions by line
    const rows = schoolSuggestions.split('\n').map((row) => row.split('|'));

    return (
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>University</th>
            <th>University Ranking / Program Ranking</th>
            <th>Program Name</th>
            <th>Location</th>
            <th>Tuition</th>
            <th>Program Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{row[4]}</td>
              <td>
              {/* Extract and clean the URL inside the brackets */}
              {row[5]?.match(/\((https?:\/\/[^\s]+)\)/) ? (
                <a href={row[5].match(/\((https?:\/\/[^\s]+)\)/)[1]} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              ) : (
                'Invalid Link'
              )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
      <style>{keyframesStyle}</style>
      <h2 className="mb-4 page-title">School Selection</h2>
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
            <label>Preferred Region/Country</label>
            <input
              type="text"
              name="preferredRegion"
              className="form-control"
              value={formData.preferredRegion}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Current and Past Education Section */}
        {formData.currentEducation && (
          <div className="row">
            <div className="form-group col-md-2">
              <label>Current Degree</label>
              <input
                type="text"
                name="degree"
                className="form-control"
                value={formData.currentEducation.degree}
                onChange={(e) => handleChange({ target: { name: 'currentEducation.degree', value: e.target.value } })}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Program</label>
              <input
                type="text"
                name="program"
                className="form-control"
                value={formData.currentEducation.program}
                onChange={(e) => handleChange({ target: { name: 'currentEducation.program', value: e.target.value } })}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                className="form-control"
                value={formData.currentEducation.institution}
                onChange={(e) => handleChange({ target: { name: 'currentEducation.institution', value: e.target.value } })}
              />
            </div>
            <div className="form-group col-md-2">
              <label>GPA</label>
              <input
                type="text"
                name="gpa"
                className="form-control"
                value={formData.currentEducation.gpa}
                onChange={(e) => handleChange({ target: { name: 'currentEducation.gpa', value: e.target.value } })}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={formData.currentEducation.startDate}
                onChange={(e) => handleChange({ target: { name: 'currentEducation.startDate', value: e.target.value } })}
              />
            </div>
            <div className="form-group col-md-2">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={formData.currentEducation.endDate}
                onChange={(e) => handleChange({ target: { name: 'currentEducation.endDate', value: e.target.value } })}
              />
            </div>
          </div>
        )}

        {formData.pastEducation.map((edu, index) => (
          <div className="row" key={index}>
            <div className="form-group col-md-2">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                className="form-control"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Program</label>
              <input
                type="text"
                name="program"
                className="form-control"
                value={edu.program}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                className="form-control"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>GPA</label>
              <input
                type="text"
                name="gpa"
                className="form-control"
                value={edu.gpa}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={edu.startDate}
                onChange={(e) => handleEducationChange(index, e)}
              />
            </div>
            <div className="form-group col-md-2">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={edu.endDate}
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

        {/* Internship and Research Experience */}
        <div className="form-group">
          <label>Internship Experience</label>
          <textarea
            name="internships"
            className="form-control"
            value={formData.internships}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Research Experience</label>
          <textarea
            name="researches"
            className="form-control"
            value={formData.researches}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className='text-center mt-5'>
          <button type="submit" className="btn btn-primary mt-3">Generate School Selection</button>
        </div>
      </form>
      {isLoading && <div style={loaderStyle}></div>}
      {schoolSuggestions && renderSuggestions()}
    </div>
  );
}

export default SchoolSelection;
