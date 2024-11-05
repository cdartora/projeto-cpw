// array de elementos html
const questions = [];
let currentQuestionIndex;
let score = 0;
const _API_URL =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

const toggleButtons = (buttons) => {
  buttons.forEach((button) => {
    const isClicked = button.classList.contains("clicked");
    button.disabled = !isClicked;
    button.classList.toggle("clicked");
  });
};

const toggleNextButton = () =>
  (document.getElementById("next-button").classList.toggle("hidden"));

const sumScore = () => {
  score += 10;
  const scoreElement = document.getElementById("score");
  scoreElement.innerText = score;
};

const checkAnswer = (element) => {
  const buttons = document.querySelectorAll(".alternative");
  if (element.target.classList.contains("correct")) {
    sumScore();
    toggleButtons(buttons);
  } else {
    toggleButtons(buttons);
  }
  toggleNextButton();
};

const displayScore = () => {
  const container = clearContainer();
  // create score screen

  // create button to start again
};

const clearContainer = () => {
  const container = document.getElementById("question-container");
  container.innerHTML = "";
  return container;
};

const displayQuestion = () => {
  const container = clearContainer();
  if (currentQuestionIndex < questions.length) {
    container.appendChild(questions[currentQuestionIndex]);
  } else {
    displayScore();
  }
};

const createQuestion = (question) => {
  const options = [];
  const questionContainer = document.createElement("div");

  // question
  const questionTitle = document.createElement("h1");
  questionTitle.innerText = question.question;
  questionContainer.appendChild(questionTitle);

  // correct answer
  const correctAnswer = document.createElement("button");
  correctAnswer.className = "alternative correct";
  correctAnswer.innerText = question.correct_answer;
  correctAnswer.addEventListener("click", checkAnswer);
  options.push(correctAnswer);

  // incorrect answers
  question.incorrect_answers.forEach((answer) => {
    const incorrectAnswer = document.createElement("button");
    incorrectAnswer.className = "alternative";
    incorrectAnswer.addEventListener("click", checkAnswer);
    incorrectAnswer.innerText = answer;
    options.push(incorrectAnswer);
  });

  // shuffle the options
  options.sort(() => Math.random() - 0.5);

  // add the options to the container
  options.forEach((option) => {
    questionContainer.appendChild(option);
  });

  return questionContainer;
};

const fetchQuestions = async () => {
  const response = await fetch(_API_URL);
  const { results } = await response.json();
  results.forEach((q, i) => {
    const questionEl = createQuestion(q);
    questions.push(questionEl);
  });
};

const nextQuestion = () => {
  currentQuestionIndex++;
  displayQuestion();
  toggleNextButton();
};

const startGame = async () => {
  await fetchQuestions();
  currentQuestionIndex = 0;
  displayQuestion();
};
