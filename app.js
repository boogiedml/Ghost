const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//Express App
const app = express();

//Middleware
app.use(express.static("public"));
app.use("/blogs", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register view engines
app.set("view engine", "ejs");

// Connecting to the database
mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(5500 || process.env.PORT, console.log("Database Connected"))
  )
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// Error 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
