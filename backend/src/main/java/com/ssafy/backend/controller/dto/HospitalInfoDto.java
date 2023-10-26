package com.ssafy.backend.controller.dto;

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

	private Long hospitalId;

	private String hospitalName;

	private Double latitude;

	private Double longitude;

	private Long hospitalTreatmentId;

	private Long maxPrice;

	private Long minPrice;

	private Double distance;

	private String treatmentName;
}
