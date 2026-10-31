package com.example.montra_backend.controller;


import com.example.montra_backend.dto.AuthResponseDTO;
import com.example.montra_backend.dto.LoginRequestDTO;
import com.example.montra_backend.dto.RegisterRequestDTO;
import com.example.montra_backend.Entity.User;
import com.example.montra_backend.Service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO requestDTO) {

        AuthResponseDTO response = authService.register(requestDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO requestDTO) {

        AuthResponseDTO response = authService.login(requestDTO);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponseDTO> getCurrentUser() {

        User user = authService.getCurrentUser();

        AuthResponseDTO response = new AuthResponseDTO(
                null,
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}

