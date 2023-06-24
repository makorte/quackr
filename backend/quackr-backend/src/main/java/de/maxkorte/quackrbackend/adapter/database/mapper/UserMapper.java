package de.maxkorte.quackrbackend.adapter.database.mapper;

import de.maxkorte.quackrbackend.adapter.database.datatransfer.UserDTO;
import de.maxkorte.quackrbackend.domain.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toDomain(UserDTO userDTO) {
        return new User(userDTO.getId(), userDTO.getUsername(), userDTO.getPassword(), userDTO.getImageUrl(), userDTO.getRole());
    }

    public UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getImageUrl(), user.getRole());
    }
}
