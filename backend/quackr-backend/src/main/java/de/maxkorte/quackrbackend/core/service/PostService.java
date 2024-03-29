package de.maxkorte.quackrbackend.core.service;

import de.maxkorte.quackrbackend.core.repository.PostRepository;
import de.maxkorte.quackrbackend.core.repository.UserRepository;
import de.maxkorte.quackrbackend.domain.Post;
import de.maxkorte.quackrbackend.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post createByUsername(String username, String message, String imageUrl) {
        User user = userRepository.findByUsername(username);
        return this.postRepository.save(new Post(null, message, user, imageUrl, Timestamp.valueOf(LocalDateTime.now())));
    }

    public Post update(Long postId, String message, String imageUrl) {
        User user = postRepository.findById(postId).getUser();
        return this.postRepository.update(new Post(postId, message, user, imageUrl, Timestamp.valueOf(LocalDateTime.now())));
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
