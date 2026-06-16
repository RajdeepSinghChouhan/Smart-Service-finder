package in.ashokit.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ashokit.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer>{
	
	Optional<User> findByUsername(String username);
	Optional<User> findByProviderDetails(int spId);
	Optional<User> findById(int userId);
	
}
