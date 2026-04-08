package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection 
{
	public static Connection getConnection()
	{
		try {
			System.out.println("Loading driver...");
			Class.forName("oracle.jdbc.driver.OracleDriver");
			System.out.println("Connecting to DB...");
			Connection conn = DriverManager.getConnection(
					"jdbc:oracle:thin:@//localhost:1521/orcl",
					"servicefinder",
					"1234"
					);
			System.out.println("Connected successfully!");
			return conn;
		}
		catch(Exception e)
		{
			System.out.println("DB Connection falied...");
			e.printStackTrace();
			return null;
		}
	}

}
