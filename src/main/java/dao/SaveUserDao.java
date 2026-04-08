package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.Users;
import util.DBConnection;

public class SaveUserDao{
	
	public static void saveUser(Users user)
	{
		try 
		{
			System.out.println("User is getting saved...!");
			System.out.println("DB connection processing...");
			Connection con = DBConnection.getConnection();
			System.out.println("DB connection Completed...");
			System.out.println("Query executing...");
			String query = "insert into users(username,email,password_hash) values(?,?,?)";
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getEmail());
			ps.setString(3, user.getPassword());
			
			int c = ps.executeUpdate();
			System.out.println("Query executed...");
			System.out.println(c+" user(s) saved successfully ..!");
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
