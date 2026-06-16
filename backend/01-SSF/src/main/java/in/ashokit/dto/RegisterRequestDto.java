package in.ashokit.dto;

import in.ashokit.enuma.RoleEnum;
import lombok.Data;

@Data	
public class RegisterRequestDto {
	private String username;
	private String email;
	private String password;
	private RoleEnum role;
	// Provider fields
    private String service;
    private String location;
    private Double price;
    private Boolean availability;
}
