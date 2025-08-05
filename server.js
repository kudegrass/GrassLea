const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// === ✅ CORRECTED CONNECTION STRING ===
// Username: kudegrass (10 letters)
// Password: iUy2a@RW3mB5cy4 → @ must be encoded as %40
const MONGODB_URI = "mongodb+srv://kudegrass:iUy2a%40RW3mB5cy4@grasslea.r4tpnlu.mongodb.net/grassreview?retryWrites=true&w=majority&appName=GrassLea";

console.log("Attempting to connect to:", MONGODB_URI.split('@')[1].split('.')[0]);

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("✅ Connected to MongoDB Atlas!"))
.catch(err => {
  console.log("❌ MongoDB Connection Error:", err.message);
  console.log("�� Common fixes:");
  console.log("   1. Check username/password");
  console.log("   2. Ensure @ is encoded as %40");
  console.log("   3. Whitelist IP in Atlas");
});

// === Models ===
const ResultSchema = new mongoose.Schema({
  username: String,
  subject: String,
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now }
});
const ExamResult = mongoose.model('ExamResult', ResultSchema);

// === Middleware ===
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// === Routes ===
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/exams/submit', async (req, res) => {
  const { username = "guest", subject, score, total } = req.body;
  try {
    const result = new ExamResult({ username, subject, score, total });
    await result.save();
    res.send(`
      <h3>🎉 Exam Saved!</h3>
      <p><strong>Score:</strong> ${score}/${total}</p>
      <p>Your result is now stored in the cloud.</p>
      <a href="/">← Home</a>
    `);
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).send("❌ Failed to save result.");
  }
});

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
  console.log(`👉 Open browser preview to view the site`);
});
