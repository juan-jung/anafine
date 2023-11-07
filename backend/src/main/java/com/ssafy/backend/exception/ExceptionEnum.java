package com.ssafy.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
    ElasticSearchIOException("0001", "ElasticSearchIOException"),
    MONKEY("0000", "MONKEY"),
    UNKNOWN_ERROR("9999","UNKNOWN_ERROR"),
    PAGEINDEX_ERROR
        ("0002","PAGEINDEX_ERROR");

    private String code;
    private String message;
}
