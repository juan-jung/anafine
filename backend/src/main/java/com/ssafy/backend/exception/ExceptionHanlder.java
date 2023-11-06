package com.ssafy.backend.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHanlder {

    @ExceptionHandler(CustomException.class)
    public ExceptionResponse handlerCustomException(CustomException e) {
        return ExceptionResponse.builder()
                .returnCode(e.getReturnCode())
                .returnMessage(e.getReturnMessage()).build();
    }

    @ExceptionHandler(Exception.class)
    public ExceptionResponse handlerException(CustomException e) {
        return ExceptionResponse.builder()
                .returnCode(ExceptionEnum.UNKNOWN_ERROR.getCode())
                .returnMessage(ExceptionEnum.UNKNOWN_ERROR.getMessage()).build();
    }

}
