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
    @Query(value = "select c from Category c where c.parentCategory.id = :parentCategoryId")
    List<Category> findCategoryByParentCategoryId(@Param("parentCategoryId") String parentCategoryId);


    @Query(value = "select c, t from Category c, Treatment t where t.category.id = :categoryId")
    List<Object[]> findTreatmentInfoByCategoryId(@Param("categoryId") String categoryId);



    List<Category> findByIdStartingWith(String categoryId);


}
