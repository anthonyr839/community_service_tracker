const express = require("express");
const cors    = require("cors");
const path    = require("path");

const serviceRouter = require("./routes/service");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/service", serviceRouter);

// Serve the front end
app.use(express.static(path.join(__dirname, "public")));

// Fallback: any unknown route serves index.html
app.get("*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
