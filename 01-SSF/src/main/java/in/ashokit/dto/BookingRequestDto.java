package in.ashokit.dto;

import java.time.LocalDateTime;

import lombok.Data;


@Data
public class BookingRequestDto {

	private Integer userId;
	private Integer spId;
	private String username;
	private String email;
	private Long phone;
	private String service;
	private String city;
	private LocalDateTime prefferedDate;
	private String message;
	private String status = "PENDING";
}
