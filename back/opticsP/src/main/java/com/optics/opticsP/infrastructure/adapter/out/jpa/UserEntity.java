package com.optics.opticsP.infrastructure.adapter.out.jpa;

import com.optics.opticsP.domain.model.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Audited;

@Entity
@Audited.Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
}
