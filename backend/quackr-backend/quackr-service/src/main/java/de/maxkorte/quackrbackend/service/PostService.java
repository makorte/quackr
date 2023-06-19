package de.maxkorte.quackrbackend.service;

import de.maxkorte.quackrbackend.Post;
import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.repository.PostRepository;
import de.maxkorte.quackrbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post createByUsername(String username, String title, String body) {
        User user = userRepository.findByUsername(username);
        return this.postRepository.save(new Post(null, title, body, user));
    }

    public List<Post> getAll() {
        return this.postRepository.findAll();
    }

    public Post getById(Long id) {
        return this.postRepository.findById(id);
    }

    public List<Post> getByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return this.postRepository.findByUser(user);
    }

    public void delete(Long id) {
        this.postRepository.delete(id);
    }
}