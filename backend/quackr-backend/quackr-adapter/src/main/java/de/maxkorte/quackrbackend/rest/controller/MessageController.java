package de.maxkorte.quackrbackend.rest.controller;

import de.maxkorte.quackrbackend.Message;
import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.rest.dto.MessageDTO;
import de.maxkorte.quackrbackend.service.MessageService;
import de.maxkorte.quackrbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MessageController {
    private final MessageService messageService;
    private final UserService userService;

    @GetMapping({"/messages/all", "/messages/all/"})
    public ResponseEntity<List<Message>> getAll() {
        return ResponseEntity.ok(this.messageService.getAll());
    }

    @GetMapping({"/{username}/messages", "/{username}/messages/"})
    public ResponseEntity<List<Message>> getByUsername(@PathVariable String username) {
        return ResponseEntity.ok(messageService.getByUsername(username));
    }

    @PostMapping({"/{username}/messages", "/{username}/messages/"})
    public ResponseEntity<Message> createMessageByUsername(@PathVariable String username, @RequestBody MessageDTO message) {
        return ResponseEntity.ok(messageService.createByUsername(username, message.getTitle(), message.getBody()));
    }

    @DeleteMapping({"/{username}/messages/{messageId}/", "/{username}/messages/{messageId}"})
    public ResponseEntity<Message> delete(@PathVariable String username, @PathVariable Long messageId) {
        User user = userService.getByUsername(username);
        Message message = messageService.getById(messageId);

        if(!user.getId().equals(message.getUser().getId())) {
            return ResponseEntity.badRequest().body(null);
        }

        this.messageService.delete(messageId);
        return ResponseEntity.ok(null);
    }
}
