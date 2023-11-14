package com.ssafy.backend.domain.entity;

import lombok.*;

import javax.persistence.*;

import org.locationtech.jts.geom.Point;

import com.ssafy.backend.dto.HospitalInfoDto;
import com.sun.istack.NotNull;

@Entity
@Getter
@Table(name = "price")
@NamedNativeQuery(
	name = "findNearby",
	query = "SELECT " +
		"h.hospital_id, " +
		"h.hospital_name, " +
		"ST_X(h.coordinate) as latitude, " +
		"ST_Y(h.coordinate) as longitude, " +
		"p.price_id, " +
		"p.max_price, " +
		"p.min_price, " +
		"IF(" +
		"(:latitude - (:distance / 1000 * 0.009) >= -90) AND (:latitude + (:distance / 1000 * 0.009) <= 90) AND " +
		"(:longitude - (:distance / 1000 * 0.009) >= -180) AND (:longitude + (:distance / 1000 * 0.009) <= 180), " +
		"ST_Distance_Sphere(h.coordinate, ST_PointFromText(CONCAT('POINT(', :latitude, ' ', :longitude, ')'), 4326)), "
		+
		"NULL" +
		") AS distance, " +
		"t.treatment_name, " +
        "t.path, " +
		"h.address " +
		"FROM hospital h " +
		"JOIN Price p ON p.hospital_id = h.hospital_id " +
		"JOIN Treatment t ON p.treatment_id = t.treatment_id " +
		"WHERE " +
		"IF(" +
		"(:latitude - (:distance / 1000 * 0.009) >= -90) AND (:latitude + (:distance / 1000 * 0.009) <= 90) AND " +
		"(:longitude - (:distance / 1000 * 0.009) >= -180) AND (:longitude + (:distance / 1000 * 0.009) <= 180), " +
		"MBRContains(" +
		"ST_GeomFromText(CONCAT(" +
		"'LINESTRING('," +
		":latitude - (:distance / 1000 * 0.009), ' ', :longitude - (:distance / 1000 * 0.009), ','," +
		":latitude + (:distance / 1000 * 0.009), ' ', :longitude + (:distance / 1000 * 0.009), ')'" +
		"), 4326), " +
		"h.coordinate" +
		"), " +
		"NULL" +
		") " +
		"AND " +
		"IF(" +
		"(:latitude - (:distance / 1000 * 0.009) >= -90) AND (:latitude + (:distance / 1000 * 0.009) <= 90) AND " +
		"(:longitude - (:distance / 1000 * 0.009) >= -180) AND (:longitude + (:distance / 1000 * 0.009) <= 180), " +
		"ST_Distance_Sphere(h.coordinate, ST_PointFromText(CONCAT('POINT(', :latitude, ' ', :longitude, ')'), 4326)), "
		+
		"NULL" +
		") <= :distance " +
		"AND t.treatment_id = :treatmentId " +
		"ORDER BY p.min_price",
	resultSetMapping = "HospitalInfoDtoMapping"
)

@SqlResultSetMapping(
	name = "HospitalInfoDtoMapping",
	classes = @ConstructorResult(
		targetClass = HospitalInfoDto.class,
		columns = {
			@ColumnResult(name = "hospital_id", type = Integer.class),
			@ColumnResult(name = "hospital_name", type = String.class),
			@ColumnResult(name = "latitude", type = Double.class),
			@ColumnResult(name = "longitude", type = Double.class),
			@ColumnResult(name = "price_id", type = Long.class),
			@ColumnResult(name = "max_price", type = Integer.class),
			@ColumnResult(name = "min_price", type = Integer.class),
			@ColumnResult(name = "distance", type = Double.class),
			@ColumnResult(name = "treatment_name", type = String.class),
            @ColumnResult(name = "path", type = String.class),
			@ColumnResult(name = "address", type = String.class)
		}
	)
)
public class Price {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "price_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "treatment_id")
	@NotNull
	private Treatment treatment;

	@ManyToOne
	@JoinColumn(name = "hospital_id")
	@NotNull
	private Hospital hospital;

	@NotNull
	private Integer maxPrice;

	@NotNull
	private Integer minPrice;
}
