package com.ssafy.backend.dto;

import com.ssafy.backend.domain.entity.Category;
import com.ssafy.backend.domain.entity.Treatment;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PathDto {
    // CategoryDto
    private String categoryId;

    private String parentCategory;

    private String name;

    private String info;

    private Boolean isLeaf;

    // TreatmentDto
    private String treatmentId;


    private String path;

    public static PathDto entityToDto(Category category, Treatment treatment) {
        PathDto pathDto = PathDto.builder()
            .categoryId(category.getId())
            .name(category.getName())
            .info(category.getInfo())
            .isLeaf(category.getIsLeaf())
            .treatmentId(treatment == null ? null : treatment.getId())
            .path(treatment == null ? null : treatment.getPath())
            .build();

        return pathDto;
    }
}
