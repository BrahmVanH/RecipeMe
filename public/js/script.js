const createAccountFormHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById('usernameInput').value.trim();
    const userEmail = document.getElementById("emailInput").value.trim();
    const userPassword = document.getElementById("passwordInput").value.trim();

    if (username && userEmail && userPassword) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, userEmail, userPassword }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If login was successful, redirect to the profile page
            document.location.replace('./homepage.handlebars')
        } else {
            Alert(response.statusText);
        }
    }
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById("usernameInput").value.trim();
  const userPassword = document.getElementById("passwordInput").value.trim();

  if (username && userPassword) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, userPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If login was successful, redirect to the profile page
      document.location.replace("./homepage.handlebars");
    } else {
      Alert(response.statusText);
    }
  }
};

document
    .querySelector('.create-account-form')
    .addEventListener('submit', createAccountFormHandler);

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

