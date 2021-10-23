$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const usernameInput = $("#Username");
  const passwordInput = $("#UserPassword");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      Username: usernameInput.val().trim(),
      Password: passwordInput.val().trim()
    };

    if (!userData.Username || !userData.Password) {
      console.log("Username and Password are required!");
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.Username, userData.Password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the profile page
  function loginUser(username, password) {
    $.post("/api/v1/login", {
      Username: username,
      Password: password
    })
      .then((res) => {
        window.location.replace("/dispatcher");
        // if (res.isAdmin) {
        //   window.location.replace("/admin");
        // } else {
        //   window.location.replace("/memorials");
        // }
      })
      .catch(err => {
        console.log(err);
      });
  }
});
