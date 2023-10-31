package com.ssafy.backend.controller;


import com.ssafy.backend.controller.dto.CategoryDto;
import com.ssafy.backend.controller.dto.HospitalInfoDto;
import com.ssafy.backend.service.CategoryService;
import com.ssafy.backend.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
