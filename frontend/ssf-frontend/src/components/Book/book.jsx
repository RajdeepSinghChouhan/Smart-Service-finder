import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Book.css";

function Book() {

    const location = useLocation();
    const navigate = useNavigate();

    // PROVIDER DATA RECEIVED FROM ViewProvider.jsx

    const provider = location.state?.provider;

    // FORM STATE

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phno: "",
        location: "",
        datetime: "",
        message: ""
    });

    // HANDLE INPUT CHANGE

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // HANDLE FORM SUBMIT

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // GET JWT TOKEN

            const token = localStorage.getItem("token");

            if (!token) {

                alert("Please login first");

                navigate("/login");

                return;
            }

            // DATA SENT TO BACKEND

            const bookingData = {

                spId: provider?.id,

                name: formData.name,

                email: formData.email,
                
                phone: formData.phno,
                
                service: provider?.service,

                city: formData.location,

                preferredDate: formData.datetime,

                message: formData.message
            };


            console.log("Booking Data:", bookingData);
            // API CALL

            const response = await fetch(
                "http://localhost:8080/book",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(bookingData)
                }
            );

            // SUCCESS

            if (response.ok) {

                const data = await response.text();

                console.log(data);

                alert(data);

                navigate("/home");
            }

            // FAILURE

            else {

                const error = await response.text();

                console.log(error);

                alert("Booking Failed!");
            }

        }

        catch (error) {

            console.log(error);

            alert("Something went wrong!");
        }
    };

    // IF PROVIDER NOT FOUND

    if (!provider) {

        return <h1>No Provider Selected</h1>;
    }

    return (

        <div className="book-container">

            <main className="book-page">

                <section className="book-card">

                    <div className="brand">

                        <h1>Book Services</h1>

                        <p>
                            Get Instant Response From Providers
                        </p>

                    </div>

                    <form
                        className="book-form"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >

                        

                        <div className="field-group">

                            <label htmlFor="name">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />

                        </div>

                        {/* EMAIL */}

                        <div className="field-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>

                        {/* SERVICE */}

                        <div className="field-group">

                            <label>
                                Service
                            </label>

                            <input
                                type="text"
                                value={provider?.service || ""}
                                readOnly
                            />

                        </div>

                        {/* PROVIDER */}

                        <div className="field-group">

                            <label>
                                Provider
                            </label>

                            <input
                                type="text"
                                value={provider?.name || ""}
                                readOnly
                            />

                        </div>

                        {/* LOCATION */}

                        <div className="field-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                placeholder="Enter location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                            />

                        </div>

                        {/* PHONE */}

                        <div className="field-group">

                            <label htmlFor="phno">
                                Phone Number
                            </label>

                            <input
                                type="number"
                                name="phno"
                                placeholder="Enter phone number"
                                required
                                value={formData.phno}
                                onChange={handleChange}
                            />

                        </div>

                        {/* DATE TIME */}

                        <div className="field-group">

                            <label htmlFor="datetime">
                                Preferred Date and Time
                            </label>

                            <input
                                type="datetime-local"
                                name="datetime"
                                required
                                value={formData.datetime}
                                onChange={handleChange}
                            />

                        </div>

                        {/* MESSAGE */}

                        <div className="field-group">

                            <label htmlFor="message">
                                Additional Message
                            </label>

                            <textarea
                                name="message"
                                maxLength="400"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        {/* SUBMIT BUTTON */}

                        <button
                            type="submit"
                            className="book-button"
                        >
                            Book
                        </button>

                        {/* BACK BUTTON */}

                        <div className="form-actions">

                            <Link
                                to="/viewprovider"
                                state={{ provider }}
                                className="secondary-link"
                            >
                                Back To Profile
                            </Link>

                        </div>

                    </form>

                </section>

            </main>

        </div>
    );
}

export default Book;