package com.example.editorapp.repo;

import com.example.editorapp.domain.User;
import com.example.editorapp.domain.UserTasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTasksRepo extends JpaRepository<UserTasks, Long> {
    UserTasks findByUser(User user);
    @Query("SELECT t FROM UserTasks t WHERE t.user IS NOT NULL")
    List<UserTasks> findAllWhereUserExists();
}
