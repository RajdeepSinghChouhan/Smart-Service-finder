package in.ashokit.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="booking")
public class Booking {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Integer id;
	
	private Integer userId;
	private Integer spId;
	private String name;
	private String email;
	private Long phone;
	private String service;
	private String city;
	private LocalDateTime preferredDate;
	private String message;
	private String status = "PENDING";
}
