package de.maxkorte.quackrbackend.adapter.rest.mapper;

import de.maxkorte.quackrbackend.adapter.rest.dto.in.UserDTOIn;
import de.maxkorte.quackrbackend.adapter.rest.dto.out.UserDTOOut;
import de.maxkorte.quackrbackend.domain.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapperRest {
    public User toDomain(UserDTOIn userDTO) {
        return new User(null, userDTO.getUsername(), userDTO.getPassword(), userDTO.getImageUrl(), "ROLE_USER");
    }

    public UserDTOOut toDTO(User user) {
        return new UserDTOOut(user.getUsername(), user.getImageUrl(), user.getRole());
    }
}
