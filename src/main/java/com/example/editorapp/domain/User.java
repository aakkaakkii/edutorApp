package com.example.editorapp.domain;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "usr")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.WithoutPassword.class)
    private Long id;
    @JsonView(Views.WithoutPassword.class)
    private String username;
    @JsonView(Views.password.class)
    private String password;
    @JsonView(Views.WithoutPassword.class)
    private String mail;
    @JsonView(Views.WithoutPassword.class)
    private boolean active;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @JsonView(Views.WithoutPassword.class)
    private Set<Role> roles;
}
