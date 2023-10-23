package com.ssafy.backend.exception;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExceptionResponse {
    private String returnCode;
    private String returnMessage;

    public ExceptionResponse(ExceptionEnum exceptionEnum) {
        setReturnCode(exceptionEnum.getCode());
        setReturnMessage(exceptionEnum.getMessage());
    }
}
