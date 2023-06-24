package de.maxkorte.quackrbackend.core.service;

import de.maxkorte.quackrbackend.core.repository.UserRepository;
import de.maxkorte.quackrbackend.domain.User;
import de.maxkorte.quackrbackend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public User getUserByUsername(String username) {
        try {
            return userRepository.findByUsername(username);
        } catch (Exception e) {
            throw new UsernameNotFoundException("Username not found!");
        }
    }

    public User registerUser(User user) {
        return userRepository.save(User.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                        .imageUrl(user.getImageUrl())
                        .role(user.getRole())
                .build());
    }

    public String authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        User user;
        try {
            user = userRepository.findByUsername(username);
        } catch (Exception e) {
            throw new UsernameNotFoundException("Username not found!");
        }
        return jwtUtil.generateToken(user);
    }
}
