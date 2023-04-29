package de.maxkorte.quackrbackend.database.datatransfer;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
    private Long id;
    private String username;
    @OneToMany(mappedBy = "user")
    private Set<MessageDTO> messages;
}
