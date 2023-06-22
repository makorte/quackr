package de.maxkorte.quackrbackend.adapter.database.dataaccess;

import de.maxkorte.quackrbackend.adapter.database.datatransfer.PostDTO;
import de.maxkorte.quackrbackend.adapter.database.datatransfer.UserDTO;
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
public class PostDAO {
    private final EntityManager entityManager;

    @Transactional
    public PostDTO save(PostDTO postDTO) {
        this.entityManager.persist(postDTO);
        return postDTO;
    }

    public List<PostDTO> findAll() {
        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<PostDTO> query = builder.createQuery(PostDTO.class);

        final Root<PostDTO> from = query.from(PostDTO.class);

        query.select(from);

        return this.entityManager.createQuery(query).getResultList();
    }

    public List<PostDTO> findByUser(UserDTO userDTO) {
        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<PostDTO> query = builder.createQuery(PostDTO.class);

        final Root<PostDTO> from = query.from(PostDTO.class);

        final Predicate predicate = builder.equal(from.get("user"), userDTO);

        query.select(from).where(predicate);

        return this.entityManager.createQuery(query).getResultList();
    }

    public PostDTO findById(Long id) {
        return this.entityManager.find(PostDTO.class, id);
    }

    @Transactional
    public void remove(Long id) {
        this.entityManager.remove(this.findById(id));
    }
}
