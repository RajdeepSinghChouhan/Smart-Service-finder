    <%
    HttpSession session2 = request.getSession(false);

    if(session2 != null && session2.getAttribute("user") != null){
        response.sendRedirect("jsp/index.jsp");
        return;
    }
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);
    %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Service Finder - Login</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/login.css">
</head>
<body>
    <main class="login-page">
        <section class="login-card">
            <div class="brand">
                <h1>Smart Service Finder</h1>
                <p>Sign in to access your services.</p>
            </div>
            <%
                String error = (String) request.getAttribute("errorMessage");
                if (error != null) {
            %>
                <p style="color:red; text-align:center; font-weight:bold;">
                    <%= error %>
                </p>
            <%
                }
                String success = (String) request.getAttribute("successMessage");
                if (success != null) {
                	%>
                    <p style="color:green; text-align:center; font-weight:bold;">
                        <%= success %>
                    </p>
                <%
                    }
                %>
            <form class="login-form" action="login" method="post" autocomplete="off">
                <div class="field-group">
                    <label for="username">Email or Username</label>
                    <input id="username" name="username" type="text" placeholder="Enter your email or username" required>
                </div>

                <div class="field-group">
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Enter your password" required>
                </div>
                
                <button type="submit" class="login-button">Login</button>

                <div class="form-actions">
                    <a class="secondary-link" href="pages/signup.html">New to SSF? Create Account</a>
                </div>
            </form>
        </section>
    </main>
</body>
</html>