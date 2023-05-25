package de.maxkorte.quackrbackend.rest.controller;

import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.rest.dto.UserDTO;
import de.maxkorte.quackrbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @GetMapping({"/{username}", "/{username}/"})
    public ResponseEntity<User> getByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getByUsername(username));
    }

    @PostMapping({"", "/"})
    public ResponseEntity<User> create(@RequestBody UserDTO user) {
        return ResponseEntity.ok(userService.create(new User(null, user.getUsername(), user.getPassword())));
    }

    @DeleteMapping({"/{username}", "/{username}/"})
    public ResponseEntity<User> delete(@PathVariable String username) {
        userService.delete(username);
        return ResponseEntity.ok(null);
    }
}
