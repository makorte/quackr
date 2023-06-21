package de.maxkorte.quackrbackend.rest.controller;

import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.rest.dto.in.UserDTOIn;
import de.maxkorte.quackrbackend.rest.dto.out.AuthenticationResponse;
import de.maxkorte.quackrbackend.rest.mapper.UserMapperRest;
import de.maxkorte.quackrbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
    private final UserMapperRest userMapper;

    @PostMapping("/auth/register")
    public void register(@RequestBody UserDTOIn userDTOIn) {
        User savedUser = userService.registerUser(userMapper.toDomain(userDTOIn));
        ResponseEntity.ok(savedUser.getUsername());
    }

    @PostMapping("/auth/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody UserDTOIn userDTOIn) {
        String jwt = userService.authenticate(userDTOIn.getUsername(), userDTOIn.getPassword());
        User authenticatedUser = userService.getUserByUsername(userDTOIn.getUsername());
        return ResponseEntity.ok(new AuthenticationResponse(jwt, userMapper.toDTO(authenticatedUser)));
    }
}
