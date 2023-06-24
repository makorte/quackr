package de.maxkorte.quackrbackend.adapter.rest.dto.out;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTOOut {
    private String username;
    private String imageUrl;
    private String role;
}
