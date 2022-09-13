<template>
  <div class="title">
    <h1 id="title-word">磁盘调度算法模拟</h1>
  </div>
</template>

<script>
export default {
  name: "tHeader",
};
</script>

<style scroped>
.title {
  background-image: url("https://i.loli.net/2021/09/30/3bSAB6Fru9xCdh8.jpg");
  background-attachment: fixed;
  background-size: 100%;
  height: 16ch;
  line-height: 16ch;
}
#title-word {
  text-align: center;
  font-size: 8ch;
  color: aliceblue;
  font-family: -apple-system, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB",
    STHeiti, "Microsoft YaHei", "Microsoft JhengHei", "Source Han Sans SC",
    "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC",
    "Noto Sans CJK TC", "WenQuanYi Micro Hei", SimSun, sans-serif;
  font-weight: 700;
  margin: auto auto;
}
</style>
