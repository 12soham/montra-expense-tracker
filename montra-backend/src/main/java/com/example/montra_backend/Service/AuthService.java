package com.example.montra_backend.Service;




import com.example.montra_backend.dto.AuthResponseDTO;
import com.example.montra_backend.dto.LoginRequestDTO;
import com.example.montra_backend.dto.RegisterRequestDTO;
import com.example.montra_backend.Entity.User;

public interface AuthService {

    AuthResponseDTO register(RegisterRequestDTO dto);

    AuthResponseDTO login(LoginRequestDTO dto);

    User getCurrentUser();
}
