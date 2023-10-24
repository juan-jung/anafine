package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private Long hospitalId;

    @ManyToOne
    @JoinColumn
    private HospitalType hospitalType;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String tel;

    @Column
    private Double latitude;

    @Column
    private Double longitude;

    @Column
    private LocalDateTime modifiedAt;

    @Column
    private String homePage;

    @Column
    private String ykiho;
}
