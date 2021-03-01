<template>
  <div class="order-div">
    <div id="product" :style="{ width: '100%', height: '300px' }" style="width:100%;heigth:300px;"></div>
  </div>
</template>

<script>
import * as Echarts from "echarts";
import { nextTick, onMounted } from "vue";
export default {
  name: "ProductItem",
  setup() {
    const DrawEcahrts = () => {
       let dataList=[]
       let dataValueList=[]
      for(let i=1;i<25;i++) {
        dataList.push(`商品${i}`)
        dataValueList.push(Math.ceil(Math.random()*10)*5)
      }
      let myChart = Echarts.init(document.getElementById("product"));
      let option = {
        title: {
          text: "本店产品库存一览",
        },
        tooltip: {
            trigger:'axis',
            axisPointer:{
                type:'shadow'
            }
        },
        legend: {
          data: ["数量"],
        },
        xAxis: {
          data: dataList,
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: '60%',
            itemStyle:{
              color:'#00b8ff'  
            },
            label:{
                show:true,
                position:'top'
            },
            data: dataValueList,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart.resize()
    };
    onMounted(() => {
      nextTick(()=>{
           DrawEcahrts();
      })
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