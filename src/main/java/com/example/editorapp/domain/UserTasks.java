package com.example.editorapp.domain;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTasks {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.TaskView.class)
    private Long id;
    @OneToOne
    @JsonView(Views.TaskView.class)
    private User user;
    @JsonView(Views.TaskView.class)
    private int tasks;
}
