package com.example.editorapp.controller;

import com.example.editorapp.domain.User;
import com.example.editorapp.dto.AuthentificationRequestDto;
import com.example.editorapp.security.jwt.JwtTokenProvider;
import com.example.editorapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/rest/auth")
@CrossOrigin
public class Authentication {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    public Authentication(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthentificationRequestDto requestDto){
        String username = requestDto.getUsername();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, requestDto.getPassword()));
        User user = userService.findUserByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("user not found");
        }

        String token = jwtTokenProvider.createToken(username, user.getRoles());

        Map<Object, Object> response = new HashMap<>();
        response.put("username", username);
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}
