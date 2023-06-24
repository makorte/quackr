package de.maxkorte.quackrbackend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class Post {
    private final Long id;
    private String message;
    private User user;
    private String imageUrl;
    private Timestamp date;
}

