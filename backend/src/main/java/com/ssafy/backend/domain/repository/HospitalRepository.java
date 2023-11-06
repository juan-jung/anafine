package com.ssafy.backend.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.entity.Hospital;

public interface HospitalRepository extends JpaRepository<Hospital, Integer> {

}
