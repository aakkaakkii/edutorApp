package com.example.editorapp.domain;

public interface Views {

    interface password {}
    interface WithoutPassword {}
    interface FullUser extends password, WithoutPassword {}

    interface TaskView extends WithoutPassword {}

    interface UserLogView extends WithoutPassword {}
}
