package de.maxkorte.quackrbackend.adapter.rest.mapper;


import de.maxkorte.quackrbackend.adapter.rest.dto.out.PostDTOOut;
import de.maxkorte.quackrbackend.domain.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostMapperRest {
    private final UserMapperRest userMapper;
    public PostDTOOut toDTO(Post post) {
        return new PostDTOOut(post.getId(), post.getMessage(), this.userMapper.toDTO(post.getUser()), post.getImageUrl(), post.getDate());
    }

    public List<PostDTOOut> toDTOList(List<Post> posts) {
        return posts.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
