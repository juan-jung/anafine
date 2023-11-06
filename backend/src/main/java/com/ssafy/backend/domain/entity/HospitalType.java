package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import com.sun.istack.NotNull;

@Entity
@Getter
@Table(name = "hospital_type")
@AllArgsConstructor
@NoArgsConstructor
public class HospitalType {
    @Id
    @Column(name = "hospital_type_id")
    private Short id;

    @NotNull
    @Column(name = "hospital_type_name")
    private String name;
}
