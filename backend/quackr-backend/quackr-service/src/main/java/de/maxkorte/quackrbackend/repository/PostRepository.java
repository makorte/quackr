package de.maxkorte.quackrbackend.repository;

import de.maxkorte.quackrbackend.Post;
import de.maxkorte.quackrbackend.User;

import java.util.List;

public interface PostRepository {
    List<Post> findAll();
    Post findById(Long id);
    List<Post> findByUser(User user);
    Post save(Post post);
    void delete(Long id);
}
