package controller.signup;

import java.io.IOException;


import dao.SaveUserDao;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.mindrot.jbcrypt.BCrypt;
import model.Users;

@WebServlet("/signup")
public class SignUpServlet extends HttpServlet {


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
		System.out.println("SignUp servlet is executing..!");
		String username = request.getParameter("username");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		String hashedPassword = BCrypt.hashpw(password,BCrypt.gensalt());
	
		Users user = new Users();
		user.setUsername(username);
		user.setEmail(email);
		user.setPassword(hashedPassword);
		
		SaveUserDao.saveUser(user);
		
		System.out.println("Going to Login page");
		request.setAttribute("successMessage", "Successfully Signup , Now Login");
		RequestDispatcher rd = request.getRequestDispatcher("/jsp/login.jsp");
		rd.forward(request, response);
	}

}
