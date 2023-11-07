package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import com.sun.istack.NotNull;

@Entity
@Getter
@Table(name = "treatment")
public class Treatment {
    @Id
    @Column(name = "treatment_id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull
    private Category category;

    @NotNull
    @Column(name = "treatment_name")
    private String name;

    private String info;

    @NotNull
    private String path;
}
