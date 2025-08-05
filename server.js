
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// === MongoDB Atlas Connection ===
// 🔥 Replace with your real MongoDB Atlas URL
const MONGODB_URI = "mongodb+srv://kudegras:iUy2a%40RW3mB5cy4@grasslea.r4tpnlu.mongodb.net/grassreview?retryWrites=true&w=majority&appName=GrassLea";

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// === Models ===
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

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

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.send("✅ Registered! <a href='/'>Home</a>");
  } catch (err) {
    res.send("❌ Username already exists.");
  }
});

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
    res.status(500).send("❌ Save failed.");
  }
});

app.get('/api/results', async (req, res) => {
  try {
    const results = await ExamResult.find().limit(50);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🟢 GrassReview.ph running at http://localhost:${PORT}`);
  console.log("💡 Remember to replace MONGODB_URI in server.js with your Atlas URL!");
});
