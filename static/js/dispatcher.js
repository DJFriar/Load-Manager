// import { sendSms } from "../../private/twilioClient";

$(document).ready(function() {
  $('#dispatchTable').DataTable({
    pageLength: 100
  });

  // Handle add new memorial toggle
  $(".addDispatchBtn").on("click", function(e) {
    e.preventDefault();
    $("#newDispatchInfo").toggleClass("hide-me");
    $(".dispatchBtnDiv").toggleClass("hide-me");
  });

  // Handle Send SMS button
  $(".sendSmsBtn").on("click", function(e) {
    e.preventDefault();
    var id = $(this).data("uid");
    console.log("==== sendSmsBtn dispatch id ====");
    console.log(id);
    var smsMessage = {
      to: "+14699829009",
      message: "This is a test"
    };

    $.ajax("/api/v1/sendSms/" + id, {
      type: "POST",
      data: smsMessage
    })
      .then(() => {
        window.location.replace("/dispatcher");
      })
      .catch(handleSMSErr);
  })
});

function handleSMSErr(err) {
  console.log(err);
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}