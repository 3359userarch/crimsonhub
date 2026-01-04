const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "crimsonhub_secret_key";

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    let { email, password, institute } = req.body;
    email = email.toLowerCase();

    if (!email || !password || !institute) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      institute,
    });

    await user.save();
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        email: user.email,
        institute: user.institute,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   FORGOT PASSWORD
========================= */
router.post("/forgot", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

module.exports = router;