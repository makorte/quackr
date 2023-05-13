package de.maxkorte.quackrbackend.database.datatransfer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class UserDTO {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String username;
    @OneToMany(mappedBy = "user")
    private Set<MessageDTO> messages;
}
