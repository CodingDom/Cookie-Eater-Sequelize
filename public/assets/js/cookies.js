// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delete-cookie").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/cookies/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("Deleted cookie");
        location.reload();
      });
  });
  
  $(".devour-cookie").on("click", function(event) {
    var id = $(this).data("id");

    var devouredState = {
      devoured: true
    };

    // Send the PUT request.
    $.ajax("/api/cookies/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("changed devoured to true");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newcookie = {
      name: $("#ba").val().trim(),
      devoured : false
    };

    // Send the POST request.
    $.ajax("/api/cookies", {
      type: "POST",
      data: newcookie
    }).then(
      function() {
        console.log("created new cookie");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".add-cookie").on("click", function(e) {
    $(".create-form").submit();
  });

  $('[data-toggle="tooltip"]').tooltip()

  // Focus on input when modal is opened
  $('#cookieModal').on('shown.bs.modal', function (e) {
    $("#cookieModal input").focus();
  })
});
