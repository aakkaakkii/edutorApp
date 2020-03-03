package com.example.editorapp.repo;

import com.example.editorapp.domain.User;
import com.example.editorapp.domain.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLogRepo extends JpaRepository<UserLog, Long> {
    UserLog findByUser(User user);
}
