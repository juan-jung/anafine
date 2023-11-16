package com.ssafy.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class KakaoUriBuilderService {

    private static final String KAKAO_ADDRESS_SEARCH_URL = "https://dapi.kakao.com/v2/local/search/address.json";
    private static final String KAKAO_COORD_TO_ADDRESS_URL = "https://dapi.kakao.com/v2/local/geo/coord2address.json";


    public URI buildUriByAddress(String address) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(KAKAO_ADDRESS_SEARCH_URL)
                .queryParam("query", address);

        return uriComponentsBuilder.build().encode().toUri();
    }

    public URI buildUriByCoord(double latitude, double longitude) {
        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(KAKAO_COORD_TO_ADDRESS_URL)
                .queryParam("x", longitude)
                .queryParam("y", latitude);

        return uriComponentsBuilder.build().encode().toUri();
    }

}
