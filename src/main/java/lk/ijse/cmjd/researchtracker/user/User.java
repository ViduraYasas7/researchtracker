package lk.ijse.cmjd.researchtracker.user;

import jakarta.persistence.*;
import lk.ijse.cmjd.researchtracker.common.UserRole;
import lombok.Data;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Entity
@Data
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String fullName;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private LocalDateTime createdAt;
}