package de.maxkorte.quackrbackend;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class Post {
    private final Long id;
    private String message;
    private User user;
    private String imageUrl;
    private Date date;
}

