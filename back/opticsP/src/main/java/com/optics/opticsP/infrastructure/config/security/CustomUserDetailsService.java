package com.optics.opticsP.infrastructure.config.security;

import com.optics.opticsP.application.service.port.out.LoadUserPort;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final LoadUserPort loadUserPort;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return loadUserPort.loadByUsername(username)
                .map(user -> new org.springframework.security.core.userdetails.User(
                        user.username(),
                        user.password(),
                        List.of(new SimpleGrantedAuthority("ROLE_" + user.role().name()))
                ))
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }
}
