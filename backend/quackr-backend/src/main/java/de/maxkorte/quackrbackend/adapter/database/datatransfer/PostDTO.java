package de.maxkorte.quackrbackend.adapter.database.datatransfer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "quackr_post")
public class PostDTO {
    @Id
    @GeneratedValue
    private Long id;
    private String message;
    @ManyToOne
    private UserDTO user;
    private String imageUrl;
    private Timestamp date;
}
