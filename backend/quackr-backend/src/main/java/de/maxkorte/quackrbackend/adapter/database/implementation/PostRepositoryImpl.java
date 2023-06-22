package de.maxkorte.quackrbackend.adapter.database.implementation;

import de.maxkorte.quackrbackend.adapter.database.dataaccess.PostDAO;
import de.maxkorte.quackrbackend.adapter.database.mapper.PostMapper;
import de.maxkorte.quackrbackend.adapter.database.mapper.UserMapper;
import de.maxkorte.quackrbackend.core.repository.PostRepository;
import de.maxkorte.quackrbackend.domain.Post;
import de.maxkorte.quackrbackend.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class PostRepositoryImpl implements PostRepository {
    private final PostDAO postDAO;
    private final PostMapper postMapper;
    private final UserMapper userMapper;

    @Override
    public List<Post> findAll() {
        return this.postMapper.toDomainList(this.postDAO.findAll());
    }

    @Override
    public Post findById(Long id) {
        return this.postMapper.toDomain(this.postDAO.findById(id));
    }

    @Override
    public List<Post> findByUser(User user) {
        return this.postMapper.toDomainList(this.postDAO.findByUser(userMapper.toDTO(user)));
    }

    @Override
    public Post save(Post post) {
        return this.postMapper.toDomain(this.postDAO.save(this.postMapper.toDTO(post)));
    }

    @Override
    public void delete(Long id) {
        this.postDAO.remove(id);
    }
}
