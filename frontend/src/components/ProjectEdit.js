import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResearchProjectService from '../services/ResearchProjectService';
import './ProjectForm.css';

function ProjectEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        principalInvestigator: '',
        startDate: '',
        endDate: '',
        status: 'PLANNED',
        fundingSource: '',
        budget: '',
        objectives: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ResearchProjectService.getProjectById(id)
            .then(response => {
                const project = response.data;
                setFormData({
                    title: project.title || '',
                    description: project.description || '',
                    principalInvestigator: project.principalInvestigator || '',
                    startDate: project.startDate || '',
                    endDate: project.endDate || '',
                    status: project.status || 'PLANNED',
                    fundingSource: project.fundingSource || '',
                    budget: project.budget || '',
                    objectives: project.objectives || ''
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading project:', error);
                setErrors({ submit: 'Failed to load project' });
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        
        if (!formData.principalInvestigator.trim()) {
            newErrors.principalInvestigator = 'Principal Investigator is required';
        }
        
        if (!formData.startDate) {
            newErrors.startDate = 'Start Date is required';
        }
        
        if (!formData.status) {
            newErrors.status = 'Status is required';
        }

        if (formData.budget && isNaN(formData.budget)) {
            newErrors.budget = 'Budget must be a number';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const projectData = {
            ...formData,
            budget: formData.budget ? parseFloat(formData.budget) : null
        };

        ResearchProjectService.updateProject(id, projectData)
            .then(() => {
                navigate(`/view/${id}`);
            })
            .catch(error => {
                console.error('Error updating project:', error);
                setErrors({ submit: 'Failed to update project. Please try again.' });
            });
    };

    const handleCancel = () => {
        navigate(`/view/${id}`);
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="project-form">
            <h2>Edit Research Project</h2>
            
            {errors.submit && <div className="error-message">{errors.submit}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="principalInvestigator">Principal Investigator *</label>
                    <input
                        type="text"
                        id="principalInvestigator"
                        name="principalInvestigator"
                        value={formData.principalInvestigator}
                        onChange={handleChange}
                        className={errors.principalInvestigator ? 'error' : ''}
                    />
                    {errors.principalInvestigator && <span className="error-text">{errors.principalInvestigator}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date *</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className={errors.startDate ? 'error' : ''}
                        />
                        {errors.startDate && <span className="error-text">{errors.startDate}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="status">Status *</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={errors.status ? 'error' : ''}
                        >
                            <option value="PLANNED">Planned</option>
                            <option value="ONGOING">Ongoing</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                        {errors.status && <span className="error-text">{errors.status}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="budget">Budget ($)</label>
                        <input
                            type="number"
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            step="0.01"
                            className={errors.budget ? 'error' : ''}
                        />
                        {errors.budget && <span className="error-text">{errors.budget}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="fundingSource">Funding Source</label>
                    <input
                        type="text"
                        id="fundingSource"
                        name="fundingSource"
                        value={formData.fundingSource}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="objectives">Objectives</label>
                    <textarea
                        id="objectives"
                        name="objectives"
                        value={formData.objectives}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">Update Project</button>
                    <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ProjectEdit;
