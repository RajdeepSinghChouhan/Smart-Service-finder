package in.ashokit.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class SearchProviderResponseDto {
	
	private Integer id;
	private String name;
	private String service;
	private String location;
	private Boolean availability;
	private Double price;
	private String email;
}
