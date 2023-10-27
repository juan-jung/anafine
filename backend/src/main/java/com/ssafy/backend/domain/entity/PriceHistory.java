package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import com.sun.istack.NotNull;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long priceHistoryId;

    @ManyToOne
    @JoinColumn
    @NotNull
    private Price price;

    @Column(columnDefinition = "integer default 0")
    @NotNull
    private Long cost;

    @Column
    @NotNull
    private LocalDateTime createdAt;

    @Column(length = 255)
    private String significant;

    @Column
    @NotNull
    private Boolean isLatest;
}
