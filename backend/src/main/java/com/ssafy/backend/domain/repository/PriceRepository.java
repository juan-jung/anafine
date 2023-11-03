package com.ssafy.backend.domain.repository;

import java.util.List;

import javax.persistence.NamedQuery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.backend.domain.entity.Price;
import com.ssafy.backend.dto.HospitalInfoDto;

@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {

	//TODO: findByHospitalTreatment_TreatmentId JPA문법 맞는지 확인 : 객체의 PK
	// Page<Price> findByTreatment_NameOrderByMinPriceAsc(String name, Pageable pageable);
	// List<Price> findByTreatment_NameOrderByMinPriceAsc(String name);
	// @Query(value = "SELECT new com.ssafy.backend.dto.HospitalInfoDto(h.id, h.name, h.coordinate, p.id, p.maxPrice, p.minPrice, ST_Distance_Sphere(h.coordinate, ST_PointFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'),4326)), t.name)  FROM Price p JOIN p.hospital h JOIN p.treatment t WHERE t.name = :name AND ST_Distance_Sphere(h.coordinate, ST_PointFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'),4326)) <= :distance", nativeQuery = false)
	// @Query(value = "SELECT h.hospital_id, h.hospital_name, ST_X(h.coordinate) as latitude, ST_Y(h.coordinate) as longitude, p.price_id, p.max_price, p.min_price, ST_Distance_Sphere(h.coordinate, ST_GeomFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'), 4326)) as distance, t.treatment_name FROM Hospital h JOIN Price p ON h.hospital_id = p.hospital_id JOIN Treatment t ON p.treatment_id = t.treatment_id WHERE ST_Distance_Sphere(h.coordinate, ST_GeomFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'), 4326)) <= :distance AND t.treatment_name = :name ORDER BY distance", nativeQuery = true)
	@Query(name = "findNearby")
	List<Object[]> findNearby(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("distance") double distance, @Param("name") String name);

}
