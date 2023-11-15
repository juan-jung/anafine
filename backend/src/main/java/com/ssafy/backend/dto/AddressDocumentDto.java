package com.ssafy.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDocumentDto {

    private String address_name;

    @JsonProperty("x")
    private String longitude;

    @JsonProperty("y")
    private String latitude;

}
