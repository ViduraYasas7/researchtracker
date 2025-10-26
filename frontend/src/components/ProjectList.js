import React, { useState, useEffect } from 'react';
import ResearchProjectService from '../services/ResearchProjectService';
import './ProjectList.css';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = () => {
        setLoading(true);
        setError(null);
        ResearchProjectService.getAllProjects()
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load projects');
                setLoading(false);
                console.error('Error loading projects:', error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            ResearchProjectService.deleteProject(id)
                .then(() => {
                    loadProjects();
                })
                .catch(error => {
                    setError('Failed to delete project');
                    console.error('Error deleting project:', error);
                });
        }
    };

    const handleFilterByStatus = () => {
        if (filterStatus) {
            setLoading(true);
            ResearchProjectService.getProjectsByStatus(filterStatus)
                .then(response => {
                    setProjects(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to filter projects');
                    setLoading(false);
                });
        } else {
            loadProjects();
        }
    };

    const handleSearch = () => {
        if (searchTitle) {
            setLoading(true);
            ResearchProjectService.searchProjects(searchTitle)
                .then(response => {
                    setProjects(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to search projects');
                    setLoading(false);
                });
        } else {
            loadProjects();
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="project-list">
            <h2>Research Projects</h2>
            
            <div className="filters">
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                <div className="filter-group">
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="PLANNED">Planned</option>
                        <option value="ONGOING">Ongoing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                    <button onClick={handleFilterByStatus}>Filter</button>
                </div>

                <button onClick={loadProjects} className="clear-btn">Clear Filters</button>
            </div>

            <table className="projects-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Principal Investigator</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Budget</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="no-data">No projects found</td>
                        </tr>
                    ) : (
                        projects.map(project => (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{project.principalInvestigator}</td>
                                <td>
                                    <span className={`status-badge ${project.status.toLowerCase()}`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td>{formatDate(project.startDate)}</td>
                                <td>{formatDate(project.endDate)}</td>
                                <td>{project.budget ? `$${project.budget.toLocaleString()}` : 'N/A'}</td>
                                <td className="actions">
                                    <button 
                                        onClick={() => window.location.href = `/view/${project.id}`}
                                        className="view-btn"
                                    >
                                        View
                                    </button>
                                    <button 
                                        onClick={() => window.location.href = `/edit/${project.id}`}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(project.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectList;
