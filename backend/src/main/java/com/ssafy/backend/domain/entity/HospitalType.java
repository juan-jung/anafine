package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HospitalType {
    @Id
    private Long hospitalTypeId;

    @Column
    private String name;
}
