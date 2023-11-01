package com.ssafy.backend.dto;

import com.ssafy.backend.domain.entity.Treatment;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TreatmentDto {
    private Integer hospitalId;

    private String hospitalName;

    private Double latitude;

    private Double longitude;

    private Long priceId;

    private Integer maxPrice;

    private Integer minPrice;

    private Integer distance;

    private String treatmentName;

}
