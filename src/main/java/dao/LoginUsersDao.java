package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.mindrot.jbcrypt.BCrypt;

import model.Users;
import util.DBConnection;

public class LoginUsersDao {

	public static boolean isUserExist(Users user) 
	{
		try 
		{
			Connection con = DBConnection.getConnection();
			String query = "SELECT * FROM users WHERE username = ? OR email = ?";
			PreparedStatement ps = con.prepareStatement(query);
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getEmail());
			ResultSet rs = ps.executeQuery();
			if(rs.next())
			{
				//check for password
				System.out.println("username is present now checking for password");
				String storedHash = rs.getString("password_hash");

				if (BCrypt.checkpw(user.getPassword(), storedHash)) {
					System.out.println("password is correct");
				    return true;
				} else {
					System.out.println("password is Incorrect");
				    return false;
				}
			}
			else {
				System.out.println("Username is not present");
				return false;
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}	
		return false;
	}
}
