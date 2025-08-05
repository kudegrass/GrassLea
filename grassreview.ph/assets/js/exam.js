function submitExam() {
  const form = document.getElementById("examForm");
  let score = 0;
  const total = window.currentQuestions.length;

  window.currentQuestions.forEach((q, index) => {
    const selected = form.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });

  const resultDiv = document.getElementById("result");
  const percentage = Math.round((score / total) * 100);
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h3>🎉 Exam Complete!</h3>
    <p><strong>Score: ${score} / ${total}</strong></p>
    <p>Performance: ${percentage}%</p>
    <p>${percentage >= 75 ? "✅ You're on track!" : "💡 Keep reviewing!"}</p>
  `;
}
