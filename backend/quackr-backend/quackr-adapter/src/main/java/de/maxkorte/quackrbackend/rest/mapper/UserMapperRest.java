package de.maxkorte.quackrbackend.rest.mapper;

import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.rest.dto.in.UserDTOIn;
import org.springframework.stereotype.Component;

@Component
public class UserMapperRest {
    public User toDomain(UserDTOIn userDTOIn) {
        return new User(null, userDTOIn.getUsername(), userDTOIn.getPassword());
    }
}
