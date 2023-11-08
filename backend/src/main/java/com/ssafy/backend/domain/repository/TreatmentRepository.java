package com.ssafy.backend.domain.repository;

import java.util.List;
import java.util.Optional;

import com.ssafy.backend.domain.entity.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.backend.domain.entity.Treatment;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, String> {


    @Query(value = "select * from treatment where category_id = :categoryId", nativeQuery = true)
    Optional<Treatment> findByCategory(@Param("categoryId") String categoryId);
}
