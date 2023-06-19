package de.maxkorte.quackrbackend.database.mapper;

import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.database.datatransfer.UserDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toDomain(UserDTO userDTO) {
        return new User(userDTO.getId(), userDTO.getUsername(), userDTO.getPassword(), userDTO.getImageUrl());
    }

    public UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getImageUrl());
    }
}
