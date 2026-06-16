package in.ashokit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import in.ashokit.enuma.RoleEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name="sbuser")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Integer id;
	@Column(unique = true)
	private String username;
	private String email;
	private String password;
	
	@Enumerated(EnumType.STRING)
	private RoleEnum role;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private ServiceProvider providerDetails;
}
