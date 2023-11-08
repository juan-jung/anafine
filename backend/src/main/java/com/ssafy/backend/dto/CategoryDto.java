package com.ssafy.backend.dto;

import com.ssafy.backend.domain.entity.Category;
import com.ssafy.backend.domain.entity.Treatment;
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

    private String treatmentId;

    private String path;

    public static CategoryDto entityToDto(Category category) {
        CategoryDto categoryDto = CategoryDto.builder()
                .categoryId(category.getId())
                .name(category.getName())
                .info(category.getInfo())
                .isLeaf(category.getIsLeaf())
                .treatmentId(builder().treatmentId)
                .path(builder().path)
                .build();

        if (category.getParentCategory() != null) {
            categoryDto.setParentCategory(category.getParentCategory().getId());
        } else {
        }

        return categoryDto;
    }
}
