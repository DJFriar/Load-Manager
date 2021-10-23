$(document).ready(() => {

  // When the signup button is clicked, we validate the email and password are not blank
  $("#createUserButton").on("click", function() {
    console.log("Create User Button Clicked");
    var newUser = {
      FirstName: $("#FirstName").val().trim(),
      LastName: $("#LastName").val().trim(),
      Username: $("#Username").val().trim(),
      Email: $("#Email").val().trim(),
      Password: $("#Password").val().trim()
    };

    // Make sure that neither username nor password are blank.
    if (!newUser.Username || !newUser.Password) {
      handleLoginErr("Blank field detected.");
      return;
    }
    // If we have a username and password, then post the new user
    $.ajax("/api/v1/user", {
      type: "POST",
      data: newUser
    })
      .then(() => {
        window.location.replace("/login");
      })
      .catch(handleLoginErr);
  });

  function handleLoginErr(err) {
    console.log(err);
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
