package com.example.editorapp.domain;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.UserLogView.class)
    private Long id;
    @OneToOne
    @JsonView(Views.UserLogView.class)
    private User user;
    @JsonView(Views.UserLogView.class)
    private String message;
    @JsonView(Views.UserLogView.class)
    private String userName;

    @Enumerated(EnumType.STRING)
    @JsonView(Views.UserLogView.class)
    private UserAction action;

    @JsonView(Views.UserLogView.class)
    private Date date;
}
