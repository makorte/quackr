package de.maxkorte.quackrbackend.database.dataaccess;

import de.maxkorte.quackrbackend.database.datatransfer.MessageDTO;
import de.maxkorte.quackrbackend.database.datatransfer.UserDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageDAO {
    private final EntityManager entityManager;

    @Transactional
    public MessageDTO save(MessageDTO messageDTO) {
        this.entityManager.persist(messageDTO);
        return messageDTO;
    }

    public List<MessageDTO> findAll() {
        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<MessageDTO> query = builder.createQuery(MessageDTO.class);

        final Root<MessageDTO> from = query.from(MessageDTO.class);

        query.select(from);

        return this.entityManager.createQuery(query).getResultList();
    }

    public List<MessageDTO> findByUser(UserDTO userDTO) {
        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<MessageDTO> query = builder.createQuery(MessageDTO.class);

        final Root<MessageDTO> from = query.from(MessageDTO.class);

        final Predicate predicate = builder.equal(from.get("user"), userDTO);

        query.select(from).where(predicate);

        return this.entityManager.createQuery(query).getResultList();
    }

    public MessageDTO findById(Long id) {
        return this.entityManager.find(MessageDTO.class, id);
    }

    @Transactional
    public void remove(Long id) {
        this.entityManager.remove(this.findById(id));
    }
}
