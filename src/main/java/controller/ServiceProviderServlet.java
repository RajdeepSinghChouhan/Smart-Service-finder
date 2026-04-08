package controller;

import java.io.IOException;

import dao.ServiceProviderDao;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.ServiceProvider;


public class ServiceProviderServlet extends HttpServlet {

	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException 
	{
		String name = request.getParameter("name");
		String stringId = request.getParameter("id");
		int id = Integer.parseInt(stringId);
		String service = request.getParameter("service");
		String location = request.getParameter("location");
		String availability = request.getParameter("availability");
		
		ServiceProvider sp = new ServiceProvider();
		sp.setName(name);
		sp.setId(id);
		sp.setService(service);
		sp.setLocation(location);
		sp.setAvailability(availability);
		ServiceProviderDao.save(sp);
		response.sendRedirect("service_provider.html");
	}
}
