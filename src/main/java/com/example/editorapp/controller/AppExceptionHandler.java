package com.example.editorapp.controller;

import com.example.editorapp.exception.CustomException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<CustomErrorResponse> customHandleNotFound(CustomException ex, WebRequest request) {

        CustomErrorResponse errors = new CustomErrorResponse();
        errors.setMessage(ex.getType().getCode());


        ex.printStackTrace();

        return new ResponseEntity<>(errors, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    private static class CustomErrorResponse {
        private String message;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

}
