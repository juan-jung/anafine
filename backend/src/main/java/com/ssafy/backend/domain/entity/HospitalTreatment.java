package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HospitalTreatment {
    @Id
    private Long hospitalTreatmentId;

    @ManyToOne
    @JoinColumn
    private Treatment treatment;

    @ManyToOne
    @JoinColumn
    private Hospital hospital;

    @Column
    private Long currentPrice;
}
