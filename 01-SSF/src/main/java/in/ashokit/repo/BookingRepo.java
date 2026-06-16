package in.ashokit.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ashokit.model.Booking;

@Repository
public interface BookingRepo extends JpaRepository<Booking,Integer>{
	
	public List<Booking> findAllBySpId(int spId);
	public List<Booking> findAllByUserId(int spId);
	public List<Booking> findAllBySpIdAndStatus(int spId, String status);
	public List<Booking> findAllByUserIdAndStatus(int userId, String status);
	
}
