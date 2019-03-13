var express = require("express");

var PORT = process.env.PORT || 7000;

var app = express();

// Requiring the models for syncing
var db = require("./models");

// Requiring the default cookie data
var seeds = require("./seeds/cookie-seeder.js");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/cookies_controller.js");

app.use(routes);

db.sequelize.sync({ force: true }).then(function() {
  // Populating database with seeds
  seeds(db.Cookie);
  // Running application
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});