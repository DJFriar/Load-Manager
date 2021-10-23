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
});