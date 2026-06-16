import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './editBooking.css';

function EditBooking() {

    const location = useLocation();
    const booking = location.state;
    const navigate = useNavigate();

    if (!booking) {
        return <h2>No booking selected</h2>;
    }

    const [formData, setFormData] = useState({
        id: booking.id,
        spname: booking.spname,
        service: booking.service,
        email: booking.email,
        city: booking.city,
        prefferedDate: booking.prefferedDate,
        message: booking.message
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }
    async function handleSubmit(e)
{
    e.preventDefault();

    try {

        const response = await fetch(
            "http://localhost:8080/editBooking",
            {
                method: "PUT",

                headers: {
                    "Authorization":
                        "Bearer " + localStorage.getItem("token"),

                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)
            }
        );

        const data = await response.text();
        console.log(data);

        alert("Booking updated successfully");

        navigate("/userdashboard");

    }
    catch(error)
    {
        console.log(error);
    }
}

    return (
        <div className="editB">
            <main className="editB-book-page">
                <section className="editB-book-card">

                    <div className="editB-brand">
                        <h1>Edit Booking</h1>
                        <p>Make Changes as per your comfort</p>
                    </div>

                    <form className="editB-book-form"  onSubmit={handleSubmit}>

                        <div className="editB-field-group">
                            <label>Provider Name</label>
                            <input
                                type="text"
                                name="spname"
                                value={formData.spname}
                                readOnly
                            />
                        </div>

                        <div className="editB-field-group">
                            <label>Service</label>
                            <input
                                type="text"
                                name="service"
                                value={formData.service}
                                readOnly
                            />
                        </div>

                        <div className="editB-field-group">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="editB-field-group">
                            <label>Location</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="editB-field-group">
                            <label>Preferred Date</label>
                            <input
                                type="datetime-local"
                                name="prefferedDate"
                                value={formData.prefferedDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="editB-field-group">
                            <label>Additional Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="editB-book-button">
                            Edit & Submit
                        </button>

                        <button
                            type="submit"
                            className="editB-cancel-booking"
                            formNoValidate
                        >
                            Cancel Booking
                        </button>

                    </form>

                </section>
            </main>
        </div>
    );
}

export default EditBooking;