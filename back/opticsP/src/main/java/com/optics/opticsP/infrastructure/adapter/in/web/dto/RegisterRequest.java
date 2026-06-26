package com.optics.opticsP.infrastructure.adapter.in.web.dto;

import com.optics.opticsP.domain.model.Role;

public record RegisterRequest(String username, String password, Role role) {}
