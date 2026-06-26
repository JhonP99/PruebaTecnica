package com.optics.opticsP.application.service.port.out;

import com.optics.opticsP.domain.model.User;

public interface SaveUserPort {
    User save(User user);
}
