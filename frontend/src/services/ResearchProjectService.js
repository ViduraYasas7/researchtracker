import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/projects';

const ResearchProjectService = {
    getAllProjects() {
        return axios.get(API_BASE_URL);
    },

    getProjectById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    },

    getProjectsByStatus(status) {
        return axios.get(`${API_BASE_URL}/status/${status}`);
    },

    getProjectsByInvestigator(investigator) {
        return axios.get(`${API_BASE_URL}/investigator/${investigator}`);
    },

    searchProjects(title) {
        return axios.get(`${API_BASE_URL}/search`, {
            params: { title }
        });
    },

    createProject(project) {
        return axios.post(API_BASE_URL, project);
    },

    updateProject(id, project) {
        return axios.put(`${API_BASE_URL}/${id}`, project);
    },

    deleteProject(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    }
};

export default ResearchProjectService;
