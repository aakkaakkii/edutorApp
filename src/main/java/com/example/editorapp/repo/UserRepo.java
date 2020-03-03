package com.example.editorapp.repo;

import com.example.editorapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User getByUsername(String username);
}
