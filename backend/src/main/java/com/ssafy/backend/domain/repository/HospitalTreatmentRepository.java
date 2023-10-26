package com.ssafy.backend.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.backend.domain.entity.HospitalTreatment;

@Repository
public interface HospitalTreatmentRepository extends JpaRepository<HospitalTreatment, Long> {

	// findByHospitalTreatment_TreatmentId JPA문법 맞는지 확인 : 객체의 PK
	List<HospitalTreatment> findByTreatment_TreatmentId(String treatmentId);
	Optional<HospitalTreatment> findByHospitalTreatmentId(Long hospitalTreatmentId);
}
