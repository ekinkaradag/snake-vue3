<template>
  <div class="container">
    <div class="score-area score">
      {{ score >= 0 ? "Score:" : "" }}
      <code v-if="score >= 0" class="score-value">{{ score }}</code>
    </div>
    <div class="game-area">
      <v-grid />
    </div>
    <div class="score-area scoreboard"></div>
  </div>
</template>

<script lang="ts">
import VGrid from "@/components/Grid.vue";

export default {
  name: "Playground",
  components: {
    VGrid,
  },
  props: {
    score: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style lang="postcss" scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  color: white;
  width: 100%;
}

.score {
  flex: 1;
  font-family: "Courier", monospace;
  float: left;
  text-align: left;
  color: rgb(0, 199, 0);
  text-shadow: 1px 1px 1px darkgreen, -1px 1px 1px darkgreen,
    1px -1px 1px darkgreen, -1px -1px 1px darkgreen, 0 0 30px lightgreen,
    0 0 30px lightgreen;
}

.scoreboard {
  flex: 1;
  float: right;
  text-align: right;
}

.score-area {
  font-weight: 900;
  font-size: 40px;
}

.score-value {
  vertical-align: middle;
}

.game-area {
  flex: 0;
  text-align: center;
  width: inherit;
}
</style>
