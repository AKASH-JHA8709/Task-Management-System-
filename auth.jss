const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const signupLink = document.getElementById("signup-link");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = "dashboard.html";  // Redirect to the dashboard
        } else {
            document.getElementById("error-message").textContent = "Login failed!";
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
});

signupLink.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
});

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        const response = await fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert("Signup successful! Please log in.");
            window.location.href = "index.html";  // Redirect to login
        } else {
            document.getElementById("signup-error-message").textContent = "Signup failed!";
        }
    } catch (error) {
        console.error("Error signing up:", error);
    }
});
