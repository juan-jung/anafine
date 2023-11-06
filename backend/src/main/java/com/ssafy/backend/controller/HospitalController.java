package com.ssafy.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.dto.HospitalDetailInfoDto;
import com.ssafy.backend.dto.HospitalInfoDto;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.ExceptionEnum;
import com.ssafy.backend.service.HospitalService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/map")
@Slf4j
public class HospitalController {

	private final HospitalService hospitalService;

	@GetMapping("/sortByDistInfo")
	public ResponseEntity<?> getSortByDistHospitalInfo(
		@RequestParam String treatmentId,
		@RequestParam Double disLimit,
		@RequestParam Double userLatitude,
		@RequestParam Double userLongitude, @RequestParam int pageNum, @RequestParam int pageSize) {
		if(pageNum<0) throw new CustomException(ExceptionEnum.PAGEINDEX_ERROR);
		List<HospitalInfoDto> hospitalInfoDtos = hospitalService.showByDistance(treatmentId, disLimit, userLatitude,
			userLongitude, pageNum, pageSize);
		return ResponseEntity.ok().body(hospitalInfoDtos);
	}

	@GetMapping("/sortByPriceInfo")
	public ResponseEntity<?> getSortByPriceHospitalInfo(
		@RequestParam String treatmentId,
		@RequestParam Double disLimit,
		@RequestParam Double userLatitude,
		@RequestParam Double userLongitude, @RequestParam int pageNum, @RequestParam int pageSize) {
		if(pageNum<0) throw new CustomException(ExceptionEnum.PAGEINDEX_ERROR);
		List<HospitalInfoDto> hospitalInfoDtos = hospitalService.showByPrice(treatmentId, disLimit, userLatitude,
			userLongitude, pageNum, pageSize);
		return ResponseEntity.ok().body(hospitalInfoDtos);
	}

	@GetMapping("/detail/{priceId}")
	public ResponseEntity<?> getHospitalDetail(@PathVariable Long priceId) {
		HospitalDetailInfoDto hospitalDetailInfoDto = hospitalService.getHospitalDetail(priceId);
		return ResponseEntity.ok().body(hospitalDetailInfoDto);
	}
}
