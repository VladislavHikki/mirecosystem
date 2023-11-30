<template>
  <div class="admin container">
    <div class="chars">
      <div class="char">
        <div class="char__background">
          <div class="char__body">
            <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
          </div>
          <div class="char__content">
            <div class="char__title">
              <h3>Новые ресурсы</h3>
            </div>
            <div class="line"></div>
            <div class="statistics">
              <span class="statistics__announcement"> Всего ресурсов: {{ stats.resourceTotal }} </span>
              <!--                            <button class="statistics__button">Статистика</button>-->
            </div>
          </div>
        </div>
      </div>
      <div class="char">
        <div class="char__background">
          <div class="char__body char__body_blue">
            <Chart type="line" :data="chartDataUsers" :options="chartOptionsUsers" class="h-30rem" />
          </div>
          <div class="char__content">
            <div class="char__title">
              <h3>Новые пользователи</h3>
            </div>
            <div class="line"></div>
            <div class="statistics">
              <span class="statistics__announcement"> Всего пользователей: {{ stats.usersTotal }} </span>
              <!--                            <button class="statistics__button">Статистика</button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--        <div class="ads-from-categories">
            <div class="ads-from-categories__body">
                <div class="ads-from-categories__title ads-from-categories__text">
                    <h2>Объявления из категории</h2>
                </div>
                <div class="ads-from-categories__content">
                    <div class="ads-from-categories__list ads-list">
                        <div class="ads-list__title ads-from-categories__text">
                            <h3>Корпоративные каналы</h3>
                        </div>
                        <div class="ads-list__subtitle">
                            <div class="lines"></div>
                            <span class="subtitle-name ads-from-categories__text">Гибридные</span>
                            <span class="ads-count">(3 объявления)</span>
                        </div>
                        <div class="ads-list__subtitle">
                            <div class="lines"></div>
                            <span class="subtitle-name ads-from-categories__text">Дайджестные</span>
                            <span class="ads-count ads-from-categories__text">(3 объявления)</span>
                        </div>
                    </div>
                    <div class="ads-from-categories__list ads-list">
                        <div class="ads-list__title ads-from-categories__text">
                            <h3>Региональные каналы</h3>
                        </div>
                        <div class="ads-list__subtitle">
                            <div class="lines"></div>
                            <span class="subtitle-name ads-from-categories__text">Новости регионов</span>
                            <span class="ads-count">(3 объявления)</span>
                        </div>
                        <div class="ads-list__subtitle">
                            <div class="lines"></div>
                            <span class="subtitle-name ads-from-categories__text">Новости городов</span>
                            <span class="ads-count ads-from-categories__text">(3 объявления)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStatisticStore } from '~/store/statistics';

const statisticStore = useStatisticStore();
await statisticStore.getStatistic();
const stats = await statisticStore.getStats;

onMounted(async () => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();

  chartDataUsers.value = setChartDataUsers();
  chartOptionsUsers.value = setChartOptionsUsers();
});

const chartData = ref();
const chartOptions = ref();

const chartDataUsers = ref();
const chartOptionsUsers = ref();

const setChartData = () => {
  return {
    labels: stats.statistics.map((stat) => stat.DayDate),
    datasets: [
      {
        label: 'Ресурсы',
        data: stats.statistics.map((stat) => stat.resources.count),
        fill: false,
        borderColor: '#FFFFFF',
        tension: 0.4,
      },
    ],
  };
};
const setChartDataUsers = () => {
  return {
    labels: stats.statistics.map((stat) => stat.DayDate),
    datasets: [
      {
        label: 'Пользователи',
        data: stats.statistics.map((stat) => stat.users.count),
        fill: false,
        borderColor: '#FFFFFF',
        tension: 0.4,
      },
    ],
  };
};
const setChartOptions = () => {
  return {
    maintainAspectRatio: true,
    aspectRatio: 5,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          color: '#FFFFFF',
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          color: '#FFFFFF',
        },
        min: 0,
        max: Math.max(...stats.statistics.map((stat) => stat.resources.count)) + 5,
      },
    },
  };
};
const setChartOptionsUsers = () => {
  return {
    maintainAspectRatio: true,
    aspectRatio: 5,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          color: '#FFFFFF',
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF',
        },
        grid: {
          color: '#FFFFFF',
        },
        min: 0,
        max: Math.max(...stats.statistics.map((stat) => stat.users.count)) + 5,
      },
    },
  };
};
</script>

<style lang="scss">
.chars {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  // flex-wrap: wrap;
  // align-items: center;
  // justify-content: space-between;
}
.char {
  // max-width: 800px;
  // width: 50%;
  width: 800px;
  padding-top: 30px;
}
.char__background {
  max-width: 800px;
  width: 100%;
  padding: 0px 20px 20px 20px;
  background-color: #ffffff;
  border-radius: 7px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}
.char__body {
  height: 10rem !important;
  width: 47.5rem !important;
  background-color: #50aa54;
  border-radius: 7px;
  position: relative;
  top: -30px;
}
.char__body_blue {
  background-color: #10b7cb;
}
.char__title {
  font-size: 18px;
  line-height: 24px;
  color: #6c6c6c;
}
.line {
  margin: 20px 0;
  height: 1px;
  width: 100%;
  background-color: #bbbbbb;
}
.statistics {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.statistics__announcement {
  font-size: 15px;
  line-height: 20px;
  color: #6c6c6c;
}
.statistics__button {
  margin: 0;
  padding: 10px 30px;
  background-color: #9b9b9b;
  font-weight: 400;
  line-height: 20px;
  font-size: 15px;
  color: #ffffff;
}

// Объявления из категорий

.ads-from-categories {
  margin-top: 50px;
}
.ads-from-categories__body {
  max-width: 800px;
  width: 100%;
  border-radius: 7px;
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}
.ads-from-categories__title {
  h2 {
    font-size: 24px;
    margin: 0;
  }
}
.ads-from-categories__text {
  font-size: 18px;
  line-height: 31px;
  color: #000000;
}
.ads-from-categories__content {
  margin-left: 20px;
}
.ads-from-categories__list {
  margin: 15px 0;
}
.ads-list__subtitle {
  display: flex;
  align-items: baseline;
  margin: 10px 0;
}
.lines {
  width: 25px;
  height: 25px;
  border-left: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
}
.subtitle-name {
  margin: 0 10px;
}
.ads-count {
  color: #bbbbbb;
}
@media (max-width: 1630px) {
  .chars {
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }

  // .char {
  //     max-width: none;
  //     width: 100%;

  //     .char__background {
  //         margin: 0 auto;
  //     }
  // }
}
@media (max-width: $large) {
  .chars {
    align-items: flex-start;
    overflow-x: auto;
  }
}
@media (max-width: $x-small) {
  main {
    align-items: normal;
  }
}
</style>
