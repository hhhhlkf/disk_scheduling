<template>
  <header>
    <t-header></t-header>
  </header>
  <choice-form></choice-form>
  <div class="charts">
    <el-tabs type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="折线模拟" name="first">
          <line-chart></line-chart>
      </el-tab-pane>
      <el-tab-pane label="盘状模拟" name="second">
          <pine-chart></pine-chart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tHeader from "@/components/toolHeader.vue";
import ChoiceForm from "@/components/form.vue";
import { ref } from "@vue/reactivity";
import PineChart from "@/components/pineChart.vue"
import LineChart from '@/components/lineChart.vue';
export default {
  name: "MainPage",
  components: {
    tHeader,
    ChoiceForm,
    LineChart,
    PineChart
  },
  setup(props) {
    const handleClick = (tab, event) => {
      console.log(tab.props.name);
    };
    return {
      handleClick,
    };
  },
};
</script>

<style scoped>
::v-deep .el-tabs__nav {
  float: none;
  text-align: center;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
  /* border: 1px solid var(--el-border-color-light); */
  font-weight: 600;
  font-size: 0.9375rem;
  border-bottom: none;
  border: 1px solid #e4e7ed;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
  border-left: 1px solid #e4e7ed;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item:hover {
  /* border: 1px solid var(--el-border-color-light); */
  border-bottom: none;
  border-left: 1px solid #e4e7ed;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 1px solid #fff;
  border-bottom-color: var(--el-border-color-light);
  /* border-left: 1px solid #E4E7ED; */
}
.el-tab-pane {
  text-align: center;
  display: flex;
  flex-direction: column;
}
.charts {
  width: 150ch;
  text-align: center;
  margin: 0 auto;
}
</style>
