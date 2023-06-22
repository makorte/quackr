package de.maxkorte.quackrbackend.adapter.rest.mapper;


import de.maxkorte.quackrbackend.adapter.rest.dto.out.PostDTOOut;
import de.maxkorte.quackrbackend.domain.Post;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostMapperRest {
    public PostDTOOut toDTO(Post post) {
        return new PostDTOOut(post.getId(), post.getMessage(), post.getUser().getUsername(), post.getImageUrl(), post.getDate());
    }

    public List<PostDTOOut> toDTOList(List<Post> posts) {
        return posts.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
