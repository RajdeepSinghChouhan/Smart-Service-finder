package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.ServiceProvider;
import util.DBConnection;

public class ServiceProviderDao 
{
	public static void save(ServiceProvider req)
	{
		try {
			Connection con = DBConnection.getConnection();
			String query = "INSERT INTO service_providers (provider_id, name, service_type, location, availability) VALUES (?, ?, ?, ?, ?)";
			PreparedStatement ps = con.prepareStatement(query);
			ps.setInt(1, req.getId());
			ps.setString(2, req.getName());
			ps.setString(3, req.getService());
			ps.setString(4, req.getLocation());
			ps.setString(5, req.getAvailability());
			ps.executeUpdate();
			System.out.println("Service_provider data inserted");
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	public static List<ServiceProvider> getProviders(String service_type,String location)
	{
		List<ServiceProvider> list = new ArrayList<>();
		try {
			Connection con = DBConnection.getConnection();
			String query = "SELECT * FROM service_providers WHERE UPPER(service_type)=UPPER(?) AND UPPER(location)=UPPER(?)";
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, service_type);
			ps.setString(2, location);
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next())
			{
				ServiceProvider sp = new ServiceProvider();
				sp.setName(rs.getString("name"));
				sp.setService(rs.getString("service_type"));
				sp.setLocation(rs.getString("location"));
		        sp.setAvailability(rs.getString("availability"));
		        list.add(sp);
			}
			System.out.println("Service Provider jo user mang raha hai "+list);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return list;
	}
}
