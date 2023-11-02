package com.ssafy.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchRecommendDto {
    private String treatmentId;
    private String name;
    private String path;
}
