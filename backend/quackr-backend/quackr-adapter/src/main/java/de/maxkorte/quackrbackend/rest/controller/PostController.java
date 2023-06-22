package de.maxkorte.quackrbackend.rest.controller;

import de.maxkorte.quackrbackend.Post;
import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.rest.dto.in.PostDTOIn;
import de.maxkorte.quackrbackend.rest.dto.out.PostDTOOut;
import de.maxkorte.quackrbackend.rest.mapper.PostMapperRest;
import de.maxkorte.quackrbackend.service.PostService;
import de.maxkorte.quackrbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostController {
    private final PostService postService;
    private final UserService userService;
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

    @PreAuthorize("#username.equals(authentication.name)")
    @DeleteMapping({"/{username}/posts/{postId}/", "/{username}/posts/{postId}"})
    public ResponseEntity<Post> delete(@PathVariable String username, @PathVariable Long postId) {
        User user = userService.getUserByUsername(username);
        Post post = postService.getById(postId);

        if (!user.getId().equals(post.getUser().getId())) {
            return ResponseEntity.badRequest().body(null);
        }

        this.postService.delete(postId);
        return ResponseEntity.ok(null);
    }
}
