import allAnswers from "../data/allAnswers.json";
import { useMainStore } from "../src/store";
import { } from "../src/utils";

const store = useMainStore();

let days = {
  1: 97,
  2: 98,
  3: 99,
  4: 100
}

let urlParams = new URLSearchParams(window.location.search);
let pid = urlParams.get('PROLIFIC_PID');
let dayNum = urlParams.get('day');
let isGame = urlParams.get('game');

let answers, pairanswers, comlet, pair, todayLetters = store.startGame({ days: days[dayNum] - 1, allAnswers });
let allGuesses = []

// console.log("letters: " + todayLetters.availableLetters);
// console.log('answers: ' + todayLetters.pairanswers);
let todayAnswers = [];
todayLetters.pairanswers.forEach((w) => {
  todayAnswers.push(w)
});
// let allGuesses = todayAnswers;
// console.log('today answers: '+todayAnswers);

document.addEventListener('DOMContentLoaded', () => {
  let urlParams = new URLSearchParams(window.location.search);
  let gameParam = urlParams.get('game'); // Get the 'game' parameter

  if (gameParam === 'false') {
    let modal = document.getElementById('quizModal');
    // modal.style.display = 'block';
    // modal.style.zIndex = '99999';

    let flashcard = document.getElementById('flashCardModal');
    flashcard.style.display = 'block';
    flashcard.style.zIndex = '99999';

    let start = document.getElementById('startQuiz');
    start.style.zIndex = '99999';

    // Prevent closing the modal by clicking outside
    window.onclick = function (event) {
      if (event.target === modal || event.target === flashcard) {
        event.stopPropagation();
      }
    };

    let close = document.querySelector(".close");
    close.style.display = 'none';

    let how = document.querySelector('.el-dialog');
    how.style.display = 'none';
    let overlay = document.querySelectorAll('.el-overlay')[1];
    overlay.style.zIndex = '-9999';
    overlay.style.backgroundColor = 'white';
  }
  // Hide the flashcard modal and show quiz modal after 1 minute
  setTimeout(() => {
    flashcard.style.display = 'none';
    modal.style.display = 'block';
    modal.style.zIndex = '99999';
  }, 600000);
});


let quizStartTime = new Date();
let quizEndTime = new Date();
let morseStartTime = new Date();
let morseEndTime = new Date();
let gameEndTime = new Date();

function preloadSounds() {
  const dict = {
    a: "https://upload.wikimedia.org/wikipedia/commons/f/f3/A_morse_code.ogg",
    b: "https://upload.wikimedia.org/wikipedia/commons/b/b1/B_morse_code.ogg",
    c: "https://upload.wikimedia.org/wikipedia/commons/2/25/C_morse_code.ogg",
    d: "https://upload.wikimedia.org/wikipedia/commons/9/92/D_morse_code.ogg",
    e: "https://upload.wikimedia.org/wikipedia/commons/e/e7/E_morse_code.ogg",
    f: "https://upload.wikimedia.org/wikipedia/commons/6/63/F_morse_code.ogg",
    g: "https://upload.wikimedia.org/wikipedia/commons/7/72/G_morse_code.ogg",
    h: "https://upload.wikimedia.org/wikipedia/commons/9/93/H_morse_code.ogg",
    i: "https://upload.wikimedia.org/wikipedia/commons/d/d9/I_morse_code.ogg",
    j: "https://upload.wikimedia.org/wikipedia/commons/9/9e/J_morse_code.ogg",
    k: "https://upload.wikimedia.org/wikipedia/commons/6/6a/K_morse_code.ogg",
    l: "https://upload.wikimedia.org/wikipedia/commons/a/a8/L_morse_code.ogg",
    m: "https://upload.wikimedia.org/wikipedia/commons/9/97/M_morse_code.ogg",
    n: "https://upload.wikimedia.org/wikipedia/commons/5/5a/N_morse_code.ogg",
    o: "https://upload.wikimedia.org/wikipedia/commons/4/41/O_morse_code.ogg",
    p: "https://upload.wikimedia.org/wikipedia/commons/c/c6/P_morse_code.ogg",
    q: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Q_morse_code.ogg",
    r: "https://upload.wikimedia.org/wikipedia/commons/e/ea/R_morse_code.ogg",
    s: "https://upload.wikimedia.org/wikipedia/commons/d/d8/S_morse_code.ogg",
    t: "https://upload.wikimedia.org/wikipedia/commons/b/ba/T_morse_code.ogg",
    u: "https://upload.wikimedia.org/wikipedia/commons/3/34/U_morse_code.ogg",
    v: "https://upload.wikimedia.org/wikipedia/commons/3/37/V_morse_code.ogg",
    w: "https://upload.wikimedia.org/wikipedia/commons/6/68/W_morse_code.ogg",
    x: "https://upload.wikimedia.org/wikipedia/commons/b/be/X_morse_code.ogg",
    y: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Y_morse_code.ogg",
    z: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Z_morse_code.ogg",
  };

  for (const letter in dict) {
    const audio = new Audio();
    audio.src = dict[letter];
    audio.load();
  }
}

// Call the preloadSounds function during initialization
preloadSounds();

let currentIndex = 0;

function getNextWord() {
  if (currentIndex < todayAnswers.length) {
    return todayAnswers[currentIndex++];
  } else {
    console.log('end of quiz!');
    return null;
  }
}

let currWord = '';

function startGame() {
  const nextWord = getNextWord();
  if (nextWord) {
    currWord = nextWord;
    document.getElementById("userAnswer").focus();
    document.getElementById("userAnswer").select();
    quizStartTime = new Date();
    playWordMorse(currWord);
  } else {
    alert('Quiz finished!');
  }
}

function checkUserInput(userInput) {
  allGuesses.push(userInput);
  // console.log(allGuesses);
  // if correct, say correct and play the next word
  if (userInput == currWord || userInput == 'skip') {
    quizEndTime = new Date();
    if (userInput == 'skip') {
      alert('skipped');
    } else {
      alert('correct!');
    }
    quizInfo(currWord, userInput);
    allGuesses = [];
    document.getElementById("userAnswer").value = '';
    document.getElementById("userAnswer").focus();
    document.getElementById("userAnswer").select()
    const nextWord = getNextWord();
    if (nextWord) {
      currWord = nextWord;
      quizStartTime = new Date();
      playWordMorse(currWord);
    } else {
      alert('quiz finished!');
    }
  } else {
    // currently, play until the user gets it right
    alert('wrong, try again!');
    playWordMorse(currWord);
  }
}

function sendDataToSheet(PID, day, isGame, hiveLetters, allGuesses, correctAnswer, userAnswer, quizStartTime, quizEndTime, morseStartTime, morseEndTime, morseDuration, answerDuration) {
  // code that puts everything in a google doc
  // allGuesses = allGuesses.join(', ');

  let res_key = ["PID", "day", "isGame", "hiveLetters", "allGuesses", "correctAnswer", "userAnswer", "quizStartTime", "quizEndTime", "morseStartTime", "morseEndTime", "morseDuration", "answerDuration"];
  let res_val = [PID, day, isGame, hiveLetters, allGuesses, correctAnswer, userAnswer, quizStartTime, quizEndTime, morseStartTime, morseEndTime, morseDuration, answerDuration];
  var script_result = {};

  res_key.forEach(function (k, i) {
    script_result[k] = res_val[i];
  })
  // console.log("----------------------------")
  // console.log(JSON.stringify(script_result));
  // console.log("----------------------------")

  const url = "https://script.google.com/macros/s/AKfycby-C1CromFwuVKdDm-iJiVtXPRa-4UGg3T5gauJW0eVAu_UvTNFrm4NWp1FL0I1NpOKOw/exec";

  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(script_result)
  })
}

function quizInfo(word, userInput) {
  // console.log('---------------------quiz info -------------------');
  // console.log('correct answer: '+word);
  // console.log('user answer: ' + userInput);
  // console.log('hive letters: '+todayLetters.availableLetters);
  // console.log('quiz start time: '+quizStartTime);
  // console.log('quiz end time: '+quizEndTime);
  // console.log('morse start time: ' + morseStartTime);
  // console.log('morse end time: '+morseEndTime);
  let morseDuration = (morseEndTime.getTime() - morseStartTime.getTime()) / 1000;
  // console.log('morse duration: ' + morseDuration)
  let answerDuration = (((quizEndTime.getTime() - quizStartTime.getTime()) / 1000) - morseDuration);
  // console.log('add'+ allGuesses.join(', '));
  // console.log('answer duration: ' + answerDuration);
  sendDataToSheet(pid, dayNum, isGame, todayLetters.availableLetters, allGuesses.toString(), word, userInput, quizStartTime, quizEndTime, morseStartTime, morseEndTime, morseDuration, answerDuration);
  // sendDataToSheet(todayLetters.availableLetters);
}


var modal = document.getElementById("quizModal");

modal.addEventListener("click", () => {
  if (modal.style.display === "none") {
    window.removeEventListener("keyup", checkQuizEnter);
  }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

document.getElementById("startQuiz").addEventListener("click", () => {
  store.clearCorrectGuesses;
  modal.style.display = "block";
  gameEndTime = new Date();
  // console.log('game end time: ' + gameEndTime);
  startGame();
  window.addEventListener('keyup', checkQuizEnter);
});

document.getElementById("checkQuiz").addEventListener("click", () => {
  const userAnswer = document.getElementById("userAnswer").value.trim();
  checkUserInput(userAnswer);
});

function checkQuizEnter(e) {
  if (e.key.toLowerCase() === 'enter') {
    const userAnswer = document.getElementById("userAnswer").value.trim();
    checkUserInput(userAnswer);
  }
}

document.getElementById("repeatMorse").addEventListener("click", () => {
  // Replay the current word's Morse code
  if (currWord) {
    playWordMorse(currWord);
  }
});

async function playHiveSound(letter) {
  const audio = document.getElementById("hiveAudio");
  const dict = {
    a: "https://upload.wikimedia.org/wikipedia/commons/f/f3/A_morse_code.ogg",
    b: "https://upload.wikimedia.org/wikipedia/commons/b/b1/B_morse_code.ogg",
    c: "https://upload.wikimedia.org/wikipedia/commons/2/25/C_morse_code.ogg",
    d: "https://upload.wikimedia.org/wikipedia/commons/9/92/D_morse_code.ogg",
    e: "https://upload.wikimedia.org/wikipedia/commons/e/e7/E_morse_code.ogg",
    f: "https://upload.wikimedia.org/wikipedia/commons/6/63/F_morse_code.ogg",
    g: "https://upload.wikimedia.org/wikipedia/commons/7/72/G_morse_code.ogg",
    h: "https://upload.wikimedia.org/wikipedia/commons/9/93/H_morse_code.ogg",
    i: "https://upload.wikimedia.org/wikipedia/commons/d/d9/I_morse_code.ogg",
    j: "https://upload.wikimedia.org/wikipedia/commons/9/9e/J_morse_code.ogg",
    k: "https://upload.wikimedia.org/wikipedia/commons/6/6a/K_morse_code.ogg",
    l: "https://upload.wikimedia.org/wikipedia/commons/a/a8/L_morse_code.ogg",
    m: "https://upload.wikimedia.org/wikipedia/commons/9/97/M_morse_code.ogg",
    n: "https://upload.wikimedia.org/wikipedia/commons/5/5a/N_morse_code.ogg",
    o: "https://upload.wikimedia.org/wikipedia/commons/4/41/O_morse_code.ogg",
    p: "https://upload.wikimedia.org/wikipedia/commons/c/c6/P_morse_code.ogg",
    q: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Q_morse_code.ogg",
    r: "https://upload.wikimedia.org/wikipedia/commons/e/ea/R_morse_code.ogg",
    s: "https://upload.wikimedia.org/wikipedia/commons/d/d8/S_morse_code.ogg",
    t: "https://upload.wikimedia.org/wikipedia/commons/b/ba/T_morse_code.ogg",
    u: "https://upload.wikimedia.org/wikipedia/commons/3/34/U_morse_code.ogg",
    v: "https://upload.wikimedia.org/wikipedia/commons/3/37/V_morse_code.ogg",
    w: "https://upload.wikimedia.org/wikipedia/commons/6/68/W_morse_code.ogg",
    x: "https://upload.wikimedia.org/wikipedia/commons/b/be/X_morse_code.ogg",
    y: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Y_morse_code.ogg",
    z: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Z_morse_code.ogg",
  };

  if (audio && dict[letter]) {
    audio.src = dict[letter];

    // only play if all sounds are loaded and the last sound has ended
    return new Promise((resolve) => {
      audio.addEventListener("canplaythrough", function onCanPlayThrough() {
        audio.removeEventListener("canplaythrough", onCanPlayThrough);
        audio.play();
        // console.log("now playing: " + letter);
      });

      audio.addEventListener("ended", function onEnded() {
        audio.removeEventListener("ended", onEnded);
        resolve();
      });
    });
  }
}

async function playWordMorse(word) {
  morseStartTime = new Date();
  for (const letter of word) {
    await playHiveSound(letter);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  morseEndTime = new Date();
}