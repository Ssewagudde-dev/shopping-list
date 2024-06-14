function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Here you can add logic to send this data to a backend for registration
  // For example, you can use fetch API to send a POST request to your backend

  // Example fetch request
  fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((response) => {
      if (response.ok) {
        // Handle successful registration
        console.log("Registration successful");
        window.location.href = "login.html"; // Redirect to login page on successful registration
      } else {
        // Handle failed registration
        console.error("Registration failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//login

function submit() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if fields are not empty
  if (!email || !password) {
    document.getElementById("error-message").textContent = "All fields are required.";
    return;
  }

  fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => response.json()) // Parse response body as JSON
    .then(data => {
      const errorMessageElement = document.getElementById("error-message");
      if (data.token) {
         // Token is present in the response
      console.log("Received token:", data.token);
        console.log("Login successful");
        localStorage.setItem("token", data.token); // Store token in localStorage
        window.location.href = "/index.html"; // Redirect to home page on successful login
      } else {
        // Handle failed login
        console.error("Login failed:", data.error);
        errorMessageElement.textContent = data.error;
      }
    })
    .catch(error => {
      console.error("Error:", error);
      errorMessageElement.textContent = "An error occurred. Please try again.";
    });
  }  

  function logout() {
    // Clear token from localStorage or sessionStorage
    localStorage.removeItem('token');
    // Redirect or perform any additional cleanup
    window.location.href = '../views/login.html'; // Redirect to login page after logout
  }