<template>
  <el-button type="success" @click="setChart">开始</el-button>
  <div class="draw-place" ref="myRef"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useMain } from "@/store/index";
import * as echarts from "echarts/core";
import { PolarComponent, LegendComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import { DataZoomComponent } from "echarts/components";
export default {
  setup(props) {
    const myRef = ref(null);
    const allColor = ["#0066FF", "#00FFFF", "#FF3333", "#00CC66"];
    const setChart = () => {
      echarts.use([
        PolarComponent,
        LegendComponent,
        BarChart,
        SVGRenderer,
        DataZoomComponent,
      ]);
      const myChart = echarts.init(myRef.value, null, {
        renderer: "svg",
      });
      let option;
      option = {
        animationDurationUpdate: 50,
        radiusAxis: {
          type: "category",
          z: 10,
          show: false,
        },
        polar: {
          radius: [20, "80%"],
        },
        angleAxis: {
          // max: 12,
          startAngle: 0,
          interval: 1,
        },
        dataZoom: {
          // 放大和缩放
          type: "inside",
          radiusAxisIndex: 0,
          //    angleAxisIndex:0,
          filterMode: "filter",
          moveOnMouseMove: true,
          moveOnMouseWheel: true,
          zoomOnMouseWheel: true,
          maxSpan: 100,
        },
        series: [],
      };
      option.radiusAxis.z = store.singleForm.diskNum;
      option.angleAxis.startAngle = 360 / (2 * store.singleForm.diskNum);
      let primData = [];

      for (let i = 0; i <= 200; i++) {
        primData.push(1);
      }
      for (let k = 0; k < store.singleForm.diskNum; k++) {
        let serie = {
          color: allColor[k % 4],
          type: "bar",
          coordinateSystem: "polar",
          name: k.toString(),
          stack: "a",
          data: Object.values(Object.assign({}, primData)),
        };
        option.series.push(Object.assign({}, serie));
      }
      option && myChart.setOption(option);
      let array = Object.values(Object.assign({}, store.road));
      let currentRow = store.singleForm.primTrack - 1;
      let i = 0;
      const Interval = setInterval(() => {
        //   console.log("1:" + i);
        let index = Math.floor(
          option.angleAxis.startAngle / (360 / store.singleForm.diskNum)
        );
        // alert(1);
        let ans = option.series[index];
        ans.data[currentRow] = {
          value: 1,
          itemStyle: {
            color: "#000",
          },
        };
        option.series[index] = ans;
        console.log(currentRow);

        if (array[i][0] - array[i + 1][0] > 0) currentRow--;
        else currentRow++;
        option.angleAxis.startAngle =
          (option.angleAxis.startAngle + 360 / store.singleForm.diskNum) % 360;
        option && myChart.setOption(option);
        if (currentRow === array[i + 1][0]) {
          i++;
        }
        if (i >= array.length - 1) {
          clearInterval(Interval);
        }
      }, 200);
      console.log("出来了");
      // for (let j = 0; j < num; j++) {}
    };
    const store = useMain();
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
  height: 150ch;
  /* margin: 0 auto; */
}
.el-button {
  margin: 0 auto;
  width: 15ch;
}
</style>
