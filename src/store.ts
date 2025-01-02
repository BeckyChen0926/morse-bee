// https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { differenceInDays, isSameDay } from "date-fns";
import { epoch, generateAnswerObjs, incrementDups } from "./utils";
import { Answer } from "./models/answer";
// export default new Vuex.Store({
//   state: {
//     // The state that we want to track in this application
//     unansweredQuestions: [], // Pool of questions to be shown to the user
//     answeredQuestions: [], // Questions that have been correctly answered
//     currentQuestion: {
//       question: 'Sample question',
//       answer: 'Sample answer',
//       audio: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/A_morse_code.ogg'
//     }, // Will be overwritten immediately
//     cardFlipped: false, // Whether to show the question or answer
//     questionsInCurrentCycle: [],

//     // for data tracking
//     flipsPerLetter: { E: 0, L: 0, O: 0, P: 0, R: 0, T: 0, S: 0 },
//     timePerLetter: { E: 0, L: 0, O: 0, P: 0, R: 0, T: 0, S: 0 },
//     roundsPerLetter: 0,
//     longestPause: 0,
//     numLongPause: 0,
//     lastInteractionTime: Date.now(), // To track pause times
//     startTime: Date.now(),
//   },
//   getters: {
//     currentQuestion (state) {
//       return state.currentQuestion.question
//     },
//     currentAnswer (state) {
//       if (state.cardFlipped) {
//         // console.log('now should play:' + state.currentQuestion.answer);
//         playLetter(state);
//       }
//       return state.currentQuestion.answer
//     },
//   },
//   mutations: {
//     setUnanswered(state, questions) {
//       state.unansweredQuestions = questions;
//       state.questionsInCurrentCycle = shuffleArray([...questions]); // Initialize with shuffled questions
//     },
//     setCurrentQuestion (state, question) {
//       // Setting the question to be rendered
//       state.currentQuestion = question
//       state.cardFlipped = false
//     },
//     flipCard (state) {
//       let letter = state.currentQuestion.question
//       // console.log(state.currentQuestion.question);
//       state.cardFlipped = !state.cardFlipped
//       state.flipsPerLetter[letter]++;

//       const currentTime = Date.now();
//       const duration = (currentTime - state.lastInteractionTime) / 1000; // convert ms to seconds
//       state.timePerLetter[letter] += duration;

//       // Check for longest pause
//       if (duration > 10) {
//         state.numLongPause++;
//         if (duration > state.longestPause) {
//           state.longestPause = duration;
//         }
//       }
//       state.lastInteractionTime = currentTime; // Reset interaction time

//       // sendDataToSheet(pid, dayNum, 1, 'ELOPRTS', state.flipsPerLetter, state.timePerLetter, state.roundsPerLetter, state.longestPause, state.numLongPause);
//       // test with http://localhost:8080/?PROLIFIC_PID=6789&day=3
//     },
//     cycleQuestions(state) {
//       if (state.questionsInCurrentCycle.length === 0) {
//         state.roundsPerLetter++;
//         sendDataToSheet(pid, dayNum, 'ELOPRTS', state.flipsPerLetter, state.timePerLetter, state.roundsPerLetter, state.longestPause, state.numLongPause);
//         state.questionsInCurrentCycle = shuffleArray([...state.unansweredQuestions]); // Reshuffle after cycle completion
//       }
//       state.currentQuestion = state.questionsInCurrentCycle.pop(); // Get the next question
//       state.cardFlipped = false
//     }

//   },
//   actions: {
//     init(context) {
//       context.commit('cycleQuestions');
//     },
//     correctAnswer(context) {
//       context.commit('cycleQuestions');
//     },
//     wrongAnswer(context) {
//       context.commit('cycleQuestions');
//     },
//   },
// })
// let urlParams = new URLSearchParams(window.location.search);
// let pid: string | null = urlParams.get('PROLIFIC_PID');
// let dayNum: string | null = urlParams.get('day');

// function preloadSounds() {
//   const dict: { [key: string]: string } = {
//     e: "[https://upload.wikimedia.org/wikipedia/commons/e/e7/E_morse_code.ogg](https://upload.wikimedia.org/wikipedia/commons/e/e7/E_morse_code.ogg)",
//     l: "[https://upload.wikimedia.org/wikipedia/commons/a/a8/L_morse_code.ogg](https://upload.wikimedia.org/wikipedia/commons/a/a8/L_morse_code.ogg)",
//     o: "[https://upload.wikimedia.org/wikipedia/commons/4/41/O_morse_code.ogg](https://upload.wikimedia.org/wikipedia/commons/4/41/O_morse_code.ogg)",
//     p: "[https://upload.wikimedia.org/wikipedia/commons/c/c6/P_morse_code.ogg](https://upload.wikimedia.org/wikipedia/commons/c/c6/P_morse_code.ogg)",
//     r: "[https://upload.wikimedia.org/wikipedia/commons/e/ea/R_morse_code.ogg](https://upload.wikimedia.org/wikipedia/commons/e/ea/R_morse_code.ogg)",
//     t: "[https://upload.wikimedia.org/wikipedia/commons/b/ba/T_morse_code.ogg](https://upload.wikimedia.org/wikipedia/commons/b/ba/T_morse_code.ogg)",
//     s: "[https://upload.wikimedia.org/wikipedia/commons/d/d8/S_morse_code.ogg](https://upload.wikimedia.org/wikipedia/commons/d/d8/S_morse_code.ogg)"
//   };
//   for (const letter in dict) {
//     const audio = new Audio();
//     audio.src = dict[letter];
//     audio.load();
//   }
// }

// preloadSounds();

// async function playLetter(state: { currentQuestion: { audio: string } }) {
//   const aooo = new Audio(state.currentQuestion.audio); // path to file
//   // console.log(state.currentQuestion.audio);
//   aooo.play();
//   // console.log("now playing: " + state.currentQuestion.answer);

// }

// const shuffleArray = <T>(array: T[]): T[] => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]]; // Swap elements
//   }
//   return array;
// }

// // longestpause = time of longest pau
// // numlongpause = # of pause > 10s with no interaction
// function sendDataToSheet(PID: string, dayNum: string, letters: string, flipsPerLetter: number, timePerLetter: number, roundsPerLetter: number, longestPause: number, numLongPause: number) {

//   const res_key: string[] = ["PID", "day","letters", "flipsPerLetter", "timePerLetter", "roundsPerLetter", "longestPause","numLongPause"];
//   const res_val: any[] = [PID, dayNum,letters,flipsPerLetter,timePerLetter,roundsPerLetter, longestPause, numLongPause];
//   const script_result: { [key: string]: any } = {};

//   res_key.forEach((k, i) => script_result[k] = res_val[i]);
//   // console.log("----------------------------")
//   // console.log(JSON.stringify(script_result));
//   // console.log("----------------------------")

//   const url = "  [https://script.google.com/macros/s/AKfycby78n3_Vy8VE3_lriDWixa4Qt2JCDwCHKuQMDV8Vko_yDcNrwm4KQ-U8EETHnPXp6-B/exec](https://script.google.com/macros/s/AKfycby78n3_Vy8VE3_lriDWixa4Qt2JCDwCHKuQMDV8Vko_yDcNrwm4KQ-U8EETHnPXp6-B/exec)";

//   fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'no-cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     redirect: 'follow', // manual, *follow, error
//     body: JSON.stringify(script_result)
//   })
// }

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    // todays puzzle
    // correctGuesses as array caused infinite update issue when game was open in multiple tabs. see #6
    correctGuesses: useStorage("correctGuesses", new Set([]) as Set<string>),
    allGuesses: useStorage("allGuesses", [] as Array<string>),
    answers: useStorage("answers", [] as Array<string>),
    pairanswers: useStorage("answers", [] as Array<string>),


    mostCommonStartingLetter: useStorage("mostCommonStartingLetter", '' as string),
    mostCommonStartingPair: useStorage("mostCommonStartingPair", '' as string),
    fourLetterWordCount: useStorage('fourLetterWordCount', 0 as Number),

    availableLetters: useStorage("availableLetters", "" as string),
    middleLetter: useStorage("middleLetter", "" as string),
    
    day: useStorage("day", 0 as Number),

    gameDate: useStorage("gameDate", epoch as Date),
    lastGameDate: useStorage("lastGameDate", new Date() as Date),
    // yesterdays puzzle
    yesterdaysAnswers: useStorage("yesterdaysAnswers", [] as Array<string>),
    yesterdaysAvailableLetters: useStorage(
      "yesterdaysAvailableLetters",
      "" as string
    ),
    yesterdaysMiddleLetter: useStorage("yesterdaysMiddleLetter", "" as string),
    theme: useStorage("theme", "light" as string),
    // don't need to be in local storage because they doesn't change
    pointsMessages: {
      1: "good",
      5: "nice",
      6: "great",
      7: "excellent",
      8: "amazing",
    } as { [key: number]: string },
  }),
  getters: {
    // TODO: move getMaxScore, getScoreLevels to state? compute once at startGame
    getMaxScore(): number {
      return this.answers.reduce((acc: number, word: string): number => {
        // @ts-ignore issue with this ref? says .calculatePoints is undefined here but not outside arrow funcs
        return acc + this.calculatePoints({ word });
      }, 0);
    },
    getMinScore(): number {
      // 19 4-letter words @ 1 point each, 1 pangram @ min 14 points.
      const minNumWords = 20;
      return minNumWords - 1 + 14; // 33
    },
    getScoreLevels(): Array<number> {
      // TODO: fix tests, getMaxScore 50 should produce dups
      // difficulty levels
      const levels = [
        // return [
        0,
        5,
        Math.floor(this.getMaxScore * 0.1),
        Math.floor(this.getMaxScore * 0.2),
        Math.floor(this.getMaxScore * 0.3),
        Math.floor(this.getMaxScore * 0.4),
        Math.floor(this.getMaxScore * 0.5),
        Math.floor(this.getMaxScore * 0.55),
        Math.floor(this.getMaxScore * 0.6),
      ].sort((a, b) => a - b);
      const uniqueLevels = incrementDups(levels);
      const minUniqueLevel = Math.min(...uniqueLevels);
      // ensure there are never any 2 levels with the same points requirements.
      // ensure the first level is 0.
      return uniqueLevels.map((l: number) => l - minUniqueLevel);
    },
    // as getter so result can be cached
    getCorrectGuesses(): Array<string> {
      return Array.from(this.correctGuesses);
    },
    clearCorrectGuesses(): void {
      this.correctGuesses = new Set([]);
    },
    getAllGuesses(): Array<string> {
      return this.allGuesses;
    },
    clearAllGuesses(): void {
      this.allGuesses = [];
    },
    getProgressIndex(): number {
      return (
        this.getScoreLevels.filter((v) => v <= this.getUserScore).length - 1
      );
    },
    getProgressPercentage(): number {
      const progressPercentages = [0, 20, 40, 50, 60, 70, 80, 90, 100];
      return progressPercentages[this.getProgressIndex];
    },
    getUserScore(): number {
      return this.getCorrectGuesses.reduce(
        (acc: number, word: string): number => {
          // @ts-ignore issue with this ref? says .calculatePoints is undefined here but not outside arrow funcs
          return acc + this.calculatePoints({ word });
        },
        0
      );
    },
    getColor(): string {
      return this.theme === "light" ? "white" : "#1c1b22";
    },
    getGameDate(): Date {
      // handle case where gameDate may still be string in localStorage from previous code
      return typeof this.gameDate === "string"
        ? new Date(this.gameDate)
        : this.gameDate;
    },
    getGameDateString(): string {
      return this.getGameDate.toISOString().split("T")[0];
    },
  },
  actions: {
    showMessage(args: object) {
      return ElMessage({
        duration: 2000,
        // change width? seems too wide in inspector but looks ok on device
        appendTo: "#app",
        customClass: "toast-message",
        grouping: true,
        showClose: true,
        ...args,
      });
    },
    submitGuess({ $t, guess }: { $t: Function; guess: string }) {
      this.allGuesses.push(guess);

      if (guess.length < 4) {
        return this.showMessage({
          message: $t("too short"),
        });
      }
      if (!guess.split("").includes(this.middleLetter)) {
        return this.showMessage({
          message: $t("missing middle letter"),
        });
      }

      if (!this.answers.includes(guess)) {
        return this.showMessage({
          message: $t("not in word list"),
        });
      }

      if (this.correctGuesses.has(guess)) {
        return this.showMessage({
          message: $t("already found"),
        });
      }

      this.correctGuesses.add(guess);
      const points = this.calculatePoints({ word: guess });
      if (this.isPangram({ word: guess })) {
        this.showMessage({
          type: "success",
          message: `Pangram! +${points}`,
        });
      } else {
        this.showMessage({
          type: "success",
          message: this.generatePointsMessage({ $t, points }),
        });
      }
    },
    // startGame({allAnswers }: {allAnswers: Array<Answer> }) {
    startGame({ days,allAnswers }: { days:number; allAnswers: Array<Answer> }) : {
      answers: string[];
      pairanswers: string[];
      mostCommonStartingLetter: string;
      mostCommonStartingPair: string;
      availableLetters: string;
    } {
      // const now = new Date();
      const now = new Date('2024-03-13T00:00:00'); // Set to March 13, 2024, at midnight

      this.day = days;

      // if it's the same day, don't restart the game
      // if (isSameDay(this.getGameDate, now)) return false;

      // set gameDate to clear guesses tomorrow
      this.gameDate = now;
      // new game so reset guesses
      this.correctGuesses = new Set([]);
      this.allGuesses = [];

      const { todaysAnswerObj, yesterdaysAnswerObj } = generateAnswerObjs({
        allAnswers,

        // allAnswers: allAnswers.filter(answer => answer.answers.length === 4),
        gameDate: this.gameDate,
        daysSinceEpoch: days
      });
      this.setYesterdaysAnswersAndLastGameDate({ yesterdaysAnswerObj });


      // set yesterday and todays answers and letters
      const { answers, availableLetters, middleLetter } = todaysAnswerObj;
      // this.answers = answers.filter(answer=>answer.length===4);

      this.fourLetterWordCount = answers.filter(answer => answer.length === 4).length;

      const startingLetterCounts: Record<string, number> = {};
      answers.forEach(word => {
          const startingLetter = word.charAt(0).toLowerCase();
          startingLetterCounts[startingLetter] = (startingLetterCounts[startingLetter] || 0) + 1;
      });


      const mostCommonStartingLetter = Object.keys(startingLetterCounts).reduce((a, b) => startingLetterCounts[a] > startingLetterCounts[b] ? a : b);
      this.mostCommonStartingLetter = mostCommonStartingLetter;


      // Determine the most common starting 2 letters
      const startingLetterPairs: Record<string, number> = {};
      answers.forEach(word => {
          const startingPair = word.substring(0, 2).toLowerCase();
          startingLetterPairs[startingPair] = (startingLetterPairs[startingPair] || 0) + 1;
      });

      let maxCount = 0;
      let mostCommonStartingPair = '';

      Object.keys(startingLetterPairs).forEach(pair => {
        if (startingLetterPairs[pair] > maxCount) {
          maxCount = startingLetterPairs[pair];
          mostCommonStartingPair = pair;
        }
      });
      this.mostCommonStartingPair = mostCommonStartingPair;



      // most common starting letter
      this.answers = answers.filter(word => word.length===4 && word.charAt(0).toLowerCase() === mostCommonStartingLetter);

      // most common starting pair
      this.pairanswers = answers.filter(word =>word.length===4 &&  word.substring(0, 2).toLowerCase() === mostCommonStartingPair);

      // this.answers = answers;
      this.availableLetters = availableLetters;
      this.middleLetter = middleLetter;


      return {
        answers: this.answers,
        pairanswers: this.pairanswers,
        mostCommonStartingLetter: this.mostCommonStartingLetter,
        mostCommonStartingPair: this.mostCommonStartingPair,
        availableLetters: this.availableLetters,
      };
    },
    setYesterdaysAnswersAndLastGameDate({
      yesterdaysAnswerObj,
    }: {
      yesterdaysAnswerObj: Answer;
    }): string {
      // note: must be run after gameDate is set and before answers, availableLetters, and middleLetter are set!
      // the algorithm used to pick todays and yesterdays answers may change.
      // e.g. https://github.com/ConorSheehan1/spelling-bee/issues/3
      // bug where yesterdays answers were always incorrect at the first of the month.
      // to avoid this, use todays answers from local storage as yesterdays answers if gamedate was yesterday
      if (differenceInDays(this.gameDate, this.lastGameDate) === 1) {
        this.yesterdaysAnswers = this.answers;
        this.yesterdaysAvailableLetters = this.availableLetters;
        this.yesterdaysMiddleLetter = this.middleLetter;
        return "local-storage-cache";
      } else {
        const {
          answers: yesterdaysAnswers,
          availableLetters: yesterdaysAvailableLetters,
          middleLetter: yesterdaysMiddleLetter,
        } = yesterdaysAnswerObj;
        this.yesterdaysAnswers = yesterdaysAnswers;
        this.yesterdaysAvailableLetters = yesterdaysAvailableLetters;
        this.yesterdaysMiddleLetter = yesterdaysMiddleLetter;
        this.lastGameDate = this.gameDate;
        return "cache-bust";
      }
    },
    calculatePoints({ word }: { word: string }): number {
      if (word.length === 4) return 1;
      if (this.isPangram({ word })) return word.length + 7;
      return word.length;
    },
    // If word has 7 unique letters, assume pangram. Handles case where it is a pangram from yesterday.
    isPangram({ word }: { word: string }): boolean {
      return new Set(word).size === 7;
    },
    // points per word, score is total of points.
    generatePointsMessage({
      $t,
      points,
    }: {
      $t: Function;
      points: number;
    }): string {
      const message = this.pointsMessages[points] || "awesome";
      return `${$t(`points.${message}`)}! +${points}`;
    },
    cellClassName({ row, columnIndex }: { row: any; columnIndex: number }) {
      const word = row[columnIndex + 1];
      if (word && this.isPangram({ word })) {
        return "pangram";
      }
    },
  },
});

// export type Question = {
//   question: string,
//   answer: string,
//   audio: string,
// };

// export type State = {
//   unansweredQuestions: Question[],
//   answeredQuestions: Question[],
//   currentQuestion: Question,
//   cardFlipped: boolean,
//   questionsInCurrentCycle: Question[],
//   flipsPerLetter: { [key: string]: number },
//   timePerLetter: { [key: string]: number },
//   roundsPerLetter: number,
//   longestPause: number,
//   numLongPause: number,
//   lastInteractionTime: number,
//   startTime: number,
// };

// export const useQuestionStore = defineStore<'questionStore', State>('questionStore', {
//   state: () => ({
//     unansweredQuestions: [], // Pool of questions to be shown to the user
//     answeredQuestions: [], // Questions that have been correctly answered
//     currentQuestion: {
//       question: 'Sample question',
//       answer: 'Sample answer',
//       audio: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/A_morse_code.ogg'
//     }, // Will be overwritten immediately
//     cardFlipped: false, // Whether to show the question or answer
//     questionsInCurrentCycle: [],
//     // for data tracking
//     flipsPerLetter: { E: 0, L: 0, O: 0, P: 0, R: 0, T: 0, S: 0 },
//     timePerLetter: { E: 0, L: 0, O: 0, P: 0, R: 0, T: 0, S: 0 },
//     roundsPerLetter: 0,
//     longestPause: 0,
//     numLongPause: 0,
//     lastInteractionTime: Date.now(), // To track pause times
//     startTime: Date.now(),
//   } as State),
//   getters: {
//     currentQuestion(state: State): string {
//       return state.currentQuestion.question;
//     },
//     currentAnswer(state: State): string {
//       if (state.cardFlipped) {
//         // console.log('now should play:' + state.currentQuestion.answer);
//         // Play audio here using a separate library
//       }
//       return state.currentQuestion.answer;
//     },
//   },
//   actions: {
//     setUnanswered(questions: any[]) {
//       this.unansweredQuestions = questions;
//       this.questionsInCurrentCycle = shuffleArray([...questions]); // Initialize with shuffled questions
//     },
//     setCurrentQuestion(question: Question) {
//       // Setting the question to be rendered
//       this.currentQuestion = question;
//       this.cardFlipped = false;
//     },
//     flipCard() {
//       let letter = this.currentQuestion.question;
//       // console.log(state.currentQuestion.question);
//       this.cardFlipped = !this.cardFlipped;
//       this.flipsPerLetter[letter]++;
//       const currentTime = Date.now();
//       const duration = (currentTime - this.lastInteractionTime) / 1000; // convert ms to seconds
//       this.timePerLetter[letter] += duration;
//       // Check for longest pause
//       if (duration > 10) {
//         this.numLongPause++;
//         if (duration > this.longestPause) {
//           this.longestPause = duration;
//         }
//       }

//       this.lastInteractionTime = currentTime; // Reset interaction time
//       // Data sending logic here (if needed)
//     },
//     cycleQuestions() {
//       if (this.questionsInCurrentCycle.length === 0) {
//         this.roundsPerLetter++;
//         // Data sending logic here (if needed)
//         this.questionsInCurrentCycle = shuffleArray([...this.unansweredQuestions]); // Reshuffle after cycle completion
//       }

//       const newQuestion = this.questionsInCurrentCycle.pop();
//       if (newQuestion) {
//         this.currentQuestion = newQuestion; // Get the next question
//       }

//       this.cardFlipped = false;
//     },
//   },
// });

