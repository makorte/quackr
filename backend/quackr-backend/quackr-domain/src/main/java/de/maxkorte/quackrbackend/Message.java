package de.maxkorte.quackrbackend;

import java.util.Date;

public record Message (Long id, String createdAt, String title, String body, User user) {
}
