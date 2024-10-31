//your JS code here. If required.
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Selecting HTML elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Initialize userAnswers from sessionStorage or as an empty array
let userAnswers = [];

// Load progress from sessionStorage
const savedProgress = sessionStorage.getItem("progress");
if (savedProgress) {
  userAnswers = JSON.parse(savedProgress);
} else {
  // Initialize userAnswers with nulls
  userAnswers = Array(questions.length).fill(null);
}

// Load score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Function to render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear any existing content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${question.question}`;
    questionContainer.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceContainer = document.createElement("div");
      choiceContainer.classList.add("choice-container");

      const choiceInput = document.createElement("input");
      choiceInput.setAttribute("type", "radio");
      choiceInput.setAttribute("name", `question-${i}`);
      choiceInput.setAttribute("value", choice);
      choiceInput.id = `question-${i}-choice-${j}`;

      // If user has previously selected this choice, mark it as checked
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      // Event listener for when a choice is selected
      choiceInput.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.setAttribute("for", choiceInput.id);
      choiceLabel.textContent = choice;

      choiceContainer.appendChild(choiceInput);
      choiceContainer.appendChild(choiceLabel);
      questionContainer.appendChild(choiceContainer);
    }

    questionsElement.appendChild(questionContainer);
  }
}

// Function to calculate and display score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Event listener for submit button
submitButton.addEventListener("click", function () {
  // Check if all questions have been answered
  const allAnswered = userAnswers.every((answer) => answer !== null);
  if (!allAnswered) {
    alert("Please answer all questions before submitting the quiz.");
    return;
  }

  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);

  // Optionally, you can disable the submit button after submission
  submitButton.disabled = true;
});

// Initial render of questions
renderQuestions();