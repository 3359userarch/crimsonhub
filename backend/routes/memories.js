const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// TEMP MEMORY DATA
const memories = [
  "college-campus.jpg",
  "freshers.jpg",
  "freshers-1.jpg",
  "kalimpong-1.jpg",
  "kalimpong-2.jpg"
];

router.post("/list", auth, (req, res) => {
  const { institute } = req.body;

  if (
    institute &&
    institute.toLowerCase().includes("gossaigaon")
  ) {
    return res.json({
      ok: true,
      images: memories
    });
  }

  return res.json({
    locked: true
  });
});

module.exports = router;
