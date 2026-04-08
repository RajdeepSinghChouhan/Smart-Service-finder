package controller.login;

import java.io.IOException;

import dao.LoginUsersDao;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import model.Users;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Login Servlet Starts executing");
		String formName = request.getParameter("username");
		String formPass = request.getParameter("password");
		
		Users user = new Users();
		user.setPassword(formPass);
		user.setUsername(formName);
		user.setEmail(formName);
		System.out.println("checking user is there or not ");
		boolean isUserExist = LoginUsersDao.isUserExist(user);
		System.out.println("Checking completed");
		HttpSession session = request.getSession();
		if(isUserExist) 
		{
			System.out.println("user is valid going to index page");
			session.setAttribute("user", formName);
			response.sendRedirect("jsp/index.jsp");
		}
		else {
			System.out.println("user is Invalid");
			request.setAttribute("errorMessage", "Invalid username/email or password");
			RequestDispatcher rd = request.getRequestDispatcher("/jsp/login.jsp");
			rd.forward(request, response);
		}
	}
}

