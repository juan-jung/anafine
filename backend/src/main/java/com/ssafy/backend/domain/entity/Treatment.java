package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Treatment {
    @Id
    private String treatmentId;

    @ManyToOne
    @JoinColumn
    private Category category;

    @Column
    private String name;

    @Column
    private String info;

    @Column
    private String path;
}
