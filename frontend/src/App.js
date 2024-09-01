import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PersonalStatementCreation from './pages/PersonalStatementCreation';
import PersonalStatementPolishing from './pages/PersonalStatementPolishing';
import ResumeCreation from './pages/ResumeCreation';
import ResumePolishing from './pages/ResumePolishing';
import SchoolSelectionPlan from './pages/SchoolSelectionPlan';
import UserInformation from './pages/UserInformation';
import { FaUserCircle } from 'react-icons/fa';

function App() {
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <div>
        <nav className={`navbar navbar-expand-lg navbar-light ${navbarScrolled ? 'scrolled' : ''}`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Apply Prep</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse w-100" id="navbarNav">
              <div className="mx-auto d-flex justify-content-center">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/ps_create">Personal Statement Creation</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/ps_polish">Personal Statement Polishing</Link>
                  </li>
                  {/*<li className="nav-item">*/}
                  {/*  <Link className="nav-link" to="/resume_create">Resume Creation</Link>*/}
                  {/*</li>*/}
                  <li className="nav-item">
                    <Link className="nav-link" to="/resume_polish">Resume Polishing</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/school_selection">School Selection Plan</Link>
                  </li>
                </ul>
              </div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/user_info">
                    <FaUserCircle size={30} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ps_create" element={<PersonalStatementCreation />} />
            <Route path="/ps_polish" element={<PersonalStatementPolishing />} />
            {/*<Route path="/resume_create" element={<ResumeCreation />} />*/}
            <Route path="/resume_polish" element={<ResumePolishing />} />
            <Route path="/school_selection" element={<SchoolSelectionPlan />} />
            <Route path="/user_info" element={<UserInformation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome to Apply Prep</h1>
      <p className="lead">Get assistance with your personal statements, resumes, and school selection plans.</p>
      <hr className="my-4" />
      <p>Use the menu to navigate through the available services.</p>
    </div>
  );
}

export default App;
