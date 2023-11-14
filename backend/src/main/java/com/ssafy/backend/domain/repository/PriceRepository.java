package com.ssafy.backend.domain.repository;

import java.util.List;

import javax.persistence.NamedQuery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.backend.domain.entity.Price;
import com.ssafy.backend.dto.HospitalInfoDto;

@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {

	// TODO : Page<Price> findByTreatment_NameOrderByMinPriceAsc(String name, Pageable pageable); 페이지네이션 구현
	@Query(name = "findNearby")
	List<Object[]> findNearby(@Param("treatmentId") String treatmentId, @Param("distance") double distance, @Param("latitude") double latitude, @Param("longitude") double longitude);


}
