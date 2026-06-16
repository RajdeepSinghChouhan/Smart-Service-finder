package in.ashokit.dto;

import in.ashokit.enuma.RoleEnum;
import lombok.Data;

@Data
public class GiveProviderDataDto {

	
	private Integer userId;
	private String username;
	private String email;
	private String password;
	private RoleEnum role;
	private Integer spId;
	private boolean availability;
	private double price;
	private String city;
	private String service;
	
}
