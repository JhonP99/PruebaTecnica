package com.optics.opticsP.domain.model;

public record User(
        Long id,
        String username,
        String password,
        Role role
) {}
