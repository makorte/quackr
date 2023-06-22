package de.maxkorte.quackrbackend.adapter.rest.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class PostDTOOut {
    private Long id;
    private String message;
    private String username;
    private String imageUrl;
    private Date date;
}
