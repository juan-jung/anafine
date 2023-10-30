package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import com.sun.istack.NotNull;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @Column(length = 10)
    private String categoryId;

    @ManyToOne
    @JoinColumn(name= "parent_category_id")
    private Category parentCategory;

    @Column(length = 255)
    @NotNull
    private String name;

    @Column(length = 2000)
    private String info;

    @Column(name ="isleaf")
    @NotNull
    private Boolean isLeaf;
}


