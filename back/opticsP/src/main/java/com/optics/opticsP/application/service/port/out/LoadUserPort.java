package com.optics.opticsP.application.service.port.out;

import com.optics.opticsP.domain.model.User;

import java.util.Optional;

public interface LoadUserPort {
    Optional<User> loadByUsername(String username);
}
