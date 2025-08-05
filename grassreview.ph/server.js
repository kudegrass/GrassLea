const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// === ✅ UPDATE THIS: Your Real MongoDB Atlas Connection String ===
const MONGODB_URI = "mongodb+srv://kudegras:iUy2a%40RW3mB5cy4@grasslea.r4tpnlu.mongodb.net/grassreview?retryWrites=true&w=majority&appName=GrassLea";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// === Models ===
const ResultSchema = new mongoose.Schema({
  username: String,
  subject: String,
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now }
});
const ExamResult = mongoose.model('ExamResult', ResultSchema);

// === Middleware (Express 5: body-parser is built-in) ===
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public')); // Serve static files

// === Routes ===
app.get('/', (req, res) => {
  // If public/index.html exists, serve it
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Submit exam result
app.post('/api/exams/submit', async (req, res) => {
  const { username = "guest", subject, score, total } = req.body;
  try {
    const result = new ExamResult({ username, subject, score, total });
    await result.save();
    res.send(`
      <h3>🎉 Exam Saved!</h3>
      <p><strong>Score:</strong> ${score}/${total}</p>
      <p>Data stored in MongoDB Atlas.</p>
      <a href="/">← Home</a>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Save failed. Check server console.");
  }
});

// View results (for testing)
app.get('/api/results', async (req, res) => {
  try {
    const results = await ExamResult.find().sort({ date: -1 }).limit(50);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🟢 GrassReview.ph running at http://localhost:${PORT}`);
  console.log("💡 Make sure 'public/' folder and 'index.html' exist");
});