package com.ssafy.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class KakaoAddressResponseDto {

    @JsonProperty("documents")
    private List<AddressDocumentDto> documents;
}
