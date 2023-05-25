package de.maxkorte.quackrbackend;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Message {
    private final Long id;
    private String title;
    private String body;
    private User user;
}

