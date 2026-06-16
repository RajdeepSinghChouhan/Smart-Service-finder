package in.ashokit.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import in.ashokit.dto.GiveProviderDataDto;
import in.ashokit.dto.LoginRequestDto;
import in.ashokit.dto.LoginResponseDto;
import in.ashokit.dto.RegisterRequestDto;
import in.ashokit.dto.SearchProviderRequestDto;
import in.ashokit.dto.SearchProviderResponseDto;
import in.ashokit.dto.SendAllBookingDto;
import in.ashokit.model.Booking;
import in.ashokit.model.Notification;
import in.ashokit.model.ServiceProvider;
import in.ashokit.model.User;
import in.ashokit.repo.NotificationRepo;
import in.ashokit.util.BookingService;
import in.ashokit.util.JwtUtil;
import in.ashokit.util.NotificationService;
import in.ashokit.util.ProviderService;
import in.ashokit.util.UserService;


@RestController
@CrossOrigin("http://localhost:5173")
public class UsersRestController {

	@Autowired
    private UserService userService;
	
	@Autowired
	private NotificationRepo notificationRepo;
	
	@Autowired
	private NotificationService notificationService;
	
	@Autowired
	private ProviderService providerService;
	
	@Autowired
	private BookingService bookingService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtUtil;
	
	
	
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequestDto request) {

    	String res = userService.register(request);
    	System.out.println("Register competed");
        return res;
        /* HTTP Request from post man with credentials like name email phno pass and role↓DispatcherServlet ↓ Controller Method (here register method)↓@RequestBody converts JSON → DTO Object ↓ Service Layer ↓ Repository Layer↓Hibernate/JPA ↓ SQL Query ↓ Database (Data Stored) */
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) 
    {
    	Authentication authentication = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
    	authenticationManager.authenticate(authentication);
    	
    	String token = jwtUtil.generateToken(request.getUsername());
    	LoginResponseDto loginResponse = new LoginResponseDto();
		loginResponse.setUsername(request.getUsername());
		String role =  userService.getRole(request.getUsername());
		loginResponse.setRole(role);
		loginResponse.setToken(token);
		System.out.println("Login completed");
		return ResponseEntity.ok(loginResponse);
    }
    
    @PostMapping("/searchprovider")
    public ResponseEntity<List<SearchProviderResponseDto>> searchProvider(@RequestBody SearchProviderRequestDto request)
    {	
    	System.out.println("React come to search the provider");
    	List<ServiceProvider> list = providerService.findServiceProvider(request);

        List<SearchProviderResponseDto> response =new ArrayList<>();
        for(ServiceProvider sp : list)
        {
            SearchProviderResponseDto dto =
                    new SearchProviderResponseDto();
            User user = sp.getUser();
            dto.setName(user.getUsername());
            dto.setId(sp.getId());
            dto.setService(sp.getService());
            dto.setLocation(sp.getLocation());
            dto.setAvailability(sp.getAvailability());
            dto.setEmail(user.getEmail());
            dto.setPrice(sp.getPrice());
            response.add(dto);
        }
        System.out.println(list);
    	return ResponseEntity.ok(response);
    }
    
    @GetMapping("/searchprovider/all")
    public ResponseEntity<List<SearchProviderResponseDto>> searchAllProvider()
    {	
    	List<ServiceProvider> list = providerService.findAllServiceProvider();

        List<SearchProviderResponseDto> response =new ArrayList<>();
        for(ServiceProvider sp : list)
        {
            SearchProviderResponseDto dto =
                    new SearchProviderResponseDto();

            User user = sp.getUser();
            dto.setName(user.getUsername());
            dto.setId(sp.getId());
            dto.setService(sp.getService());
            dto.setLocation(sp.getLocation());
            dto.setAvailability(sp.getAvailability());
            dto.setEmail(user.getEmail());
            dto.setPrice(sp.getPrice());

            response.add(dto);
        }
        System.out.println(list);
    	return ResponseEntity.ok(response);
    }
    
    @PostMapping("/book")
    public ResponseEntity<String> bookService(@RequestBody Booking request, @RequestHeader("Authorization") String authHeader)
    {
    	String token = authHeader.substring(7);
    	String username = jwtUtil.extractUsername(token);
    	int userId = userService.getUserId(username);
    	request.setUserId(userId);
    	String res =  bookingService.addBooking(request);
    	return ResponseEntity.ok(res);
    }
    
    @PostMapping("/allBookings")
    public ResponseEntity<List<SendAllBookingDto>> showAllBookings( @RequestHeader("Authorization") String authHeader)
    {
    	System.out.println("Reqest come to API");
    	String token = authHeader.substring(7);
    	String username = jwtUtil.extractUsername(token);
    	User user = userService.getUser(username);
    	System.out.println("Username = "+username);
    	String role = user.getRole().name();
    	List<SendAllBookingDto> allBooking = new ArrayList<>();
    	if(role.equals("ROLE_USER"))
    	{
    		System.out.println("user = "+user);
    		allBooking = bookingService.getAllBookingForUser(user.getId());
    	}
    	if(role.equals("ROLE_PROVIDER"))
    	{
    		ServiceProvider sp = user.getProviderDetails();
    		System.out.println("sp = "+sp);
    		allBooking = bookingService.getAllBookingForProvider(sp.getId());    		
    	}
    	System.out.println(allBooking);
    	return ResponseEntity.ok(allBooking);
    }
    
    @PutMapping("/acceptBooking")
    public ResponseEntity<String> acceptBooking(@RequestBody SendAllBookingDto booking )
    {
    	System.out.println("Accepting booking");
    	String response = bookingService.updateBookingAccept(booking);
    	System.out.println("Booking Accepted");
    	return ResponseEntity.ok("Accepted");
    }
    @PutMapping("/rejectBooking")
    public ResponseEntity<String> rejectBooking(@RequestBody SendAllBookingDto booking )
    {
    	System.out.println("Rejecting booking");
    	String response = bookingService.updateBookingReject(booking);
    	System.out.println("Booking Rejected");
    	return ResponseEntity.ok("Rejected");
    }
    @PutMapping("/editBooking")
    public ResponseEntity<String> editBooking(@RequestBody SendAllBookingDto editBooking )
    {
    	System.out.println("Editing booking");
    	String response = bookingService.editBooking(editBooking);
    	System.out.println("Booking Updated");
    	return ResponseEntity.ok("Edited Completed");
    }
    
    @GetMapping("/getData")
    public ResponseEntity<GiveProviderDataDto> giveUserOrProviderData(@RequestHeader("Authorization") String authHeader)
	{
    	System.out.println("Reqest come to API");
    	String token = authHeader.substring(7);
    	GiveProviderDataDto data = providerService.sendUserOrProviderdata(token);    	
    	return ResponseEntity.ok(data);
	}
    
    @PutMapping("/editProfile")
    public ResponseEntity<String> editProfile(@RequestBody GiveProviderDataDto request )
    {
    	System.out.println("Flow come into the EditProfile method");
    	String result = providerService.updateProfile(request);
    	return ResponseEntity.ok(result);
    }
    
    @PostMapping("/pendingBookings")
    public ResponseEntity<List<SendAllBookingDto>> showPendingBookings( @RequestHeader("Authorization") String authHeader)
    {
    	
    	String token = authHeader.substring(7);
    	String username = jwtUtil.extractUsername(token);
    	
    	User user = userService.getUser(username);
    	
    	String role = user.getRole().name();
    	
    	List<SendAllBookingDto> allBooking = new ArrayList<>();
    	
    	if(role.equals("ROLE_USER"))
    	{
    		allBooking = bookingService.getPendingBookingForUser(user.getId());
    	}
    	if(role.equals("ROLE_PROVIDER"))
    	{
    		ServiceProvider sp = user.getProviderDetails();
    		
    		allBooking = bookingService.getPendingBookingForProvider(sp.getId());    		
    	}
    	
    	return ResponseEntity.ok(allBooking);
    }
    
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        String username = jwtUtil.extractUsername(token);

        User user = userService.getUser(username);

        return ResponseEntity.ok(
        		notificationService.getNotification(user.getId())
        );
    }
    @GetMapping("/notifications/count")
    public ResponseEntity<Long> getUnreadCount(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        User user = userService.getUser(username);

        long count =
        		notificationService.getCount(user.getId());

        return ResponseEntity.ok(count);
    }
    
    @PostMapping("/notifications/read")
    public ResponseEntity<Void> markAsRead(
    		@RequestHeader("Authorization") String authHeader) {
    	 String token = authHeader.substring(7);
         String username = jwtUtil.extractUsername(token);

         User user = userService.getUser(username);
        notificationService.markAllAsRead(user.getId());
        return ResponseEntity.ok().build();
    }
}
