package de.maxkorte.quackrbackend.core.repository;

import de.maxkorte.quackrbackend.domain.User;

public interface UserRepository {
    User findByUsername(String username);
    User save(User user);
}
