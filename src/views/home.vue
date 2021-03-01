<template>
  <div>
    <div class="top-main-div">
      <div class="user-card-div">
        <img src="../assets/images/user.jpg" alt />
      </div>
      <div class="content-div">
        <h1>{{message}}</h1>
        <p>蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
      </div>
    </div>
    <div class="echarts-div">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="tab in tabList " :key="tab" :label="tab.name" :name="tab.id" lazy>
          <component :is="`${tab.component}`"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-top:24px;">
      <el-row :gutter="25">
        <el-col :lg="15" :xl="15" :md="15" :sm="24" :xs="24">
          <div class="lea">
            <el-card class="box-card" :body-style="{'padding':'0px'}">
              <template #header>
                <div class="card-header">
                  <span>正在进行中的订单</span>
                  <el-button class="button" type="text">全部订单</el-button>
                </div>
              </template>
              <el-row>
                <el-col :span="8" v-for="n in 6" :key="n">
                  <el-card shadow="hover">
                    <div style="height:145px">
                      <p class="p-text">#测试周志任务</p>
                      <div class="content-text">
                        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                      </div>
                      <p class="bottom-p">2020年11月23日</p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
        <el-col :lg="9" :xl="9" :md="9" :xs="24" :sm="24">
          <div class="leb">
            <el-card class="box-card" :body-style="{'padding':'0px'}">
              <template #header>
                <div class="card-header" style="    padding: 8px;">
                  <span>最近动态</span>
                </div>
              </template>
              <div class="dynic-div" v-for="n in 10" :key="n">
                <span class="el-icon-d-arrow-right">测上的飞机洛杉矶的法律三菱电机发测上的飞机洛杉矶的法律三菱电机发</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import OrderItem from "../components/OrderItem.vue";
import ProductItem from "../components/ProductItem.vue";
import { ShowMessage } from "../utils/index.js";
export default {
  name: "home",
  components: {
    OrderItem: OrderItem,
    ProductItem: ProductItem,
  },
  setup() {
    const homeObj = reactive({
      activeName: "Order",
      message: ShowMessage(),
      tabList: [
        { name: "订单分析", id: "Order", component: "OrderItem" },
        { name: "产品数量", id: "Product", component: "ProductItem" },
      ],
    });
    return {
      ...toRefs(homeObj),
    };
  },
};
</script>

<style>
.top-main-div {
  height: 90px;
  background: #fff;
  padding: 25px;
  border: 1px solid #f1f1f1;
  box-shadow: -2px 2px 1px #efefef;
}
.content-div h1 {
  color: #000;
  font-size: 24px;
  font-weight: 500;
  margin: 10px;
}
.content-div p {
  color: #000;
  font-size: 16px;
  font-weight: 500;
  margin: 10px;
}
.user-card-div {
  width: 90px;
  height: 90px;
  float: left;
  border-radius: 5px;
}
.user-card-div img {
  width: 100%;
  height: 90px;
  border-radius: 5px;
}
.content-div {
  float: left;
  margin-left: 15px;
}
.leb {
  width: 100%;
  height: 300px;
}
.el-card__header {
  padding: 5px 15px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.p-text {
  margin: 0px;
  padding: 0px;
  color: #3785e6;
  cursor: pointer;
  font-size: 15px;
}
.content-text {
  width: 100%;
  height: 105px;
  font-size: 16px;
  color: rgb(136, 129, 129);
  text-indent: 1em;
  overflow: hidden;
  margin: 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
.bottom-p {
  margin: 0px;
  padding: 0px;
  font-size: 15px;
  cursor: pointer;
  color: #7d7777;
}
.dynic-div {
  width: 100%;
  height: 37px;
  border-bottom: 1px solid #f3ecec;
  line-height: 37px;
  font-size: 15px;
  color: #807e7e;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-indent: 1em;
}
.dynic-div:hover {
  color: rgb(253 103 15);
}
.echarts-div {
  margin-top: 24px;
  background: #fff;
  box-shadow: 1px 2px 1px #efefef;
  padding: 10px;
}
</style>