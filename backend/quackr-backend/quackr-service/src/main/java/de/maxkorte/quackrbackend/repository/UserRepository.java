package de.maxkorte.quackrbackend.repository;

import de.maxkorte.quackrbackend.User;

public interface UserRepository {
    User findByUsername(String username);
    User save(User user);
}
