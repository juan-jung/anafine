package com.ssafy.backend.controller;

import com.ssafy.backend.dto.KakaoAddressResponseDto;
import com.ssafy.backend.service.KakaoSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {

    private final KakaoSearchService kakaoSearchService;

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String address) {
        return ResponseEntity.ok().body(kakaoSearchService.getAddresslist(address));
    }

    @GetMapping("/convert")
    public ResponseEntity<?> convert(@RequestParam String latitude, @RequestParam String longitude) {
        return ResponseEntity.ok().body(kakaoSearchService.coordToAddress(Double.parseDouble(latitude), Double.parseDouble(longitude)));
    }
}
