package com.ssafy.backend.controller.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HospitalDetailInfoDto {
	private Long hospitalId;

	private String hospitalName;

	private String address;

	private Long maxPrice;

	private Long minPrice;

	private String homePage;

	private LocalDateTime modifiedAt;

	private String treatmentName;

}
