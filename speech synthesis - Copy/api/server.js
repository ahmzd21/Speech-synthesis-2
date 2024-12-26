const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fileRoutes = require("./routes/fileRoutes");
const textRoutes = require("./routes/textRoutes");
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Verify environment variables are loaded
console.log({
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ? "Present" : "Missing",
  ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY ? "Present" : "Missing",
  ENV_FILE_PATH: path.join(__dirname, '.env')
});

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/files", fileRoutes);
app.use("/api/text", textRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
