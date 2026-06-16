package in.ashokit.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ashokit.model.ServiceProvider;

@Repository
public interface ProviderRepo extends JpaRepository<ServiceProvider,Integer>{
	
	List<ServiceProvider> findByServiceAndLocation(String service,String location);
	ServiceProvider findById(int id);
}
