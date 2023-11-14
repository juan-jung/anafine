package com.ssafy.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

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

	private String homepageUrl;

	private LocalDateTime modifiedAt;

	private String treatmentName;

	private List<HospitalDetailDto> hospitalDetailDtos;

	private String tel;

	private String hospitalType;
}
