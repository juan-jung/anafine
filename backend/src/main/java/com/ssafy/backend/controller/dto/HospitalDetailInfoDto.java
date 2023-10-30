package com.ssafy.backend.controller.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HospitalDetailInfoDto {
	private Integer hospitalId;

	private String hospitalName;

	private String address;

	private Integer maxPrice;

	private Integer minPrice;

	private String homePage_url;

	private LocalDateTime modifiedAt;

	private String treatmentName;

}
