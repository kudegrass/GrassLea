
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
