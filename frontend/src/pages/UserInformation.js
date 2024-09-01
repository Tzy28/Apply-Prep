import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserInformation() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    contact: '',
    personalWebsite: '',
    currentEducation: {
      degree: '',
      program: '',
      institution: '',
      startDate: '',
      endDate: '',
    },
    additionalEducation: [],
    internships: [],
    researches: []
  });

  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (savedInfo) {
      setUserInfo({
        name: savedInfo.name || '',
        contact: savedInfo.contact || '',
        personalWebsite: savedInfo.personalWebsite || '',
        currentEducation: savedInfo.currentEducation || { degree: '', program: '', institution: '', startDate: '', endDate: '' },
        additionalEducation: savedInfo.additionalEducation || [],
        internships: savedInfo.internships || [],
        researches: savedInfo.researches || []
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleEducationChange = (index, e, type) => {
    const { name, value } = e.target;
    if (type === 'current') {
      setUserInfo({
        ...userInfo,
        currentEducation: { ...userInfo.currentEducation, [name]: value }
      });
    } else {
      const updatedEducation = userInfo.additionalEducation.map((edu, i) =>
        i === index ? { ...edu, [name]: value } : edu
      );
      setUserInfo({ ...userInfo, additionalEducation: updatedEducation });
    }
  };

  const addAdditionalEducation = () => {
    setUserInfo({
      ...userInfo,
      additionalEducation: [...userInfo.additionalEducation, { degree: '', program: '', institution: '', startDate: '', endDate: '' }]
    });
  };

  const removeAdditionalEducation = (index) => {
    const updatedEducation = userInfo.additionalEducation.filter((_, i) => i !== index);
    setUserInfo({ ...userInfo, additionalEducation: updatedEducation });
  };

  const handleInternshipChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInternships = userInfo.internships.map((intern, i) =>
      i === index ? { ...intern, [name]: value } : intern
    );
    setUserInfo({ ...userInfo, internships: updatedInternships });
  };

  const addInternship = () => {
    setUserInfo({
      ...userInfo,
      internships: [...userInfo.internships, { company: '', role: '', location: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const removeInternship = (index) => {
    const updatedInternships = userInfo.internships.filter((_, i) => i !== index);
    setUserInfo({ ...userInfo, internships: updatedInternships });
  };

  const handleResearchChange = (index, e) => {
    const { name, value } = e.target;
    const updatedResearches = userInfo.researches.map((research, i) =>
      i === index ? { ...research, [name]: value } : research
    );
    setUserInfo({ ...userInfo, researches: updatedResearches });
  };

  const addResearch = () => {
    setUserInfo({
      ...userInfo,
      researches: [...userInfo.researches, { institution: '', role: '', location: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const removeResearch = (index) => {
    const updatedResearches = userInfo.researches.filter((_, i) => i !== index);
    setUserInfo({ ...userInfo, researches: updatedResearches });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    alert('User information saved!');
  };

  return (
    <div className="container">
      <h2 className="mb-4 page-title">User Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="row">
          <div className="form-group col-md-4">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={userInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              value={userInfo.contact}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Personal Website</label>
            <input
              type="text"
              name="personalWebsite"
              className="form-control"
              value={userInfo.personalWebsite}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Current Education Section */}
        <h4>Current Education</h4>
        <div className="row">
          <div className="form-group col-md-2">
            <label>Degree</label>
            <input
              type="text"
              name="degree"
              className="form-control"
              value={userInfo.currentEducation.degree}
              onChange={(e) => handleEducationChange(null, e, 'current')}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Program</label>
            <input
              type="text"
              name="program"
              className="form-control"
              value={userInfo.currentEducation.program}
              onChange={(e) => handleEducationChange(null, e, 'current')}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Institution</label>
            <input
              type="text"
              name="institution"
              className="form-control"
              value={userInfo.currentEducation.institution}
              onChange={(e) => handleEducationChange(null, e, 'current')}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              className="form-control w-100"
              value={userInfo.currentEducation.startDate}
              onChange={(e) => handleEducationChange(null, e, 'current')}
            />
          </div>
          <div className="form-group col-md-3">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              className="form-control w-100"
              value={userInfo.currentEducation.endDate}
              onChange={(e) => handleEducationChange(null, e, 'current')}
            />
          </div>
        </div>

        {/* Additional Education History Section */}
        <h4>Additional Education</h4>
        {userInfo.additionalEducation.map((edu, index) => (
          <div className="row" key={index}>
            <div className="form-group col-md-2">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                className="form-control"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e, 'additional')}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Program</label>
              <input
                type="text"
                name="program"
                className="form-control"
                value={edu.program}
                onChange={(e) => handleEducationChange(index, e, 'additional')}
              />
            </div>
            <div className="form-group col-md-2">
              <label>Institution</label>
              <input
                type="text"
                name="institution"
                className="form-control"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, e, 'additional')}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control w-100"
                value={edu.startDate}
                onChange={(e) => handleEducationChange(index, e, 'additional')}
              />
            </div>
            <div className="form-group col-md-3">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control w-100"
                value={edu.endDate}
                onChange={(e) => handleEducationChange(index, e, 'additional')}
              />
            </div>
            <div className="form-group col-md-1 d-flex align-items-end">
              <button type="button" className="btn btn-danger" onClick={() => removeAdditionalEducation(index)}>
                -
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-3 mb-4" onClick={addAdditionalEducation}>
          + Add Education History
        </button>

        {/* Internship/Work Experience Section */}
        <h4>Internship/Work Experience</h4>
        {userInfo.internships.map((intern, index) => (
          <div key={index}>
            <div className="row">
              <div className="form-group col-md-2">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  value={intern.company}
                  onChange={(e) => handleInternshipChange(index, e)}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  value={intern.role}
                  onChange={(e) => handleInternshipChange(index, e)}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={intern.location}
                  onChange={(e) => handleInternshipChange(index, e)}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control w-100"
                  value={intern.startDate}
                  onChange={(e) => handleInternshipChange(index, e)}
                />
              </div>
              <div className="form-group col-md-3">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control w-100"
                  value={intern.endDate}
                  onChange={(e) => handleInternshipChange(index, e)}
                />
              </div>
              <div className="form-group col-md-2 d-flex align-items-end">
                <button type="button" className="btn btn-danger" onClick={() => removeInternship(index)}>
                  -
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={intern.description}
                onChange={(e) => handleInternshipChange(index, e)}
                rows="3"
              ></textarea>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-3 mb-4" onClick={addInternship}>
          + Add Internship/Work Experience
        </button>

        {/* Research Experience Section */}
        <h4>Research Experience</h4>
        {userInfo.researches.map((research, index) => (
          <div key={index}>
            <div className="row">
              <div className="form-group col-md-2">
                <label>Institution</label>
                <input
                  type="text"
                  name="institution"
                  className="form-control"
                  value={research.institution}
                  onChange={(e) => handleResearchChange(index, e)}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  value={research.role}
                  onChange={(e) => handleResearchChange(index, e)}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={research.location}
                  onChange={(e) => handleResearchChange(index, e)}
                />
              </div>
              <div className="form-group col-md-3">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control w-100"
                  value={research.startDate}
                  onChange={(e) => handleResearchChange(index, e)}
                />
              </div>
              <div className="form-group col-md-3">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control w-100"
                  value={research.endDate}
                  onChange={(e) => handleResearchChange(index, e)}
                />
              </div>
              <div className="form-group col-md-2 d-flex align-items-end">
                <button type="button" className="btn btn-danger" onClick={() => removeResearch(index)}>
                  -
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={research.description}
                onChange={(e) => handleResearchChange(index, e)}
                rows="3"
              ></textarea>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-3 mb-4" onClick={addResearch}>
          + Add Research Experience
        </button>

        {/* Save Information Button */}
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary">Save Information</button>
        </div>
      </form>
    </div>
  );
}

export default UserInformation;
