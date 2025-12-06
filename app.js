require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (if needed in the future)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", apiRoutes);

// Home route redirect
app.get("/", (req, res) => {
  res.redirect("/chat");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("chat", {
    error: "Something went wrong! Please try again.",
    response: null,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT}/chat to start chatting with AI`);
});
