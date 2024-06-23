<script setup lang="ts">
import { ref, computed } from "vue";
import { useMainStore } from "../store";
import allAnswers from "../../data/allAnswers.json";


const store = useMainStore();
const showRanking = ref(false);

let possibleAnswers = 0;

let days={
  1:89,
  2:30,
  3:23
}

let urlParams = new URLSearchParams(window.location.search);
let pid = urlParams.get('PROLIFIC_PID');
let dayNum = urlParams.get('day');

let answers,pairanswers,comlet,pair,letters = store.startGame({ days: days[dayNum]-1, allAnswers });
possibleAnswers = letters.pairanswers;


const progressPercentage = computed(() => {
  const totalQuestions = store.pairanswers.length;
  const correctAnswers = store.correctGuesses.size;
  if (correctAnswers == 0) {
    return 0;
  }
  return Math.ceil((correctAnswers / totalQuestions) * 100);
});

</script>

<template>
  <div class="row" @click="showRanking = true">
    <strong class="rank-level">
      {{`Find ${possibleAnswers.length} four-letter words starting with "${letters.mostCommonStartingPair
}"` }}
    </strong>
    <!-- can't use bl-yellow directly, need to pass hex in here -->
    <el-progress
      :percentage="progressPercentage"
      :stroke-width="20"
      color="#fce303"
      :format="() => `${progressPercentage}%`" /> <!-- Include percentage text -->
      <!-- :format="() => store.getUserScore" /> -->
      <!-- :percentage="store.getProgressPercentage" -->

  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/_variables";

.row {
  margin: 20px;
}

.ranking-dialog {
  text-align: left;
}

html.dark .row strong {
  color: $bl-grey;
}

@media only screen and (max-width: 700px) {
  .row {
    margin: 10px;
  }
}
</style>
