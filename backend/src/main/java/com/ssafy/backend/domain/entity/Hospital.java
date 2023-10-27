package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import com.sun.istack.NotNull;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hospitalId;

    @ManyToOne
    @JoinColumn(name ="hospital_type_id")
    @NotNull
    private HospitalType hospitalType;

    @Column(length = 255)
    @NotNull
    private String name;

    @Column(length = 255)
    @NotNull
    private String address;

    @Column(length = 255)
    private String tel;

    @Column
    @NotNull
    private Double latitude;

    @Column
    @NotNull
    private Double longitude;

    @Column
    @NotNull
    private LocalDateTime modifiedAt;

    @Column(length = 255,name = "homepage_url")
    private String homepageUrl;

    @Column(length = 255)
    @NotNull
    private String ykiho;

}
