package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import com.sun.istack.NotNull;

@Entity
@Getter
@Table(name = "hospital")
public class Hospital {
    @Id
    @Column(name = "hospital_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="hospital_type_id")
    @NotNull
    private HospitalType hospitalType;

    @NotNull
    private String name;

    @NotNull
    private String address;

    private String tel;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    @NotNull
    private LocalDateTime modifiedAt;

    private String homepageUrl;

    @NotNull
    @Column(unique = true)
    private String ykiho;

}
