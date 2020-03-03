package com.example.editorapp.security.jwt;

import com.example.editorapp.domain.Role;
import com.example.editorapp.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public final class JwtUserFactory {
    public JwtUserFactory() {
    }

    public static JwtUser create(User user){
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                null,
                null,
                user.getPassword(),
                user.getMail(),
                user.isActive(),
                null,
                mapToGrantedAuthorities(user.getRoles())
        );
    }

    private static Collection<? extends GrantedAuthority> mapToGrantedAuthorities(Set<Role> roles) {
        return roles.stream()
                .map(role ->
                        new SimpleGrantedAuthority(role.getRole())
                ).collect(Collectors.toList());
    }
}
