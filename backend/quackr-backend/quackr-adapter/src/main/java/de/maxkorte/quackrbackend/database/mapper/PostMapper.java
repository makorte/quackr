package de.maxkorte.quackrbackend.database.mapper;

import de.maxkorte.quackrbackend.Post;
import de.maxkorte.quackrbackend.database.datatransfer.PostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostMapper {
    private final UserMapper userMapper;

    public Post toDomain(PostDTO postDTO) {
        return new Post(postDTO.getId(), postDTO.getTitle(), postDTO.getBody(), userMapper.toDomain(postDTO.getUser()), postDTO.getImageUrl());
    }

    public PostDTO toDTO(Post post) {
        return new PostDTO(post.getId(), post.getTitle(), post.getBody(), userMapper.toDTO(post.getUser()), post.getImageUrl());
    }

    public List<Post> toDomainList(List<PostDTO> postDTOS) {
        return postDTOS.stream().map(this::toDomain).collect(Collectors.toList());
    }
}
