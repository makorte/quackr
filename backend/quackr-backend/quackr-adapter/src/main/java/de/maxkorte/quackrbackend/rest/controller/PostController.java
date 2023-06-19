package de.maxkorte.quackrbackend.rest.controller;

import de.maxkorte.quackrbackend.Post;
import de.maxkorte.quackrbackend.User;
import de.maxkorte.quackrbackend.rest.dto.PostDTO;
import de.maxkorte.quackrbackend.service.PostService;
import de.maxkorte.quackrbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostController {
    private final PostService postService;
    private final UserService userService;

    @GetMapping({"/posts/all", "/posts/all/"})
    public ResponseEntity<List<Post>> getAll() {
        return ResponseEntity.ok(this.postService.getAll());
    }

    @GetMapping({"/{username}/posts", "/{username}/posts/"})
    public ResponseEntity<List<Post>> getByUsername(@PathVariable String username) {
        return ResponseEntity.ok(postService.getByUsername(username));
    }

    @PostMapping({"/{username}/posts", "/{username}/posts/"})
    public ResponseEntity<Post> createPostByUsername(@PathVariable String username, @RequestBody PostDTO post) {
        return ResponseEntity.ok(postService.createByUsername(username, post.getTitle(), post.getBody()));
    }

    @DeleteMapping({"/{username}/posts/{postId}/", "/{username}/posts/{postId}"})
    public ResponseEntity<Post> delete(@PathVariable String username, @PathVariable Long postId) {
        User user = userService.getUserByUsername(username);
        Post post = postService.getById(postId);

        if(!user.getId().equals(post.getUser().getId())) {
            return ResponseEntity.badRequest().body(null);
        }

        this.postService.delete(postId);
        return ResponseEntity.ok(null);
    }
}
