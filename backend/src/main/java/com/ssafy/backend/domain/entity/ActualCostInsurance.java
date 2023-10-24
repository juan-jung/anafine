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
public class ActualCostInsurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String compName;

    @Column
    private Integer limitedAge;

    @Column
    private Integer maleCost;

    @Column
    private Integer femaleCost;

    @Column
    private String productName;

    @Column
    private String productType;

    @Column
    private Integer limit;

    @Column
    private String phone;

    @Column
    private LocalDateTime baseDate;

    @Column
    private String compUrl;
}
