package com.researchtracker.repository;

import com.researchtracker.model.ResearchProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResearchProjectRepository extends JpaRepository<ResearchProject, Long> {
    List<ResearchProject> findByStatus(String status);
    List<ResearchProject> findByPrincipalInvestigator(String principalInvestigator);
    List<ResearchProject> findByTitleContainingIgnoreCase(String title);
}
