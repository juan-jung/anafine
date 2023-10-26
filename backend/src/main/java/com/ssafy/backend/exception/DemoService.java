package com.ssafy.backend.exception;

import org.springframework.stereotype.Service;

@Service
public class DemoService {

    public String demo() {
        String wonhee = "원희";
        String monkey = "원숭이";
        if(!wonhee.equals(monkey)) throw new CustomException(ExceptionEnum.UNKNOWN_ERROR);
        return "원숭이";
    }
}
