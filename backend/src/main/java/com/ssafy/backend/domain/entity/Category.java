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
    @Column(name = "category_name")
    private String name;

    private String info;

    @NotNull
    private Boolean isLeaf;
}


