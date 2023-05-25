package de.maxkorte.quackrbackend.database.implementation;

import de.maxkorte.quackrbackend.Message;
import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.database.dataaccess.MessageDAO;
import de.maxkorte.quackrbackend.database.mapper.MessageMapper;
import de.maxkorte.quackrbackend.database.mapper.UserMapper;
import de.maxkorte.quackrbackend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class MessageRepositoryImpl implements MessageRepository {
    private final MessageDAO messageDAO;
    private final MessageMapper messageMapper;
    private final UserMapper userMapper;

    @Override
    public List<Message> findAll() {
        return this.messageMapper.toDomainList(this.messageDAO.findAll());
    }

    @Override
    public Message findById(Long id) {
        return this.messageMapper.toDomain(this.messageDAO.findById(id));
    }

    @Override
    public List<Message> findByUser(User user) {
        return this.messageMapper.toDomainList(this.messageDAO.findByUser(userMapper.toDTO(user)));
    }

    @Override
    public Message save(Message message) {
        return this.messageMapper.toDomain(this.messageDAO.save(this.messageMapper.toDTO(message)));
    }

    @Override
    public void delete(Long id) {
        this.messageDAO.remove(id);
    }
}
