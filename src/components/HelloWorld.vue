<template>
  <Echart :options="option" ref="echart"></Echart>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue';

import { getChinaWeatherDate } from '@/api';
import xml2jsonFn from '@/utils/xml2json';

import Echart from '../base-ui/echart';
// import request from '@/api/request';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    Echart,
  },
  setup() {
    const state = reactive({
      WearherDate: [],
    });

    const all = {
      options: [
        {
          series: [
            {
              center: [100, 38],
              data: [
                {
                  name: '青海',
                  value: 88.5,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#730000',
                    },
                    normal: {
                      areaColor: '#730000',
                    },
                  },
                },
                {
                  name: '西藏',
                  value: 244.1,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#260707',
                    },
                    normal: {
                      areaColor: '#260707',
                    },
                  },
                },
                {
                  name: '新疆',
                  value: 92.1,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#5b0000',
                    },
                    normal: {
                      areaColor: '#5b0000',
                    },
                  },
                },
                {
                  name: '重庆',
                  value: 63.5,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#b20101',
                    },
                    normal: {
                      areaColor: '#b20101',
                    },
                  },
                },
                {
                  name: '宁夏',
                  value: 44.7,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff1111',
                    },
                    normal: {
                      areaColor: '#ff1111',
                    },
                  },
                },
                {
                  name: '云南',
                  value: 64,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#b20101',
                    },
                    normal: {
                      areaColor: '#b20101',
                    },
                  },
                },
                {
                  name: '甘肃',
                  value: 64.8,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#b20101',
                    },
                    normal: {
                      areaColor: '#b20101',
                    },
                  },
                },
                {
                  name: '贵州',
                  value: 79.3,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#9e0101',
                    },
                    normal: {
                      areaColor: '#9e0101',
                    },
                  },
                },
                {
                  name: '辽宁',
                  value: 19.3,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff8e8e',
                    },
                    normal: {
                      areaColor: '#ff8e8e',
                    },
                  },
                },
                {
                  name: '广西',
                  value: 29.0,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff6b6b',
                    },
                    normal: {
                      areaColor: '#ff6b6b',
                    },
                  },
                },
                {
                  name: '四川',
                  value: 57.7,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#db0000',
                    },
                    normal: {
                      areaColor: '#db0000',
                    },
                  },
                },
                {
                  name: '吉林',
                  value: 30.3,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff6b6b',
                    },
                    normal: {
                      areaColor: '#ff6b6b',
                    },
                  },
                },
                {
                  name: '黑龙江',
                  value: 27,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff6b6b',
                    },
                    normal: {
                      areaColor: '#ff6b6b',
                    },
                  },
                },
                {
                  name: '上海',
                  value: 9.5,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ffd9d9',
                    },
                    normal: {
                      areaColor: '#ffd9d9',
                    },
                  },
                },
                {
                  name: '江西',
                  value: 31.4,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff3636',
                    },
                    normal: {
                      areaColor: '#ff3636',
                    },
                  },
                },
                {
                  name: '广东',
                  value: 17.3,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff8e8e',
                    },
                    normal: {
                      areaColor: '#ff8e8e',
                    },
                  },
                },
                {
                  name: '内蒙古',
                  value: 38.6,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff3636',
                    },
                    normal: {
                      areaColor: '#ff3636',
                    },
                  },
                },
                {
                  name: '陕西',
                  value: 32.9,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff3636',
                    },
                    normal: {
                      areaColor: '#ff3636',
                    },
                  },
                },
                {
                  name: '天津',
                  value: 6.6,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ffd9d9',
                    },
                    normal: {
                      areaColor: '#ffd9d9',
                    },
                  },
                },
                {
                  name: '湖南',
                  value: 34.6,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff3636',
                    },
                    normal: {
                      areaColor: '#ff3636',
                    },
                  },
                },
                {
                  name: '福建',
                  value: 24.6,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff6b6b',
                    },
                    normal: {
                      areaColor: '#ff6b6b',
                    },
                  },
                },
                {
                  name: '浙江',
                  value: 10.3,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ffd9d9',
                    },
                    normal: {
                      areaColor: '#ffd9d9',
                    },
                  },
                },
                {
                  name: '北京',
                  value: 7.9,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ffd9d9',
                    },
                    normal: {
                      areaColor: '#ffd9d9',
                    },
                  },
                },
                {
                  name: '海南',
                  value: 41.0,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff1111',
                    },
                    normal: {
                      areaColor: '#ff1111',
                    },
                  },
                },
                {
                  name: '河南',
                  value: 41.2,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff1111',
                    },
                    normal: {
                      areaColor: '#ff1111',
                    },
                  },
                },
                {
                  name: '湖北',
                  value: 27.1,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff6b6b',
                    },
                    normal: {
                      areaColor: '#ff6b6b',
                    },
                  },
                },
                {
                  name: '安徽',
                  value: 26.9,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff6b6b',
                    },
                    normal: {
                      areaColor: '#ff6b6b',
                    },
                  },
                },
                {
                  name: '江苏',
                  value: 11.2,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff8e8e',
                    },
                    normal: {
                      areaColor: '#ff8e8e',
                    },
                  },
                },
                {
                  name: '山西',
                  value: 39.3,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff3636',
                    },
                    normal: {
                      areaColor: '#ff3636',
                    },
                  },
                },
                {
                  name: '山东',
                  value: 15.7,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff8e8e',
                    },
                    normal: {
                      areaColor: '#ff8e8e',
                    },
                  },
                },
                {
                  name: '河北',
                  value: 23.3,
                  itemStyle: {
                    emphasis: {
                      areaColor: '#ff6b6b',
                    },
                    normal: {
                      areaColor: '#ff6b6b',
                    },
                  },
                },
              ],
              label: {
                emphasis: {
                  show: false,
                },
                normal: {
                  show: false,
                },
              },
              mapType: 'china',
              roam: false,
              type: 'map',
            },
          ],
          title: {
            text: '2006',
          },
        },
      ],
      years: ['2006'],
    };

    const option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          orient: 'vertical',
          autoPlay: false,
          inverse: true,
          // playInterval: 5000,
          left: 10,
          right: null,
          top: 20,
          bottom: 20,
          width: 65,
          height: null,
          label: {
            normal: {
              textStyle: {
                color: '#ddd',
              },
            },
            emphasis: {
              textStyle: {
                color: '#fff',
              },
            },
          },
          symbol: 'none',
          lineStyle: {
            color: '#555',
          },
          checkpointStyle: {
            color: '#bbb',
            borderColor: '#777',
            borderWidth: 2,
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            normal: {
              color: '#666',
              borderColor: '#666',
            },
            emphasis: {
              color: '#aaa',
              borderColor: '#aaa',
            },
          },
          data: all.years,
        },
        title: {
          left: 'center',
          subtext: 'Maternal Mortality Rate (per 100,000)',
          textStyle: {
            fontSize: 30,
            color: 'rgba(255, 255, 255, 0.5)',
          },
          subtextStyle: {
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
        backgroundColor: '#333',
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}',
        },
        series: [],
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quinticInOut',
      },
      options: all.options,
    };

    onBeforeMount(async () => {
      let { data } = await getChinaWeatherDate();
      data = data.replace(/[\r\n]/g, ''); // 去掉换行符

      // state.WearherDate = xml2jsonFn(data);
      data = xml2jsonFn(data);
      data = data.china.city;
      console.log(data);
      // console.log(state.WearherDate);
    });
    return { option };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
