package com.ssafy.backend.controller;

import com.ssafy.backend.service.ESQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
@Slf4j
public class SearchRecommendController {

    private final ESQueryService esQueryService;

    @GetMapping("/recommend")
    public ResponseEntity<?> getSearchRecommend(@RequestParam(required = false) String keyword) {
        if(ObjectUtils.isEmpty(keyword)) return ResponseEntity.ok().body(new ArrayList<>());
        return ResponseEntity.ok(esQueryService.recommend(keyword));
    }
}
