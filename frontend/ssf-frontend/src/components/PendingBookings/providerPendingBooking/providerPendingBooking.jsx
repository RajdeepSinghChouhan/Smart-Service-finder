import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from "../../Navbar/DashboardNavbar/dashboardNavbar";
function ProviderPendingBooking()
{
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    async function getBookings() {

        try {

            const response = await fetch(
                "http://localhost:8080/pendingBookings",
                {
                    method: "POST",

                    headers: {
                        "Authorization":
                            "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                }
            );

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

    async function acceptBooking(booking)
    {
        const confirmAccept =
            window.confirm(
                "Are you sure you want to accept this booking?"
            );

        if(!confirmAccept)
        {
            return;
        }

        try {

            const updatedBooking = {
                ...booking,
                status: "ACCEPTED"
            };

            await fetch(
                "http://localhost:8080/acceptBooking",
                {
                    method: "PUT",

                    headers: {
                        "Authorization":
                            "Bearer " + localStorage.getItem("token"),

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedBooking)
                }
            );

            getBookings();
        }
        catch (error) {

            console.log(error);
        }
    }

    async function rejectBooking(booking)
    {
        const confirmReject =
            window.confirm(
                "Are you sure you want to reject this booking?"
            );

        if(!confirmReject)
        {
            return;
        }

        try {

            const updatedBooking = {
                ...booking,
                status: "REJECTED"
            };

            await fetch(
                "http://localhost:8080/rejectBooking",
                {
                    method: "PUT",

                    headers: {
                        "Authorization":
                            "Bearer " + localStorage.getItem("token"),

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedBooking)
                }
            );

            getBookings();
        }
        catch (error) {

            console.log(error);
        }
    }
    
    return (

        <div>

            <DashboardNavbar />

            <div className="dashboard-layout">

                <nav className="sidebar">

                    <ul>
                        <li>
                            <a href="/providerDashboard" >
                                Dashboard
                            </a>
                        </li>

                        <li>
                            <a href="/providerPendingBookings" className="active">
                                Pending Bookings
                            </a>
                        </li>

                        <li>
                            <a href="/providerProfile">
                                Profile
                            </a>
                        </li>

                        <li>
                            <a href="/providerSettings">
                                Settings
                            </a>
                        </li>
                    </ul>

                </nav>

                <main className="main-content">

                    <h2>
                        Pending Bookings 
                    </h2>

                    <div className="stats">

                        <div className="stat-card">
                            <h3>Total Pending Bookings</h3>
                            <p>{bookings.length}</p>
                        </div>

                        <div className="stat-card">
                            <h3>Active Bookings</h3>

                            <p>
                                {
                                    bookings.filter(
                                        (booking) =>
                                            booking.status === "ACTIVE"
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="stat-card">
                            <h3>Completed Jobs</h3>

                            <p>
                                {
                                    bookings.filter(
                                        (booking) =>
                                            booking.status === "COMPLETED"
                                    ).length
                                }
                            </p>
                        </div>

                    </div>

                    <section className="recent-bookings">

                        <h3>Pending Bookings</h3>

                        <table>

                            <thead>

                                <tr>
                                    <th>Customer</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Accept</th>
                                    <th>Reject</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    bookings.map((booking) => (

                                        <tr key={booking.id}>

                                            <td>{booking.customerName}</td>

                                            <td>{booking.service}</td>

                                            <td>
                                                {booking.prefferedDate}
                                            </td>

                                            <td>{booking.status}</td>

                                            <td>

                                                <button
                                                    className="action-btn-accept"
                                                    onClick={() => acceptBooking(booking)}
                                                >
                                                    Accept
                                                </button>

                                            </td>

                                            <td>

                                                <button
                                                    className="action-btn-reject"
                                                    onClick={() => rejectBooking(booking)}
                                                >
                                                    Reject
                                                </button>

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
export default ProviderPendingBooking;