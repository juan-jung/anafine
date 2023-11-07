package com.ssafy.backend.domain.repository;

import com.ssafy.backend.domain.entity.Category;
import com.ssafy.backend.domain.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface  CategoryRepository extends JpaRepository<Category, String> {

    // 대분류 출력
    @Query(value = "select c from Category c where c.parentCategory is null")
    List<Category> findLargeCategory();

    // 중분류 이하 출력
    @Query(value = "select c from Category c where c.parentCategory.id = :parentCategoryId and c.parentCategory is not null")
    List<Category> findCategoryByParentCategoryId(@Param("parentCategoryId") String parentCategoryId);

    // 말단 노드일 경우 path와 treatmentId 가져오기.
    @Query(value = "select c, t from Category c, Treatment t where c = t.category and c.isLeaf = true")
    List<Treatment> findTreatmentByLeaf();

//    List<Category> findByCategoryId(String categoryId);

//    @Query(value = "SELECT c FROM Category c WHERE c.parentCategory is not null")
//    List<Category> findByParentCategoryId(String parentCategoryId);
}
