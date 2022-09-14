<template>
  <el-button type="success" @click="setChart">开始</el-button>
  <div class="draw-place" ref="myRef"></div>
  <svg
    t="1663143430106"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4217"
    width="90"
    height="50"
  >
    <path
      d="M992 537.6H62.4c-17.6 0-32-14.4-32-32s14.4-32 32-32H992c17.6 0 32 14.4 32 32s-14.4 32-32 32z"
      fill="#229BFF"
      p-id="4218"
    ></path>
    <path
      d="M56 540.8c-8 0-16-3.2-22.4-9.6-12.8-12.8-12.8-32 0-44.8L395.2 112c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L78.4 531.2c-6.4 6.4-14.4 9.6-22.4 9.6z"
      fill="#474747"
      p-id="4219"
    ></path>
    <path
      d="M417.6 908.8c-8 0-16-3.2-22.4-9.6l-361.6-368c-12.8-12.8-12.8-33.6 0-44.8 12.8-12.8 33.6-12.8 44.8 0l361.6 368c12.8 12.8 12.8 33.6 0 44.8-6.4 6.4-14.4 9.6-22.4 9.6z"
      fill="#474747"
      p-id="4220"
    ></path>
  </svg>
</template>

<script>
import { onMounted, ref } from "vue";
import { useMain } from "@/store/index";
import * as echarts from "echarts/core";
import { PolarComponent, LegendComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import { DataZoomComponent } from "echarts/components";
import { ElMessage } from "element-plus";
export default {
  setup(props) {
    const myRef = ref(null);
    const flag = ref(false);
    const allColor = ["#66FFFF", "#66CCFF", "#6699FF", "#6666FF", "#6633FF", "#6600FF"];
    const setChart = () => {
      if (!store.updateFlag) {
        ElMessage({
          showClose: false,
          message: "请计算数据后再进行模拟",
          type: "warning",
        });
        return;
      }
      if (store.singleForm.diskNum > 16) {
        ElMessage({
          showClose: false,
          message: "扇区数目过多，无法进行有效模拟",
          type: "warning",
        });
        return;
      }
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
        animationDurationUpdate: 3,
        radiusAxis: {
          type: "category",
          z: 0,
          show: false,
        },
        polar: {
          radius: [20, "80%"],
        },
        angleAxis: {
          max: 0,
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
      option.series.splice(0, option.series.length);

      option.angleAxis.max = store.singleForm.diskNum;
      option.radiusAxis.z = store.singleForm.diskNum;
      option.angleAxis.startAngle = 360 / (2 * store.singleForm.diskNum);
      let primData = [];
      for (let i = 0; i <= 200; i++) {
        primData.push(1);
      }
      for (let k = 0; k < store.singleForm.diskNum; k++) {
        let serie = {
          color: allColor[k % 6],
          type: "bar",
          coordinateSystem: "polar",
          name: k.toString(),
          stack: "a",
          data: Object.values(Object.assign({}, primData)),
        };
        option.series.push(Object.assign({}, serie));
      }
      console.log(option.series);
      myChart.clear();
      option && myChart.setOption(option);
      flag.value = true;
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
        if (currentRow + 1 == array[i][0]) {
          ans.data[currentRow] = {
            value: 1,
            itemStyle: {
              color: "#FF0000",
            },
          };
        } else {
          if (ans.data[currentRow] === 1)
            ans.data[currentRow] = {
              value: 1,
              itemStyle: {
                color: "#000000",
              },
            };
        }
        option.series[index] = ans;
        console.log(currentRow);
        if (array[i][0] - array[i + 1][0] > 0) currentRow--;
        else if (array[i][0] - array[i + 1][0] < 0) currentRow++;
        option && myChart.setOption(option);
        option.angleAxis.startAngle =
          (option.angleAxis.startAngle + 360 / store.singleForm.diskNum) % 360;
        if (currentRow === array[i + 1][0] - 1) {
          i++;
        }
        if (i == array.length - 1) {
          let ii = Math.floor(
            option.angleAxis.startAngle / (360 / store.singleForm.diskNum)
          );
          // alert(1);
          let mark = option.series[ii];
          mark.data[currentRow] = {
            value: 1,
            itemStyle: {
              color: "#FF0000",
            },
          };
        }
        option && myChart.setOption(option);
        if (i >= array.length - 1) {
          clearInterval(Interval);
        }
      }, 5);
      // console.log("出来了")
      // for (let j = 0; j < num; j++) {}
    };
    const store = useMain();
    return {
      myRef,
      setChart,
      flag,
    };
  },
};
</script>

<style scoped>
.draw-place {
  width: 150ch;
  height: 150ch;
  /* margin: 0 auto; */
  position: relative;
}
.el-button {
  margin: 0 auto;
  width: 15ch;
}
.icon {
  position: absolute;
  /* top:75ch; */
  top: 76ch;
  /* left:150ch; */
  left: 136ch;
}
</style>
