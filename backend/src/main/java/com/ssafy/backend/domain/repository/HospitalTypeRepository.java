package com.ssafy.backend.domain.repository;

import com.ssafy.backend.domain.entity.HospitalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalTypeRepository extends JpaRepository<HospitalType, Long> {

}
