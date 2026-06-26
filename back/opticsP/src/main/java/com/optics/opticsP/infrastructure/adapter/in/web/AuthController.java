package com.optics.opticsP.infrastructure.adapter.in.web;

import com.optics.opticsP.application.service.port.out.LoadUserPort;
import com.optics.opticsP.application.service.port.out.SaveUserPort;
import com.optics.opticsP.domain.model.User;
import com.optics.opticsP.infrastructure.adapter.in.web.dto.AuthResponse;
import com.optics.opticsP.infrastructure.adapter.in.web.dto.LoginRequest;
import com.optics.opticsP.infrastructure.adapter.in.web.dto.RegisterRequest;
import com.optics.opticsP.infrastructure.adapter.out.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final SaveUserPort saveUserPort;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final LoadUserPort loadUserPort;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        String encryptedPassword = passwordEncoder.encode(request.password());

        User newUser = new User(null, request.username(), encryptedPassword, request.role());
        saveUserPort.save(newUser);

        return ResponseEntity.ok(new AuthResponse("Usuario registrado exitosamente", null));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );

            User user = loadUserPort.loadByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado tras autenticación"));

            String realToken = jwtService.generateToken(user);

            return ResponseEntity.ok(new AuthResponse("Login exitoso", realToken));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("Credenciales incorrectas", null));
        }
    }
}
