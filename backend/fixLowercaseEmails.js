const mongoose = require("mongoose");
const User = require("./models/User");

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);

  const users = await User.find();
  for (const u of users) {
    const lower = u.email.toLowerCase();
    if (u.email !== lower) {
      u.email = lower;
      await u.save();
      console.log("fixed:", lower);
    }
  }

  console.log("DONE");
  process.exit();
}

fix();
