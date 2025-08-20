const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const User = mongoose.model("User", UserSchema);

// ✅ API Endpoint
app.post("/submit", async (req, res) => {
  const { name, email, message  } = req.body;

  try {
    const newUser = new User({ name, email, message });
    await newUser.save();
    res.json({ message: "Data saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving data", error: err });
  }
});

// ✅ Server Start
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
