package com.ssafy.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.dto.HospitalDetailInfoDto;
import com.ssafy.backend.dto.HospitalInfoDto;
import com.ssafy.backend.domain.entity.Price;
import com.ssafy.backend.domain.repository.HospitalTreatmentRepository;
import com.ssafy.backend.dto.HospitalResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class HospitalService {

	// repo 불러오기
	private final HospitalTreatmentRepository hospitalTreatmentRepository;

	public HospitalDetailInfoDto getHospitalDetail(Long priceId) {
		// 검색한 비급여를 가지고 있는 병원들 추출
		Price price = hospitalTreatmentRepository.findById(priceId).orElse(null);

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
	public HospitalResponseDto showByPrice(String name, Double disLimit, Double userLatitude,
		Double userLongitude, int pageNum, int pageSize) {
		// Pageable pageable = PageRequest.of(pageNum - 1, pageSize);
		// 검색한 비급여를 가지고 있는 병원들 추출
		// Page<Price> prices = hospitalTreatmentRepository.findByTreatment_NameOrderByMinPriceAsc(
		// 	name, pageable);
		List<Price> prices = hospitalTreatmentRepository.findByTreatment_NameOrderByMinPriceAsc(name);
		// List<Price;> prices = null;
		List<HospitalInfoDto> hospitalInfoDtos = new ArrayList<>();
		int npm= pageNum-1;
		for (Price price : prices) {
			// 위도
			double lat = price.getHospital().getLatitude();
			// 경도
			double lon = price.getHospital().getLongitude();
			int dis = locationDistance(userLatitude, userLongitude, lat, lon);

			// 거리 저장
			if (dis <= disLimit) {
				HospitalInfoDto hospitalInfoDto = HospitalInfoDto.builder().
					hospitalId(price.getHospital().getId()).
					hospitalName(price.getHospital().getName()).
					latitude(price.getHospital().getLatitude()).
					longitude(price.getHospital().getLongitude()).
					priceId(price.getId()).
					maxPrice(price.getMaxPrice()).
					minPrice(price.getMinPrice()).
					distance(dis).
					treatmentName(price.getTreatment().getName()).
					build();
				hospitalInfoDtos.add(hospitalInfoDto);
			}
		}
		int te = hospitalInfoDtos.size();
		HospitalResponseDto hospitalResponseDto = new HospitalResponseDto();
		if (npm * pageSize <= te && npm!=0) {
			if ((npm + 1) * pageSize <= te) {
				hospitalResponseDto.setContent(hospitalInfoDtos.subList(npm * pageSize, (npm + 1) * pageSize));
				hospitalResponseDto.setTotalElements(te);
				hospitalResponseDto.setTotalPages((int)Math.ceil((double)te / pageSize));
			} else {
				hospitalResponseDto.setContent(hospitalInfoDtos.subList(npm * pageSize, te));
				hospitalResponseDto.setTotalElements(te);
				hospitalResponseDto.setTotalPages((int)Math.ceil((double)te / pageSize));
			}
		}
		return hospitalResponseDto;

	}

	public HospitalResponseDto showByDistance(String name, Double disLimit, Double userLatitude,
		Double userLongitude, int pageNum, int pageSize) {
		// 검색한 비급여를 가지고 있는 병원들 추출
		// Pageable pageable = PageRequest.of(pageNum - 1, pageSize);
		// Page<HospitalInfoDto> hospitalInfoDtos = hospitalTreatmentRepository.findByTreatment_NameOrderByMinPriceAsc(
		// 	name,pageable).map(price -> HospitalInfoDto.builder().
		// 	hospitalId(price.getHospital().getId()).
		// 	hospitalName(price.getHospital().getName()).
		// 	distance(locationDistance(userLatitude, userLongitude, price.getHospital().getLatitude(), price.getHospital().getLongitude())).
		// 	longitude(price.getHospital().getLongitude()).
		// 	latitude(price.getHospital().getLatitude()).
		// 	priceId(price.getId()).
		// 	maxPrice(price.getMaxPrice()).
		// 	minPrice(price.getMinPrice()).
		// 	treatmentName(price.getTreatment().getName()).
		// 	build());
		// Page<Price> prices = hospitalTreatmentRepository.findByTreatment_NameOrderByMinPriceAsc(
		// 	name, pageable);
		List<Price> prices = hospitalTreatmentRepository.findByTreatment_NameOrderByMinPriceAsc(name);
		int npm = pageNum-1;
		// List<Price;> prices = null;
		List<HospitalInfoDto> hospitalInfoDtos = new ArrayList<>();
		for (Price price : prices) {
			// 위도
			double lat = price.getHospital().getLatitude();
			// 경도
			double lon = price.getHospital().getLongitude();
			int dis = locationDistance(userLatitude, userLongitude, lat, lon);

			// 거리 저장
			if (dis <= disLimit) {
				HospitalInfoDto hospitalInfoDto = HospitalInfoDto.builder().
					hospitalId(price.getHospital().getId()).
					hospitalName(price.getHospital().getName()).
					latitude(price.getHospital().getLatitude()).
					longitude(price.getHospital().getLongitude()).
					priceId(price.getId()).
					maxPrice(price.getMaxPrice()).
					minPrice(price.getMinPrice()).
					distance(dis).
					treatmentName(price.getTreatment().getName()).
					build();

				hospitalInfoDtos.add(hospitalInfoDto);
			}
		}
		int te = hospitalInfoDtos.size();
		hospitalInfoDtos.sort(Comparator.comparingDouble(HospitalInfoDto::getDistance));
		HospitalResponseDto hospitalResponseDto = new HospitalResponseDto();
		if (npm * pageSize <= te && npm!=0) {
			if ((npm + 1) * pageSize <= te) {
				hospitalResponseDto.setContent(hospitalInfoDtos.subList(npm * pageSize, (npm + 1) * pageSize));
				hospitalResponseDto.setTotalElements(te);
				hospitalResponseDto.setTotalPages((int)Math.ceil((double)te / pageSize));
			} else {
				hospitalResponseDto.setContent(hospitalInfoDtos.subList(npm * pageSize, te));
				hospitalResponseDto.setTotalElements(te);
				hospitalResponseDto.setTotalPages((int)Math.ceil((double)te / pageSize));
			}
		}

		return hospitalResponseDto;
	}

	private static int locationDistance(double lat1, double lon1, double lat2, double lon2) {
		double theta = lon1 - lon2;
		double dist =
			Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
				* Math.cos(deg2rad(theta));
		dist = Math.acos(dist);
		dist = rad2deg(dist);
		dist = dist * 60 * 1.1515 * 1609.344;

		return (int)dist; //단위 meter
	}

	//10진수를 radian(라디안)으로 변환
	private static double deg2rad(double deg) {
		return (deg * Math.PI / 180.0);
	}

	//radian(라디안)을 10진수로 변환
	private static double rad2deg(double rad) {
		return (rad * 180 / Math.PI);
	}

}


