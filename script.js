// array de elementos html
const questions = [];
let currentQuestionIndex;
let score = 0;
const _API_URL =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

const checkAnswer = (element) => {
  if (element.target.classList.contains("correct")) {
    // sum score, change style and return
    console.log("correct");
  } else {
    // change style incorrect answer
    console.log("incorrect");
  }

  // display next button
  document.getElementById("next-button").className = "";
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
  //questionContainer.classList.add("questions-container");

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
    //incorrectAnswer.classList.add("alternative");
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
  document.getElementById("next-button").className = "hidden";
};

const startGame = async () => {
  await fetchQuestions();
  currentQuestionIndex = 0;
  displayQuestion();
};
