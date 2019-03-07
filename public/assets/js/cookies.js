// Wait for document to load
$(function() {
  $(".delete-cookie").on("click", function(e) {
    const id = $(this).data("id");
    // Send the delete request
    $.ajax("/api/cookies/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("Deleted cookie");
        location.reload();
      });
  });
  
  $(".devour-cookie").on("click", function(e) {
    // Storing the cookie's id
    const id = $(this).data("id");

    // The data that is being updated
    const devouredState = {
      devoured: true
    };

    // Send the PUT request.
    $.ajax("/api/cookies/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#cookie-form").on("submit", function(e) {
    e.preventDefault();
    // Grabbing submission type
    const mode = $(this).data("mode");

    // Creating object to send to database
    const newcookie = {
      name: $("#flavor").val().trim(),
      devoured : false
    };

    // Running code depending on submission type
    switch (mode) {
      case "add":
      // Send the POST request.
      $.ajax("/api/cookies", {
        type: "POST",
        data: newcookie
      }).then(
        function() {
          // Reload the page to get the updated list
          location.reload();
        }
      );
      break;
      case "modify":
        // Grab the cookie's id
        const id = $(this).data("cookieId");
        // Send the PUT request.
        $.ajax("/api/cookies/" + id, {
          type: "PUT",
          data: newcookie
        }).then(
          function() {
            // Reload the page to get the updated list
            location.reload();
          }
        );
      break;
    }
  });

  // Adjusting form for modifying the cookies
  $(".modify-cookie").on("click", function(e) {
    $("#cookie-form").data("mode","modify");
    $("#cookieModal .modal-title").text("Modify Batch");
    $("#cookieModal .cookie-submission").text("Modify");
    // Placing current flavor within input
    const id = $(this).data("id");
    let currentFlavor = $(this).parent().text().replace(id+".","").trim();
    $("#cookieModal input").val(currentFlavor);
    $("#cookie-form").data("cookieId",id);
  });

  // Adjusting form for creating new cookies
  $("#modal-opener").on("click", function(e) {
    $("#cookie-form").data("mode","add");
    $("#cookieModal .modal-title").text("Create New Batch");
    $("#cookieModal .cookie-submission").text("Create");
  });

  // Initializing tooltips
  $('[data-toggle="tooltip"]').tooltip()

  // Makes sure tooltip disappears once modal begins opening
  $("#cookieModal").on("show.bs.modal", function(e) {
    $('[data-toggle="tooltip"]').tooltip("hide");
  });

  // Focus on input when modal is opened
  $('#cookieModal').on('shown.bs.modal', function (e) {
    $("#cookieModal input").click().focus();
  });

  // Clear input upon closing modal
  $('#cookieModal').on('hidden.bs.modal', function (e) {
    $("#cookieModal input").val("");
  });
});
