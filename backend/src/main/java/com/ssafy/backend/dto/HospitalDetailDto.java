package com.ssafy.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HospitalDetailDto {
	private Integer cost;

	private String significant;

	private String info;

}
