<template>
  <el-button type="success" @click="setChart">开始</el-button>
  <div class="draw-place" ref="myRef"></div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  GridComponent,
  MarkLineComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted, ref } from "vue";
import { useMain } from "@/store/index";
export default {
  setup(props) {
    onMounted(() => {
      //   setChart();
    });
    const store = useMain();
    const myRef = ref(null);
    const setChart = () => {
      echarts.use([
        GridComponent,
        MarkLineComponent,
        LineChart,
        CanvasRenderer,
        UniversalTransition,
        TooltipComponent,
        LegendComponent,
      ]);
      const myChart = echarts.init(myRef.value);
      let option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          formatter: "所处磁道编号, {b} 当前花费时间 : {c}ms",
        },
        xAxis: {
          type: "value",
          name: "磁道编号",
          interval: 5,
          min: 0,
          max: 200,
        },
        yAxis: {
          type: "value",
          name: "调度时间",
          interval: 20,
          min: -5,
          max: 500,
        },
        series: [
          {
            animationDuration: 1000,
            data: [],
            type: "line",
            symbol: "triangle",
            symbolSize: 2,
            lineStyle: {
              color: "#5470C6",
              width: 0,
              type: "dashed",
            },
            markLine: {
              color: "red",
              data: [],
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: "#EE6666",
              color: "#5470C6",
            },
          },
        ],
      };
      let i = 0;
      option.series[0].data.splice(0, store.road.length);
      option.series[0].data.push(Object.values(Object.assign({}, store.road[i++])));
      option && myChart.setOption(option);
      let id = setInterval(() => {
        if (i === store.road.length) {
          clearInterval(id);
          console.log("已经暂停了");
        }
        option.series[0].markLine.data.push([
          { coord: Object.values(Object.assign({}, store.road[i - 1])) },
          { coord: Object.values(Object.assign({}, store.road[i])) },
        ]);
        console.log(i);
        option.series[0].data.push(Object.values(Object.assign({}, store.road[i++])));

        option && myChart.setOption(option);
      }, (store.road[i][1] - store.road[i - 1][1]) * 100);
    };
    return {
      myRef,
      setChart,
    };
  },
};
</script>

<style scoped>
.draw-place {
  width: 150ch;
  height: 80ch;
  /* margin: 0 auto; */
}
.el-button {
  margin: 0 auto;
  width: 15ch;
}
</style>
