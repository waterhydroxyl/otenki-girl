<template>
  <div class="map-container">
    <div class="map-title"></div>
    <div class="moo">
      <div class="map-image">
        <img src="../assets/illust02.png" alt="" />
      </div>
      <div class="time">
        <div class="zone">
          <div class="month singleTime">12</div>
          <div class="day singleTime">9</div>
        </div>
        <div class="week">Thusday</div>
      </div>
    </div>
    <Echart :options="options"></Echart>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive } from 'vue';
// import BaseEchart from '@/base-ui/echart';
import Echart from '../base-ui/echart';

import { getChinaWeatherDate } from '@/api';
import xml2jsonFn from '@/utils/xml2json';
import { convertData } from '../utils/convert-data';
import { mapWeatherData, WeatherData } from '../utils/mapWeatherData';

import weatherImage from '../assets/weather';

// var iconGD =
//   'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAACZCAMAAACi9qAcAAADAFBMVEVHcEz/c0D/bj7/d0T/c0H/fEj/c0D/dD//ckH/c0D/XTD/c0D/cj7/c0D/bzn/cj//fFL/ZC7/ckD/cT//TAb/TAr/c0H/c0H/cz//c0D/ZjH/cT//cD3/cT7/Wx7/SgT/c0H/ckD/UA3/SgT/UA7/UQ77Vxn/c0H/TAb/TAf/YCT/YSf/WBf/c0L/ckD/c0H/c0D/ckD/ckD/ckD/SQP/SgP/Twv/UhH/YSX/TAj/UAz/aTL/XyT/UxL0TxL/ckD/bDb/cUD/SAP/SAH/ZzH/Xyb/Tg3/dUL/c0H/ckH/Tgj/aDP/XSD/WRn/WBj/ZzL/Vhb/c0H/cAH/ewH/awD/bQH+ckD/bAD/bgD/iQL/igD/Tgn/UQz+bwD/dAD/Swf/jwD/cgH/cwD/VhT/jgH/eQD/dgL/gAH/eAD/fAH/dwH/dQD8cD7/kwH/lwD+fQD/XB//gwD/ggD/fgD/fwD/hQL/TQb/gQD/hwD/hgH/Ug7/jAD/XiL/UxH/agD/Twz/YSX/VBP/bTn/kQP+SgT/ZSz/Vxf/UQ//hQD/c0L/aDL/Whz7bj3lWiz/SQH9cUD/lgD3azr/lAD0ZzjnXC7/YynxZTb/Zy//XB3/bjv9cT//cD7/mAD/mQDsYDLvYzT5bDz/ZCv/WRn/mgH2aTn/azX/nQD/mwDrXjD/bDf4ajr+Tw7/WBn/nAD/ajX/SwP/YSj+UQz5bTzpXS/zZjfuYTP+VhbxYjD+ZjH+XyP6WyHnWSn+XB//ckD/nQP/cDz9UxH+aTTyVR3+YCf6aDTvUhf+UQ/9UA36UxTpXCr8ajf3Vxv8aAf8bTr1ZTL+ZS3oViTsXizxXiv1WyT+YQ3sViDwWiX6YCj0Uhb9WRr/YCP3ZxXrXiX6Zg78bAX7ZC7uYCL0YRXsWCb9cgn+Yib2URHrUxz7eBf8cBbwYR73Yg7+hxj/kw36URD2bDT+bz78eyX2YSz4WA7zbCj+fRD6dCr/bA3/jhH+Zyn/jAf/ZhHwZyf+VhH/mAT+ZB3/cEAoe34JAAAAUXRSTlMAySAP9gq+MKBCATdA8RyGBhXest4crqMnkwzsUM6xzMD1ZrQlRv+mpIiFzcBoSObHt1zW8lCDktroPsVQz/tujNLA1vIzbj2Zuzls8leYq/Rz2zmKAAAMQUlEQVR42u3cCVAUVxoHcNCQLKOCcogHioqmvI33ES3LM5s77YEkG93gHY8oXjF4RKPEoIOKICJGQESjeKxcChEjCAyCIGgg6nIohwcgYrw1bHa/9143r5sZbIbeN+5W9b8KLUur/Pn5n55mXr9npkbN/0je4GrlDRWv4lW8ilfxKl7Fq3gVr+JV/KtOc4cm9ftzjWqluVl90sShOUO7LdcM9KzSpBlny0xv8TrHgZ6hneNet2Bnh7xmacYklh05DutZ2RnqLV/jOKpnYyd6ZnaiZ2KneiZ2qmdnl9e3ea/ToK7OTnZ2Q4fa2Tk5dx3U6b02snZWemqX13fu1NVu48aN//g7yooVK/4G+fbbzz+369qps4ydjZ7Y5fWaYYPttm41QIds2uThYTd4mEbeTvTM7Ib1nbsN3UroYKd0avdYs2bN0G6dDdnZ6VtzhtJWUmNNl9FbCV1/7JS+fv2MGTN6dpGMv01bzlBa/5fwjc3lJq8ZOGYrihwd8JDvRwzXyE3evLEZM73U3sVJho7thI71348YJtGzs1O9Ybu9M8D1yk7tenRIaGh7e7GeoZ3q9e2a8QP0yi5HP3o0NHTLJ+M1Ij0zO9Xr2+1HG1F2EX3LlsWLe9qL9AztVC+1DxxgZNkJHRIQELD4g+FSPbUz09M7ek03gc7b5csO9FCejtJdQ+/m2dmpntotnBtUdgjQSVa3t6B6hnbQvyWxt3Aysuz69NWr43q0kOjfaszw+0Bqtx9TJ12nA3tCArJXV5+cMePkSTFdYo+LG2JF9fiugJm+JbXb1VH2iE2A1yXoPHJyXjx58uJFTjWxh/J2Kf2f69aJ9C2RnX1ajKmj7Ed0EbqInNnuz7/68ce9e/f/9NOxY9ufP7pz7WgowPXpKEOgOaaMhZNBesSRIxHVT9wX7tixY/v2ryj/4C+/3H30J9DjKR2yDufEiR4WprRrnPXpEYiemrPoiw0LIZS/H/EPAv/g0zsB8fGL4+nYk4h95872GhPiu+mVHegRqak57l9ANmwgesLfi/jHEP/gwX/dBj1tDKFDPLubzj5Qb+wwdKDPmTlzJtETPui30+4Q/p34uNr0ffs8PYebym4/QK8xYI8o+WzVqlUCX687pPrAf/onLfsJQoeMtTJR4UdL6VAYXeqRnCWfQbCe8ncYqv7+23FJpaXisXvu2pX1tmlqP772NQZVJmPlyk8/pfyXV7+iNElKh2x+3zSlkY4d20u+WQl6yn9J9fF1pzSJp0MwffOusY1MUJqu0iv7piMRYF/+Dejp8GWrf/dZqZQOXx+zxw+jdGTXwdhTZ/+wfDnhy3eHVB/0O2lj0BekKfPBO4ntuk261NTKEnd39x+QnvLlq3/3WVYWHTvk+HHmr9mBkrtHD7iRqSz8eskS0GP+yvpX/2lWVpaYfvzAAUfGeCfJPbsuVVdZMOdr0BO+UdWvyMqKFdEh7djauxC6YNclVD5YOmeOwDey+vdjd8VuRiH0w4e/s2SKdxaPPUGnq6ycvXTZMp5vbPX3PouNjU1EYyf07w7bMr3GS77L0yUkVGYsWgr6ZUhvfPUrrscm1tAhu3ezvNYPEn+kkQD2BxO/XAR8pG9I9R8nJiYiumDfbc0Qbyf+5hrslYUTvwS9mO9uTPXvJiM8T4ectWFnHyeir0+oRoOfCHo8fMoHfZ3V30D5uDv3kxNFdMg4ZvhulA74hPM3CwFP+EZUf6Go+neT09MPU/qePex6M8JDar85a9Ysym9Q9R8nAx7RiX3PKGbXGtGHYNUnAV8wdy7VN6z6FcnpmYDHdMiZM1aM8B/Sz+9Ork84f/6m21zQU77x1YcAPpPSvbz6McIPBjpvh5y/+WDevHmEr6D69wGfien/BjqsRbGqPD92rIfBl8+eTfhKql8Rnpm5mx87BzFnY9d8AnTBDvirhfNnE76S6m8A/FlCx+moUab8S6204tdZRR9Wo9bcnDZ/PuE3oPr0juFxuLYq0AUaw4e/Q2hVW1FPPFcrTfk7SoGO8G+ev/pg2jTCV1b9+4B3AbqQ3uRva1pboQzfia7MYHz5dF6vqPoEz9H0YoIfVLMyc/TamxeuXi2YPp3wlVW/wke7wEWkt2aC/6hmeeMawqdkuE3HfIXVfw74bSL8X5ng29PlDYwvdHNzQ3ql1fcJkeBbssELdAE/wQ3z667+onpV/16kNlCE78sE37NmGfLalguAd50wYQLS6/FnGVf9ez4SfAc2eGFRKT7g2oUL51LAjvlKq28avLAeFh/wM8K78nql1b+HLzeM8e2FZcj4eIwvnEr0CqsP+EjAezHtPOCBjuyA/xnjp1K+XPWX1l19X3yt9GJ7tfkI6DhxgD93LiVjKtbXv/rLDFZ/OcUzvM53J3S0HIbx5a6ulC+uvtwdg7T6jyie4TtsJ2In+F/PpRS5QkCvsPq3KZ7hvU0Xgc7jUya7Yr7C6j/2JS9YubtKhffzNSuocXGAP3dr8mTM16/+NGOq/5BMXv5+XlE0H/Br7knrCD5jMuYrq767P8LTy3xHRisMPfg196RSwP967lb5ZKxXVv3bwb7h4ndYc1afHgAdJynpCuBzU6ZMQXpl1X/oHxZC8ew+PfiwZuEa4X/LvZUxBfEVVB8SHB0muSXuxwhvVbPmXnrlCsIXAR74Sqp/OzjaJ1KMZ7aM34Nfc9+3E/BIPwnrjar+RGn1Hwb7Su7L2C1LdRfW3LOu4NHnlmO9guo/ivH3lVTemhl+nLDmvm/fdcAX5+ZOmkT5MtU32J2HMdFhkVrUGvb78IYAHeyeWVnXr/x++bfc7HLQ0+4YXf3bQcHStygbM3bpzj+lAfjrgC/Ozl2L9A2u/h/QGvR9lAvz1kAaeWI7JBbpi4uzizC+gdW/EwQXSknlmT750R7TN8fGYvzl4uzsDKI3vvqQS3jworsyWzOWsUT0zTX6YtDj4jSo+n/oDd7SjGl6kAdMQJ+MR386u2wt4htf/Vl5h8jgtzG+yNMM5x91SEyMTb74+6lLaaezi5De+OrfiaoZvNAaR8Z4zdv8UxqJicnJF08h/em8tcA3tvolaXqDN2f+jFxT/gGT4wew/rKgN7L6JZeQXXpb09SMeT4WHnVIT0++ePHUJaKX8OW7A3ahNC70Mw/2aTRWeMCE6IOQvkiq1+dLu5OXhu2S0jQzyWOh72M6JDMzPdw3+lTMoShv7zKw17v6eX5RQaTwosGPZIqmr1nhUYfMzPDwMF6fn7G2nt0pucHboTT0/amDiR7ktmoLdEhVJgT0wTFBUX7e3lAdHJnLZl6an59grymNV1taGsZxRPSzKFXaEND7E31+wVrZ6hfe8BbmjgtPL/EmizWm7wmsqqrSakN8fP2hOaCX408tLPP29jtkwG5typ0LtuRRh8DAwG0LiD7okB/m59Vd/bwbQI8S2c8IdluNSfeMtOMfF3BxAX0k6IPx8CGnywoMVb+gLM0b22OCBTt9a7UwM2la9Ed0Lw70ZPboZQt88EPyy/Iy6PAL84pg5hA8dnR9j5TY+7dg75Xuk7KyAToE6QO1Wp8wGD7lo6Tl59+4kZ8PAydyTIexh4XD8h90RrDb6O2TYr9Dzao/f5XjQL8gMpLnQ/fBT0PlmI7Hjm8KvIS5y+xQY7Q3sB3HB1dHi/jR4Ef/APgfiIryQ4GfwQ1wJPcNg7bTyqC0k9kbyGxXpi0P8AJ+IPBDgO/rj/wxQRAwgxoSg+T+vjwdKkMfULGV2ZXJcD+sNScENR9PH/mj4R8gCsCjkRwKg+m0Mpy1zH5YpjuRHZtRPc8PCfcJC/PFiY4GNEoYyEME+hlOSDNHmZ3IjPeAW3XgJNNHfi28esUJD4kM0YIc0cVj72Alswec/e77kR2F5gvjX7BAC4mEL/IzgRM5pXccKb/7nv25B1YtOY6+cpEf/QeIEghwkCM6TUsrmXMPTHXihGU7ThQXnG0uGLwN/4jbQi4xJO0sZU+cMN1ZH46j6O8QpAsNVzujHBWc9cHilJXe73KSeNWEq5V3eys4ZYXV+TatrPtwsulj3UrB+TZMTxZ6p7XNy+Q2rd9RcrIQ+zOdWvVysDEId+jVisGZTgxO02rSz9qhr7mNTZ8+NjbmfR2s+zVhcJoWq3PMNLV/rTHuHDP1BLlXc3afemriqzmvUj0p9NWc0aqejqviVbyKV/EqXsWreBWv4lW8iv8/yH8AZHfK5G5qypIAAAAASUVORK5CYII=';

// const props = withDefaults(
//   defineProps<{
//     title?: string;
//     mapData: IDataType[];
//   }>(),
//   {
//     title: '',
//   },
// );
interface IState {
  WearherDateArr: WeatherData[];
}

const state = reactive<IState>({
  WearherDateArr: [],
});
onBeforeMount(async () => {
  let { data } = await getChinaWeatherDate();
  data = data.replace(/[\r\n]/g, ''); // 去掉换行符

  // state.WearherDate = xml2jsonFn(data);
  data = xml2jsonFn(data);
  data = data.china.city;
  console.log(data);
  state.WearherDateArr = mapWeatherData(data);
  console.log(state.WearherDateArr);
});

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
</script>

<style scoped lang="less">
/* .bar-echart {
  background-color: #030303;
} */
.map-container {
  position: relative;
  background-color: rgb(110, 59, 33);
  font-size: 10px;
  text-align: center;
  background-image: url('../assets/map-bg.jpeg');

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
