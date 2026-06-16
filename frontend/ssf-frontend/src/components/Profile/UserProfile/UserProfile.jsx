import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../Navbar/DashboardNavbar/dashboardNavbar";
import axios from "axios";
import "./styles.css";

function UserProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: "",
        username: "",
        role:"",
        email: "",
        password: "",
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
                    username: data.username,
                    role: data.role,
                    email: data.email,
                    password: "",
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
        <div className="UserProfile-profile-page">

            <DashboardNavbar />

            {/* SIDEBAR */}
            <nav className="UserProfile-sidebar">
                <ul>
                    <li><a href="/userDashboard">Dashboard</a></li>
                    <li><a href="/userPendingBookings">Pending Bookings</a></li>
                    <li><a className="UserProfile-active">Profile</a></li>
                    <li><a href="/">Settings</a></li>
                </ul>
            </nav>

            {/* MAIN CONTENT */}
            <main className="UserProfile-main-content">

                <h2>My Profile</h2>

                <div className="UserProfile-profile-container">

                    <div className="UserProfile-form-group">
                        <label>User ID</label>
                        <input
                            type="text"
                            value={formData.userId}
                            disabled
                        />
                    </div>

                    <div className="UserProfile-form-group">
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    <div className="UserProfile-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </div>

                    <div className="UserProfile-form-group">
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

                    {/* BUTTONS */}
                    <div className="UserProfile-button-group">

                        {!editing ? (
                            <button
                                className="UserProfile-edit-btn"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    className="UserProfile-save-btn"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>

                                <button
                                    className="UserProfile-cancel-btn"
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

export default UserProfile;

