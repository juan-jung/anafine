package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import com.sun.istack.NotNull;

@Entity
@Getter
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "category_id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    @NotNull
    private String name;

    private String info;

    @NotNull
    @Column(name = "isleaf")
    private Boolean isLeaf;
}


