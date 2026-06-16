import './signup.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
function SignUp()
{

    const navigate = useNavigate();

    const [role, setRole] = useState("ROLE_USER");
    const[userName, setUserName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[service, setService] = useState("");
    const[price, setPrice] = useState("");
    const[location, setLocation] = useState("");
    const[availability, setAvailability] = useState(true);  

    async function handleSubmit(e)
    {
        e.preventDefault();
        if(password !== confirmPassword)
        {
            alert("Passwords do not match. Please try again.");
            return;
        }
        const signupData = role === "ROLE_PROVIDER" ? {
            username : userName,
            email : email,
            password : password,
            role : role,
            service : service,
            price : price,
            location : location,
            availability : availability
        } : {
            username : userName,
            email : email,
            password : password,
            role : role
        };

        try
        {
            const response  = await fetch("http://localhost:8080/register",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(signupData)
            });

            if(response.ok)
            {
                const data = await response.text();
                alert(data);
                navigate("/");
            }
            else {
                alert("Registration failed. Please check your details and try again.");
            }
        }
        catch(error)
        {
            console.log("Error during registration:", error);
            alert("Server error. Please try again later.");
        }
    }
    return (
        <div className="signup-page">
            <main className="login-page">
                <section className="login-card">
                    <div className="brand">
                        <h1>Smart Service Finder</h1>
                        <p>Create your account to start discovering services.</p>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                        <div className="field-group">
                            <label htmlFor="username">Full Name</label>
                            <input id="fullname" name="username" type="text" placeholder="Enter your full name" required  value={userName}
    onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        
                        <div className="field-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" placeholder="Enter your email" required value={email}
    onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <label htmlFor="role">Select Role</label>
                        <select name="role" 
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                        >
                            <option value="ROLE_USER">User</option>
                            <option value="ROLE_PROVIDER">Service Provider</option>
                        </select>
                        {
                            role === "ROLE_PROVIDER" && (
                                <>
                                    <div className="field-group">
                                        <label htmlFor="service">Service Name</label>
                                        <input 
                                            type="text"
                                            id="service"
                                            name="service"
                                            placeholder="Enter service name"
                                            required
                                            value={service}
                                            onChange={(e) => setService(e.target.value)}
                                        />
                                    </div>

                                    <div className="field-group">
                                        <label htmlFor="price">Price Per Hour</label>
                                        <input 
                                            type="number"
                                            id="price"
                                            name="price"
                                            placeholder="Enter price"
                                            required
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>

                                    <div className="field-group">
                                        <label htmlFor="location">Location</label>
                                        <input 
                                            type="text"
                                            id="location"
                                            name="location"
                                            placeholder="Enter location"
                                            required
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>

                                    <div className="field-group">
                                        <label htmlFor="availability">Availability</label>
                                        <select name="availability" id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                                            <option value="true">Available</option>
                                            <option value="false">Not Available</option>
                                        </select>
                                    </div>
                                </>
                            )
                        }
                        <div className="field-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" placeholder="Create a password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        
                        <div className="field-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input id="confirm-password" name="confirm-password" type="password" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        
                        <button type="submit"  className="login-button" >Create Account</button>
                        
                        <div className="form-actions">
                            <a className="secondary-link" href="/">Already have an account? Login</a>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}
export default SignUp;
