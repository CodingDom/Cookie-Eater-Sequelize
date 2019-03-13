var express = require("express");
var fs = require('fs');
var fileName = './config/config.json';
var file = require(fileName);

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

// // Updating config to match Jaws DataBase
// file.production = process.env.JAWSDB_URL && {"use_env_variable": "JAWSDB_URL",
//   "dialect": "mysql"} || file.production;

// fs.writeFile(fileName, JSON.stringify(file,null,2), function (err) {
//   if (err) return console.log(err);
//   console.log(JSON.stringify(file));
//   console.log('Updating ' + fileName);

  db.sequelize.sync({ force: true }).then(function() {
    // Populating database with seeds
    seeds(db.Cookie);
    // Running application
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
// });