package de.maxkorte.quackrbackend.adapter.database.mapper;

import de.maxkorte.quackrbackend.adapter.database.datatransfer.PostDTO;
import de.maxkorte.quackrbackend.domain.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostMapper {
    private final UserMapper userMapper;

    public Post toDomain(PostDTO postDTO) {
        return new Post(postDTO.getId(), postDTO.getMessage(),  userMapper.toDomain(postDTO.getUser()), postDTO.getImageUrl(), postDTO.getDate());
    }

    public PostDTO toDTO(Post post) {
        return new PostDTO(post.getId(), post.getMessage(), userMapper.toDTO(post.getUser()), post.getImageUrl(), post.getDate());
    }

    public List<Post> toDomainList(List<PostDTO> postDTOS) {
        return postDTOS.stream().map(this::toDomain).collect(Collectors.toList());
    }
}
