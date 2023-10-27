package com.ssafy.backend.controller;

import java.util.List;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.controller.dto.HospitalDetailInfoDto;
import com.ssafy.backend.controller.dto.HospitalInfoDto;
import com.ssafy.backend.service.HospitalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/map")
public class HospitalMapInfoController {

	private final HospitalService hospitalService;

	@GetMapping("/info")
	public ResponseEntity<?> getHospitalMapInfo(
		@RequestParam String treatmentId,
		@RequestParam Double disLimit,
		@RequestParam Double userLatitude,
		@RequestParam Double userLongitude) {
		List<HospitalInfoDto> hospitalInfoDtos = hospitalService.showByDistance( treatmentId, disLimit, userLatitude, userLongitude);
		return ResponseEntity.ok().body(hospitalInfoDtos);
	}

	@GetMapping("/detail/{hospitalTreatmentId}")
	public ResponseEntity<?> getHospitalDetail(@PathVariable Long priceId){
		HospitalDetailInfoDto hospitalDetailInfoDto = hospitalService.getHospitalDetail(priceId);
		return ResponseEntity.ok().body(hospitalDetailInfoDto);
	}
}
