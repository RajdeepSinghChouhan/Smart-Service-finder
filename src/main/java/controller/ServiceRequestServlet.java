package controller;
import java.io.IOException;
import java.util.List;

import dao.ServiceProviderDao;
import dao.ServiceRequestDao;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.ServiceProvider;
import model.ServiceRequest;

public class ServiceRequestServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        String name = request.getParameter("name");
        String service_type = request.getParameter("service_type");
        String location = request.getParameter("location");

        ServiceRequest req = new ServiceRequest();
        req.setName(name);
        req.setService_type(service_type);
        req.setLocation(location);
        ServiceRequestDao.save(req);
        
        List<ServiceProvider> list = ServiceProviderDao.getProviders(service_type, location);

        request.setAttribute("providers", list);

        RequestDispatcher rd = request.getRequestDispatcher("/jsp/resultOfRequest.jsp");
        rd.forward(request, response);
    }
}