import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Navbar/navbar";
import "./searchServiceProvider.css";

function searchServiceProvider() 
{
  const location = useLocation();

  const navigate = useNavigate();

  const providers = location.state?.providers;  
  function viewProvider(provider) {
    navigate("/viewProvider", { state: { provider } });
}

  function ServiceProvider({provider})
  {
    return (
      <div className="provider-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxj-6yJ1_d3scXJzDqzKDEj9_P2jFIZ3hZKQ&s" alt="Provider"/>
            <h2 className="name">SP ID : {provider.id}</h2>
            <h2 className="name">Name :  {provider.name}</h2>
            <h3 className="service">Service : {provider.service}</h3>
            <h3 className="location">Location : {provider.location}</h3>
            <h3 className="price">Price per hr : ${provider.price}</h3>
            <h3 className="status">
                Availability : {provider.availability ? "Available" : "Not Available"}
            </h3>
            <button onClick={() => viewProvider(provider)}>
                View Profile
            </button>
        </div>
      )
  }
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <div>
        <Navbar />
        <div className="search-header">
            <h1>All Available Service Providers</h1>
        </div>
        <div className="search-provider-container">
              {
                  providers.map((provider) => (
                      <ServiceProvider
                          key={provider.id}
                          provider={provider}
                      />
                ))
              }
        </div>
        <a href="#" className="search-home-link">
       	 	<button className="search-home-btn" onClick={() => navigate("/home")}>Home Page</button>
        </a>
    </div>
  );
}
export default searchServiceProvider;