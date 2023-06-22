package de.maxkorte.quackrbackend.core.repository;

import de.maxkorte.quackrbackend.domain.Post;
import de.maxkorte.quackrbackend.domain.User;

import java.util.List;

public interface PostRepository {
    List<Post> findAll();
    Post findById(Long id);
    List<Post> findByUser(User user);
    Post save(Post post);
    void delete(Long id);
}
