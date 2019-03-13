var express = require("express");

var router = express.Router();

// Import the model (cookie.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Cookie.findAll().then(function(data) {
    var hbsObject = {
      cookies: data
    };
    res.render("index", hbsObject);
  }).catch(function(err) {
    res.status(500).end();
    console.log(err);
  });
});

router.post("/api/cookies", function(req, res) {
  db.Cookie.create({
    name: req.body.name
  }).then(function(result) {
    res.json({ id: result.dataValues.id });
  }).catch(function(err) {
    res.status(500).end();
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
  db.Cookie.update(
    data,
    {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.status(200).end();
    }).catch(function(err) {
      res.status(500).end();
    });
});

router.delete("/api/cookies/:id", function(req, res) {
  db.Cookie.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    res.status(200).end();
  }).catch(function(err) {
    res.status(500).end();
  });
})
// Export routes for server.js to use.
module.exports = router;
