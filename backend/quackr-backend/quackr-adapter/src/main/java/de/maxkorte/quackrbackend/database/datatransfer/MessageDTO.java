package de.maxkorte.quackrbackend.database.datatransfer;

import jakarta.persistence.*;
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
    @GeneratedValue
    private Long id;
    private String createdAt;
    private String title;
    private String body;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDTO user;
}
