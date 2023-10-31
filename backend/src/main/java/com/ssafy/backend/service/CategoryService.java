package com.ssafy.backend.service;

import com.ssafy.backend.controller.dto.CategoryDto;
import com.ssafy.backend.domain.entity.Category;
import com.ssafy.backend.domain.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional
    public List<CategoryDto> getLargeCategoryList() {
        List<Category> categories = categoryRepository.findLargeCategory();

        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for (Category category: categories) {
            CategoryDto categoryDto = CategoryDto.entityToDto(category);
            categoryDtoList.add(categoryDto);
        }
        return categoryDtoList;
    }

    @Transactional
    public List<CategoryDto> getCategoryList(String parentCategoryId) {
        List<Category> categories = categoryRepository.findCategoryByParentCategoryId(parentCategoryId);

        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for (Category category: categories) {
            CategoryDto categoryDto = CategoryDto.entityToDto(category);
            categoryDtoList.add(categoryDto);
        }
        return categoryDtoList;
    }
}