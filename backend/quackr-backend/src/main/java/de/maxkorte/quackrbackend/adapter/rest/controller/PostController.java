package de.maxkorte.quackrbackend.adapter.rest.controller;

import de.maxkorte.quackrbackend.adapter.rest.dto.in.PostDTOIn;
import de.maxkorte.quackrbackend.adapter.rest.dto.out.PostDTOOut;
import de.maxkorte.quackrbackend.adapter.rest.mapper.PostMapperRest;
import de.maxkorte.quackrbackend.core.service.PostService;
import de.maxkorte.quackrbackend.domain.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final PostMapperRest postMapper;

    @GetMapping({"/posts", "/posts/"})
    public ResponseEntity<List<PostDTOOut>> getAll() {
        return ResponseEntity.ok(postMapper.toDTOList(postService.getAll()));
    }

    @GetMapping({"/posts/{id}", "/posts/{id}/"})
    public ResponseEntity<PostDTOOut> getById(@PathVariable Long id) {
        return ResponseEntity.ok(postMapper.toDTO(postService.getById(id)));
    }

    @GetMapping({"/users/{username}/posts", "/users/{username}/posts/"})
    public ResponseEntity<List<PostDTOOut>> getByUsername(@PathVariable String username) {
        return ResponseEntity.ok(postMapper.toDTOList(postService.getByUsername(username)));
    }

    @PostMapping({"/posts", "/posts/"})
    public ResponseEntity<PostDTOOut> createPostByUsername(@RequestBody PostDTOIn post, Authentication authentication) {
        return ResponseEntity.ok(postMapper.toDTO(postService.createByUsername(authentication.getName(), post.getMessage(), post.getImageUrl())));
    }

    @PreAuthorize("authentication.name.equals(@postService.getById(#postId).getUser().getUsername())")
    @PutMapping({"/posts/{postId}"})
    public ResponseEntity<PostDTOOut> updatePost(@PathVariable Long postId, @RequestBody PostDTOIn postDTO, Authentication authentication) {
        return ResponseEntity.ok(postMapper.toDTO(postService.updatebyUsername(authentication.getName(), postId, postDTO.getMessage(), postDTO.getImageUrl())));
    }

    @PreAuthorize("authentication.name.equals(@postService.getById(#postId).getUser().getUsername())")
    @DeleteMapping({"/posts/{postId}/", "/posts/{postId}"})
    public ResponseEntity<Post> delete(@PathVariable Long postId) {
        this.postService.delete(postId);
        return ResponseEntity.ok(null);
    }
}
