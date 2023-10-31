package com.ssafy.backend.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;

import com.ssafy.backend.domain.entity.Hospital;
import com.ssafy.backend.domain.entity.HospitalType;
import com.ssafy.backend.domain.entity.Treatment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HospitalInfoDto {

	private Integer hospitalId;

	private String hospitalName;

	private Double latitude;

	private Double longitude;

	private Long priceId;

	private Integer maxPrice;

	private Integer minPrice;

	private Long distance;

	private String treatmentName;
}
