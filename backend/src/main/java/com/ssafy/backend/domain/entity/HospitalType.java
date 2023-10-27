package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import com.sun.istack.NotNull;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HospitalType {
    @Id
    private Byte hospitalTypeId;

    @Column(length = 255)
    @NotNull
    private String name;
}
