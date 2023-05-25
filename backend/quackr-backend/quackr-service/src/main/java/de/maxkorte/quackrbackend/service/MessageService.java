package de.maxkorte.quackrbackend.service;

import de.maxkorte.quackrbackend.Message;
import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.repository.MessageRepository;
import de.maxkorte.quackrbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public Message createByUsername(String username, String title, String body) {
        User user = userRepository.findByUsername(username);
        return this.messageRepository.save(new Message(null, title, body, user));
    }

    public List<Message> getAll() {
        return this.messageRepository.findAll();
    }

    public Message getById(Long id) {
        return this.messageRepository.findById(id);
    }

    public List<Message> getByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return this.messageRepository.findByUser(user);
    }

    public void delete(Long id) {
        this.messageRepository.delete(id);
    }
}
