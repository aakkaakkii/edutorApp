package com.example.editorapp.service;

import com.example.editorapp.domain.User;
import com.example.editorapp.domain.UserAction;
import com.example.editorapp.domain.UserLog;
import com.example.editorapp.repo.UserLogRepo;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class UserLogService {
    private final UserLogRepo userLogRepo;

    public UserLogService(UserLogRepo userLogRepo) {
        this.userLogRepo = userLogRepo;
    }

    public List<UserLog> loadAll() {
        return userLogRepo.findAll();
    }

    @Transactional
    public UserLog incrementAction(User actionMaker, User user) {
        String msg = actionMaker.getUsername() + " incremented " + user.getUsername() + " task";
        return save(actionMaker, UserAction.INCREMENT, msg);
    }

    @Transactional
    public UserLog decrementAction(User actionMaker, User user) {
        String msg = actionMaker.getUsername() + " decremented " + user.getUsername() + " task";
        return save(actionMaker, UserAction.DECREMENT, msg);
    }
    @Transactional
    public UserLog save(User user, UserAction action, String message) {
        return userLogRepo.save(UserLog.builder()
                .user(user)
                .action(action)
                .userName(user.getUsername())
                .message(message)
                .date(new Date())
                .build());
    }

    public UserLog loadByUser(User user) {
        return userLogRepo.findByUser(user);
    }
}
