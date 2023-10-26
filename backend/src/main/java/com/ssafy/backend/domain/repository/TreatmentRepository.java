package com.ssafy.backend.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.backend.domain.entity.Treatment;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, String> {

}
