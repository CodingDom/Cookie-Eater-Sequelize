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
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".cookie-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const mode = $(this).data("mode");
    var newcookie = {
      name: $("#flavor").val().trim(),
      devoured : false
    };
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

  $(".cookie-submission").on("click", function(e) {
    $(".cookie-form").submit();
  });

  $('[data-toggle="tooltip"]').tooltip()

  $(".modify-cookie").on("click", function(e) {
    $("#cookieModal .cookie-form").data("mode","modify");
    $("#cookieModal .modal-title").text("Modify Batch");
    $("#cookieModal .cookie-submission").text("Modify");

    let currentFlavor = $(this).parent().text().trim();
    currentFlavor = currentFlavor.slice(currentFlavor.indexOf(". ")+2);
    $("#cookieModal input").val(currentFlavor);

    const id = $(this).data("id");
    console.log(id);
    $("#cookieModal .cookie-form").data("cookieId",id);
  });

  $("#modal-opener").on("click", function(e) {
    $("#cookieModal .cookie-form").data("mode","add");
    $("#cookieModal .modal-title").text("Create New Batch");
    $("#cookieModal .cookie-submission").text("Create");
  });

  // Makes sure tooltip disappears once modal begins opening
  $("#cookieModal").on("show.bs.modal", function(e) {
    $('[data-toggle="tooltip"]').tooltip("hide");
  });
  // Focus on input when modal is opened
  $('#cookieModal').on('shown.bs.modal', function (e) {
    $("#cookieModal input").click().focus();
  });
});
