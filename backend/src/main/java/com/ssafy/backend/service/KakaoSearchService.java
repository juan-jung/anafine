package com.ssafy.backend.service;

import com.ssafy.backend.dto.KakaoAddressResponseDto;
import com.ssafy.backend.dto.KakaoCoordResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;

import java.net.URI;



@Service
@RequiredArgsConstructor
public class KakaoSearchService {

    private final RestTemplate restTemplate;
    private final KakaoUriBuilderService kakaoUriBuilderService;

    @Value("${kakao.rest.api.key}")
    private String kakaoRestApiKey;

    //주소 검색 -> 주소 후보 목록 목록 반환
    public KakaoAddressResponseDto getAddresslist(String address) {
        if(ObjectUtils.isEmpty(address)) return null;

        URI uri = kakaoUriBuilderService.buildUriByAddress(address);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION,"KakaoAK " + kakaoRestApiKey);
        HttpEntity<?> httpEntity = new HttpEntity<>(headers);
        return restTemplate.exchange(uri, HttpMethod.GET, httpEntity, KakaoAddressResponseDto.class).getBody();
    }

    //좌표 -> 주소 변환
    public KakaoCoordResponseDto coordToAddress(double latitude, double longitude) {
        if(ObjectUtils.isEmpty(latitude) || ObjectUtils.isEmpty(longitude)) return null;

        URI uri = kakaoUriBuilderService.buildUriByCoord(latitude, longitude);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION,"KakaoAK " + kakaoRestApiKey);
        HttpEntity<?> httpEntity = new HttpEntity<>(headers);
        return restTemplate.exchange(uri, HttpMethod.GET, httpEntity, KakaoCoordResponseDto.class).getBody();
    }
}
