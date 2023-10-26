package com.ssafy.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.controller.dto.HospitalInfoDto;
import com.ssafy.backend.domain.entity.HospitalTreatment;
import com.ssafy.backend.domain.repository.HospitalTreatmentRepository;
import com.ssafy.backend.domain.repository.TreatmentRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class HospitalService {

	// repo 불러오기
	private final TreatmentRepository treatmentRepository;
	private final HospitalTreatmentRepository hospitalTreatmentRepository;

	// distance로 정렬된 병원 정보를 return하는 함수 => 거리 제한을 통해 제한된 거리 내에서만 보내줌
	@Transactional
	public List<HospitalInfoDto> showByDistance(String treatmentId, Double disLimit, Double userLatitude, Double userLongitude) {
		// 검색한 비급여를 가지고 있는 병원들 추출
		List<HospitalTreatment> hospitalTreatments = hospitalTreatmentRepository.findByTreatment_TreatmentId(
			treatmentId);
		List<HospitalInfoDto> hospitalInfoDtos = new ArrayList<>();
		for (HospitalTreatment hospitalTreatment : hospitalTreatments) {
			// 위도
			double lat = hospitalTreatment.getHospital().getLatitude();
			// 경도
			double lon = hospitalTreatment.getHospital().getLongitude();
			double dis = locationDistance(userLatitude, userLongitude, lat, lon);
			hospitalTreatment.getHospital().setDistance(dis);
			if(dis<=disLimit){
				HospitalInfoDto hospitalInfoDto =HospitalInfoDto.builder().
					hospitalId(hospitalTreatment.getHospital().getHospitalId()).
					hospitalName(hospitalTreatment.getHospital().getName()).
					latitude(hospitalTreatment.getHospital().getLatitude()).
					longitude(hospitalTreatment.getHospital().getLongitude()).
					hospitalTreatmentId(hospitalTreatment.getHospitalTreatmentId()).
					maxPrice(hospitalTreatment.getMaxPrice()).
					minPrice(hospitalTreatment.getMinPrice()).
					distance(hospitalTreatment.getHospital().getDistance()).
					treatmentName(hospitalTreatment.getTreatment().getName()).
					build();
				hospitalInfoDtos.add(hospitalInfoDto);
			}

			// MissionDetailDto.builder()
			// 	.missionId(mission.getId())
			// 	.missionName(mission.getMissionName())
			// 	.childName(mission.getChildUser().getNickname())
			// 	.missionDescription(mission.getMissionDescription())
			// 	.missionPoint(mission.getMissionPoint())
			// 	.missionStatus(mission.getMissionStatus())
			// 	.missionTerminateDate(mission.getMissionTerminateDate())
			// 	.build();
		}
		// 이 병원들의 정보에는 위도와 경도가 있고, 이를 계산 후 짧은 거리 순 or 가격순 으로 보여준다.
		// 아니면 짧은 거리순 10개에 대해 가격순으로 정렬하여 보여준다.
		return hospitalInfoDtos;

	}

	private static double locationDistance(double lat1, double lon1, double lat2, double lon2) {
		double theta = lon1 - lon2;
		double dist =
			Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
				* Math.cos(deg2rad(theta));
		dist = Math.acos(dist);
		dist = rad2deg(dist);
		dist = dist * 60 * 1.1515 * 1609.344;

		return dist; //단위 meter
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
