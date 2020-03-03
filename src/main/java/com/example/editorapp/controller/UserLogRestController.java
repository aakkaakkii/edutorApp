package com.example.editorapp.controller;

import com.example.editorapp.domain.UserLog;
import com.example.editorapp.domain.Views;
import com.example.editorapp.service.UserLogService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/userLog")
@CrossOrigin
public class UserLogRestController {
    private final UserLogService userLogService;

    public UserLogRestController(UserLogService userLogService) {
        this.userLogService = userLogService;
    }

    @GetMapping
    @JsonView(Views.UserLogView.class)
    public List<UserLog> load(){
        return userLogService.loadAll();
    }

}
