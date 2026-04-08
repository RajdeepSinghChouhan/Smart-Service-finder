package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import model.ServiceRequest;
import util.DBConnection;

public class ServiceRequestDao {
	
	public static void save(ServiceRequest req)
	{
		try {
			Connection con = DBConnection.getConnection();
			String query = "insert into service_requests values(?,?,?)";
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, req.getName());
			ps.setString(2, req.getService_type());
			ps.setString(3, req.getLocation());
			ps.executeUpdate();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
