import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Logout } from "../../../utils/Logout/logout";
import "./dashboardNavbar.css";
function DashboardNavbar()
{
    async function fetchCount() {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:8080/notifications/count",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        setCount(data);
    }

    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [showNotificationBox, setShowNotificationBox] = useState(false);


    useEffect(() => {

        fetchCount();

        const interval = setInterval(fetchCount, 10000);

        return () => clearInterval(interval);

    }, []);

    function confirmAction() {
        if (confirm("Are you sure you want to logout?")) {
            Logout(navigate);
        }
    }

    async function openNotifications() {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:8080/notifications",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        setNotifications(data);
        setShowNotificationBox(true);

        await fetch(
            "http://localhost:8080/notifications/read",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setCount(0);

    } catch (error) {
        console.error(error);
    }
}

    return (
         <>
        <header className="header">
        
            <div className="logo">
                <h1>Smart Service Finder</h1>
            </div>

            <div className="user-info">

                <a href="/home" className="provider-home-btn">Home</a>

                <button className="logout-btn" onClick={confirmAction}>
                    Logout
                </button>

                <div className="bell-wrapper">

                    <span
                        className="bell-icon"
                        onClick={openNotifications}
                    >
                        <i className="bi bi-bell"></i>
                    </span>

                    <span className="notif-count">
                           {count}
                    </span>

                </div>
            </div>

        </header>
            {
            showNotificationBox && (
                <div
                    className="notification-overlay"
                    onClick={() => setShowNotificationBox(false)}
                >
                    <div
                        className="notification-popup"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Notifications</h3>
        
                        {
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className="notification-item"
                                >
                                    {n.message}
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
            }
            </>
    );
}

export default DashboardNavbar;




        