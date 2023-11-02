package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import com.sun.istack.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "hospital_type")
public class HospitalType {
    @Id
    @Column(name = "hospital_type_id")
    private Short id;

    @NotNull
    private String name;

    @OneToMany(mappedBy = "hospitalType", fetch = FetchType.LAZY)
    private final List<Hospital> hospitals = new ArrayList<>();
}
