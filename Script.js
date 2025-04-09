const wordlist = ["elite", "shell", "enemy", "tried", "entry", "clear", "Angle", "twice", "press", "fifth", "fluid", "occur", "grand", "arena", "grown", "noted", "stock", "staff", "anger", "ought", "model", "fifty", "laugh", "ratio", "scale", "lying", "whole", "blame", "begun", "touch", "layer", "three", "smith", "album", "flash", "drink", "beach", "admit", "alarm", "links", "horse", "cover", "heavy", "waste", "route", "plant", "study", "voice", "prize", "order", "whose", "stuff", "state", "month", "alone", "trust", "lower", "quick", "match", "third", "close", "rival", "chair", "allow", "upset", "lower", "sheet", "occur", "brown", "touch", "urban", "allow", "texas", "board", "false", "draft", "black", "radio", "split", "alter", "metal", "route", "broke", "curve", "title", "forty", "shelf", "agent", "adult", "adult", "faith", "force", "small", "drill", "spend", "think", "score", "glass", "woman", "stake"]

const wordToGuess = wordlist[Math.floor(Math.random() * 100)].toLowerCase();
let gameAttempts = 0;
let maxAttempts = 5
const answerBox = document.querySelector("#answerBox")

function wordToMap(playerGuessWord, actualWord) {
    let tempMap = "";

    if (playerGuessWord == actualWord) return "ccccc";

    for (let i = 0; i < 5; i++) {
        if (playerGuessWord[i] == actualWord[i]) {
            tempMap += "c";
        }
        else if (actualWord.includes(playerGuessWord[i])) {
            tempMap += "a";
        }
        else {
            tempMap += "w";
        }
    }

    return tempMap;
}

function setRowIndexValue(row, index, value, guessedwordasd) {
    if (value == "c") document.querySelector(`#row${row}`).children[index].classList.add("correct");
    
    else if (value == "a") document.querySelector(`#row${row}`).children[index].classList.add("almost");

    else if (value == "w") document.querySelector(`#row${row}`).children[index].classList.add("wrong");

    document.querySelector(`#row${row}`).children[index].innerHTML += guessedwordasd[index];
}

answerBox.addEventListener("keydown", (key) => {
    if (key.key != "Enter") return;
    if (key.target.value.length < 5) return;

    let cachedValue = key.target.value;
    cachedValue = cachedValue.toLowerCase();
    
    key.target.value = "";

    let wordMap = wordToMap(cachedValue, wordToGuess);

    for (let i = 0; i < 5; i++) {
        setRowIndexValue(gameAttempts + 1, i, wordMap[i], cachedValue);
    }
    
    if (wordToGuess == cachedValue) {
        answerBox.remove();
        gameAttempts += 1;
        return;
    }

    if (gameAttempts >= maxAttempts) {
        answerBox.remove();
        gameAttempts += 1;
        prompt("The word was " + wordToGuess);
    }

    gameAttempts += 1;
});

document.querySelector("#showWordButton").addEventListener("click", (event) => {
    event.target.textContent = "The word is: " + wordToGuess;
});