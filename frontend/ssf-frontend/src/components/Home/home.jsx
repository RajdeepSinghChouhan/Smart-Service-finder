import { useEffect } from 'react'
import { useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './home.css'
import Navbar from '../Navbar/Navbar'

function Home()
{
    const[service,setService] = useState("");
    const[location,setLocation] = useState("");

    async function handleSubmit(e) {
        e.preventDefault(); // stop reloading page on submit

        const searchData = {
            service : service,
            location : location
        }
        try{
            console.log(localStorage.getItem("token"));
            console.log(localStorage.getItem("role"));
            const response  = await fetch("http://localhost:8080/searchprovider",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                },
                body : JSON.stringify(searchData)
            })
            if(response.ok)
            {
                const data = await response.json();
                console.log("Search results:", data);
                navigate("/searchServiceProvider", {
                    state: { providers: data }
                });
            }
            else {
                alert("Login failed. Please check your credentials and try again.");
            }
        }
        catch(error)        {
            console.log("Error during search:", error);
            alert("Server error. Please try again later.");
        }
    }
    async function allService(e) {
        e.preventDefault(); // stop reloading page on submit

        try{
            console.log(localStorage.getItem("token"));
            const response  = await fetch("http://localhost:8080/searchprovider/all",{
                method : "GET",
                headers : {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            if(response.ok)
            {
                const data = await response.json();
                console.log("Search results:", data);
                navigate("/searchServiceProvider", {
                    state: { providers: data }
                });
            }
            else {
                alert("Login failed. Please check your credentials and try again.");
            }
        }
        catch(error)        {
            console.log("Error during search:", error);
            alert("Server error. Please try again later.");
        }
    }
    
    const navigate = useNavigate()
    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])
    function confirmAction() {
        if (window.confirm("Are you sure you want to logout?")) {
            navigate("/");
        }
    }
    return(
        <div className="home">
            <Navbar />
            <hr />
            <div className="main">
                <div className="section1">
                    <div className="section1-left">
                        <img src="https://images.openai.com/static-rsc-4/BisZW_eqwaSPaRiXfTpaGQ55sOSaJHvF_fecxKkbHycO-cA5zKc2w5gSn9tBL7heQXE8b02asdQ6rWlrrtxQlW49SKYTVYY8Uu6_jkjKlLhdwLZn99yEmMLboYdQHig5YWDKx1r5Z7BErcbdbk6mmVoQKyYyJSDdz-wAKAsSmiTifk_a2_x7Y9GKVgTO1_9a?purpose=fullsize" alt=""/>
                    </div>
                    <div className="section1-right">
                        <h2>Your One-Stop Service Marketplace</h2>
                        <p>Book electricians, plumbers, cleaners & more in seconds</p>
                        <div className="search-bar">
                            <form className="form" onSubmit={handleSubmit}>
                                <input type="text" name="service" placeholder="Enter Service" required value={service} onChange={(e)=>setService(e.target.value)} /><br /><br />                
                                <input type="text" name="location" placeholder="Enter Location" required value={location} onChange={(e)=>setLocation(e.target.value)} /><br /><br />
                                <button className="button" type="submit">Search</button> 
                            </form>    
                        </div>
                        <div className="text-center s1rBtn">
                            <a href="#sec2"><button type="button" className="btn s">Explore Services</button></a>
                        </div>
                    </div>
                </div>
                <hr/>
                <section className="service-highlights py-5" id="sec2">
                    <div className="container">
                        <div className="section-heading text-center mb-5">
                            <span className="eyebrow-text">Trusted Professionals</span>
                            <h2>Popular Services</h2>
                            <p className="lead text-muted">Browse top-rated home services delivered by skilled technicians and specialists.</p>
                        </div>
                        <div className="row g-4">
                            <div className="col-md-6 col-lg-4">
                                <article className="service-card card h-100 border-0 shadow-sm overflow-hidden">
                                    <img src="https://images.stockcake.com/public/1/b/9/1b95ce7d-caef-4a02-a1a7-7b8ab89ac5b2_large/electrician-at-work-stockcake.jpg" alt="Electrician working on wiring" className="card-img-top"/>
                                    <div className="card-body">
                                        <h3 className="service-title">Electrician</h3>
                                        <p className="service-copy">Fix wiring, lights, switches, and electrical issues safely at home.</p>
                                        <a href="#"  className="btn btn-outline-primary">View Details</a>
                                    </div>
                                </article>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <article className="service-card card h-100 border-0 shadow-sm overflow-hidden">
                                    <img src="https://media.istockphoto.com/id/1516511531/photo/a-plumber-carefully-fixes-a-leak-in-a-sink-using-a-wrench.jpg?s=612x612&w=0&k=20&c=4WRY5lTezchQ5aLj9gXj0Gixq7Wq7b0tzvrCTt4jrrI=" alt="Plumber repairing a sink" className="card-img-top"/>
                                    <div className="card-body">
                                        <h3 className="service-title">Plumber</h3>
                                        <p className="service-copy">Fix leaks, pipes, drainage, and plumbing issues effectively.</p>
                                        <a href="#"  className="btn btn-outline-primary">View Details</a>
                                    </div>
                                </article>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <article className="service-card card h-100 border-0 shadow-sm overflow-hidden">
                                    <img src="https://t4.ftcdn.net/jpg/07/00/28/29/360_F_700282967_PPjJJTKX7xdVOlHCeNnrDPaA4EnDnPMq.jpg" alt="Cleaner tidying a room" className="card-img-top"/>
                                    <div className="card-body">
                                        <h3 className="service-title">Cleaner</h3>
                                        <p className="service-copy">Clean rooms, kitchens, bathrooms, and remove dirt safely at home.</p>
                                        <a href="#"  className="btn btn-outline-primary">View Details</a>
                                    </div>
                                </article>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <article className="service-card card h-100 border-0 shadow-sm overflow-hidden">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/074/236/850/small/professional-air-conditioner-repair-technician-using-screwdriver-for-split-system-maintenance-photo.jpg" alt="AC repair technician" className="card-img-top"/>
                                    <div className="card-body">
                                        <h3 className="service-title">A.C. Repair</h3>
                                        <p className="service-copy">Fix cooling, gas, filters, and AC issues efficiently.</p>
                                        <a href="#"  className="btn btn-outline-primary">View Details</a>
                                    </div>
                                </article>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <article className="service-card card h-100 border-0 shadow-sm overflow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI9gxTk-TQtf9fFqbhxmwGIbm5nycnF67sdg&s" alt="In-home salon service" className="card-img-top"/>
                                    <div className="card-body">
                                        <h3 className="service-title">Salon At Home</h3>
                                        <p className="service-copy">Beauty, grooming, skincare, and salon services delivered at home.</p>
                                        <a href="#"  className="btn btn-outline-primary">View Details</a>
                                    </div>
                                </article>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <article className="service-card card h-100 border-0 shadow-sm overflow-hidden">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXakR86KH68lxXdE1LK-3dlYmtfpVErVtfOg&s" alt="Carpenter working with wood" className="card-img-top"/>
                                    <div className="card-body">
                                        <h3 className="service-title">Carpenter</h3>
                                        <p className="service-copy">Fix furniture, doors, cabinets, and woodwork issues safely at home.</p>
                                        <a href="#"  className="btn btn-outline-primary">View Details</a>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="text-center mt-5 service-card">
                            <a href="#" className="btn btn-primary btn-lg" onClick={allService}>View All Services</a>
                        </div>
                    </div>
                </section>
                <br/>
                <hr/>
                <div className="section3" id="sec3">
                    <div className="howitworksContainer">
                        <div className="s3heading">
                            <h1>How It Works</h1>
                        </div>
                        <div className="s3Service step" data-aos="fade-right" data-aos-delay="100">
                            <div>
                                <h3><i className="bi bi-1-square"></i>Search Services</h3>
                                <img src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhcmNofGVufDB8fDB8fHww" alt=""/>
                            </div>
                            <div className="s3desc">Find the service you need by entering keywords and your location.Quickly discover nearby professionals for your task.</div>
                        </div>
                        <div className="s3Service step" data-aos="fade-left" data-aos-delay="100">
                            <div className="s3desc">Browse through verified professionals, compare ratings, reviews, and pricing to select the best one for your needs.</div>
                            <div>
                                <h3><i className="bi bi-2-square"></i>Choose Provider</h3>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHTtiT4-NkvBCpDu8r8QPEfKOB0TH0yuOtEg&s" alt=""/>
                            </div>
                        </div>
                        <div className="s3Service step" data-aos="fade-right" data-aos-delay="100">
                            <div>
                                <h3><i className="bi bi-3-square"></i>Book & Relax</h3>
                                <img src="https://www.shutterstock.com/image-vector/flat-book-now-button-clean-600nw-2640159187.jpg" alt=""/>
                            </div>
                            <div className="s3desc">Schedule your service at your convenience and enjoy hassle-free service delivered right to your doorstep.</div>
                        </div>
                    </div>
                </div>
                <br/>
                <hr/>
                <section className="why-choose-us">
                    <div className="section4">
                        <div className="s4heading">
                            Trusted by Millions Worldwide
                        </div>
                        <div className ="s4subheading">
                            Fast, reliable, and verified service experts at your fingertips.
                        </div>
                        <div className="s4content">
                            <div className="cu">
                                <div className="icon-wrapper"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkox2qA6DVgsZvcKgZr6z_YYPut7Tepb7MlA&s" alt="Rating icon"/></div>
                                <div className="choseUs">
                                    <h2>4.8</h2>
                                    <p>Service Rating*</p>
                                </div>
                            </div>
                            <div className="cu">
                                <div className="icon-wrapper"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRy15gwEyJUfdIxYPjHfAoX-35EmfoTuBbnQ&s" alt="Customers icon"/></div>
                                <div className="choseUs">
                                    <h2>12M+</h2>
                                    <p>Customers Globally*</p>
                                </div>
                            </div>
                            <div className="cu">
                                <div className="icon-wrapper"><img src="https://cdn-icons-png.flaticon.com/512/5167/5167002.png" alt="Clock icon"/></div>
                                <div className="choseUs">
                                    <h2>24/7</h2>
                                    <p>Available Every Hour*</p>
                                </div>
                            </div>
                            <div className="cu">
                                <div className="icon-wrapper"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB13RVYeIP-JE2sdnpTSs6QUAO5ppKpaK-fA&s" alt="Lightning icon"/></div>
                                <div className="choseUs">
                                    <h2>Instant</h2>
                                    <p>Booking Time*</p>
                                </div>
                            </div>
                            <div className="cu">
                                <div className="icon-wrapper"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1pgP8kKypy_E9XRa7aU4S8dOuMGXfp5UQg&s" alt="Savings icon"/></div>
                                <div className="choseUs">
                                    <h2>Best Rates</h2>
                                    <p>Affordable Pricing*</p>
                                </div>
                            </div>
                            <div className="cu">
                                <div className="icon-wrapper"><img src="https://cdn-icons-png.flaticon.com/512/51/51209.png" alt="Verified badge icon"/></div>
                                <div className="choseUs">
                                    <h2>100%</h2>
                                    <p>Verified Experts*</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <br /><hr />
                <footer className="footer" id="seclast">
                    <div className="footer-container">        
                        <div className="footer-section">
                            <h2 className="logo">Smart Service Finder</h2>
                            <p>Your one-stop platform to find trusted services near you quickly and easily.</p>
                            </div>
                            
                            <div className="footer-section">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#sec2">Services</a></li>
                                <li><a href="#sec3">Providers</a></li>
                                <li><a href="#seclast">Contact</a></li>
                            </ul>
                            </div>
                            
                            <div className="footer-section">
                            <h3>Popular Services</h3>
                            <ul>
                                <li><a href="#">Plumbering</a></li>
                                <li><a href="#">Electrician</a></li>
                                <li><a href="#">Cleaning</a></li>
                                <li><a href="#">AC Repair</a></li>
                            </ul>
                            </div>
                            <div className="footer-section">
                            <h3>Contact Us</h3>
                            <p>Email: support@smartfinder.com</p>
                            <p>Phone: +91 98765 43210</p>
                            <div className ="socials">
                                <a href="https://www.instagram.com/rajdeep.chouhan.185/" target="_blank">Instagram</a>
                                <a href="https://wa.me/917489989261" target="_blank" target="_blank">Whatsapp</a>
                                <a href="https://www.linkedin.com/in/rajdeep-chouhan-5ab5a2328" target="_blank">Linkedin</a>
                                <a href="https://www.facebook.com/rajdeepsardesai/" target="_blank">Facebook</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 Smart Service Finder | All Rights Reserved</p>
                    </div>
                </footer>
            </div> {/* main div close */}
        </div> /* all div close */
    );
}
export default Home;