var startBtn = document.querySelector(".start-button");
var quizDisplay = document.querySelector(".quiz-display");
var question = document.querySelector(".question");
var solution1 = document.querySelector(".solution1");
var solution2 = document.querySelector(".solution2");
var solution3 = document.querySelector(".solution3");
var solution4 = document.querySelector(".solution4");
var allSolutions = document.getElementsByName("optionsRadios");
var submitBtn = document.querySelector(".submit-button");
var nextBtn = document.querySelector(".next-button");
var quizTime = document.querySelector(".quizTime");
var result = document.querySelector(".result");
var score = document.querySelector(".score");
var scoreSubmit = document.querySelector(".score-submit");
var scoreSubmitBtn = document.querySelector(".score-submit-btn");
var scoreList = document.querySelector(".score-list");
var userInitials = document.querySelector(".user-initials");
var btnContainer = document.querySelector(".btn-container");
var retryBtn = document.querySelector(".retry-button");
var clearBtn = document.querySelector(".clear-button");

var count = 100;
var quizTimeInterval;
var userScore = {
    user: "",
    score: ""
};
var userHighScores = [userScore];
var gameState = false;
var questionNumber = -1;

var questionList = [question1, question2, question3, question4, question5];
var answerKey = ["option3", "option3", "option4", "option1", "option2"];

function question1() {
    startBtn.setAttribute("style", "display: none");
    quizDisplay.setAttribute("style", "display: visible");

    question.textContent = "Commonly used data types do NOT include:";

    solution1.textContent = "strings";
    solution2.textContent = "booleans";
    solution3.textContent = "alerts";
    solution4.textContent = "numbers";
}

function question2() {
    question.textContent = "The condition of an if/else statement is enclosed with:";

    solution1.textContent = "quotes";
    solution2.textContent = "curly brackets";
    solution3.textContent = "parenthesis";
    solution4.textContent = "square brackets";
}

function question3() {
    question.textContent = "Arrays in Javascript can be used to store:";

    solution1.textContent = "numbers and strings";
    solution2.textContent = "other arrays";
    solution3.textContent = "booleans";
    solution4.textContent = "all of the above";
}

function question4() {
    question.textContent = "String values must be enclosed within _______ when being assigned to variables:";

    solution1.textContent = "quotes";
    solution2.textContent = "curly brackets";
    solution3.textContent = "parenthesis";
    solution4.textContent = "square brackets";
}

function question5() {
    question.textContent = "A very useful tool during development and debugging that prints content to the debugger is:";

    solution1.textContent = "github";
    solution2.textContent = "console.log";
    solution3.textContent = "terminal/bash";
    solution4.textContent = "for loops";
}

function displayResult(outcome) {
    if (outcome) {
        result.textContent = "Correct!";
        result.setAttribute("style", "visibility: visible");
    }
    else {
        result.textContent = "Incorrect!";
        result.setAttribute("style", "visibility: visible");
    }
}

function quizSubmit(event) {
    event.preventDefault();
        for (var i = 0; i < allSolutions.length; i++) {
            if (allSolutions[i].checked == true) {
                submitBtn.disabled = true;
                if (allSolutions[i].value == answerKey[questionNumber]) {
                    displayResult(true);
                }
                else {
                    displayResult(false);
                    count -= 20;
                }
                nextBtn.disabled = false;
            }
        }
}

function nextQuestion() {
    nextBtn.disabled = true;

        for (var i = 0; i < allSolutions.length; i++) {
            if (allSolutions[i].checked) {
                allSolutions[i].checked = false;
            }
        }

        result.setAttribute("style", "visibility: hidden");

        quizDisplay.removeEventListener("submit", quizSubmit);
        quizDisplay.removeEventListener("click", nextQuestion);
        
        submitBtn.disabled = false;
        startQuiz();
}

function startCountdown() {
    count = 100;
    quizTime.setAttribute("style", "display: visible");
    quizTimeInterval = setInterval(countdown, 1000);
}

function countdown() {
    if (count > 0) {
        quizTime.textContent = "Timer: " + count;
        count--;
    }
    else {
        result.setAttribute("style", "visibility: hidden");
        count = 0;
        quizTime.textContent = "Timer: " + count;
        endScreen();
    }
}

function endScreen() {
    clearInterval(quizTimeInterval);
    quizTime.setAttribute("style", "display: none")
    question.textContent = "All done!";
    score.textContent = "Your score is: " + count;
    score.setAttribute("style", "display: visible");
    quizDisplay.setAttribute("style", "display: none");
    scoreSubmit.setAttribute("style", "display: visible");

    scoreSubmit.addEventListener("submit", saveScore);
}

function saveScore(event) {
    event.preventDefault();
    userScore.user = userInitials.value;
    userScore.score = count;

    console.log(userInitials.value);
    userInitials.value = "";
    userHighScores.push(userScore);
    localStorage.setItem("high-scores", JSON.stringify(userHighScores));
    scoreSubmit.removeEventListener("submit", saveScore);
    renderScores();
}

function renderScores() {
    question.textContent = "High Scores";
    score.setAttribute("style", "display: none");
    scoreSubmit.setAttribute("style", "display: none");
    scoreList.setAttribute("style", "display: visible");
    btnContainer.setAttribute("style", "display: visible");
    scoreList.innerHTML = "";

    for (var i = 0; i < userHighScores.length; i++) {
        var highScore = userHighScores[i];
    
        var li = document.createElement("li");
        li.textContent = highScore.user + " - " + highScore.score;
        scoreList.appendChild(li);
    }

    retryBtn.addEventListener("click", resetQuiz);
    clearBtn.addEventListener("click", clearScores);
}

function resetQuiz() {
    question.textContent = "Coding Quiz";
    scoreList.setAttribute("style", "display: none");
    btnContainer.setAttribute("style", "display: none");
    startBtn.setAttribute("style", "display: visible");

    retryBtn.removeEventListener("click", resetQuiz);
    clearBtn.removeEventListener("click", clearScores);
    questionNumber = -1;
}

function clearScores() {
    var warning = confirm("Are you sure?");
    if (warning) {
        scoreList.innerHTML = "";
        userHighScores = [];
        localStorage.removeItem("high-scores");
    }
}

function init() {
    var storedUserScores = JSON.parse(localStorage.getItem("high-scores"));
    if (storedUserScores !== null) {
        userHighScores = storedUserScores;
        console.log(storedUserScores);
    }
}

function startQuiz() {
    questionNumber += 1;
    console.log(questionNumber);
    if (questionNumber > (questionList.length - 1)) {
        gameState = false
    }

    if (!gameState) {
        endScreen();
    }
    else {
        questionList[questionNumber]();
    }

    quizDisplay.addEventListener("submit", quizSubmit);
    nextBtn.addEventListener("click", nextQuestion);
}

startBtn.addEventListener("click", function() {
    gameState = true;
    startCountdown();
    startQuiz();
});

init();