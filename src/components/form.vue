<template>
  <div class="option">
    <el-form :model="form" label-width="120px">
      <el-form-item label="单磁道跨越时间">
        <el-input-number
          v-model="form.singleP"
          :min="1"
          :max="100000"
          @change="handleChange"
        />
        <span class="unit">ms</span>
      </el-form-item>
      <el-form-item label="磁头启动时间">
        <el-input-number
          v-model="form.beginT"
          :min="0"
          :max="100000"
          @change="handleChange"
        />
        <span class="unit">ms</span>
      </el-form-item>
      <el-form-item label="单磁道扇区数目">
        <el-input-number
          v-model="form.diskNum"
          :min="1"
          :max="100000"
          @change="handleChange"
        />
        <span class="unit">个</span>
      </el-form-item>
      <el-form-item label="扇区字节数">
        <el-input-number
          v-model="form.diskBbit"
          :min="1"
          :max="100000"
          @change="handleChange"
        />
        <span class="unit">个</span>
      </el-form-item>
      <el-form-item label="磁盘转速">
        <el-input-number
          v-model="form.diskSpeed"
          :min="1"
          :max="100000"
          @change="handleChange"
        />
        <span class="unit">转/每分钟</span>
      </el-form-item>
      <el-form-item label="初始磁道">
        <el-input-number
          v-model="form.primTrack"
          :min="1"
          :max="100000"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="移动方向">
        <el-radio-group v-model="form.direction">
          <el-radio label="1">向内(递增方向)</el-radio>
          <el-radio label="2">向外(递减方向)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="采用随机数选择">
        <el-button type="primary" round @click="onRand">开始</el-button>
      </el-form-item>
      <el-form-item label="调度选择算法">
        <el-radio-group v-model="form.function">
          <el-radio label="FCFS"></el-radio>
          <el-radio label="SSTF"></el-radio>
          <el-radio label="SCAN"></el-radio>
          <el-radio label="LOOK"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="添加申请磁道">
        <el-tag
          v-for="(tag, index) in dynamicTags"
          :key="index"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(index)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
          + 输入磁道编号
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>默认</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="result">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="引臂移动量">
        <el-input
          disabled="true"
          class="output"
          v-model="sumDistance"
          placeholder="结果显示"
        />
        <span class="unit1">mm</span>
      </el-form-item>
      <el-form-item label="寻道时间">
        <el-input
          disabled="true"
          class="output"
          v-model="sumTime"
          placeholder="结果显示"
        />
        <span class="unit1">ms</span>
      </el-form-item>
      <el-form-item label="旋转延迟时间">
        <el-input
          disabled="true"
          class="output"
          v-model="delayTime"
          placeholder="结果显示"
        />
        <span class="unit1">ms</span>
      </el-form-item>
      <el-form-item label="传输时间">
        <el-input
          disabled="true"
          class="output"
          v-model="pipeTime"
          placeholder="结果显示"
        />
        <span class="unit1">ms</span>
      </el-form-item>
      <el-form-item label="所有访问处理时间 ">
        <el-input
          disabled="true"
          class="output"
          v-model="allTime"
          placeholder="结果显示"
        />
        <span class="unit1">ms</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRaw } from "vue";
import { nextTick, ref } from "vue";
import { ElMessage } from "element-plus";
import { useMain } from "@/store/index";
export default {
  name: "ChoiceForm",
  components: {
    //   nextTick,ref
    // useMain
  },
  setup(props) {
    const form = reactive({
      singleP: 1,
      beginT: 0,
      diskNum: 10,
      diskBbit: 150,
      diskSpeed: 6000,
      primTrack: 100,
      direction: "1",
      function: "SCAN",
    });
    const inputValue = ref("");
    const dynamicTags = ref([120, 85, 70, 30]);
    const inputVisible = ref(false);
    const InputRef = ref(null);
    const num = ref(1);
    const store = useMain();
    const sumDistance = ref(0);
    const sumTime = ref(0);
    const pipeTime = ref(0);
    const delayTime = ref(0);
    const allTime = ref(0);
    const road = reactive([]);
    const handleChange = (value) => {
      //   console.log(value);
    };
    const handleClose = (tag) => {
      dynamicTags.value.splice(tag, 1);
    };
    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        InputRef.value.input.focus();
      });
    };
    const handleInputConfirm = () => {
      if (
        !isNaN(inputValue.value) &&
        inputValue.value != null &&
        inputValue.value != ""
      ) {
        if (inputValue.value > 0 && inputValue.value <= 200) {
          dynamicTags.value.push(parseInt(inputValue.value));
        } else {
          ElMessage({
            message: "超出数目，请重新输入",
            type: "warning",
          });
        }
      } else {
        ElMessage.error("请输入数字！");
      }
      inputVisible.value = false;
      inputValue.value = "";
    };
    const calculate = () => {
      pipeTime.value =
        (1 / ((form.diskSpeed / 60) * form.diskNum)) * dynamicTags.value.length * 1000;
      delayTime.value =
        (1 / ((2 * form.diskSpeed) / 60)) * dynamicTags.value.length * 1000;
      if (form.function === "FCFS") {
        sumDistance.value = 0;
        road.splice(0, road.length);
        road.push([form.primTrack, form.beginT]);
        let begin = form.primTrack;
        for (let i = 0; i < dynamicTags.value.length; i++) {
          //   console.log(begin - dynamicTags.value[i]);
          sumDistance.value += Math.abs(begin - dynamicTags.value[i]);
          begin = dynamicTags.value[i];
          //   console.log(sumDistance.value)
          road.push([begin, sumDistance.value * form.singleP]);
        }
      } else if (form.function === "SSTF") {
        // console.log("进入");
        let begin = form.primTrack;
        let array = Object.values(Object.assign({}, dynamicTags.value));
        road.splice(0, road.length);
        sumDistance.value = 0;
        road.push([begin, form.beginT]);
        // console.log(array);
        while (array.length != 0) {
          let min = 21000000;
          let index = -1;
          for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (Math.abs(element - begin) < min) {
              index = i;
              min = Math.abs(element - begin);
              //   console.log("min为：" + min);
            }
          }
          begin = array[index];
          array.splice(index, 1);
          //   console.log(array);
          sumDistance.value += min;
          road.push([begin, sumDistance.value * form.singleP]);
        }
      } else if (form.function === "SCAN") {
        sumDistance.value = 0;
        road.splice(0, road.length);
        let array = Object.values(Object.assign({}, dynamicTags.value));
        array = array.sort(function (a, b) {
          if (a > b) {
            return 1;
          }
          if (a == b) {
            return 0;
          }
          if (a < b) {
            return -1;
          }
        });
        let i = 0;
        for (; i < array.length; i++) {
          if (form.direction === "1" && form.primTrack <= array[i]) break;
          else if (form.direction === "2" && form.primTrack < array[i]) {
            break;
          }
        }
        if (form.direction === "2") i--;
        if (form.direction === "1") {
          //   console.log(array[i]);
          let begin = form.primTrack;
          road.push([begin, form.beginT]);
          for (let k = i; k < array.length; k++) {
            const element = array[k];
            sumDistance.value += Math.abs(element - begin);
            begin = element;
            road.push([begin, sumDistance.value * form.singleP]);
          }
          for (let k = 0; k < i; k++) {
            const element = array[k];
            sumDistance.value += Math.abs(element - begin);
            begin = element;
            road.push([begin, sumDistance.value * form.singleP]);
          }
        } else if (form.direction === "2") {
          let begin = form.primTrack;
          road.push([begin, form.beginT]);
          //   console.log(i);
          for (let k = i; k >= 0; k--) {
            const element = array[k];
            sumDistance.value += Math.abs(element - begin);
            begin = element;
            road.push([begin, sumDistance.value * form.singleP]);
          }
          for (let k = array.length - 1; k > i; k--) {
            const element = array[k];
            sumDistance.value += Math.abs(element - begin);
            begin = element;
            road.push([begin, sumDistance.value * form.singleP]);
          }
        } else {
          console.log("发生错误！");
        }
      } else {
        road.splice(0, road.length);
        sumDistance.value = 0;
        let array = Object.values(Object.assign({}, dynamicTags.value));
        array = array.sort(function (a, b) {
          if (a > b) {
            return 1;
          }
          if (a == b) {
            return 0;
          }
          if (a < b) {
            return -1;
          }
        });
        let i = 0;
        for (; i < array.length; i++) {
          if (form.direction === "1" && form.primTrack <= array[i]) break;
          else if (form.direction === "2" && form.primTrack < array[i]) {
            break;
          }
        }
        if (form.direction === "2") i--;
        if (form.direction === "1") {
          let begin = form.primTrack;
          road.push([begin, form.beginT]);
          for (let k = i; k < array.length; k++) {
            const element = array[k];
            sumDistance.value += Math.abs(element - begin);
            begin = element;
            road.push([begin, sumDistance.value * form.singleP]);
          }
          for (let k = i - 1; k >= 0; k--) {
            const element = array[k];
            sumDistance.value += Math.abs(element - begin);
            begin = element;
            road.push([begin, sumDistance.value * form.singleP]);
          }
        } else if (form.direction === "2") {
          let begin = form.primTrack;
          road.push([begin, form.beginT]);
          for (let k = i; k >= 0; k--) {
            const element = array[k];
            sumDistance.value += Math.abs(element - begin);
            begin = element;
            road.push([begin, sumDistance.value * form.singleP]);
          }
          for (let k = i + 1; k < array.length; k++) {
            const element = array[k];
            sumDistance.value += Math.abs(element - begin);
            begin = element;
            road.push([begin, sumDistance.value * form.singleP]);
          }
        } else {
          console.log("发生错误！");
        }
      }
      sumTime.value = sumDistance.value * form.singleP;
      allTime.value = sumTime.value + form.beginT + pipeTime.value + delayTime.value;
    };
    const onSubmit = () => {
      store.singleForm.singleP = form.singleP;
      store.singleForm.beginT = form.beginT;
      store.singleForm.diskNum = form.diskNum;
      store.singleForm.diskBbit = form.diskBbit;
      store.singleForm.diskSpeed = form.diskSpeed;
      store.singleForm.primTrack = form.primTrack;
      store.singleForm.direction = form.direction;
      store.singleForm.function = form.function;
      store.singleForm.dynamicTags = Object.values(Object.assign({}, dynamicTags.value));
      try {
        calculate();
        store.road = Object.values(Object.assign({}, road));
      } catch (error) {
        ElMessage.error("更新失败");
      }
    };
    const onRand = () => {
      let rand1 = (Math.floor(Math.random() * 10000) % 2) + 1;
      let rand2 = (Math.floor(Math.random() * 10000) % 200) + 1;
      form.primTrack = rand2;
      form.direction = rand1.toString();
    };

    return {
      form,
      onSubmit,
      inputValue,
      dynamicTags,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm,
      handleChange,
      num,
      onRand,
      sumDistance,
      sumTime,
      pipeTime,
      delayTime,
      allTime,
    };
  },
};
</script>

<style>
.option {
  width: 60ch;
  text-align: center;
  margin: 20px auto;
  padding: 10px 10px;
  border: 2px solid #909399;
  border-radius: 6px;
}
.unit {
  margin-left: 1.5ch;
}
.unit1 {
  margin-left: 1.2ch;
}
.output {
  max-width: 70px;
}
</style>
