
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.css';

function Login() 
{
    // state variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); // stop reloading page on submit

        const logindata = {
            username : username,
            password : password
        };

        try
        {
            const response  = await fetch("http://localhost:8080/login",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(logindata)
            });

            if(response.ok)
            {
                const data = await response.json()

                const token = data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role",data.role);
                navigate("/home");
            }
            else {
                alert("Login failed. Please check your credentials and try again.");
            }
        }
        catch(error)
        {
            console.log("Error during login:", error);
            alert("Server error. Please try again later.");
        }
    }

    return (
    <main className="login-page">
        <section className="login-card">
            <div className="brand">
                <h1>Smart Service Finder</h1>
                <p>Sign in to access your services.</p>
            </div>
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="field-group">
                    <label htmlFor="username">Email or Username</label>
                    <input id="username" name="username" type="text" placeholder="Enter your email or username" required value={username} onChange={(e)=>setUsername(e.target.value)} />
                </div>

                <div className="field-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Enter your password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                
                <button type="submit" className="login-button">Login</button>

                <div className="form-actions">
                    <a className="secondary-link" href="/signup">New to SSF? Create Account</a>
                </div>
            </form>
        </section>
    </main>
    );  
}

export default Login;