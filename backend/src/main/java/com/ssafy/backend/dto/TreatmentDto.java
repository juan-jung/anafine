package com.ssafy.backend.dto;

import com.ssafy.backend.domain.entity.Treatment;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TreatmentDto {
    // leaf의 treatmentId와 path를 찾기 위한 변수
    private String treatmentId;

    private String categoryId;

    private String name;

    private String info;

    private String path;

    // search를 위한 변수
    private Integer hospitalId;

    private String hospitalName;

    private Double latitude;

    private Double longitude;

    private Long priceId;

    private Integer maxPrice;

    private Integer minPrice;

    private Integer distance;

    private String treatmentName;

    public static TreatmentDto entityToDto(Treatment treatment) {
        TreatmentDto treatmentDto = TreatmentDto.builder()
                .treatmentId(treatment.getId())
                .categoryId(treatment.getCategory().getId())
                .name(treatment.getName())
                .info(treatment.getInfo())
                .path(treatment.getPath())
                .build();

        return treatmentDto;
    }
}
