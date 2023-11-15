package com.ssafy.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CoordDocumentDto {

    private String region_type;
    private String address_name;

    @JsonProperty("y")
    private String latitude;

    @JsonProperty("x")
    private String longitude;
}
