package com.ssafy.backend.controller.dto;

import com.ssafy.backend.domain.entity.Category;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryDto {

    private String categoryId;

    private String parentCategory;

    private String name;

    private String info;

    private Boolean isLeaf;

    public static CategoryDto entityToDto(Category category) {
        return CategoryDto.builder()
                .categoryId(category.getCategoryId())
                .parentCategory(category.getParentCategory().getCategoryId())
                .name(category.getName())
                .info(category.getInfo())
                .isLeaf(category.getIsLeaf()).build();
    }
}
