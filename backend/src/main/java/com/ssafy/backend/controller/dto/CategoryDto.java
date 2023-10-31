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
        CategoryDto categoryDto = CategoryDto.builder()
                .categoryId(category.getCategoryId())
                .name(category.getName())
                .info(category.getInfo())
                .isLeaf(category.getIsLeaf())
                .build();

        if (category.getParentCategory() != null) {
            categoryDto.setParentCategory(category.getParentCategory().getCategoryId());
        } else {
            // parentCategory가 null인 경우에 대한 예외 처리 또는 로깅을 수행할 수 있습니다.
            // 예: categoryDto.setParentCategory("N/A") 또는 로깅 메시지 출력
        }

        return categoryDto;
    }

}
