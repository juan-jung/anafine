package com.ssafy.backend.controller;

import com.ssafy.backend.dto.HospitalInfoDto;
import com.ssafy.backend.dto.TreatmentDto;
import com.ssafy.backend.service.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/treatment")
public class TreatmentController {

    private final TreatmentService treatmentService;

    @GetMapping("/distance/{word}")
    public ResponseEntity<?> getTreatmentListDistance(
            @PathVariable String word,
            @RequestParam Double disLimit,
            @RequestParam Double userLatitude,
            @RequestParam Double userLongitude
           ) {
            List<TreatmentDto> treatmentDtos = treatmentService.getTreatmentListDistance(disLimit, userLatitude, userLongitude, word);
            return ResponseEntity.ok().body(treatmentDtos);
    }

    @GetMapping("/price/{word}")
    public ResponseEntity<?> getTreatmentListPrice(
            @PathVariable String word,
            @RequestParam Double disLimit,
            @RequestParam Double userLatitude,
            @RequestParam Double userLongitude) {
        List<TreatmentDto> treatmentDtos = treatmentService.getTreatmentListPrice(disLimit, userLatitude, userLongitude, word);
        return ResponseEntity.ok().body(treatmentDtos);
    }
}
