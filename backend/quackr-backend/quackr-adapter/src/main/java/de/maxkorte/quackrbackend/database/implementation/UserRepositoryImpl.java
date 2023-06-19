package de.maxkorte.quackrbackend.database.implementation;

import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.database.dataaccess.UserDAO;
import de.maxkorte.quackrbackend.database.mapper.UserMapper;
import de.maxkorte.quackrbackend.repository.UserRepository;
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
