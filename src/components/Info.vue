<script setup lang="ts">
import Support from "./Support.vue";
</script>

<template>
  <div class="info-dialog">
    <h3>Create 8 four-letter words using letters from the hive</h3>

    <ul>
      <li>Words must contain 4 letters.</li>
      <li>There are 8 target four-letter words.</li>
      <li>Words must include the center letter (marked yellow).</li>
      <li>All letters can be used more than once.</li>
    </ul>

    <h3>Find all 8 words starting with "po" to complete the yellow progress bar up to 100%</h3>

    <ul>
      <li>Press "Enter" button to submit a word.</li>
      <li>Press "Delete" button to delete a letter.</li>
      <li>Press "Shuffle" button in the middle to shuffle letter placement in the hive.</li>
    </ul>

    <p>This game is modified from the New York Times Spelling Bee game.</p>

    <!-- <ul>
      <li>{{ $t("helpPointsRule1") }}.</li>
      <li>{{ $t("helpPointsRule2") }}.</li>
      <li>{{ $t("helpPointsRule3A") }}. {{ $t("helpPointsRule3B") }}!</li>
    </ul> -->
<!-- 
    <h3>Support</h3>
    <Support /> -->
<!-- 
    <h3>{{ $t("AboutGame") }}</h3>
    <ul>
      <li>
        {{ $t("AboutGameText") }}
      </li>
      <li>
        {{ $t("InspirationSpellingBee") }}
        <el-link
          type="primary"
          href="https://www.nytimes.com/puzzles/spelling-bee"
          target="_blank">
          New York Times Spelling Bee
        </el-link>
      </li>
      <li>
        {{ $t("WordlistSource") }}
        <el-link
          type="primary"
          href="https://github.com/en-wl/wordlist/blob/master/alt12dicts/2of4brif.txt"
          target="_blank">
          Wordlist
        </el-link>
      </li>
    </ul>

    <h3>{{ $t("Bugs") }}</h3>
    <ul>
      <li>
        {{ $t("BugText") }}
        <el-link
          type="primary"
          href="https://github.com/ConorSheehan1/spelling-bee/issues"
          target="_blank"
          >GitHub</el-link
        >
        {{ $t("BugTextEmail") }}
        <el-link type="primary" :href="`mailto:${email}`" target="_blank">{{
          email
        }}</el-link>
      </li>
    </ul> -->
  </div>
</template>

<style scoped lang="scss">
.info-dialog {
  text-align: left;
}
</style>
