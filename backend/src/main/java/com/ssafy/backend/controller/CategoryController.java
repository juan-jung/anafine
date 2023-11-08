package com.ssafy.backend.controller;

import com.ssafy.backend.dto.PathDto;
import com.ssafy.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/large")
    public ResponseEntity<?> getLargeCategoryList() {
        return ResponseEntity.ok(categoryService.getLargeCategoryList());
    }


    @GetMapping("/{categoryId}")
    public ResponseEntity<List<PathDto>> getTreatmentInfoByCategoryId(@PathVariable String categoryId) {
        return ResponseEntity.ok(categoryService.getTreatmentInfoByCategoryId(categoryId));
    }
}
