    <%
    HttpSession session1 = request.getSession(false);

    if(session1 == null || session1.getAttribute("user") == null){
    	response.sendRedirect("../");
        return;
    }
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
    response.setHeader("Pragma", "no-cache"); // HTTP 1.0
    response.setDateHeader("Expires", 0); // Proxies
    
    %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="/SmartServiceFinder/css/index.css">
    <title>SSF</title>
</head>
<body>
    <div class="nav">
        <div class="logo">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbObJvoHaP4UAHVOw486TAWK9MMfjPwwJ8NA&s" alt="">
            <h1>Smart Service Finder</h1>
        </div>
        <div class="links">
            <a href="">Home</a>
            <a href="">Services</a>
            <a href="">Profile</a>
        </div>
        <div class="headerBtn">
	        <button>Join Us</button>
	        <button class="login"><a href="../logout">Logout</a></button>
        </div>
    </div>
    <hr>
    <div class="main">
        <div class="section1">
            <div class="section1-left">
                <img src="https://images.openai.com/static-rsc-4/BisZW_eqwaSPaRiXfTpaGQ55sOSaJHvF_fecxKkbHycO-cA5zKc2w5gSn9tBL7heQXE8b02asdQ6rWlrrtxQlW49SKYTVYY8Uu6_jkjKlLhdwLZn99yEmMLboYdQHig5YWDKx1r5Z7BErcbdbk6mmVoQKyYyJSDdz-wAKAsSmiTifk_a2_x7Y9GKVgTO1_9a?purpose=fullsize" alt="">
            </div>
            <div class="section1-right">
                <h2>Your One-Stop Service Marketplace</h2>
                <p>Book electricians, plumbers, cleaners & more in seconds</p>
                <div class="search-bar">
                    <form class="form" action="submitRequest" method="post">
                        <input type="text" name="service_type" placeholder="Enter Service" required /><br /><br />              
                        <input type="text" name="location" placeholder="Enter Location" required/><br /><br />
                        <button class="button" type="submit">Search</button> 
                    </form>    
                </div>
                <div class="text-center s1rBtn">
                    <button type="button" class="btn s">Explore Services</button>
                </div>
            </div>
        </div>
        <hr>
        <div class="section2">
            <div class="part1-heading">
                <h1>Popular Services</h1>
            </div>
            <div class="part2-cards">
                <div class="cards">
                    <img src="https://images.stockcake.com/public/1/b/9/1b95ce7d-caef-4a02-a1a7-7b8ab89ac5b2_large/electrician-at-work-stockcake.jpg" alt="">
                    <h2>Electrician</h2>
                    <p>Fix wiring, lights, switches, and electrical issues safely at home.</p>
                    <button>View Details</button>
                </div>
                <div class="cards">
                    <img src="https://media.istockphoto.com/id/1516511531/photo/a-plumber-carefully-fixes-a-leak-in-a-sink-using-a-wrench.jpg?s=612x612&w=0&k=20&c=4WRY5lTezchQ5aLj9gXj0Gixq7Wq7b0tzvrCTt4jrrI=" alt="">
                    <h2>Plumber</h2>
                    <p>Fix leaks, pipes, drainage, and plumbing issues effectively.</p>
                    <button>View Details</button>
                </div>
                <div class="cards">
                    <img src="https://t4.ftcdn.net/jpg/07/00/28/29/360_F_700282967_PPjJJTKX7xdVOlHCeNnrDPaA4EnDnPMq.jpg" alt="">
                    <h2>Cleaner</h2>
                    <p>Clean rooms, kitchens, bathrooms, and remove dirt safely at home.</p>
                    <button>View Details</button>
                </div>
            </div>
            <div class="part2-cards">
                <div class="cards">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/074/236/850/small/professional-air-conditioner-repair-technician-using-screwdriver-for-split-system-maintenance-photo.jpg" alt="">
                    <h2>A.C. Repair</h2>
                    <p>Fix cooling, gas, filters, and AC issues efficiently.</p>
                    <button>View Details</button>
                </div>
                <div class="cards">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI9gxTk-TQtf9fFqbhxmwGIbm5nycnF67sdg&s" alt="">
                    <h2>Salon At Home</h2>
                    <p>Provide beauty, grooming, skincare, & salon services at home.</p>
                    <button>View Details</button>
                </div>
                <div class="cards">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXakR86KH68lxXdE1LK-3dlYmtfpVErVtfOg&s" alt="">
                    <h2>Carpenter</h2>
                    <p>Fix furniture, doors, cabinets, and woodwork issues safely at home.</p>
                    <button>View Details</button>
                </div>
            </div>
            <div class="allservicebutton">
                <button>View All Services</button>
            </div>
        <div>
            <br>
            <hr>
        <div class="section3">
            <div class="howitworksContainer">
                <div class="s3heading">
                    <h1>How It Works</h1>
                </div>
                <div class="s3Service step" data-aos="fade-right" data-aos-delay="100">
                    <div>
                        <h3><i class="bi bi-1-square"></i>Search Services</h3>
                        <img src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhcmNofGVufDB8fDB8fHww" alt="">
                    </div>
                    <div class="s3desc">Find the service you need by entering keywords and your location.Quickly discover nearby professionals for your task.</div>
                </div>
                <div class="s3Service step" data-aos="fade-left" data-aos-delay="100">
                    <div class="s3desc">Browse through verified professionals, compare ratings, reviews, and pricing to select the best one for your needs.</div>
                    <div>
                        <h3><i class="bi bi-2-square"></i>Choose Provider</h3>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHTtiT4-NkvBCpDu8r8QPEfKOB0TH0yuOtEg&s" alt="">
                    </div>
                </div>
                <div class="s3Service step" data-aos="fade-right" data-aos-delay="100">
                    <div>
                        <h3><i class="bi bi-3-square"></i>Book & Relax</h3>
                        <img src="https://www.shutterstock.com/image-vector/flat-book-now-button-clean-600nw-2640159187.jpg" alt="">
                    </div>
                    <div class="s3desc">Schedule your service at your convenience and enjoy hassle-free service delivered right to your doorstep.</div>
                </div>
            </div>
        </div>
        <br>
        <hr>
        <div class="section4">
            <div class="s4heading">
                Trusted by Millions Worldwide
            </div>
            <div class="s4content">
                <div class="cu">
                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkox2qA6DVgsZvcKgZr6z_YYPut7Tepb7MlA&s" alt=""></div>
                    <div class="choseUs">
                        <h2>4.8</h2>
                        <p>Service Rating*</p>
                    </div>
                </div>
                <div class="cu">
                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRy15gwEyJUfdIxYPjHfAoX-35EmfoTuBbnQ&s" alt=""></div>
                    <div class="choseUs">
                        <h2>12M+</h2>
                        <p>Customers Globally*</p>
                    </div>
                </div>
                <div class="cu">
                    <div><img src="https://cdn-icons-png.flaticon.com/512/5167/5167002.png" alt=""></div>
                    <div class="choseUs">
                        <h2>24/7</h2>
                        <p>Available Every Hour*</p>
                    </div>
                </div>
                <div class="cu">
                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB13RVYeIP-JE2sdnpTSs6QUAO5ppKpaK-fA&s" alt=""></div>
                    <div class="choseUs">
                        <h2>Instant</h2>
                        <p>Booking Time*</p>
                    </div>
                </div>
                <div class="cu">
                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1pgP8kKypy_E9XRa7aU4S8dOuMGXfp5UQg&s" alt=""></div>
                    <div class="choseUs">
                        <h2>Best Rates</h2>
                        <p>Affordable Pricing*</p>
                    </div>
                </div>
                <div class="cu">
                    <div><img src="https://cdn-icons-png.flaticon.com/512/51/51209.png" alt=""></div>
                    <div class="choseUs">
                        <h2>100%</h2>
                        <p>Verified Experts*</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer">
        <div class="footer-container">
            <!-- About -->
            <div class="footer-section">
            <h2 class="logo">Smart Service Finder</h2>
            <p>Your one-stop platform to find trusted services near you quickly and easily.</p>
            </div>
            <!-- Quick Links -->
            <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Providers</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            </div>
            <!-- Services -->
            <div class="footer-section">
            <h3>Popular Services</h3>
            <ul>
                <li><a href="#">Plumbing</a></li>
                <li><a href="#">Electrician</a></li>
                <li><a href="#">Cleaning</a></li>
                <li><a href="#">Repair</a></li>
            </ul>
            </div>
            <!-- Contact -->
            <div class="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@smartfinder.com</p>
            <p>Phone: +91 98765 43210</p>
            <div class="socials">
                <a href="#">i1</a>
                <a href="#">i2</a>
                <a href="#">i3</a>
                <a href="#">i4</a>
            </div>
        </div>
    </div>
    <!-- Bottom -->
    <div class="footer-bottom">
        <p>© 2026 Smart Service Finder | All Rights Reserved</p>
    </div>
</footer>
    <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
    <script>
        AOS.init({
            duration: 1000,   // animation speed
        });
    </script>
</body>
</html>