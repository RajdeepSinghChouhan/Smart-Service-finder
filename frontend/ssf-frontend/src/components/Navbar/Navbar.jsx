import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../utils/Logout/logout";
import "./Navbar.css";
function Navbar() {

    const navigate = useNavigate();
        function confirmAction() {
            if (confirm("Are you sure you want to logout?")) {
                Logout(navigate);
            }
        }

    function openDashboard() {

        const role = localStorage.getItem("role");

        if (role === "ROLE_USER") {
            
            navigate("/UserDashboard");
        }

        else if (role === "ROLE_PROVIDER") {

            navigate("/ProviderDashboard");
        }

        else if (role === "ROLE_ADMIN") {

            navigate("/AdminDashboard");
        }

        else {

            navigate("/login");
        }
    }
    
    return (
        <div className="nav">
            <div className="logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbObJvoHaP4UAHVOw486TAWK9MMfjPwwJ8NA&s" alt="" />
                <h1>Smart Service Finder</h1>
            </div>
            <div className="links">
                <Link to="/home">Home</Link>
                <a href="/home#sec2">Services</a>
                <a href="/home#sec3">Help</a>
            </div>
            <div className="headerBtn">
                <button className="dashboard" onClick={openDashboard}>Dashboard</button>
                <button onClick={confirmAction} className="logout">Logout</button>
            </div>
        </div>
    )
}
export default Navbar;