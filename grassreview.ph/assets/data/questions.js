window.ExamQuestions = {
  cropScience: Array(100).fill().map((_, i) => ({
    question: `Crop Science Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  soilScience: Array(100).fill().map((_, i) => ({
    question: `Soil Science Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  cropProtection: Array(100).fill().map((_, i) => ({
    question: `Crop Protection Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  animalScience: Array(100).fill().map((_, i) => ({
    question: `Animal Science Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  agriEcon: Array(100).fill().map((_, i) => ({
    question: `Agri Economics Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  })),
  extension: Array(100).fill().map((_, i) => ({
    question: `Extension & Communication Question ${i + 1}?`,
    choices: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["a","b","c","d"][Math.floor(Math.random() * 4)]
  }))
};
