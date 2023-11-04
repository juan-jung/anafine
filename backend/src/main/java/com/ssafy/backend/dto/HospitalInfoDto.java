package com.ssafy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HospitalInfoDto {

	private Integer hospitalId;

	private String hospitalName;

	private Double latitude;

	private Double longitude;

	private Long priceId;

	private Integer maxPrice;

	private Integer minPrice;

	private double distance;

	private String treatmentName;
}
