package de.maxkorte.quackrbackend.rest.controller;

import de.maxkorte.quackrbackend.rest.dto.UserDTO;
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

    @GetMapping({"/{username}", "/{username}/"})
    public ResponseEntity<UserDTO> getByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userMapper.toDTO((userService.getUserByUsername(username))));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userMapper.toDTO(userService.registerUser(userMapper.toDomain(userDTO))));
    }

    @PostMapping("/auth/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.authenticate(userDTO.getUsername(), userDTO.getPassword()));
    }
}
