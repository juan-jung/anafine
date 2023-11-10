package com.ssafy.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/ip")
@Slf4j
public class IPController {

    @GetMapping("/find")
    public ResponseEntity<?> getIP(HttpServletRequest request) {
        Map<String, String> map = new HashMap<>();
        map.put("X-FORWARDED-FOR", request.getHeader("X-FORWARDED-FOR"));
        map.put("remoteAddr", request.getRemoteAddr());
        map.put("X-Real-IP", request.getHeader("X-Real-IP"));
        map.put("host", request.getHeader("Host"));
        return ResponseEntity.ok().body(map);
    }
}
