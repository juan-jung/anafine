package com.ssafy.backend.domain.repository;

import java.util.List;

import com.ssafy.backend.domain.entity.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.backend.domain.entity.Treatment;

@Repository
public interface TreatmentRepository extends JpaRepository<Price, String> {

    //치료 항목 검색
    @Query(value = "select p from Price p where p.treatment.path like %:word%")
    List<Price> findTreatmentByWord(@Param("word") String word);

    // 치료 항목 아이디와 일치하는 정보 출력하기
//    List<Price> findByTreatment_IdOrderByMinPriceAsc(String treatmentId);
}
