package com.ssafy.backend.controller;


import com.ssafy.backend.controller.dto.CategoryDto;
import com.ssafy.backend.controller.dto.HospitalInfoDto;
import com.ssafy.backend.service.CategoryService;
import com.ssafy.backend.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("???")
    public ResponseEntity<?> getCategoryList(@RequestParam String parentCategoryId){
        return ResponseEntity.ok(categoryService.getCategoryList(parentCategoryId));
    }
}
