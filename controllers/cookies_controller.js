var express = require("express");

var router = express.Router();

// Import the model (cookie.js) to use its database functions.
var cookie = require("../models/cookie.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  cookie.all(function(data) {
    var hbsObject = {
      cookies: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/cookies", function(req, res) {
  console.log(req.body.devoured);
  cookie.create([
    "name"
  ], [
    req.body.name
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cookies/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  const data = {};
  // Making sure it's updating the proper values
  if (req.body.name) {
    data.name = req.body.name;
  };
  if (req.body.devoured) {
    data.devoured = req.body.devoured;
  };
  cookie.update(data, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cookies/:id", function(req, res) {
  cookie.delete(req.params.id, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    };
      res.status(200).end();
  });
})
// Export routes for server.js to use.
module.exports = router;
