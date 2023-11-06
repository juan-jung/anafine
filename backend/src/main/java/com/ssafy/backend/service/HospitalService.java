package com.ssafy.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.dto.HospitalDetailInfoDto;
import com.ssafy.backend.dto.HospitalInfoDto;
import com.ssafy.backend.domain.entity.Price;
import com.ssafy.backend.domain.repository.PriceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class HospitalService {

	// repo 불러오기
	private final PriceRepository priceRepository;

	public HospitalDetailInfoDto getHospitalDetail(Long priceId) {
		// 검색한 비급여를 가지고 있는 병원들 추출
		Price price = priceRepository.findById(priceId).orElse(null);

		HospitalDetailInfoDto hospitalDetailInfoDto = HospitalDetailInfoDto.builder().
			hospitalId(price.getHospital().getId()).
			hospitalName(price.getHospital().getName()).
			address(price.getHospital().getAddress()).
			maxPrice(price.getMaxPrice()).
			minPrice(price.getMinPrice()).
			homepageUrl(price.getHospital().getHomepageUrl()).
			modifiedAt(price.getHospital().getModifiedAt()).
			treatmentName(price.getTreatment().getName()).
			build();

		return hospitalDetailInfoDto;
	}

	// distance로 정렬된 병원 정보를 return하는 함수 => 거리 제한을 통해 제한된 거리 내에서만 보내줌
	public List<HospitalInfoDto> showByPrice(String treatmentId, Double disLimit, Double userLatitude,
		Double userLongitude, int pageNum, int pageSize) {

		Pageable pageable = PageRequest.of(pageNum, pageSize);

		List<Object[]> objects = priceRepository.findNearby(treatmentId,disLimit,userLatitude, userLongitude,pageable);
		List<HospitalInfoDto> hospitalInfoDtos = new ArrayList<>();

		for (Object[] result : objects) {
			HospitalInfoDto hospitalInfo = (HospitalInfoDto)result[0];
			hospitalInfoDtos.add(hospitalInfo);
		}
		return hospitalInfoDtos;

	}
	public List<HospitalInfoDto> showByDistance(String treatmentId, Double disLimit, Double userLatitude,
		Double userLongitude, int pageNum, int pageSize) {

		Pageable pageable = PageRequest.of(pageNum, pageSize);
		List<Object[]> objects = priceRepository.findNearby(treatmentId,disLimit,userLatitude, userLongitude, pageable);
		List<HospitalInfoDto> hospitalInfoDtos = new ArrayList<>();

		for (Object[] result : objects) {
			HospitalInfoDto hospitalInfo = (HospitalInfoDto)result[0];
			hospitalInfoDtos.add(hospitalInfo);
		}
		hospitalInfoDtos.sort(Comparator.comparingDouble(HospitalInfoDto::getDistance));
		return hospitalInfoDtos;

	}
}