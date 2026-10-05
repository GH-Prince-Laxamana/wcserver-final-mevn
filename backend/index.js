require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database/db");
const studentRoute = require("./routes/student.route");

const app = express();
connectDB();

// Define which frontends are allowed to talk to your backend
const allowedOrigins = [
  "http://localhost:8080", // Default Vue Vite local port
  process.env.CLIENT_URL, // Your future Vercel URL (loaded from Render's config)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes under /api
app.use("/api", studentRoute);

app.use((err, req, res, next) => {
  console.error("💥 [Server Error]:", err.message);

  // Catch invalid 24-char ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format: '${err.value}' is not a valid 24-character hex ObjectId.`,
    });
  }

  // Catch Mongoose Schema validation errors
  if (err.name === "ValidationError") {
    const errorMessages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errorMessages,
    });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
