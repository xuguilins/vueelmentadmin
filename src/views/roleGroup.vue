<template>
  <div>
    <div class="role-tool">
      <el-button-group>
        <el-button
          v-for="item in option"
          :key="item.id"
          :type="item.type"
          :icon="item.icon"
        >
          {{ item.name }}
        </el-button>
      </el-button-group>
    </div>
    <div class="data-list">
      <p>数据列表</p>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
    <div class="page-div">
      <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { option } from "../data/option.js";
export default {
  name: "roleinfo",
  setup() {
    const tableData = ref([
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ]);
    return {
      option,
      tableData,
    };
  },
};
</script>
<style scoped>
.role-tool {
  text-align: right;
}
.data-list {
  background: #fff;
  margin-top: 10px;
}
.data-list p {
  padding: 16px;
  margin: 0px;
  font-size: 20px;
  font-weight: 600;
}
.page-div {
    background: rgb(255, 255, 255);
    text-align: right;
    margin-top: 10px;
    padding: 15px;
}
</style>
