package com.example.editorapp.domain;

import org.springframework.security.core.GrantedAuthority;

public enum Role {
    ADMIN, SUPPORT, EDITOR;

    public String getRole() {
        return name();
    }
}
