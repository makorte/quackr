package de.maxkorte.quackrbackend.database.datatransfer;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class MessageDTO {
    @Id
    private Long id;
    private String createdAt;
    private String title;
    private String body;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDTO user;
}
