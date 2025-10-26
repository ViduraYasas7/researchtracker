package lk.ijse.cmjd.researchtracker.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository repository;

    public List<Project> findAll() {
        return repository.findAll();
    }

    public Optional<Project> findById(String id) {
        return repository.findById(id);
    }

    public Project save(Project project) {
        return repository.save(project);
    }

    // Add update, delete, etc.
}