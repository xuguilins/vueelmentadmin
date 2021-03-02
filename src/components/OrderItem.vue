<template>
  <div class="order-div">
    <div id="order" :style="{ width: '100%', height: '300px' }"></div>
  </div>
</template>

<script>
import * as Echarts from "echarts";
import { nextTick, onMounted, warn, watch } from "vue";
import { useMonthData } from "../utils/index.js";
export default {
  name: "OrderItem",
  setup() {
    const monthData = useMonthData();
    let unData = [];
    let comData = [];
    monthData.forEach((element, index) => {
      let value =Math.ceil(Math.random()*10);
      let cvalue = Math.ceil(Math.random()*10);
      unData.push(value*5.4);
      comData.push(cvalue*5.6);
    });
    const DrawEcahrts = () => {
      // 基于准备好的dom，初始化echarts实例
      let myChart = Echarts.init(document.getElementById("order"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "当月订单分析",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["已完成订单", "未完成订单"],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: monthData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "已完成订单",
            type: "line",
            data: comData,
          },
          {
            name: "未完成订单",
            type: "line",
            data: unData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    };
    onMounted(() => {
      nextTick(() => {
        DrawEcahrts();
      });
    });
  },
};
</script>

<style>
.order-div {
  width: 100%;
  height: 300px;
}
</style>