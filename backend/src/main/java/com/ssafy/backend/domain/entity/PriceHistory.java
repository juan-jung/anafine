package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import com.sun.istack.NotNull;

@Entity
@Getter
@Table(name = "price_history")
public class PriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "price_history_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_id")
    @NotNull
    private Price price;

    @NotNull
    private Integer cost;

    @NotNull
    private LocalDateTime createdAt;

    private String significant;

    @NotNull
    private Boolean isLatest;

    private String info;
}
