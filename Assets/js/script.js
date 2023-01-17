// Array of words for the game
var gameWords = ["Javascript", "Code", "HTML", "CSS", "Function","Iteration", "Boolean"];

// Grab elements
var startBtn = document.querySelector(".start-button");
var resetBtn = document.querySelector(".reset-button");
var wordDisplay = document.querySelector(".word-blanks")

// Setup word for the game
startBtn.addEventListener("click", function() {
    var wordIndex = Math.floor(Math.random() * gameWords.length);
    var randomWord = gameWords[wordIndex];

    wordDisplay.textContent = "";
    for (var i = 0; i < randomWord.length; i++) {
        wordDisplay.textContent += "_ ";
    };

    // Detect letters from user
    wordDisplay.addEventListener("keydown", function(event) {
        var key = event.key.toLowerCase();

        for (var strIndex = 0; strIndex < randomWord.length; strIndex++) {
            if (key == randomWord[strIndex]) {
                wordDisplay.textContent[strIndex] = key;
            }
        }
    })

});