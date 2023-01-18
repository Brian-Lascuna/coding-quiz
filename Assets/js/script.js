var startBtn = document.querySelector(".start-button");
var quizDisplay = document.querySelector(".quiz-display");
var question = document.querySelector(".question");
var solution1 = document.querySelector(".solution1");
var solution2 = document.querySelector(".solution2");
var solution3 = document.querySelector(".solution3");
var solution4 = document.querySelector(".solution4");
var quizTime = document.querySelector(".quizTime");
var gameState = false;
var count = 120;

var questionList = [question1, question2, question3, question4, question5];
var answerKey = ["solution3", "solution3", "solution4", "solution1", "solution2"];

function question1() {
    startBtn.setAttribute("style", "display: none");
    quizDisplay.setAttribute("style", "display: visible");
    quizTime.setAttribute("style", "display: visible");

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

function startQuiz() {
    if (!gameState) {
        return
    }

    var questionNumber = 0;
    questionList[questionNumber]();
}

startBtn.addEventListener("click", function() {
    gameState = true;
    startQuiz();
});