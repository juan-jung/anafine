package com.ssafy.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.backend.domain.repository.HospitalRepository;
import com.ssafy.backend.domain.repository.PriceRepository;

@SpringBootTest

class BackendApplicationTests {

	@Autowired
	private PriceRepository priceRepository;

	@Autowired
	private HospitalRepository hospitalRepository;

	@Test
	void contextLoads() {
		priceRepository.findNearby("도수치료", 1000000, 37.5666103, 126.9783882  );


	}

}
