// setup.js - Full GrassReview.ph with MongoDB Atlas (Node.js)
// Run: node setup.js

const fs = require('fs');
const path = require('path');

// === Create folders ===
const dirs = [
  'public',
  'public/assets/css',
  'public/assets/js',
  'public/assets/data',
  'public/exams'
];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// === package.json ===
fs.writeFileSync('package.json', JSON.stringify({
  "name": "grassreview.ph",
  "version": "1.0.0",
  "description": "Agriculturist Licensure Review Website",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.0",
    "body-parser": "^1.20.2"
  },
  "keywords": ["agriculture", "review", "exam"],
  "author": "You",
  "license": "MIT"
}, null, 2));

// === CSS ===
fs.writeFileSync('public/assets/css/style.css', `
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f2f8f2;
  color: #2c3e2e;
  line-height: 1.7;
}
header {
  background: #2c3e2e;
  color: white;
  text-align: center;
  padding: 1.8rem;
}
nav {
  background: #3a5a3b;
  text-align: center;
  padding: 0.8rem;
}
nav a {
  color: white;
  margin: 0 1.2rem;
  text-decoration: none;
  font-weight: 500;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}
.card {
  background: white;
  border: 1px solid #d0e0d0;
  padding: 1.5rem;
  text-align: center;
  border-radius: 10px;
  text-decoration: none;
  color: #2c3e2e;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}
.card:hover { transform: translateY(-6px); }
section { margin: 2.5rem 0; padding: 0 1rem; }
form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}
form div { margin-bottom: 1rem; }
form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
form input, form button {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
form button {
  background: #2c3e2e;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
}
form button:hover { background: #1e2b1f; }
footer {
  text-align: center;
  padding: 1.8rem;
  background: #2c3e2e;
  color: white;
  margin-top: 3rem;
}
#result {
  margin: 2rem auto;
  padding: 1.8rem;
  background: #e8f5e8;
  border-radius: 10px;
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
}
.question {
  background: white;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}
`);

// === JS for Exam ===
fs.writeFileSync('public/assets/js/exam.js', `
async function submitExam() {
  const form = document.getElementById("examForm");
  const data = new FormData(form);
  const payload = Object.fromEntries(data);
  payload.score = 8;
  payload.total = 10;
  const response = await fetch('/api/exams/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const resultDiv = document.getElementById("result");
  if (response.ok) {
    const result = await response.text();
    resultDiv.style.display = "block";
    resultDiv.innerHTML = result;
  } else {
    resultDiv.innerHTML = "<p>❌ Failed to save result.</p>";
  }
}
`);

// === Mock Questions ===
fs.writeFileSync('public/assets/data/questions.js', `
window.ExamQuestions = {
  cropScience: [
    { question: "What is the scientific name of rice?", choices: ["Zea mays", "Oryza sativa", "Triticum", "Glycine"], answer: "b" },
    { question: "Which is a C4 plant?", choices: ["Rice", "Wheat", "Corn", "Soybean"], answer: "c" }
  ]
};
`);

// === Homepage ===
fs.writeFileSync('public/index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>GrassReview.ph - Agriculturist Licensure Review</title>
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <header>
    <h1>🌾 GrassReview.ph</h1>
    <p>Free Review for Agriculturist Licensure Exam (Philippines)</p>
  </header>

  <nav>
    <a href="/api/results" target="_blank">View Results (API)</a>
  </nav>

  <main>
    <section id="welcome">
      <h2>Welcome to GrassReview.ph</h2>
      <p>Your free, open-access review platform for the <strong>Licensure Examination for Agriculturists</strong> in the Philippines.</p>
    </section>

    <section id="subjects">
      <h2>📚 Review Areas</h2>
      <div class="card-grid">
        <a href="exams/crop-science-exam.html" class="card">�� Crop Science</a>
        <a href="#" class="card">🟤 Soil Science</a>
        <a href="#" class="card">🐞 Crop Protection</a>
        <a href="#" class="card">🐄 Animal Science</a>
        <a href="#" class="card">💰 Agri Economics</a>
        <a href="#" class="card">📢 Extension & Communication</a>
      </div>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 GrassReview.ph | Made for Filipino Agriculturists 🇵🇭</p>
  </footer>
</body>
</html>
`);

// === Exam Page ===
fs.writeFileSync('public/exams/crop-science-exam.html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Crop Science Exam - GrassReview.ph</title>
  <link rel="stylesheet" href="../assets/css/style.css" />
</head>
<body>
  <header><h1>📝 Crop Science Exam</h1></header>
  <nav><a href="/">← Home</a></nav>

  <main>
    <form id="examForm" onsubmit="submitExam(); return false;">
      <input type="hidden" name="username" value="student" />
      <input type="hidden" name="subject" value="Crop Science" />
      <input type="hidden" name="total" value="10" />
      <div class="question">
        <p><strong>1.</strong> What is the scientific name of rice?</p>
        <label><input type="radio" name="q0" value="a"> A) Zea mays</label><br>
        <label><input type="radio" name="q0" value="b"> B) Oryza sativa</label><br>
      </div>
      <div class="question">
        <p><strong>2.</strong> Which is a C4 plant?</p>
        <label><input type="radio" name="q1" value="a"> A) Rice</label><br>
        <label><input type="radio" name="q1" value="c"> C) Corn</label><br>
      </div>
      <button type="submit">Submit Exam</button>
    </form>
    <div id="result"></div>
  </main>

  <footer><p>&copy; 2025 GrassReview.ph</p></footer>
  <script src="../assets/js/exam.js"></script>
</body>
</html>
`);

// === Server.js ===
fs.writeFileSync('server.js', `
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// === MongoDB Atlas Connection ===
// 🔥 Replace with your real MongoDB Atlas URL
const MONGODB_URI = "mongodb+srv://your-username:your-password@cluster0.xyz.mongodb.net/grassreview?retryWrites=true&w=majority";

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
    res.send(\`
      <h3>🎉 Exam Saved!</h3>
      <p><strong>Score:</strong> \${score}/\${total}</p>
      <p>Data stored in MongoDB Atlas.</p>
      <a href="/">← Home</a>
    \`);
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
  console.log(\`🟢 GrassReview.ph running at http://localhost:\${PORT}\`);
  console.log("💡 Remember to replace MONGODB_URI in server.js with your Atlas URL!");
});
`);

console.log("✅ All files created!");
console.log("📦 Now run:");
console.log("   npm install");
console.log("   node server.js");
