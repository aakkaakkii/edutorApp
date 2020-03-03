package com.example.editorapp.controller;

import com.example.editorapp.domain.Role;
import com.example.editorapp.domain.User;
import com.example.editorapp.domain.Views;
import com.example.editorapp.exception.CustomException;
import com.example.editorapp.service.UserService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/users")
@CrossOrigin
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @JsonView(Views.WithoutPassword.class)
    public List<User> loadUsers(){
        return userService.loadUsers();
    }

    @GetMapping("/{id}")
    @JsonView(Views.WithoutPassword.class)
    public User getUser(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @GetMapping("/username/{username}")
    @JsonView(Views.WithoutPassword.class)
    public User getUserByUsername(@PathVariable String username){
        return userService.findUserByUsername(username);
    }

    @GetMapping("/roles")
    public List<Role> loadRoles(){
        return userService.loadRoles();
    }

    @PostMapping
    @JsonView(Views.WithoutPassword.class)
    public User addUser(@RequestBody User user) throws CustomException {
        return userService.addUser(user);
    }

    @PutMapping("/{id}")
    @JsonView(Views.WithoutPassword.class)
    public User updateUser(@PathVariable Long id, @RequestBody User user) throws CustomException {
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.delete(id);
    }

    @GetMapping("/isUserAuthorised")
    public boolean isUserAuthorised(){
        return true;
    }
}
