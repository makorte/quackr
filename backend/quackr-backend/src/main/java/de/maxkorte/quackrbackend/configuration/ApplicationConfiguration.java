package de.maxkorte.quackrbackend.configuration;

import de.maxkorte.quackrbackend.core.repository.UserRepository;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {
    private final UserRepository userRepository;
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            try {
                return userRepository.findByUsername(username);
            } catch (NoResultException e) {
                throw new UsernameNotFoundException("Username not found");
            }
        };
    }
}
