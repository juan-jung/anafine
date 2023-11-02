package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import com.sun.istack.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "price")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "price_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treatment_id")
    @NotNull
    private Treatment treatment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    @NotNull
    private Hospital hospital;

    @NotNull
    private Integer maxPrice;

    @NotNull
    private Integer minPrice;

    @OneToMany(mappedBy = "price", fetch = FetchType.LAZY)
    private final List<PriceHistory> priceHistories = new ArrayList<>();
}
