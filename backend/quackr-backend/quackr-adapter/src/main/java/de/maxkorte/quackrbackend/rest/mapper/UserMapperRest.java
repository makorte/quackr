package de.maxkorte.quackrbackend.rest.mapper;

import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.rest.dto.UserDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapperRest {
    public UserDTO toDTO(User user) {
        return new UserDTO(user.getUsername(), null);
    }

    public User toDomain(UserDTO userDTO) {
        return new User(null, userDTO.getUsername(), userDTO.getPassword());
    }
}
