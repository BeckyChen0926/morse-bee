import allAnswers from "../data/allAnswers.json";
import { useMainStore } from "../src/store";
import {} from "../src/utils";

const store = useMainStore();
let count = 88;
let answers,pairanswers,comlet,pair,todayLetters = store.startGame({ days: count, allAnswers });
console.log("letters: " + todayLetters.availableLetters);
console.log('answers: ' + todayLetters.pairanswers);
let todayAnswers = [];
todayLetters.pairanswers.forEach((w) => {
  todayAnswers.push(w)
});
console.log(todayAnswers);

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

function getNextWord(){
  if (currentIndex < todayAnswers.length){
    return todayAnswers[currentIndex++];
  } else{
    console.log('end of quiz!');
    return null;
  }
}

let currWord = '';

function startGame(){
  const nextWord = getNextWord();
  if (nextWord){
    currWord = nextWord;
    document.getElementById("userAnswer").focus();
    document.getElementById("userAnswer").select()
    playWordMorse(currWord);
  } else {
    alert('Quiz finished!');
  }
}

function checkUserInput(userInput){
  // if correct, say correct and play the next word
  if (userInput == currWord){
    alert('correct!');
    document.getElementById("userAnswer").value='';
    document.getElementById("userAnswer").focus();
    document.getElementById("userAnswer").select()
    const nextWord = getNextWord();
    if (nextWord){
      currWord = nextWord;
      playWordMorse(currWord);
    } else{
      alert('quiz finished!');
    }
  } else {
    // currently, play until the user gets it right
    alert('wrong, try again!');
    playWordMorse(currWord);
  }
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
  modal.style.display = "block";
  startGame();
  window.addEventListener('keyup',checkQuizEnter);
});

document.getElementById("checkQuiz").addEventListener("click", () => {
  const userAnswer = document.getElementById("userAnswer").value.trim();
  checkUserInput(userAnswer);
});

function checkQuizEnter(e){
  if (e.key.toLowerCase() === 'enter'){
    const userAnswer = document.getElementById("userAnswer").value.trim();
    checkUserInput(userAnswer);
  }
}

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
        console.log("now playing: " + letter);
      });

      audio.addEventListener("ended", function onEnded() {
        audio.removeEventListener("ended", onEnded);
        resolve();
      });
    });
  }
}

async function playWordMorse(word) {

  for (const letter of word) {
    await playHiveSound(letter);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}