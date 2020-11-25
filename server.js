const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const open = require("open");
const app = express();
const routes = require("./app/routes");
const PORT = process.env.PORT || 3001;

// Configure dotenv to server to use .env files
dotenv.config();

// Use express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set express headers before creating routes to prevent cors issues
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// if else statement stableizes deployment build to see pages and use backend routes.
if (process.env.NODE_ENV === "production") {
  // Have express use static assets from build
  app.use(express.static("/build"));
  // Have express use routes defined in backend
  app.use(routes);
  // If no backend routes are hit send all requests for the frontend routes
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./build/index.html"));
  });
} else {
  // Have express use static assets from public folder
  app.use(express.static(path.join(__dirname, "/public")));
  // Have express use routes defined in backend
  app.use(routes);
  // If no backend routes are hit send all requests for the frontend routes
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
}

// Run server on assigned PORT
app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);

// Opens the app in your default browser on load
open(`http://localhost:${PORT}`);
