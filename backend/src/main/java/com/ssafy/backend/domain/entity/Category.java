package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import com.sun.istack.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "category_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    @NotNull
    private String name;

    private String info;

    @NotNull
    @Column(name = "isleaf")
    private Boolean isLeaf;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private final List<Treatment> treatments = new ArrayList<>();
}


