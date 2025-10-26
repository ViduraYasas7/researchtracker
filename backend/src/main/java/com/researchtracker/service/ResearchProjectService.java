package com.researchtracker.service;

import com.researchtracker.model.ResearchProject;
import com.researchtracker.repository.ResearchProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResearchProjectService {

    @Autowired
    private ResearchProjectRepository repository;

    public List<ResearchProject> getAllProjects() {
        return repository.findAll();
    }

    public Optional<ResearchProject> getProjectById(Long id) {
        return repository.findById(id);
    }

    public List<ResearchProject> getProjectsByStatus(String status) {
        return repository.findByStatus(status);
    }

    public List<ResearchProject> getProjectsByPrincipalInvestigator(String principalInvestigator) {
        return repository.findByPrincipalInvestigator(principalInvestigator);
    }

    public List<ResearchProject> searchProjectsByTitle(String title) {
        return repository.findByTitleContainingIgnoreCase(title);
    }

    public ResearchProject createProject(ResearchProject project) {
        return repository.save(project);
    }

    public ResearchProject updateProject(Long id, ResearchProject projectDetails) {
        ResearchProject project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setPrincipalInvestigator(projectDetails.getPrincipalInvestigator());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        project.setStatus(projectDetails.getStatus());
        project.setFundingSource(projectDetails.getFundingSource());
        project.setBudget(projectDetails.getBudget());
        project.setObjectives(projectDetails.getObjectives());

        return repository.save(project);
    }

    public void deleteProject(Long id) {
        ResearchProject project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        repository.delete(project);
    }
}
