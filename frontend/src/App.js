import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ProjectDetail from './components/ProjectDetail';
import ProjectEdit from './components/ProjectEdit';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-brand">Research Project Tracker</Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Projects</Link>
              <Link to="/create" className="nav-link create-btn">Create New Project</Link>
            </div>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/create" element={<ProjectForm />} />
            <Route path="/view/:id" element={<ProjectDetail />} />
            <Route path="/edit/:id" element={<ProjectEdit />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
