package com.ssafy.backend.service;

import com.ssafy.backend.domain.entity.Price;
import com.ssafy.backend.dto.HospitalDetailInfoDto;
import com.ssafy.backend.dto.HospitalInfoDto;
import com.ssafy.backend.dto.TreatmentDto;
import com.ssafy.backend.domain.entity.Treatment;
import com.ssafy.backend.domain.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TreatmentService {
    private final TreatmentRepository treatmentRepository;

    @Transactional
    public List<TreatmentDto> getTreatmentListPrice(Double disLimit, Double userLatitude, Double userLongitude, String word) {

        List<Price> prices = treatmentRepository.findTreatmentByWord(word);

        // List<Price;> prices = null;
        List<TreatmentDto> treatmentDtos = new ArrayList<>();
        for (Price price : prices) {
            // 위도
            double lat = price.getHospital().getLatitude();
            // 경도
            double lon = price.getHospital().getLongitude();
            int dis = locationDistance(userLatitude, userLongitude, lat, lon);

            // 거리 저장
            if (dis <= disLimit) {
                 TreatmentDto treatmentDto = TreatmentDto.builder().
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
                 treatmentDtos.add(treatmentDto);
            }
        }
        return treatmentDtos;
    }

    public List<TreatmentDto> getTreatmentListDistance(Double disLimit, Double userLatitude, Double userLongitude, String word) {
        // 검색한 비급여를 가지고 있는 병원들 추출
        List<Price> prices = treatmentRepository.findTreatmentByWord(word);

        // List<Price;> prices = null;
        List<TreatmentDto> treatmentDtos = new ArrayList<>();
        for (Price price : prices) {
            // 위도
            double lat = price.getHospital().getLatitude();
            // 경도
            double lon = price.getHospital().getLongitude();
            int dis = locationDistance(userLatitude, userLongitude, lat, lon);

            // 거리 저장
            if (dis <= disLimit) {
                TreatmentDto treatementDto = TreatmentDto.builder().
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
                treatmentDtos.add(treatementDto);
            }
        }
        treatmentDtos.sort(Comparator.comparingDouble(TreatmentDto::getDistance));
        return treatmentDtos;

    }

    private static int locationDistance(double lat1, double lon1, double lat2, double lon2) {
        double theta = lon1 - lon2;
        double dist =
                Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
                        * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515 * 1609.344;

        return (int) dist; //단위 meter
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
