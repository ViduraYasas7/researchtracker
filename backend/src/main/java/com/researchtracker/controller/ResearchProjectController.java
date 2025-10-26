package com.researchtracker.controller;

import com.researchtracker.model.ResearchProject;
import com.researchtracker.service.ResearchProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ResearchProjectController {

    @Autowired
    private ResearchProjectService service;

    @GetMapping
    public ResponseEntity<List<ResearchProject>> getAllProjects() {
        return ResponseEntity.ok(service.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResearchProject> getProjectById(@PathVariable Long id) {
        return service.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ResearchProject>> getProjectsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getProjectsByStatus(status));
    }

    @GetMapping("/investigator/{investigator}")
    public ResponseEntity<List<ResearchProject>> getProjectsByInvestigator(@PathVariable String investigator) {
        return ResponseEntity.ok(service.getProjectsByPrincipalInvestigator(investigator));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ResearchProject>> searchProjects(@RequestParam String title) {
        return ResponseEntity.ok(service.searchProjectsByTitle(title));
    }

    @PostMapping
    public ResponseEntity<ResearchProject> createProject(@Valid @RequestBody ResearchProject project) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createProject(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResearchProject> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ResearchProject projectDetails) {
        try {
            return ResponseEntity.ok(service.updateProject(id, projectDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        try {
            service.deleteProject(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
