package de.maxkorte.quackrbackend.adapter.rest.controller;

import de.maxkorte.quackrbackend.adapter.rest.dto.in.UserDTOIn;
import de.maxkorte.quackrbackend.adapter.rest.dto.out.AuthenticationResponse;
import de.maxkorte.quackrbackend.adapter.rest.dto.out.UserDTOOut;
import de.maxkorte.quackrbackend.adapter.rest.mapper.UserMapperRest;
import de.maxkorte.quackrbackend.core.service.UserService;
import de.maxkorte.quackrbackend.domain.User;
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

    @GetMapping("/users/{username}")
    public ResponseEntity<UserDTOOut> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userMapper.toDTO(userService.getUserByUsername(username)));
    }
}
