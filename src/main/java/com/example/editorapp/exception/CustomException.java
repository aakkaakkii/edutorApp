package com.example.editorapp.exception;

public class CustomException extends Exception {

    public enum Type{
        USER_EXISTS("user already exists"),
        PASSWORD_IS_EMPTY("password is empty"),
        TASK_IS_NULL("task is null");

        private final String messageUrl;
        Type(String messageUrl) {
            this.messageUrl = messageUrl;
        }

        public String getCode() {
            return messageUrl;
        }
    }

    private Type type;

    public CustomException(Type type) {
        super(type.getCode());
        this.type= type;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
