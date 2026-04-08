<%@ page import="java.util.*, model.ServiceProvider" %>
<html>
    <head>
        <title>Service Providers</title>
        <link rel="stylesheet" href="css/resultOfRequest.css">
    </head>
    <body>
        <div class="Data Container">
        <!-- header -->
        <div class="header">
            <div class="logo">
                <a href="/SmartServiceFinder/pages/index.html"><h3>My Service Finder</h3></a>
            </div>
            <div class="search-bar">
    
            <form class="form" action="submitRequest" method="post">
    
              <input type="text" name="service_type" placeholder="Enter Service" required /><br /><br />
              
              <input type="text" name="location" placeholder="Enter Location" required/><br /><br />
    
              <button class="button" type="submit">Search</button>
               
               </form>       	
          </div>
    
            <div class="links">
                <a href=""><img src="https://cdn-icons-png.flaticon.com/128/5264/5264565.png" width="50" height="50" alt=""></a>
            </div>
        </div>
        <hr/>
        <hr/>
        

                <%
                List<ServiceProvider> list = (List<ServiceProvider>) request.getAttribute("providers");
        
                if(list == null){
                    out.println("List is NULL");
                }
                else if(list.isEmpty()){
                    %>

                        <div class="listIsEmpty">
                            <h1>404 - No Providers Found !</h1>
                        </div>
                    <%
                }
                else{
                	%>
                    <!-- Main data  -->
                    <div class="main">
                        <div class="ServiceImage">
                            <h2>Plumbers</h2>
                            <img src="https://img.freepik.com/free-photo/technician-checking-heating-system-boiler-room_169016-53608.jpg" alt="">
                        </div>
                        <div class="Right">
                        <%
                    for(ServiceProvider sp : list)
                    {
                        %>
                        <div class="card">
                            <img src="https://media.istockphoto.com/id/178126106/photo/hot-water-heater-service.jpg?s=612x612&w=0&k=20&c=dQDPH9tY01tOfw8Fts22QoiCaevnMpekRlktgsPgZ_E=" width="300" height="200" alt="">
                            <h1>Name : <%= sp.getName()%></h1>
                            <h2>Service : <%= sp.getService()%></h2>
                            <h3>Location : <%= sp.getLocation()%></h3>
                            <h3>Availability : <%= sp.getAvailability() %></h3>
                        </div>
                        <div class="card">
                            <img src="https://media.istockphoto.com/id/178126106/photo/hot-water-heater-service.jpg?s=612x612&w=0&k=20&c=dQDPH9tY01tOfw8Fts22QoiCaevnMpekRlktgsPgZ_E=" width="300" height="200" alt="">
                            <h1>Name : <%= sp.getName()%></h1>
                            <h2>Service : <%= sp.getService()%></h2>
                            <h3>Location : <%= sp.getLocation()%></h3>
                            <h3>Availability : <%= sp.getAvailability() %></h3>
                        </div>
                        <div class="card">
                            <img src="https://media.istockphoto.com/id/178126106/photo/hot-water-heater-service.jpg?s=612x612&w=0&k=20&c=dQDPH9tY01tOfw8Fts22QoiCaevnMpekRlktgsPgZ_E=" width="300" height="200" alt="">
                            <h1>Name : <%= sp.getName()%></h1>
                            <h2>Service : <%= sp.getService()%></h2>
                            <h3>Location : <%= sp.getLocation()%></h3>
                            <h3>Availability : <%= sp.getAvailability() %></h3>
                        </div>
                        <% 
                    }
                }
                %>
            </div>
        </div>
    </div>
    </body>
</html>