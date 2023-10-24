package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long priceHistoryId;

    @ManyToOne
    @JoinColumn
    private HospitalTreatment hospitalTreatment;

    @Column
    private Long price;

    @Column
    private LocalDateTime createdAt;
}
