package de.maxkorte.quackrbackend.repository;

import de.maxkorte.quackrbackend.Message;
import de.maxkorte.quackrbackend.User;

import java.util.List;

public interface MessageRepository {
    List<Message> findAll();
    Message findById(Long id);
    List<Message> findByUser(User user);
    Message save(Message message);
    void delete(Long id);
}
