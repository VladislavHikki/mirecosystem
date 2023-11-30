<template>
  <section>
    <h2 class="card_h">Топ-20 лидеров</h2>
    <div class="franchisingLeaders-cards">
      <div class="franchisingLeaders-card_container" v-for="(index, value) in leaderFranchisingCardCount" :key="index">
        <CardsFranchising :data="leaderFranchisingCardCount" :showIndex="true">
          {{ value + 1 }}
        </CardsFranchising>
      </div>
    </div>
  </section>
</template>

<script setup>
const leaderFranchisingCardCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
</script>
