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
		"ST_X(h.coordinate) as longitude, " +
		"ST_Y(h.coordinate) as latitude, " +
		"p.price_id, " +
		"p.max_price, " +
		"p.min_price, " +
		"ST_Distance_Sphere(h.coordinate, ST_PointFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'), 4326)) AS distance, "
		+
		"t.treatment_name " +
		"FROM Hospital h " +
		"JOIN Price p ON p.hospital_id = h.hospital_id " +
		"JOIN Treatment t ON p.treatment_id = t.treatment_id " +
		"WHERE MBRContains(" +
		"ST_GeomFromText(CONCAT(" +
		"'LINESTRING('," +
		":longitude - (:distance / 1000 * 0.009), ' ', :latitude - (:distance / 1000 * 0.009), ','," +
		":longitude + (:distance / 1000 * 0.009), ' ', :latitude + (:distance / 1000 * 0.009), ')'" +
		"), 4326), " +
		"h.coordinate) " +
		"AND ST_Distance_Sphere(h.coordinate, ST_PointFromText(CONCAT('POINT(', :longitude, ' ', :latitude, ')'), 4326)) <= :distance "
		+
		"AND t.treatment_name = :name " +
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
			@ColumnResult(name = "longitude", type = Double.class),
			@ColumnResult(name = "latitude", type = Double.class),
			@ColumnResult(name = "price_id", type = Long.class),
			@ColumnResult(name = "max_price", type = Integer.class),
			@ColumnResult(name = "min_price", type = Integer.class),
			@ColumnResult(name = "distance", type = Double.class),
			@ColumnResult(name = "treatment_name", type = String.class)
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
