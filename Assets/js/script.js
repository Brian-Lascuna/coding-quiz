var startBtn = document.querySelector(".start-button");
var quizDisplay = document.querySelector(".quiz-display");

startBtn.addEventListener("click", function() {
    startBtn.setAttribute("style", "display: none");
    quizDisplay.setAttribute("style", "display: visible");
})