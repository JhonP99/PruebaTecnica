package com.optics.opticsP.infrastructure.adapter.out.jpa;

import com.optics.opticsP.application.service.port.out.LoadUserPort;
import com.optics.opticsP.application.service.port.out.SaveUserPort;
import com.optics.opticsP.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserPersistenceAdapter implements LoadUserPort, SaveUserPort {
    private final SpringDataUserRepository repository;

    @Override
    public Optional<User> loadByUsername(String username) {
        return repository.findByUsername(username)
                .map(entity -> new User(
                        entity.getId(),
                        entity.getUsername(),
                        entity.getPassword(),
                        entity.getRole()
                ));
    }

    @Override
    public User save(User user) {
        UserEntity entity = new UserEntity(null, user.username(), user.password(), user.role());
        UserEntity saved = repository.save(entity);
        return new User(saved.getId(), saved.getUsername(), saved.getPassword(), saved.getRole());
    }
}