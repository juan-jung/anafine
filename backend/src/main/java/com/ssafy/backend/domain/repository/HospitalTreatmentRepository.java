package com.ssafy.backend.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.backend.domain.entity.Price;

@Repository
public interface HospitalTreatmentRepository extends JpaRepository<Price, Long> {

	//TODO: findByHospitalTreatment_TreatmentId JPA문법 맞는지 확인 : 객체의 PK
<<<<<<< 5ac0e80e287af8216b14a0df599ce8943e4f6de8
	// Page<Price> findByTreatment_NameOrderByMinPriceAsc(String name, Pageable pageable);
=======
>>>>>>> 7f4f25252eee9f310e4b79a9951561210ebd9ecf
	List<Price> findByTreatment_NameOrderByMinPriceAsc(String name);

}
