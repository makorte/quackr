package de.maxkorte.quackrbackend.rest.mapper;

import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.rest.dto.in.UserDTOIn;
import de.maxkorte.quackrbackend.rest.dto.out.UserDTOOut;
import org.springframework.stereotype.Component;

@Component
public class UserMapperRest {
    public User toDomain(UserDTOIn userDTO) {
        return new User(null, userDTO.getUsername(), userDTO.getPassword(), userDTO.getImageUrl());
    }

    public UserDTOOut toDTO(User user) {
        return new UserDTOOut(user.getUsername(), user.getImageUrl());
    }
}
