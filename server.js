const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const notesRouter = require("./routes/notes");
const imagesRouter = require("./routes/images");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://69fb9407eff0532a8dcca3e5--lovable1308.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/notes", notesRouter);
app.use("/api/images", imagesRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Love App API running 💕" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://Navneet:navneet123@navneet.ehuztto.mongodb.net/loveable?retryWrites=true&w=majority")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = app;
