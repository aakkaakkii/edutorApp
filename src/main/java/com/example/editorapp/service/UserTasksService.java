package com.example.editorapp.service;

import com.example.editorapp.domain.User;
import com.example.editorapp.domain.UserTasks;
import com.example.editorapp.exception.CustomException;
import com.example.editorapp.repo.UserTasksRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserTasksService {
    private final UserTasksRepo userTasksRepo;
    private final UserLogService userLogService;
    @Autowired
    private UserService userService;

    public UserTasksService(UserTasksRepo userTasksRepo, UserLogService userLogService) {
        this.userTasksRepo = userTasksRepo;
        this.userLogService = userLogService;
    }

    public List<UserTasks> loadTasks() {
        return userTasksRepo.findAll();
    }

    public UserTasks loadById(Long id) {
        return userTasksRepo.findById(id).orElse(null);
    }

    public UserTasks loadByUser(User user) {
        return userTasksRepo.findByUser(user);
    }

    public UserTasks loadByUsername(String username) {
        return userTasksRepo.findByUser(userService.findUserByUsername(username));
    }

    @Transactional
    public UserTasks saveTask(UserTasks task){
        return userTasksRepo.save(task);
    }

    @Transactional
    public UserTasks createTask(User user) {
        return userTasksRepo.save(UserTasks.builder()
                .tasks(0)
                .user(user)
                .build());
    }

    public UserTasks incrementTask(UserTasks userTask) {
        userTask.setTasks(userTask.getTasks() + 1);



        userLogService.incrementAction(
                userService.findUserByUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName()),
                userTask.getUser());

        return userTasksRepo.save(userTask);
    }

    public UserTasks decrementTask(UserTasks userTask) throws CustomException {
        if (userTask.getTasks() == 0) {
            throw new CustomException(CustomException.Type.TASK_IS_NULL);
        }
        userTask.setTasks(userTask.getTasks() - 1);
        userLogService.decrementAction(
                userService.findUserByUsername(
                        SecurityContextHolder.getContext().getAuthentication().getName()),
                userTask.getUser());

        return userTasksRepo.save(userTask);
    }

    public List<UserTasks> loadUserTasksWhereUserExists() {
        return userTasksRepo.findAllWhereUserExists();
    }
}
