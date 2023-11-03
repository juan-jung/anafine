package com.ssafy.backend.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;

import org.locationtech.jts.geom.Point;

import com.ssafy.backend.domain.entity.Hospital;
import com.ssafy.backend.domain.entity.HospitalType;
import com.ssafy.backend.domain.entity.Treatment;

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

	// private Point coordinate;

	private Double latitude;

	private Double longitude;

	private Long priceId;

	private Integer maxPrice;

	private Integer minPrice;

	private double distance;

	private String treatmentName;
}
