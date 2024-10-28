<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Hive from "./components/Hive.vue";
import CorrectGuesses from "./components/CorrectGuesses.vue";
import Progress from "./components/Progress.vue";
import YesterdaysAnswers from "./components/YesterdaysAnswers.vue";
import Info from "./components/Info.vue";
import GameWon from "./components/GameWon.vue";
import allAnswers from "../data/allAnswers.json";
import { useMainStore } from "./store";
import { InfoFilled, Calendar, Sunny, Moon } from "@element-plus/icons-vue";

const store = useMainStore();
const showYesterdaysAnswers = ref(false);
const showInfo = ref(true);
const zindex = ref(0);
const gameWonModalShown = ref(false); // only show gameWon modal once
let timer: any;

const darkmode = ref(store.theme === "dark");

const onToggleDarkMode = () => {
  if (darkmode.value === true) {
    store.theme = "dark";
    document.documentElement.classList.add("dark");
  } else {
    store.theme = "light";
    document.documentElement.classList.remove("dark");
  }
};

// const question = computed(() => store.getters.currentQuestion);
// const answer = computed(() => store.getters.currentAnswer);
// const score = ref(0);


const showGameWonModal = computed(
  () => store.getProgressPercentage === 100 && gameWonModalShown.value === false
);

const onOpenCorrectGuesses = () => {
  // without clearing timer, if user toggles correct guesses quickly, it will fade to background after timeout
  clearTimeout(timer);
  zindex.value = -1;
};

const onCloseCorrectGuesses = () => {
  timer = setTimeout(() => {
    zindex.value = 0;
  }, 2000);
};

onMounted(onToggleDarkMode);

let possibleAnswers = 0;

let dayLogs = [];

let days = {
  1: 97,
  2: 98,
  3: 99,
  4: 100
}

let urlParams = new URLSearchParams(window.location.search);
let pid = urlParams.get('PROLIFIC_PID');
let dayNum = urlParams.get('day');
// console.log(dayNum);
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

    // Hide the flashcard modal and show quiz modal after 1 minute
    setTimeout(() => {
      flashcard.style.display = 'none';
      modal.style.display = 'block';
      modal.style.zIndex = '99999';
    }, 600000);
  }
});


let count = 1;
//change the date here 
while (count < days[dayNum]) { //originally 89
  let answers, pairanswers, comlet, pair, letters = store.startGame({ days: count, allAnswers });
  possibleAnswers = letters.pairanswers;
  let logData = {
    "day #": count,
    "letters": letters,
    "answers #": letters.answers.length,
    "pair answers #": letters.pairanswers.length
  };
  dayLogs.push(logData);
  count++;
}

// console.log('day logs: \n', dayLogs);

let gameStartTime = new Date();

window.onload = (event) => {
  gameStartTime = new Date();
  // console.log('game start time: ' + gameStartTime);
  // console.log('possible answers: ' + possibleAnswers);
};

// export{
//   components: {
//     flashcard,
//   },
//   data() {
//     return {
//       score: 0,
//     }
//   },
//   computed: {
//     question() {
//       return this.$store.getters.currentQuestion // handled by vuex
//     },
//     answer() {
//       return this.$store.getters.currentAnswer // handled by vuex
//     },
//   },
//   methods: {
//     correct() {
//       this.$store.dispatch('correctAnswer') // handled by vuex
//       this.score++
//     },
//     wrong() {
//       this.$store.dispatch('wrongAnswer') // handled by vuex
//     },
//   },
// }
// TODO: remove i18n
// TODO: extra not in spellingbee: track scores across days
// TODO: add shake animation on incorrect submission?
// https://www.reddit.com/r/webdev/comments/su6y4r/what_animations_are_used_in_wordle/
// need setTimeout to wait for animation before removing guess
</script>

<template>
  <el-dialog v-model="showGameWonModal" @closed="gameWonModalShown = true" title="Congratulations!">
    <GameWon />
  </el-dialog>
  <!-- <el-dialog v-model="showYesterdaysAnswers" :title="$t('Yesterdays Answers')">
    <YesterdaysAnswers />
  </el-dialog> -->
  <el-dialog v-model="showInfo" :title="$t('How to play')">
    <Info />
  </el-dialog>
  <div class="common-layout fireworks">
    <div class="beforeFireworks" v-if="showGameWonModal" />
    <div class="afterFireworks" v-if="showGameWonModal" />
    <!-- <flashcard :front="question" :back="answer"></flashcard> -->

    <!-- <el-header height="2em" id="title-header">
      <h2>
        <strong> Spelling Bee </strong>
        <span> {{ store.getGameDateString }} </span>
      </h2>
    </el-header> -->

    <div style="display: ruby;">
      <div style="width: 50%;">
        <CorrectGuesses @open="onOpenCorrectGuesses" @close="onCloseCorrectGuesses" />
      </div>
      <div style="width: 50%;">
        <Progress />
      </div>

    </div>

    <el-menu mode="horizontal" :ellipsis="false">
      <div style="width: 50%;">
        <el-menu-item index="1" @click="showInfo = true">
          <el-tooltip :content="$t('Info')" placement="top">
            <el-icon class="menu-icon">
              <InfoFilled />
            </el-icon>
          </el-tooltip>
          <span class="responsive-menu-text">{{ $t("Info") }}</span>
        </el-menu-item>
      </div>
      <div style="width: 50%; display: flex; justify-content: center; align-items: center;">
        <button id="startQuiz">Start Quiz</button>
      </div>
      <audio id="hiveAudio" preload="auto" hidden></audio>

      <!-- <el-menu-item index="3">
        <el-switch
          v-model="darkmode"
          @change="onToggleDarkMode"
          class="darkmode-switch"
          style="--el-switch-on-color: $bl-yellow"
          inline-prompt
          size="large"
          :active-icon="Sunny"
          :inactive-icon="Moon" />
      </el-menu-item> -->
    </el-menu>
    <Hive :ZIndex="zindex" />
  </div>
</template>

<style lang="scss">
@import "element-plus/dist/index.css";
@import "element-plus/theme-chalk/dark/css-vars.css";
@import "./assets/styles/fireworks.scss";
@import "./assets/styles/_variables.scss";

* {
  // stop double tap zoom on safari. often double tap keys in game.
  // TODO: register multiple click events when holding down button?
  // https://stackoverflow.com/a/53236027/6305204
  touch-action: manipulation;
  // https://stackoverflow.com/a/66103439/6305204
  -webkit-tap-highlight-color: transparent;
}

// https://element-plus.org/en-US/guide/theming.html#by-css-variable
:root {
  --el-color-success: $bl-yellow;
  --el-primary-color: $bl-yellow;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

// don't allow words to be split. split on space between words
div {
  white-space: pre-wrap;
  word-break: break-word;
}

.darkmode-switch {
  margin-top: 5px;
}

h2 span {
  color: #bebebe;
  font-weight: lighter;
}

.main-container {
  padding-top: 3em;
}

.common-layout {
  max-width: 1000px;
  margin: auto;
  margin-top: -4%;
}

.el-header h2 {
  padding: 0;
  margin: 0;
}

.el-menu--horizontal {
  border-top: solid 1px var(--el-menu-border-color);
  justify-content: space-between;

  .el-menu-item {
    padding: 0;
  }

  // yellow is too bright on light theme, use default blue
  // .el-menu-item.is-active {
  //   color: $bl-yellow !important;
  //   border-bottom-color: currentcolor;
  // }
}

.is-focused {
  border-color: $bl-yellow !important;
}

.is-selected {
  color: $bl-yellow !important;

  &::after {
    color: $bl-yellow;
    background-color: $bl-yellow !important;
  }
}

.el-dialog {
  width: 80%;
}

.el-table {
  --el-table-header-bg-color: unset;
}

.el-message--success {
  --el-message-bg-color: unset;
  --el-message-text-color: unset;
  background-color: $bl-yellow !important;
  color: black !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  padding: 0 10px;

  // account for 10px padding on either side of #app
  max-width: calc(100% - 20px);
  max-height: 100vh;

  #title-header {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
}

// pangram highlight used in multiple components
.pangram {
  font-weight: bold;
}

.toast-message {
  max-width: 80%;
  margin: 0, 1em;
  margin-top: 25vh;
}

html.dark {
  header strong {
    color: $bl-yellow;
  }

  .pangram {
    color: $bl-yellow;
  }
}

@media only screen and (max-height: 500px) {
  .toast-message {
    margin-top: 50px;
  }
}

@media only screen and (max-width: 700px) {
  #app {
    margin-top: 10px;
  }

  .menu-icon {
    margin: 19px 5px;
  }
}

@media only screen and (max-width: 400px) {
  .responsive-menu-text {
    display: none;
  }
}
</style>
