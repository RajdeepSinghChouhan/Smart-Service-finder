package in.ashokit.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.ashokit.model.Notification;
import in.ashokit.repo.NotificationRepo;

@Service
public class NotificationService {

	@Autowired
	private NotificationRepo notificationRepo;
	
	public String markAllAsRead(Integer userId)
	{
		List<Notification> list = notificationRepo.findByReceiverIdOrderByCreatedAtDesc(userId); 
		for(Notification notification : list)
		{
			notification.setRead(true);
			notificationRepo.save(notification);
		}
		return "All are marked as read";
	}
	
	public List<Notification> getNotification(Integer userId)
	{
		List<Notification> list = notificationRepo.findByReceiverIdOrderByCreatedAtDesc(userId);
		
		return list;
	}
	
	public Long getCount(Integer userId)
	{
		long count = notificationRepo.countByReceiverIdAndReadFalse(userId);
		return count;
	}
	
}
