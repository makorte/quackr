package de.maxkorte.quackrbackend;

import java.util.Date;

public record Message (Long id, Date date, String title, String body, User user) {
}
