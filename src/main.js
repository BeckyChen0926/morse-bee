import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import App from "./App.vue";
import { i18n } from "./i18n";
import { useMainStore } from "./store";

// import questions from './data/questions'; // Flashcard questions
// import { useQuestionStore } from './store'; // Import your Pinia store

// import allAnswers from './data/allAnswers.json'; // Morse code game answers

// need to add vuex dependecy to game package.json

// og
// createApp(App).use(createPinia()).use(ElementPlus).use(i18n).mount("#app");

const pinia = createPinia();
const app = createApp(App);

app.use(useMainStore);
 
app.use(pinia);
app.use(ElementPlus);
app.use(i18n);

console.debug('hello');

// Initialize Flashcard Data
// const questionStore = useQuestionStore(); 

// questionStore.setUnanswered(questions); 
// questionStore.init(); 

// Mount the app
app.mount('#app');



