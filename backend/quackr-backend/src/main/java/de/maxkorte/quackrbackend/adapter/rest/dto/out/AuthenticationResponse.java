package de.maxkorte.quackrbackend.adapter.rest.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponse {
    private String jwt;
    private UserDTOOut user;
}
