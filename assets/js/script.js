var questions = [
  {
    questionText: 
      "Inside which HTML element do we put the JavaScript?",
    options: [
      "1. <scripting>", 
      "2. <javascript>", 
      "3. <js>", 
      "4. <script>"
    ],
    answer: "4. <script>",
  },
  {
    questionText: 
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: [
      "1. <script src='xxx.js'>",
      "2. <script name='xxx.js'>",
      "3. <script href='xxx.js'>",
      "4. <script file='xxx.js'>"
    ],
    answer: "1. <script src='xxx.js'>",
  },
  {
    questionText:
      "How can you add a comment in JavaScript?",
    options: [
      "1. <!--This is a comment-->", 
      "2. //This is a comment", 
      "3. <!>This is a comment", 
      "4. <!-This is a comment"
    ],
    answer: "2. //This is a comment",
  },
  {
    questionText:
      "How do you declare a JavaScript variable?",
    options: [
      "1. var myName = 'John';",
      "2. let variable myName = 'John';",
      "3. variable is myName = 'John';",
      "4. v myName = 'John';"
    ],
    answer: "1. var myName = 'John';",
  },
  {
    questionText:
      "Which operator is used to assign a value to a variable?",
    options: [
      "1. x", 
      "2. *", 
      "3. =", 
      "4. -"
    ],
    answer: "3. =",
  },
  {
    questionText:
      "What will the following code return? Boolean(10 > 9)",
    options: [
      "1. NaN", 
      "2. true", 
      "3. false", 
      "4. undefined"
    ],
    answer: "2. true",
  },
  {
    questionText:
      "How do you write 'Hello World' in an alert box?",
    options: [
      "1. msgBox('Hello World');", 
      "2. alert('Hello World');", 
      "3. msg('Hello World');", 
      "4. alertBox('Hello World');"
    ],
    answer: "2. alert('Hello World');",
  },
  {
    questionText:
      "How do you create a function in JavaScript?",
    options: [
      "1. function = myFunction()", 
      "2. myFunction()", 
      "3. function: myFunction()", 
      "4. function myFunction()"
    ],
    answer: "4. function myFunction()",
  },
  {
    questionText:
      "How do you round the number 7.25, to the nearest integer?",
    options: [
      "1. Math.round(7.25)", 
      "2. round(7.25)", 
      "3. Math.rnd(7.25)", 
      "4. rnd(7.25)"
    ],
    answer: "1. Math.round(7.25)",
  },
  {
    questionText: 
      "Commonly used data types DO NOT include:",
    options: [
      "1. strings", 
      "2. booleans", 
      "3. alerts", 
      "4. numbers"
    ],
    answer: "3. alerts",
  },
  {
    questionText: 
      "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above"
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: 
      ["1. commas", 
      "2. curly brackets", 
      "3. quotes", 
      "4. parentheses"
    ],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log"
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: [
      "1. break", 
      "2. stop", 
      "3. halt", 
      "4. exit"
    ],
    answer: "1. break",
  },
];

var startCard = document.querySelector("#start-card");
var quizCard = document.querySelector("#quiz-card");
var scoreCard = document.querySelector("#score-card");
var leaderboardCard = document.querySelector("#leaderboard-card");

function hideCards() {
  startCard.setAttribute("hidden", true);
  quizCard.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
  leaderboardCard.setAttribute("hidden", true);
}

var result = document.querySelector("#result");
var resultText = document.querySelector("#result-text");

function hideResult() {
  result.style.display = "none";
}

var intervalID;
var time;
var currentQuestion;

document.querySelector("#start-button").addEventListener("click", startQuiz);

function startQuiz() {
  hideCards();
  startCard.setAttribute("hidden", true);
  quizCard.removeAttribute("hidden");

  currentQuestion = 0;
  displayQuestion();

  time = questions.length * 10;

  intervalID = setInterval(countDown, 1000);

  displayTime();
}

function countDown() {
  time--;
  displayTime();

  if (time <= 0) {
    endQuiz();
  }
}

var timeLeft = document.querySelector("#time-left");

function displayTime() {
  timeLeft.textContent = time;
}

function displayQuestion() {
  let question = questions[currentQuestion];
  let options = question.options;

  let questionHeading = document.querySelector("#question");
  questionHeading.textContent = question.questionText;

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    let optionButton = document.querySelector("#answer" + i);
    optionButton.textContent = option;
  }
}

document.querySelector("#answer-options").addEventListener("click", checkAnswer);

function correct(optionButton) {
  return optionButton.textContent === questions[currentQuestion].answer;
}

function checkAnswer(eventObject) {
  let optionButton = eventObject.target;
  result.style.display = "block";

  if (correct(optionButton)) {
    resultText.textContent = "Correct!";
    setTimeout(hideResult, 1000);
  } else {
    resultText.textContent = "Incorrect!";
    setTimeout(hideResult, 1000);
    if (time >= 10) {
      time = time - 10;
      displayTime();
    } else {
      time = 0;
      displayTime();
      endQuiz();
    }
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

var score = document.querySelector("#score");

function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute("hidden");
  score.textContent = time;
}

var submitButton = document.querySelector("#submit-button");
var inputInitials = document.querySelector("#initials");

submitButton.addEventListener("click", submitScore);

function submitScore(event) {
  event.preventDefault();

  if (!inputInitials.value) {
    alert("Please enter your initials.");
    return;
  }

  let leaderboardEntry = {
    initials: inputInitials.value,
    score: time,
  };

  updateStoredScores(leaderboardEntry);

  hideCards();
  leaderboardCard.removeAttribute("hidden");

  displayLeaderboard();
}

function updateStoredScores(leaderboardEntry) {
  let storedScores = getLeaderboard();
  storedScores.push(leaderboardEntry);
  localStorage.setItem("storedScores", JSON.stringify(storedScores));
}

function getLeaderboard() {
  let storedLeaderboard = localStorage.getItem("storedScores");
  if (storedScores !== null) {
    let storedScores = JSON.parse(storedLeaderboard);
    return storedScores;
  } else {
    storedScores = [];
  }
  return storedScores;
}

function displayLeaderboard() {
  let sortedStoredScores = sortLeaderboard();
  var highscores = document.querySelector("#highscores");
  highscores.textContent = "";
  for (let i = 0; i < sortedStoredScores.length; i++) {
    let leaderboardEntry = sortedStoredScores[i];
    let newListItem = document.createElement("li");
    newListItem.textContent =
      leaderboardEntry.initials + ": " + leaderboardEntry.score;
    highscores.append(newListItem);
  }
}

function sortLeaderboard() {
  let storedScores = getLeaderboard();
  if (!storedScores) {
    return;
  }

  storedScores.sort(function(a, b) {
    return b.score - a.score;
  });
  return storedScores;
}

var clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearLeaderboard);

function clearLeaderboard() {
  localStorage.clear();
  displayLeaderboard();
}

var backButton = document.querySelector("#back-button");
backButton.addEventListener("click", backToStart);

function backToStart() {
  hideCards();
  startCard.removeAttribute("hidden");
}

var leaderboard = document.querySelector("#leaderboard");
leaderboard.addEventListener("click", showLeaderboard);

function showLeaderboard() {
  hideCards();
  leaderboardCard.removeAttribute("hidden");
  
  clearInterval(intervalID);

  time = undefined;
  displayTime();

  displayLeaderboard();
}
