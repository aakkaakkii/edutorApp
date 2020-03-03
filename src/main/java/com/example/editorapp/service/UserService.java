package com.example.editorapp.service;

import com.example.editorapp.domain.Role;
import com.example.editorapp.domain.User;
import com.example.editorapp.domain.UserLog;
import com.example.editorapp.domain.UserTasks;
import com.example.editorapp.exception.CustomException;
import com.example.editorapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserTasksService userTasksService;
    @Autowired
    private UserLogService userLogService;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }


    public List<User> loadUsers() {
        return userRepo.findAll();
    }

    public User getUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

    public User findUserByUsername(String username) {
        return userRepo.getByUsername(username);
    }


    @Transactional
    public User addUser(User user) throws CustomException {
        User userFromDb = findUserByUsername(user.getUsername());

        if (userFromDb != null) {
            throw new CustomException(CustomException.Type.USER_EXISTS);
        }

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new CustomException(CustomException.Type.PASSWORD_IS_EMPTY);
        }

        if (user.getRoles().contains(Role.EDITOR)) {
            userTasksService.createTask(user);
        }

        user.setActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public User updateUser(User user) throws CustomException {
        User oldUser = getUserById(user.getId());

        if (findUserByUsername(user.getUsername()) != null && !findUserByUsername(user.getUsername()).getId().equals(oldUser.getId())) {
            throw new CustomException(CustomException.Type.USER_EXISTS);
        }

        if (user.getPassword() != null && !"".equals(user.getPassword())) {
            oldUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        oldUser.setUsername(user.getUsername());
        oldUser.setRoles(user.getRoles());

        return userRepo.save(oldUser);
    }

    public void delete(Long id) {
        User user = getUserById(id);

        UserTasks task = userTasksService.loadByUser(user);
        UserLog userLog = userLogService.loadByUser(user);

        if (task != null) {
            task.setUser(null);
        }

        if (userLog != null) {
            userLog.setUser(null);
        }

        userRepo.delete(user);
    }

    public List<Role> loadRoles() {
        return Arrays.asList(Role.values());
    }
}
