import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import App from "./App.vue";
import { i18n } from "./i18n";
// import store from './store'; // Vuex store (for flashcard state management)
// import questions from './data/questions'; // Flashcard questions
// import allAnswers from './data/allAnswers.json'; // Morse code game answers

// need to add vuex dependecy to game package.json

// og
createApp(App).use(createPinia()).use(ElementPlus).use(i18n).mount("#app");

// const pinia = createPinia();
// const app = createApp(App);
 
// app.use(pinia);
// app.use(store);
// app.use(ElementPlus);
// app.use(i18n);

// // Initialize Flashcard Data
// store.commit('setUnanswered', questions); // Commit flashcard questions to Vuex
// store.dispatch('init'); // Dispatch any initial Vuex setup actions

// // Mount the app
// app.mount('#app');



