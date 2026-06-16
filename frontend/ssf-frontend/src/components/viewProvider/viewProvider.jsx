import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./viewProvider.css";
import Navbar from "../Navbar/Navbar";
function ViewProvider() {

    const location = useLocation();
    const navigate = useNavigate();

    const provider = location.state?.provider;

    if (!provider) {
        return <h1>No Provider Data Found</h1>;
    }

    const handleBook = () => {
        navigate("/book", {
            state: {
                provider: provider
            }
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Navbar />
            <div className="vp">
                

                <div className="vp-card">

                    <div className="vp-name">
                        {provider.name}
                    </div>

                    <div className="vp-service">
                        {provider.service}
                    </div>

                    <div className="vp-info">

                        <p>
                            <i className="bi bi-geo-alt-fill"></i>

                            <span className="vp-label">Location:</span>

                            <span>{provider.location}</span>
                        </p>

                        <p>
                            <i className="bi bi-currency-rupee"></i>

                            <span className="vp-label">Price/hr:</span>

                            <span>₹{provider.price}</span>
                        </p>

                        <p>
                            <i className={`bi ${
                                provider.availability
                                    ? "bi-check-circle-fill"
                                    : "bi-x-circle-fill"
                            }`}
                            ></i>

                            <span className="vp-label">Availability:</span>

                            <span
                                className={`availability ${
                                    provider.availability
                                        ? "available"
                                        : "busy"
                                }`}
                            >
                                {provider.availability
                                    ? "Available"
                                    : "Not Available"}
                            </span>
                        </p>

                    </div>

                    <div className="vp-email">
                        <i className="bi bi-envelope-fill"></i>
                        <span>{provider.email}</span>
                    </div>

                    {/* BOOK BUTTON */}

                    <button
                        className="vp-btn"
                        onClick={handleBook}
                    >
                        Book Now
                    </button>

                </div>

                <a href="/home" className="vp-btn home-btn">
                    Home Page
                </a>

            </div>
        </div>
    );
}

export default ViewProvider;