package in.ashokit.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data 
@Getter
@Setter	
public class SendAllBookingDto {

	private Integer id;
	private String spname;
	private Integer spId;
	private String service;
	private LocalDateTime prefferedDate;
	private String status;
	private Integer userId;
	private String customerName;
	private String email;
	private Long phone;
	private String city;
	private String message;
	
}
