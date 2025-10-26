import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResearchProjectService from '../services/ResearchProjectService';
import './ProjectDetail.css';

function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProject = useCallback(() => {
        ResearchProjectService.getProjectById(id)
            .then(response => {
                setProject(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to load project details');
                setLoading(false);
                console.error('Error loading project:', error);
            });
    }, [id]);

    useEffect(() => {
        loadProject();
    }, [loadProject]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!project) return <div className="error">Project not found</div>;

    return (
        <div className="project-detail">
            <div className="detail-header">
                <h2>{project.title}</h2>
                <div className="detail-actions">
                    <button onClick={() => navigate(`/edit/${project.id}`)} className="edit-btn">
                        Edit
                    </button>
                    <button onClick={() => navigate('/')} className="back-btn">
                        Back to List
                    </button>
                </div>
            </div>

            <div className="detail-content">
                <div className="detail-section">
                    <h3>General Information</h3>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <label>Principal Investigator:</label>
                            <span>{project.principalInvestigator}</span>
                        </div>
                        <div className="detail-item">
                            <label>Status:</label>
                            <span className={`status-badge ${project.status.toLowerCase()}`}>
                                {project.status}
                            </span>
                        </div>
                        <div className="detail-item">
                            <label>Start Date:</label>
                            <span>{formatDate(project.startDate)}</span>
                        </div>
                        <div className="detail-item">
                            <label>End Date:</label>
                            <span>{formatDate(project.endDate)}</span>
                        </div>
                        <div className="detail-item">
                            <label>Funding Source:</label>
                            <span>{project.fundingSource || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <label>Budget:</label>
                            <span>{project.budget ? `$${project.budget.toLocaleString()}` : 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {project.description && (
                    <div className="detail-section">
                        <h3>Description</h3>
                        <p>{project.description}</p>
                    </div>
                )}

                {project.objectives && (
                    <div className="detail-section">
                        <h3>Objectives</h3>
                        <p>{project.objectives}</p>
                    </div>
                )}

                <div className="detail-section">
                    <h3>Metadata</h3>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <label>Created:</label>
                            <span>{formatDate(project.createdAt)}</span>
                        </div>
                        <div className="detail-item">
                            <label>Last Updated:</label>
                            <span>{formatDate(project.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
