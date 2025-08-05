window.ExamQuestions = {
  cropScience: Array(100).fill().map((_, i) => ({
    question: `Crop Science Sample Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  soilScience: Array(100).fill().map((_, i) => ({
    question: `Soil Science Sample Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  cropProtection: Array(100).fill().map((_, i) => ({
    question: `Crop Protection Sample Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  animalScience: Array(100).fill().map((_, i) => ({
    question: `Animal Science Sample Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  agriEcon: Array(100).fill().map((_, i) => ({
    question: `Agri Economics Sample Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  extension: Array(100).fill().map((_, i) => ({
    question: `Extension & Communication Sample Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  }))
});
