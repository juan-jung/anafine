package com.ssafy.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CoordDocumentDto {

   @JsonProperty("address")
   private AddressDto addressDto;

   @JsonProperty("road_address")
   private RoadAddressDto roadAddressDto;
}
