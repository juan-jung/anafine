package com.ssafy.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class HospitalResponseDto <T>{
	private List<T> content;
	private int totalPages;
	private int totalElements;
}
