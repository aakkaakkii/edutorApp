package com.example.editorapp.controller;

import com.example.editorapp.domain.UserTasks;
import com.example.editorapp.domain.Views;
import com.example.editorapp.exception.CustomException;
import com.example.editorapp.service.UserTasksService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/userTasks")
@CrossOrigin
public class UserTasksRestController {

    private final UserTasksService userTasksService;

    public UserTasksRestController(UserTasksService userTasksService) {
        this.userTasksService = userTasksService;
    }

    @GetMapping
    @JsonView(Views.TaskView.class)
//    @PreAuthorize("hasAuthority('SUPPORT')")
    public List<UserTasks> loadUserTasks() {
        return userTasksService.loadTasks();
    }

    @GetMapping("/withUser")
    @JsonView(Views.TaskView.class)
    public List<UserTasks> loadUserTasksWhereUserExists() {
        return userTasksService.loadUserTasksWhereUserExists();
    }

    @GetMapping("{id}")
    @JsonView(Views.TaskView.class)
    public UserTasks loadUserTasks(@PathVariable Long id) {
        return userTasksService.loadById(id);
    }

    @GetMapping("/user/{username}")
    @JsonView(Views.TaskView.class)
    public UserTasks loadUserTasks(@PathVariable String username) {
        return userTasksService.loadByUsername(username);
    }

    @GetMapping("/increment/{id}")
    @JsonView(Views.TaskView.class)
    public UserTasks incrementUserTasks(@PathVariable("id") UserTasks userTasks) {
        return userTasksService.incrementTask(userTasks);
    }

    @GetMapping("/decrement/{id}")
    @JsonView(Views.TaskView.class)
    public UserTasks decrementUserTasks(@PathVariable("id") UserTasks userTasks) throws CustomException {
        return userTasksService.decrementTask(userTasks);
    }


}
