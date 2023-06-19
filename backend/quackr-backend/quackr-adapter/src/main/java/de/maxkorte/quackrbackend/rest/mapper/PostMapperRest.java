package de.maxkorte.quackrbackend.rest.mapper;


import de.maxkorte.quackrbackend.Post;
import de.maxkorte.quackrbackend.rest.dto.out.PostDTOOut;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PostMapperRest {
    public PostDTOOut toDTO(Post post) {
        return new PostDTOOut(post.getId(), post.getTitle(), post.getBody(), post.getUser().getUsername(), post.getImageUrl());
    }

    public List<PostDTOOut> toDTOList(List<Post> posts) {
        return posts.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
