package de.maxkorte.quackrbackend;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    private final Long id;
    private String username;
    private String password;
}
