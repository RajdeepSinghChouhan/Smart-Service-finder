package in.ashokit.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.ashokit.dto.LoginRequestDto;
import in.ashokit.dto.RegisterRequestDto;
import in.ashokit.enuma.RoleEnum;
import in.ashokit.model.ServiceProvider;
import in.ashokit.model.User;
import in.ashokit.repo.ProviderRepo;
import in.ashokit.repo.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired 
	private ProviderRepo providerRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public String register(RegisterRequestDto request) {

	    User user = new User();

	    user.setUsername(request.getUsername());
	    user.setEmail(request.getEmail());
	    
	    user.setPassword(
	            passwordEncoder.encode(request.getPassword())
	    );

	    user.setRole(request.getRole());

	    if (request.getRole() == RoleEnum.ROLE_PROVIDER) {

	        ServiceProvider provider = new ServiceProvider();

	        provider.setService(request.getService());
	        provider.setLocation(request.getLocation());
	        
	        provider.setPrice(request.getPrice());
	        provider.setAvailability(request.getAvailability());

	        provider.setUser(user);

	        user.setProviderDetails(provider);
	    }

	    userRepo.save(user);

	    return "Registered";
	}
	
	public String login(LoginRequestDto request)
	{
		User user = (User) userRepo.findByUsername(request.getUsername())
	            .orElse(null);
		 if(user == null)
		 {
			 return "User Not Found";
		 }
		 boolean isMatch = passwordEncoder.matches(
		            request.getPassword(),
		            user.getPassword()
		    );
		 if(isMatch)
		 {
			 	if(user.getRole()==RoleEnum.ROLE_USER)
		        {
		            return "Welcome User";
		        }
		        else if(user.getRole()==RoleEnum.ROLE_PROVIDER)
		        {
		        	return "Welcome Provider";
		        }
		        else if(user.getRole()==RoleEnum.ROLE_ADMIN)
		        {
		        	return "Welcome Admin";
		        }

		        return "Login Success";
		 }
		 else
		 {
			 return "Invalid Password";
		 }
	}
	public int getUserId(String username)
	{

		User user = (User) userRepo.findByUsername(username)
	            .orElse(null);
		 if(user == null)
		 {
			 return 0;
		 }
		 int userId = user.getId();
		 return userId;
	}
	
	public User getUser(String username)
	{

		User user = (User) userRepo.findByUsername(username)
	            .orElse(null);
		 if(user == null)
		 {
			 return null;
		 }
		 return user;
	}
	public String getRole(String username)
	{

		User user = (User) userRepo.findByUsername(username)
	            .orElse(null);
		 if(user == null)
		 {
			 return null;
		 }
		 String role = user.getRole().name();
		 return role;
	}
	
	public String getUsernameByUserId(int userId)
	{

		User user = (User) userRepo.findById(userId)
	            .orElse(null);
		 if(user == null)
		 {
			 return null;
		 }
		 String  username = user.getUsername();
		 return username;
	}
	public User getUserById(int userId)
	{

		User user = (User) userRepo.findById(userId)
	            .orElse(null);
		 if(user == null)
		 {
			 return null;
		 }
		 return user;
	}
	public String updateUser(User user)
	{
		userRepo.save(user);
		return "User Updated";
	}
}
