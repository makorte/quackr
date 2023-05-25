package de.maxkorte.quackrbackend.database.mapper;

import de.maxkorte.quackrbackend.Message;
import de.maxkorte.quackrbackend.database.datatransfer.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MessageMapper {
    private final UserMapper userMapper;

    public Message toDomain(MessageDTO messageDTO) {
        return new Message(messageDTO.getId(), messageDTO.getTitle(), messageDTO.getBody(), userMapper.toDomain(messageDTO.getUser()));
    }

    public MessageDTO toDTO(Message message) {
        return new MessageDTO(message.getId(), message.getTitle(), message.getBody(), userMapper.toDTO(message.getUser()));
    }

    public List<Message> toDomainList(List<MessageDTO> messageDTOs) {
        return messageDTOs.stream().map(this::toDomain).collect(Collectors.toList());
    }
}
