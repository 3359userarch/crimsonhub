const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;


/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend connected" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/memories", require("./routes/memories"));

/* ================= MONGODB ================= */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

/* ================= START SERVER ================= */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
});
