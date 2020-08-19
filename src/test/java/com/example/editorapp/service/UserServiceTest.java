package com.example.editorapp.service;

import com.example.editorapp.domain.User;
import com.example.editorapp.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.junit.Assert;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    public UserServiceTest(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void loadUsersTest(){

        User u = new User(1L,"tom","test","asd@asd.com",true,null);

        Mockito.when(userRepo.findAll()).thenReturn(Collections.singletonList(u));


        UserService userService = new UserService(userRepo, passwordEncoder);



        List<User> users = userService.loadUsers();

        Assert.assertNotNull(users);
        User user = users.get(0);
        Assert.assertNotNull(user);
        Assert.assertEquals(user.getUsername(), u.getUsername());
    }

}
