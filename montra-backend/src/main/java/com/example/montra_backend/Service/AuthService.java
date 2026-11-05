package com.example.montra_backend.Service;




import com.example.montra_backend.dto.AuthResponse;
import com.example.montra_backend.dto.LoginRequestDTO;
import com.example.montra_backend.dto.RegisterRequestDTO;
import com.example.montra_backend.Entity.User;

public interface AuthService {

    AuthResponse register(RegisterRequestDTO dto);

    AuthResponse login(LoginRequestDTO dto);

    User getCurrentUser();
}
