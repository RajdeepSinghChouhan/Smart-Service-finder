import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../Navbar/DashboardNavbar/dashboardNavbar";
import axios from "axios";
import "./styles.css";

function ProviderProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: "",
        spId: "",
        username: "",
        role:"",
        email: "",
        password: "",
        availability: "",
        city: "",
        service: "",
    });

    const [originalData, setOriginalData] = useState({});
    const [editing, setEditing] = useState(false);

    // ================= FETCH DATA =================
    useEffect(() => {

        const fetchProfile = async () => {
            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:8080/getData",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;

                const profileData = {
                    userId: data.userId,
                    spId: data.spId,
                    username: data.username,
                    role: data.role,
                    email: data.email,
                    password: "",
                    availability: String(data.availability),
                    city: data.city,
                    service: data.service,
                };

                setFormData({ ...profileData });
                setOriginalData({ ...profileData });

            } catch (error) {
                console.log("Error fetching profile", error);
            }
        };

        fetchProfile();

    }, []);

    // ================= HANDLE CHANGE =================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ================= ENABLE EDIT =================
    const handleEdit = () => {
        setEditing(true);
    };

    // ================= CANCEL EDIT =================
    const handleCancel = () => {
        setFormData({ ...originalData });
        setEditing(false);
    };

    // ================= SAVE PROFILE =================
    const handleSave = async () => {

        // password mandatory while editing
        if (formData.password.trim() === "") {
            alert("Password is required!");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                "http://localhost:8080/editProfile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Profile Updated Successfully");

            setOriginalData(formData);
            setEditing(false);

        } catch (error) {
            console.log("Error updating profile", error);
            alert("Failed to update profile");
        }
    };


    return (
        <div className="ProviderProfile-profile-page">

            <DashboardNavbar />

            {/* SIDEBAR */}
            <nav className="ProviderProfile-sidebar">
                <ul>
                    <li><a href="/userDashboard">Dashboard</a></li>
                    <li><a href="/providerPendingBookings">Pending Bookings</a></li>
                    <li><a className="ProviderProfile-active">Profile</a></li>
                    <li><a href="/">Settings</a></li>
                </ul>
            </nav>

            {/* MAIN CONTENT */}
            <main className="ProviderProfile-main-content">

                <h2>My Profile</h2>

                <div className="ProviderProfile-profile-container">

                    <div className="ProviderProfile-form-group">
                        <label>User ID</label>
                        <input
                            type="text"
                            value={formData.userId}
                            disabled
                        />
                    </div>

                    <div className="ProviderProfile-form-group">
                        <label>Service Provider ID</label>
                        <input
                            type="text"
                            value={formData.spId}
                            disabled
                        />
                    </div>

                    <div className="ProviderProfile-form-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    <div className="ProviderProfile-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    <div className="ProviderProfile-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={!editing}
                            placeholder={
                                editing
                                    ? "Enter Password"
                                    : "********"
                            }
                        />
                    </div>
                    <div className="ProviderProfile-form-group">
                        <label>Availability</label>

                        <select
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            disabled={!editing}
                        >
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>

                    <div className="ProviderProfile-form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    <div className="ProviderProfile-form-group">
                        <label>Services Offered</label>
                        <input
                            type="text"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="ProviderProfile-button-group">

                        {!editing ? (
                            <button
                                className="ProviderProfile-edit-btn"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    className="ProviderProfile-save-btn"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>

                                <button
                                    className="ProviderProfile-cancel-btn"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default ProviderProfile;

