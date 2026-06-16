package in.ashokit.util;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.ashokit.dto.SendAllBookingDto;
import in.ashokit.model.Booking;
import in.ashokit.model.Notification;
import in.ashokit.model.ServiceProvider;
import in.ashokit.model.User;
import in.ashokit.repo.BookingRepo;
import in.ashokit.repo.NotificationRepo;
import in.ashokit.repo.ProviderRepo;

@Service
public class BookingService {

	@Autowired
    private  ProviderRepo providerRepo;
	
	@Autowired
    private  ProviderService providerService;

	@Autowired
	private BookingRepo bookingRepo;
	
	@Autowired
	private NotificationRepo notificationRepo;
	
	@Autowired
	private UserService userService;


    BookingService(ProviderRepo providerRepo) {
        this.providerRepo = providerRepo;
    }
	
	
	
	public String addBooking(Booking booking)
	{
		bookingRepo.save(booking);
		
		ServiceProvider sp =
		        providerRepo.findById(booking.getSpId()).orElse(null) ;

		Integer providerUserId =
		        sp.getUser().getId();

		Notification notification = new Notification();


		notification.setReceiverId(providerUserId);

		notification.setMessage(
			    "New booking request from "
			    + userService.getUsernameByUserId(
			        booking.getUserId()
			      )
			);

		notification.setRead(false);

		notification.setCreatedAt(LocalDateTime.now());

		notificationRepo.save (notification);
		return "Booking Completed";
	}
	
	public List<SendAllBookingDto> getAllBookingForProvider(int spId)
	{
		List<Booking> allByUserId = bookingRepo.findAllBySpId(spId);
		System.out.println("Booking List"+allByUserId);
		System.out.println("Now converting to DTO");
		List<SendAllBookingDto> dtoList = new ArrayList<>();

		for(Booking booking : allByUserId)
		{
			int tempSpId = booking.getSpId();
			ServiceProvider sp = providerRepo.findById(tempSpId);
			User user = sp.getUser();
			String spName = user.getUsername();
			SendAllBookingDto dto = new SendAllBookingDto();

			
	        dto.setId(booking.getId());
	        dto.setSpId(spId);
	        dto.setSpname(spName);
	        dto.setService(booking.getService());
	        dto.setPrefferedDate(booking.getPreferredDate());
	        dto.setStatus(booking.getStatus());
	        dto.setUserId(booking.getUserId());
	        dto.setCustomerName(booking.getName());
	        dto.setCity(booking.getCity());
	        dto.setEmail(booking.getEmail());
	        dto.setMessage(booking.getMessage());	        
	        dto.setPhone(booking.getPhone());
	        dtoList.add(dto);
		}
		System.out.println("Dto List = "+dtoList);
		return dtoList;
	}
	public List<SendAllBookingDto> getAllBookingForUser(int userId)
	{
		List<Booking> allByUserId = bookingRepo.findAllByUserId(userId);
		System.out.println("Booking List"+allByUserId);
		System.out.println("Now converting to DTO");
		List<SendAllBookingDto> dtoList = new ArrayList<>();

		for(Booking booking : allByUserId)
		{
			int tempSpId = booking.getSpId();
			ServiceProvider sp = providerRepo.findById(tempSpId);
			User user = sp.getUser();
			String spName = user.getUsername();
			SendAllBookingDto dto = new SendAllBookingDto();

			
	        dto.setId(booking.getId());
	        dto.setSpId(booking.getSpId());
	        dto.setSpname(spName);
	        dto.setService(booking.getService());
	        dto.setPrefferedDate(booking.getPreferredDate());
	        dto.setStatus(booking.getStatus());
	        dto.setUserId(booking.getUserId());
	        dto.setCustomerName(booking.getName());
	        dto.setCity(booking.getCity());
	        dto.setEmail(booking.getEmail());
	        dto.setMessage(booking.getMessage());	        
	        dto.setPhone(booking.getPhone());
	        dtoList.add(dto);
		}
		System.out.println("Dto List = "+dtoList);
		return dtoList;
	}
	
	public String updateBookingAccept(SendAllBookingDto dto)
	{
		System.out.println("Booking to update = "+dto);
		 Booking oldBooking =
		            bookingRepo.findById(dto.getId()).orElse(null);

		    oldBooking.setStatus("ACCEPTED");

		    bookingRepo.save(oldBooking);
		    
		    Notification notification = new Notification();

		    notification.setReceiverId(dto.getUserId());

		    ServiceProvider sp = providerService.findServiceProviderBySpId(oldBooking.getSpId());

		    notification.setMessage(
		        "Your booking has been accepted by provider "+ sp.getUser().getUsername()
		    );

		    notification.setRead(false);

		    notification.setCreatedAt(LocalDateTime.now());

		    notificationRepo.save(notification);

		    return "Accepted";
	}
	public String updateBookingReject(SendAllBookingDto dto)
	{	
		System.out.println("Booking to update = "+dto);
	    Booking oldBooking =
	            bookingRepo.findById(dto.getId()).orElse(null);

	    oldBooking.setStatus("REJECTED");

	    bookingRepo.save(oldBooking);
	    
	    Notification notification = new Notification();

	    notification.setReceiverId(dto.getUserId());
	    
	    ServiceProvider sp = providerService.findServiceProviderBySpId(oldBooking.getSpId());

	    notification.setMessage(
	        "Your booking has been rejected by provider "+ sp.getUser().getUsername()
	    );
	    
	    

	    notification.setRead(false);

	    notification.setCreatedAt(LocalDateTime.now());

	    notificationRepo.save(notification);

	    return "Rejected";
	}
	
	public String editBooking(SendAllBookingDto dto)
	{
		System.out.println("Updating Booking = "+dto);
	    Booking oldBooking =
	            bookingRepo.findById(dto.getId()).orElse(null);

	    oldBooking.setEmail(dto.getEmail());
	    oldBooking.setCity(dto.getCity());
	    oldBooking.setPreferredDate(dto.getPrefferedDate());
	    oldBooking.setMessage(dto.getMessage());

	    bookingRepo.save(oldBooking);
	    ServiceProvider sp =
	            providerRepo.findById(oldBooking.getSpId()).orElse(null) ;

	    Notification notification = new Notification();

	    notification.setReceiverId(
	            sp.getUser().getId()
	    );

	    notification.setMessage(
	            "Booking updated by "
	            + userService.getUsernameByUserId(oldBooking.getUserId())
	    );

	    notification.setRead(false);

	    notification.setCreatedAt(LocalDateTime.now());

	    notificationRepo.save(notification);
	    
	    return "Updated";
	}
	
	
	public List<SendAllBookingDto> getPendingBookingForProvider(int spId)
	{
		List<Booking> allByUserId = bookingRepo.findAllBySpIdAndStatus(spId, "PENDING");
		
		List<SendAllBookingDto> dtoList = new ArrayList<>();

		for(Booking booking : allByUserId)
		{
			int tempSpId = booking.getSpId();
			ServiceProvider sp = providerRepo.findById(tempSpId);
			User user = sp.getUser();
			String spName = user.getUsername();
			SendAllBookingDto dto = new SendAllBookingDto();

			
	        dto.setId(booking.getId());
	        dto.setSpId(spId);
	        dto.setSpname(spName);
	        dto.setService(booking.getService());
	        dto.setPrefferedDate(booking.getPreferredDate());
	        dto.setStatus(booking.getStatus());
	        dto.setUserId(booking.getUserId());
	        dto.setCustomerName(booking.getName());
	        dto.setCity(booking.getCity());
	        dto.setEmail(booking.getEmail());
	        dto.setMessage(booking.getMessage());	        
	        dto.setPhone(booking.getPhone());
	        dtoList.add(dto);
		}
		System.out.println("Dto List = "+dtoList);
		return dtoList;
	}
	public List<SendAllBookingDto> getPendingBookingForUser(int userId)
	{
		List<Booking> allByUserId = bookingRepo.findAllByUserIdAndStatus(userId,"PENDING");
		
		List<SendAllBookingDto> dtoList = new ArrayList<>();

		for(Booking booking : allByUserId)
		{
			int tempSpId = booking.getSpId();
			ServiceProvider sp = providerRepo.findById(tempSpId);
			User user = sp.getUser();
			String spName = user.getUsername();
			SendAllBookingDto dto = new SendAllBookingDto();

			
	        dto.setId(booking.getId());
	        dto.setSpId(booking.getSpId());
	        dto.setSpname(spName);
	        dto.setService(booking.getService());
	        dto.setPrefferedDate(booking.getPreferredDate());
	        dto.setStatus(booking.getStatus());
	        dto.setUserId(booking.getUserId());
	        dto.setCustomerName(booking.getName());
	        dto.setCity(booking.getCity());
	        dto.setEmail(booking.getEmail());
	        dto.setMessage(booking.getMessage());	        
	        dto.setPhone(booking.getPhone());
	        dtoList.add(dto);
		}
		System.out.println("Dto List = "+dtoList);
		return dtoList;
	}
}
