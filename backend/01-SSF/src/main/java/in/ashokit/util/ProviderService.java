package in.ashokit.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.ashokit.dto.GiveProviderDataDto;
import in.ashokit.dto.SearchProviderRequestDto;
import in.ashokit.enuma.RoleEnum;
import in.ashokit.model.ServiceProvider;
import in.ashokit.model.User;
import in.ashokit.repo.ProviderRepo;
import in.ashokit.repo.UserRepository;

@Service
public class ProviderService {

	@Autowired 
	private ProviderRepo providerRepo;
	
	@Autowired
    private UserService userService;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	public List<ServiceProvider> findServiceProvider(SearchProviderRequestDto request)
	{
		
		List<ServiceProvider> list = providerRepo.findByServiceAndLocation(request.getService(),request.getLocation());
		return list;
	}
	public List<ServiceProvider> findAllServiceProvider()
	{
		
		List<ServiceProvider> list = providerRepo.findAll();
		return list;
	}
	
	public ServiceProvider findServiceProviderBySpId(Integer spId)
	{
		ServiceProvider sp = (ServiceProvider) providerRepo.findById(spId).orElse(null);			
		if(sp == null)
		 {
			 return null;
		 }

		return sp;
	}
	
	public GiveProviderDataDto sendUserOrProviderdata(String token)
	{
		String username = jwtUtil.extractUsername(token);
    	User user = userService.getUser(username);
    	System.out.println("Username = "+username);
    	GiveProviderDataDto data = new GiveProviderDataDto();
    	data.setUserId(user.getId());
    	data.setUsername(user.getUsername());
    	data.setEmail(user.getEmail());
    	data.setRole(user.getRole());
    	if(user.getRole()==RoleEnum.ROLE_USER)
    	{
    		return data;
    	}
    	
		ServiceProvider sp = user.getProviderDetails();
		data.setSpId(sp.getId());
		data.setService(sp.getService());
		data.setAvailability(sp.getAvailability());
		data.setCity(sp.getLocation());
		data.setPrice(sp.getPrice());
		return data;    		
    	
	}
	
	public String updateProfile(GiveProviderDataDto request)
	{
		User user = userService.getUserById(request.getUserId());
		user.setUsername(request.getUsername());
	    user.setEmail(request.getEmail());
	    
	    user.setPassword(
	            passwordEncoder.encode(request.getPassword())
	    );

	    user.setRole(request.getRole());

	    if (request.getRole() == RoleEnum.ROLE_PROVIDER) {

	        ServiceProvider provider = user.getProviderDetails();

	        provider.setService(request.getService());
	        provider.setLocation(request.getCity());
	        
	        provider.setPrice(request.getPrice());
	        provider.setAvailability(request.isAvailability());

	        provider.setUser(user);

	        user.setProviderDetails(provider);
	    }

	    userRepo.save(user);

	    return "Profile Updated";
	}
	
	
}
