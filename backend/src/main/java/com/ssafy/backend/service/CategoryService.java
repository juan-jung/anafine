package com.ssafy.backend.service;

import com.ssafy.backend.domain.entity.Category;
import com.ssafy.backend.domain.entity.Treatment;
import com.ssafy.backend.domain.repository.CategoryRepository;
import com.ssafy.backend.domain.repository.TreatmentRepository;
import com.ssafy.backend.dto.CategoryDto;
import com.ssafy.backend.dto.PathDto;
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
    private final TreatmentRepository treatmentRepository;

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


    @Transactional
    public List<PathDto> getTreatmentInfoByCategoryId(String categoryId) {
//        List<Category> categoryList = categoryRepository.findByIdStartingWith(categoryId);
        List<Category> categoryList = categoryRepository.findCategoryByParentCategoryId(categoryId);

        System.out.println(categoryList.size() + "개!!!!!!!!!!!!!!!!!!!1");

        List<PathDto> pathDtoList = new ArrayList<>();

        for(Category category : categoryList) {
            log.info("[현재 카테고리] id : {}", category.getId());
            Treatment t = treatmentRepository.findByCategory(category.getId())
                    .orElse(null);

            String treatmentId = t == null ? null : t.getId();
            String path = t == null ? null : t.getPath();
            PathDto pathDto = PathDto.entityToDto(category, t);
            pathDtoList.add(pathDto);

        }

        log.info("여기까지 잘왓어~~~~~~");


        return pathDtoList;
    }




}

