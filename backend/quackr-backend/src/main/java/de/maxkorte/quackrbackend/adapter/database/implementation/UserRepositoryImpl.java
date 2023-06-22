package de.maxkorte.quackrbackend.adapter.database.implementation;

import de.maxkorte.quackrbackend.adapter.database.dataaccess.UserDAO;
import de.maxkorte.quackrbackend.adapter.database.mapper.UserMapper;
import de.maxkorte.quackrbackend.core.repository.UserRepository;
import de.maxkorte.quackrbackend.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserRepositoryImpl implements UserRepository {

    private final UserDAO userDAO;
    private final UserMapper userMapper;

    @Override
    public User findByUsername(String username) {
        return userMapper.toDomain(userDAO.findByUsername(username));
    }

    @Override
    public User save(User user) {
        return userMapper.toDomain(userDAO.save(userMapper.toDTO(user)));
    }
}
