package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import java.awt.*;
import java.time.LocalDateTime;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.locationtech.jts.geom.Point;
import com.fasterxml.jackson.annotation.JsonTypeId;
import com.ssafy.backend.dto.HospitalInfoDto;
import com.sun.istack.NotNull;
import com.sun.xml.bind.v2.runtime.Coordinator;

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
    @Column(name = "hospital_name")
    private String name;

    @NotNull
    private String address;

    private String tel;

    @NotNull
    private Point coordinate;

    @NotNull
    private LocalDateTime modifiedAt;

    private String homepageUrl;

    @NotNull
    @Column(unique = true)
    private String ykiho;

    public double getLatitude() {
    	return coordinate.getY();
    }

    public double getLongitude() {
    	return coordinate.getX();
    }

}
