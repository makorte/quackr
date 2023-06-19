package de.maxkorte.quackrbackend.rest.dto.in;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTOIn {
    private String username;
    private String password;
    private String imageUrl;
}
