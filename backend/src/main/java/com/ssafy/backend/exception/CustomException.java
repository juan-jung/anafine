package com.ssafy.backend.exception;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomException extends RuntimeException{
    private String returnCode;
    private String returnMessage;

    public CustomException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMessage());
        setReturnCode(exceptionEnum.getCode());
        setReturnMessage(exceptionEnum.getMessage());
    }
}
