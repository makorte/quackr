package de.maxkorte.quackrbackend.database.dataaccess;

import de.maxkorte.quackrbackend.database.datatransfer.UserDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDAO {
    private final EntityManager entityManager;

    @Transactional
    public UserDTO save(UserDTO userDTO) {
        this.entityManager.persist(userDTO);
        return userDTO;
    }

    public UserDTO findById(Long id) {
        return this.entityManager.find(UserDTO.class, id);
    }

    public UserDTO findByUsername(String username) {
        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<UserDTO> query = builder.createQuery(UserDTO.class);

        final Root<UserDTO> from = query.from(UserDTO.class);

        final Predicate predicate = builder.equal(from.get("username"), username);

        query.select(from).where(predicate);

        return this.entityManager.createQuery(query).getSingleResult();
    }

    @Transactional
    public void remove(Long id) {
        this.entityManager.remove(this.findById(id));
    }
}
