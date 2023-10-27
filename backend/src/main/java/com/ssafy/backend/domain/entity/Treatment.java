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
public class Treatment {
    @Id
    @Column(length = 10)
    private String treatmentId;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull
    private Category category;

    @Column(length = 255)
    @NotNull
    private String name;

    @Column(length = 2000)
    private String info;

    @Column(length = 255)
    @NotNull
    private String path;
}
