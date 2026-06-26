package com.optics.opticsP.application.service;


import com.optics.opticsP.application.service.port.out.LoadUserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoadUserPort loadUserPort;
    private final PasswordEncoder passwordEncoder;

    public boolean authenticate(String username, String password) {
        return loadUserPort.loadByUsername(username)
                .map(user -> passwordEncoder.matches(password, user.password()))
                .orElse(false);
    }
}
