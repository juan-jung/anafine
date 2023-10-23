package com.ssafy.backend.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DemoController {

    private final DemoService demoService;

    @GetMapping("/demo")
    public String demo() {
        demoService.demo();
        return "demo";
    }
}
