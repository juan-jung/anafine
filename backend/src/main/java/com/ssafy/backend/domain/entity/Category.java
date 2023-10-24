package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    private String categoryId;

    @ManyToOne
    @JoinColumn
    private Category parentCategory;

    @Column
    private String name;

    @Column
    private String info;

    @Column
    private Boolean isLeaf;
}
