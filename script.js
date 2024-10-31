//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const existingButton = document.getElementById("existing");

  // Check if user data exists in localStorage
  const savedUsername = localStorage.getItem("username");
  const savedPassword = localStorage.getItem("password");

  if (savedUsername && savedPassword) {
    existingButton.style.display = "block";
  }

  // Handle form submission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("checkbox").checked;

    if (rememberMe) {
      // Save to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      existingButton.style.display = "block"; // Show existing user button
    } else {
      // Remove from localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      existingButton.style.display = "none"; // Hide existing user button
    }

    alert(`Logged in as ${username}.`);

    // Optionally, you can clear the form fields after submission
    // loginForm.reset();
  });

  // Handle existing user login
  existingButton.addEventListener("click", function () {
    const existingUsername = localStorage.getItem("username");
    if (existingUsername) {
      alert(`Logged in as ${existingUsername}.`);
    } else {
      alert("No existing user found.");
      existingButton.style.display = "none";
    }
  });
});