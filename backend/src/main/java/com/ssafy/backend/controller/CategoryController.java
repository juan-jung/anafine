package com.ssafy.backend.controller;


import com.ssafy.backend.service.CategoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/large")
    public ResponseEntity<?> getLargeCategoryList(){
        return ResponseEntity.ok(categoryService.getLargeCategoryList());
    }

    @GetMapping("/{parentCategoryId}")
    public ResponseEntity<?> getCategoryList(@PathVariable String parentCategoryId){
        return ResponseEntity.ok(categoryService.getCategoryList(parentCategoryId));
    }
}
