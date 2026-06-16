import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../Navbar/DashboardNavbar/dashboardNavbar";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles.css';

function UserDashboard() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);

    async function getBookings() {

        try {

            const response = await fetch("http://localhost:8080/allBookings", {

                method: "POST",

                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            setBookings(data);

            console.log(data);

        }
        catch (error) {

            console.log("Error : ", error);
        }
    }

    useEffect(() => {

        getBookings();

    }, []);

    return (

        <div>

            <DashboardNavbar />

            <div className="dashboard-layout">

                <nav className="sidebar">

                    <ul>
                        <li><a href="/userDashboard" className="active">Dashboard</a></li>
                        <li><a href="/userPendingBookings">Pending Bookings</a></li>
                        <li><a href="/userProfile">Profile</a></li>
                        <li><a href="#">Settings</a></li>
                    </ul>

                </nav>

                <main className="main-content">

                    <h2>Dashboard Overview</h2>

                    <div className="stats">

                        <div className="stat-card">
                            <h3>All Bookings</h3>
                            <p>{bookings.length}</p>
                        </div>

                        <div className="stat-card">
                            <h3>Active Bookings</h3>
                            <p>
                               2
                            </p>
                        </div>

                        <div className="stat-card">
                            <h3>Completed Jobs</h3>
                            <p>
                                5
                            </p>
                        </div>

                    </div>

                    <section className="recent-bookings">

                        <h3>All Bookings</h3>

                        <table>

                            <thead>

                                <tr>
                                    <th>Provider</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Edit Request</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    bookings.map((booking) => (

                                        <tr key={booking.id}>

                                            <td>{booking.spname}</td>

                                            <td>{booking.service}</td>

                                            <td>{booking.prefferedDate}</td>

                                            <td>{booking.status}</td>

                                            <td>
                                                <a
                                                    className="action-btn-accept"
                                                    onClick={() =>
                                                        navigate("/editBooking", {
                                                            state: booking
                                                        })
                                                    }
                                                >
                                                    Edit Booking
                                                </a>
                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>

                    </section>

                </main>

            </div>

        </div>
    );
}

export default UserDashboard;