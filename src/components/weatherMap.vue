<template>
  <div class="map-container">
    <div class="map-title"></div>
    <div class="moo">
      <div class="map-image">
        <img src="../assets/illust02.png" alt="" />
      </div>
      <div class="time">
        <div class="zone">
          <div class="month singleTime">{{ month }}</div>
          <div class="day singleTime">{{ day }}</div>
        </div>
        <div class="week">{{ week }}</div>
      </div>
    </div>
    <Echart :options="options2" v-if="!isItemActive"></Echart>
    <Echart :options="options" v-else></Echart>
    <div class="heatMap-trigger">
      <button
        class="left trigger-item"
        :class="{ active: isItemActive }"
        @click="isItemActive = !isItemActive"
      >
        今天天气
      </button>
      <button
        :class="{ active: !isItemActive }"
        class="right trigger-item"
        @click="isItemActive = !isItemActive"
      >
        今天气温
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, toRefs } from 'vue';
// import BaseEchart from '@/base-ui/echart';
import Echart from '../base-ui/echart';

import { getChinaWeatherDate } from '@/api';
import xml2jsonFn from '@/utils/xml2json';
import { convertData } from '../utils/convert-data';
import { mapWeatherData, mapTeamplateData, TeamplateData, WeatherData } from '../utils/mapMapData';

import weatherImage from '../assets/weather';

interface IState {
  WearherDateArr: WeatherData[];
  TeamplateDateArr: TeamplateData[];
  month: number;
  day: number;
  week: string;
  isItemActive: boolean;
}

const state = reactive<IState>({
  WearherDateArr: [],
  TeamplateDateArr: [],
  month: 0,
  day: 0,
  week: '',
  isItemActive: true,
});
onBeforeMount(async () => {
  let { data } = await getChinaWeatherDate();
  data = data.replace(/[\r\n]/g, ''); // 去掉换行符

  // state.WearherDate = xml2jsonFn(data);
  data = xml2jsonFn(data);
  data = data.china.city;
  console.log(data);
  state.WearherDateArr = mapWeatherData(data);
  state.TeamplateDateArr = mapTeamplateData(data);
});

const nowTime = new Date();
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
state.month = nowTime.getMonth() + 1;
state.day = nowTime.getDate();
state.week = weekday[nowTime.getDay()];

const { month, day, week, isItemActive } = toRefs(state);

const options = computed(() => {
  return {
    // backgroundColor: ,
    title: {
      text: '各省首府天气',
      left: 'center',
      textStyle: {
        color: 'purple',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2];
      },
    },
    geo: {
      top: 120,
      left: 70,
      map: 'china',
      roam: 'scale',
      itemStyle: {
        normal: {
          areaColor: 'rgb(140, 173, 238)',
          borderColor: 'rgb(9, 54, 95)',
        },
        emphasis: {
          areaColor: 'rgb(10, 105, 187)',
        },
      },
      label: {
        normal: {
          show: !0,
          fontSize: '8',
          color: 'rgba(0,0,0,0.7)',
        },
      },
    },
    series: [
      {
        name: '天气',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(state.WearherDateArr),
        symbol: (value: any) => {
          console.log(value);
          value = value[2];
          switch (value) {
            case '晴':
              return weatherImage.sun;
            case '雨':
              return weatherImage.rain;
            case '阵雪':
              return weatherImage.whileSnow;
            case '多云':
              return weatherImage.clouds;
            case '多云转晴':
              return weatherImage.cloudsToSun;
            case '晴转多云':
              return weatherImage.sunToClouds;
            case '阴':
              return weatherImage.cloudy;
            case '小雨转多云':
              return weatherImage.rainToclouds;
            default:
              break;
          }
        },
        symbolSize: 16,
        // emphasis: {
        //   itemStyle: {
        //     borderColor: '#fff',
        //     borderWidth: 1
        //   }
        // }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false,
        },
      },
    ],
  };
});

const options2 = computed(() => {
  return {
    tooltip: {
      triggerOn: 'click',
      formatter: function (e: any) {
        return 0.5 == e.value
          ? e.name + '：有疑似病例'
          : e.seriesName + '<br />' + e.name + '：' + e.value;
      },
    },

    visualMap: {
      min: -10,
      max: 40,
      itemWidth: 10,
      itemHeight: 89,
      left: '20',
      bottom: '70',
      text: ['高', '低'],
      textStyle: {
        color: '#666666',
        fontSize: 13,
      },
      inRange: {
        color: ['#5b77f5', ' #81c994', '#d8d84d', '#bf441f'],
      },
      outOfRange: {
        show: false,
      },
    },
    geo: {
      top: 120,
      left: 70,
      map: 'china',
      roam: 'scale',
      itemStyle: {
        normal: {
          areaColor: 'rgb(140, 173, 238)',
          borderColor: 'rgb(9, 54, 95)',
        },
        emphasis: {
          areaColor: 'rgb(10, 105, 187)',
        },
      },
      label: {
        normal: {
          show: !0,
          fontSize: '8',
          color: 'rgba(0,0,0,0.7)',
        },
      },
    },
    series: [
      {
        name: '气温',
        type: 'map',
        geoIndex: 0,
        data: state.TeamplateDateArr,
      },
    ],
  };
});
</script>

<style scoped lang="less">
/* .bar-echart {
  background-color: #030303;
} */
.map-container {
  position: relative;
  // background-color: rgb(110, 59, 33);
  font-size: 10px;
  text-align: center;
  padding: 16px;
  background-image: url('../assets/map-bg.jpeg');

  .heatMap-trigger {
    // position: absolute;
    width: 100%;
    height: 50px;
    display: flex;
    .trigger-item {
      flex: 1;
      text-align: center;
      line-height: 50px;
      color: #b3b3b3;
      border: none;
      border-radius: 6px;
      background-color: white;
      font-size: 18px;
      cursor: pointer;
      &.active {
        color: white;
        background-color: #00aaf5;
      }
    }
  }
  .moo {
    top: 30px;
    left: 10px;
    position: absolute;
    display: flex;
    width: 120px;
    flex-direction: column;
    // background-color: #3e3e3e;
    .map-image {
      width: 80px;
      margin: 0 auto;
      // padding: 0;
      img {
        position: relative;
        width: 100%;
        // position: absolute;
        top: 6px;
      }
    }
    .time {
      background-color: white;
      display: flex;
      flex-direction: column;
      width: 100%;
      color: #00aaf5;
      padding-bottom: 4px;
      .zone {
        display: flex;
        padding: 4px;
        .singleTime {
          flex: 1;
          margin: 2px;
          height: 46px;
          line-height: 46px;
          font-size: 1.9rem;
          border: rgba(0, 0, 0, 0.1) solid 1px;
          border-radius: 4px;
        }
        .month::after {
          position: absolute;
          content: '月';
          top: 60px;
          font-size: 10px;
        }
        .day::after {
          position: absolute;
          content: '日';
          top: 60px;
          font-size: 10px;
        }
      }
      .week {
        font-size: 1rem;
      }
    }
  }
}
</style>
