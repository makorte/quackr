package de.maxkorte.quackrbackend.service;

import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public User create(User user) {
         return this.userRepository.save(user);
    }

    public User getByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public void delete(String username) {
        User user = userRepository.findByUsername(username);
        this.userRepository.delete(user.getId());
    }
}
