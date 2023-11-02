package com.ssafy.backend.controller;

import com.ssafy.backend.service.ESQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchRecommendController {

    private final ESQueryService esQueryService;

    @GetMapping("/recommend")
    public ResponseEntity<?> getSearchRecommend(@RequestParam String keyword) {
        return ResponseEntity.ok(esQueryService.recommend(keyword));
    }
}
