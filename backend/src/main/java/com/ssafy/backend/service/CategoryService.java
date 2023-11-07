package com.ssafy.backend.service;

import com.ssafy.backend.domain.entity.Category;
import com.ssafy.backend.domain.entity.Treatment;
import com.ssafy.backend.domain.repository.CategoryRepository;
import com.ssafy.backend.dto.CategoryDto;
import com.ssafy.backend.dto.PathDto;
import com.ssafy.backend.dto.TreatmentDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional
    public List<CategoryDto> getLargeCategoryList() {
        List<Category> categories = categoryRepository.findLargeCategory();

        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for (Category category: categories) {
            CategoryDto categoryDto = CategoryDto.entityToDto(category);
            categoryDtoList.add(categoryDto);
        }
        return categoryDtoList;
    }

//    @Transactional
//    public List<CategoryDto> getCategoryList(String parentCategoryId) {
//        List<Category> categories = categoryRepository.findCategoryByParentCategoryId(parentCategoryId);
//
//        List<CategoryDto> categoryDtoList = new ArrayList<>();
//        for (Category category: categories) {
//            CategoryDto categoryDto = CategoryDto.entityToDto(category);
//            categoryDtoList.add(categoryDto);
//        }
//        return categoryDtoList;
//    }
//
//    @Transactional
//    public List<TreatmentDto> getTreatmentListAndPath(String categoryId) {
//        List<Treatment> treatments = categoryRepository.findTreatmentByLeaf(categoryId);
//
//        List<TreatmentDto> treatmentDtoList = new ArrayList<>();
//        for (Treatment treatment: treatments) {
//            TreatmentDto treatmentDto = TreatmentDto.entityToDto(treatment);
//            treatmentDtoList.add(treatmentDto);
//        }
//        return treatmentDtoList;
//    }

    @Transactional
    public Object getTreatmentInfoByCategoryId(String categoryId) {

        List<Object[]> treatmentInfo = categoryRepository.findTreatmentInfoByCategoryId(categoryId);
        log.info("[카테고리ID 검색] 카테고리ID : {}`", categoryId);

        for (Object[] treatment : treatmentInfo) {
            log.info("반복문 들어왔어요 현재 트리트먼트 : {}", treatment);
//            Category category = (Category) treatment[0];
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> {
                        return new RuntimeException("없어");
                    });

            Treatment t = (Treatment) treatment[1];

            log.info("카테고리 : {}", category.getId());
            log.info("트리트먼트[1] : {}", t.getId());

            if (category.getIsLeaf()) {
                // Check if the category is a leaf node
                String treatmentId = t.getId();
                String path = t.getPath();
                return PathDto.builder()
                        .categoryId(category.getId())
                        .name(category.getName())
                        .info(category.getInfo())
                        .isLeaf(category.getIsLeaf())
                        .treatmentId(treatmentId)
                        .path(path)
                        .build();
            }
        }

        // 말단 노드가 없는 경우 해당 categoryId를 parentCategoryId로 가지는 카테고리 정보를 반환
        List<Category> categories = categoryRepository.findCategoryByParentCategoryId(categoryId);
        List<CategoryDto> categoryDtoList = new ArrayList<>();
        for (Category category : categories) {
            categoryDtoList.add(CategoryDto.entityToDto(category));
        }

        return categoryDtoList;
    }


//    @Transactional
//    public Object getTreatmentInfoByCategoryId(String categoryId) {
//        List<Object[]> treatmentInfo = categoryRepository.findTreatmentInfoByCategoryId(categoryId);
//        log.info("[카테고리ID 검색] 카테고리ID : {}`", categoryId);
//
//        for (Object[] treatment : treatmentInfo) {
//            log.info("반복문 들어왔어요 현재 트리트먼트 : {}", treatment.toString());
//            Category category = (Category) treatment[0];
//            Treatment t = (Treatment) treatment[1];
//
//            log.info("카테고리 : {}", category.getId());
//            log.info("트리트먼트[1] : {}", t.getId());
//
//            if (category.getIsLeaf()) {
//                // Check if the category is a leaf node
//                String treatmentId = t.getId();
//                String path = t.getPath();
//                return PathDto.builder()
//                        .categoryId(category.getId())
//                        .name(category.getName())
//                        .info(category.getInfo())
//                        .isLeaf(category.getIsLeaf())
//                        .treatmentId(treatmentId)
//                        .path(path)
//                        .build();
//            }
//        }
//
//        // 말단 노드가 없는 경우 해당 categoryId를 parentCategoryId로 가지는 카테고리 정보를 반환
//        List<Category> categories = categoryRepository.findCategoryByParentCategoryId(categoryId);
//        List<CategoryDto> categoryDtoList = new ArrayList<>();
//        for (Category category : categories) {
//            categoryDtoList.add(CategoryDto.entityToDto(category));
//        }
//
//        return categoryDtoList;
//    }

}

