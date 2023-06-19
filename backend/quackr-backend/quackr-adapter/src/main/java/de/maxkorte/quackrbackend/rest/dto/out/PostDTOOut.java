package de.maxkorte.quackrbackend.rest.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostDTOOut {
    private Long id;
    private String title;
    private String body;
    private String username;
}