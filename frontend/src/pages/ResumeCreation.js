// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
//
// function ResumeCreation() {
//   const [formData, setFormData] = useState({
//     name: '',
//     contact: '',
//     personalWebsite: '',
//     currentEducation: {
//       degree: '',
//       program: '',
//       institution: '',
//       startDate: '',
//       endDate: '',
//     },
//     additionalEducation: [],
//     internships: [],
//     researches: [],
//     skills: ''
//   });
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
//
//   const handleEducationChange = (index, e, type) => {
//     const { name, value } = e.target;
//     if (type === 'current') {
//       setFormData({
//         ...formData,
//         currentEducation: { ...formData.currentEducation, [name]: value }
//       });
//     } else {
//       const updatedEducation = formData.additionalEducation.map((edu, i) =>
//         i === index ? { ...edu, [name]: value } : edu
//       );
//       setFormData({ ...formData, additionalEducation: updatedEducation });
//     }
//   };
//
//   const addAdditionalEducation = () => {
//     setFormData({
//       ...formData,
//       additionalEducation: [...formData.additionalEducation, { degree: '', program: '', institution: '', startDate: '', endDate: '' }]
//     });
//   };
//
//   const removeAdditionalEducation = (index) => {
//     const updatedEducation = formData.additionalEducation.filter((_, i) => i !== index);
//     setFormData({ ...formData, additionalEducation: updatedEducation });
//   };
//
//   const handleInternshipChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedInternships = formData.internships.map((intern, i) =>
//       i === index ? { ...intern, [name]: value } : intern
//     );
//     setFormData({ ...formData, internships: updatedInternships });
//   };
//
//   const addInternship = () => {
//     setFormData({
//       ...formData,
//       internships: [...formData.internships, { company: '', role: '', location: '', startDate: '', endDate: '', description: '' }]
//     });
//   };
//
//   const removeInternship = (index) => {
//     const updatedInternships = formData.internships.filter((_, i) => i !== index);
//     setFormData({ ...formData, internships: updatedInternships });
//   };
//
//   const handleResearchChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedResearches = formData.researches.map((research, i) =>
//       i === index ? { ...research, [name]: value } : research
//     );
//     setFormData({ ...formData, researches: updatedResearches });
//   };
//
//   const addResearch = () => {
//     setFormData({
//       ...formData,
//       researches: [...formData.researches, { institution: '', role: '', location: '', startDate: '', endDate: '', description: '' }]
//     });
//   };
//
//   const removeResearch = (index) => {
//     const updatedResearches = formData.researches.filter((_, i) => i !== index);
//     setFormData({ ...formData, researches: updatedResearches });
//   };
//
//   const handleLoadSavedInfo = () => {
//     const savedInfo = JSON.parse(localStorage.getItem('userInfo'));
//     if (savedInfo) {
//       setFormData({
//         name: savedInfo.name || '',
//         contact: savedInfo.contact || '',
//         personalWebsite: savedInfo.personalWebsite || '',
//         currentEducation: savedInfo.currentEducation || { degree: '', program: '', institution: '', startDate: '', endDate: '' },
//         additionalEducation: savedInfo.additionalEducation || [],
//         internships: savedInfo.internships || [],
//         researches: savedInfo.researches || [],
//         skills: formData.skills
//       });
//     } else {
//       alert('No saved user information found.');
//     }
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData)
//     try {
//       const response = await fetch('http://localhost:5001/generate_resume', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'resume.pdf';
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//       } else {
//         console.error('Failed to generate resume');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
// };
//
//
//   return (
//     <div className="container">
//       <h2 className="mb-4 page-title">Create Resume</h2>
//       <button type="button" className="btn btn-secondary mb-4" onClick={handleLoadSavedInfo}>
//         Load Saved Information
//       </button>
//       <form onSubmit={handleSubmit}>
//         {/* Personal Information Section */}
//         <div className="row">
//           <div className="form-group col-md-4">
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group col-md-4">
//             <label>Contact</label>
//             <input
//               type="text"
//               name="contact"
//               className="form-control"
//               value={formData.contact}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group col-md-4">
//             <label>Personal Website</label>
//             <input
//               type="text"
//               name="personalWebsite"
//               className="form-control"
//               value={formData.personalWebsite}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//
//         {/* Current Education Section */}
//         <h4>Current Education</h4>
//         <div className="row">
//           <div className="form-group col-md-2">
//             <label>Degree</label>
//             <input
//               type="text"
//               name="degree"
//               className="form-control"
//               value={formData.currentEducation.degree}
//               onChange={(e) => handleEducationChange(null, e, 'current')}
//             />
//           </div>
//           <div className="form-group col-md-2">
//             <label>Program</label>
//             <input
//               type="text"
//               name="program"
//               className="form-control"
//               value={formData.currentEducation.program}
//               onChange={(e) => handleEducationChange(null, e, 'current')}
//             />
//           </div>
//           <div className="form-group col-md-2">
//             <label>Institution</label>
//             <input
//               type="text"
//               name="institution"
//               className="form-control"
//               value={formData.currentEducation.institution}
//               onChange={(e) => handleEducationChange(null, e, 'current')}
//             />
//           </div>
//           <div className="form-group col-md-3">
//             <label>Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               className="form-control"
//               value={formData.currentEducation.startDate}
//               onChange={(e) => handleEducationChange(null, e, 'current')}
//             />
//           </div>
//           <div className="form-group col-md-3">
//             <label>End Date</label>
//             <input
//               type="date"
//               name="endDate"
//               className="form-control"
//               value={formData.currentEducation.endDate}
//               onChange={(e) => handleEducationChange(null, e, 'current')}
//             />
//           </div>
//         </div>
//
//         {/* Additional Education History Section */}
//         <h4>Additional Education</h4>
//         {formData.additionalEducation.map((edu, index) => (
//           <div className="row" key={index}>
//             <div className="form-group col-md-2">
//               <label>Degree</label>
//               <input
//                 type="text"
//                 name="degree"
//                 className="form-control"
//                 value={edu.degree}
//                 onChange={(e) => handleEducationChange(index, e, 'additional')}
//               />
//             </div>
//             <div className="form-group col-md-2">
//               <label>Program</label>
//               <input
//                 type="text"
//                 name="program"
//                 className="form-control"
//                 value={edu.program}
//                 onChange={(e) => handleEducationChange(index, e, 'additional')}
//               />
//             </div>
//             <div className="form-group col-md-2">
//               <label>Institution</label>
//               <input
//                 type="text"
//                 name="institution"
//                 className="form-control"
//                 value={edu.institution}
//                 onChange={(e) => handleEducationChange(index, e, 'additional')}
//               />
//             </div>
//             <div className="form-group col-md-3">
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 className="form-control"
//                 value={edu.startDate}
//                 onChange={(e) => handleEducationChange(index, e, 'additional')}
//               />
//             </div>
//             <div className="form-group col-md-3">
//               <label>End Date</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 className="form-control"
//                 value={edu.endDate}
//                 onChange={(e) => handleEducationChange(index, e, 'additional')}
//               />
//             </div>
//             <div className="form-group col-md-1 d-flex align-items-end">
//               <button type="button" className="btn btn-danger" onClick={() => removeAdditionalEducation(index)}>
//                 -
//               </button>
//             </div>
//           </div>
//         ))}
//         <button type="button" className="btn btn-secondary mt-3 mb-4" onClick={addAdditionalEducation}>
//           + Add Additional Education
//         </button>
//
//         {/* Internship/Work Experience Section */}
//         <h4>Internship/Work Experience</h4>
//         {formData.internships.map((intern, index) => (
//           <div key={index}>
//             <div className="row">
//               <div className="form-group col-md-2">
//                 <label>Company</label>
//                 <input
//                   type="text"
//                   name="company"
//                   className="form-control"
//                   value={intern.company}
//                   onChange={(e) => handleInternshipChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-2">
//                 <label>Role</label>
//                 <input
//                   type="text"
//                   name="role"
//                   className="form-control"
//                   value={intern.role}
//                   onChange={(e) => handleInternshipChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-2">
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   className="form-control"
//                   value={intern.location}
//                   onChange={(e) => handleInternshipChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <label>Start Date</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   className="form-control"
//                   value={intern.startDate}
//                   onChange={(e) => handleInternshipChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <label>End Date</label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   className="form-control"
//                   value={intern.endDate}
//                   onChange={(e) => handleInternshipChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-2 d-flex align-items-end">
//                 <button type="button" className="btn btn-danger" onClick={() => removeInternship(index)}>
//                   -
//                 </button>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 className="form-control"
//                 value={intern.description}
//                 onChange={(e) => handleInternshipChange(index, e)}
//                 rows="3"
//               ></textarea>
//             </div>
//           </div>
//         ))}
//         <button type="button" className="btn btn-secondary mt-3 mb-4" onClick={addInternship}>
//           + Add Internship/Work Experience
//         </button>
//
//         {/* Research Experience Section */}
//         <h4>Research Experience</h4>
//         {formData.researches.map((research, index) => (
//           <div key={index}>
//             <div className="row">
//               <div className="form-group col-md-2">
//                 <label>Institution</label>
//                 <input
//                   type="text"
//                   name="institution"
//                   className="form-control"
//                   value={research.institution}
//                   onChange={(e) => handleResearchChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-2">
//                 <label>Role</label>
//                 <input
//                   type="text"
//                   name="role"
//                   className="form-control"
//                   value={research.role}
//                   onChange={(e) => handleResearchChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-2">
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   className="form-control"
//                   value={research.location}
//                   onChange={(e) => handleResearchChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <label>Start Date</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   className="form-control"
//                   value={research.startDate}
//                   onChange={(e) => handleResearchChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-3">
//                 <label>End Date</label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   className="form-control"
//                   value={research.endDate}
//                   onChange={(e) => handleResearchChange(index, e)}
//                 />
//               </div>
//               <div className="form-group col-md-2 d-flex align-items-end">
//                 <button type="button" className="btn btn-danger" onClick={() => removeResearch(index)}>
//                   -
//                 </button>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 className="form-control"
//                 value={research.description}
//                 onChange={(e) => handleResearchChange(index, e)}
//                 rows="3"
//               ></textarea>
//             </div>
//           </div>
//         ))}
//         <button type="button" className="btn btn-secondary mt-3 mb-4" onClick={addResearch}>
//           + Add Research Experience
//         </button>
//
//         {/* Skills Section */}
//         <div className="form-group">
//           <label>Skills</label>
//           <textarea
//             name="skills"
//             className="form-control"
//             value={formData.skills}
//             onChange={handleChange}
//             rows="4"
//           ></textarea>
//         </div>
//
//         {/* Save and Generate Resume Button */}
//         <div className="text-center mt-5">
//           <button type="submit" className="btn btn-primary">Generate Resume</button>
//         </div>
//       </form>
//     </div>
//   );
// }
//
// export default ResumeCreation;
