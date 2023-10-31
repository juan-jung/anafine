package com.ssafy.backend.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.backend.domain.entity.Price;

@Repository
public interface HospitalTreatmentRepository extends JpaRepository<Price, Long> {

	//TODO: findByHospitalTreatment_TreatmentId JPA문법 맞는지 확인 : 객체의 PK
	List<Price> findByTreatment_IdOrderByMinPriceAsc(String treatmentId);

}
