
package com.example.montra_backend.Service;

import com.example.montra_backend.dto.AuthResponseDTO;
import com.example.montra_backend.dto.LoginRequestDTO;
import com.example.montra_backend.dto.RegisterRequestDTO;
import com.example.montra_backend.Entity.User;
import com.example.montra_backend.exception.*;
import com.example.montra_backend.Repository.UserRepository;
import com.example.montra_backend.security.JwtTokenProvider;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public AuthResponseDTO register(RegisterRequestDTO dto) {

        String email = dto.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException(
                    "An account with this email already exists."
            );
        }

        User user = new User();
        user.setName(dto.getName().trim());
        user.setEmail(email);

        // Store the hashed password, never the plain-text password.
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        User savedUser = userRepository.save(user);

        String token = tokenProvider.generateToken(savedUser.getEmail());

        return new AuthResponseDTO(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO dto) {

        String email = dto.getEmail().trim().toLowerCase();

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                dto.getPassword()
                        )
                );

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadRequestException("User not found.")
                );

        String token = tokenProvider.generateToken(user.getEmail());

        return new AuthResponseDTO(
                token,
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new BadRequestException(
                    "No authenticated user found."
            );
        }

        Object principal = authentication.getPrincipal();

        String email;

        if (principal instanceof UserDetails userDetails) {
            email = userDetails.getUsername();
        } else {
            email = principal.toString();
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadRequestException(
                                "Authenticated user not found."
                        )
                );
    }
}
