<template>
  <el-submenu :index="indexNumber">
    <template #title>
      <i class="el-icon-location"></i>
      <span v-show="!isClose">{{menuName}}</span>
    </template>
    <el-menu-item v-for="item in children" :key="item.name" :index="item.path">{{item.name}}</el-menu-item>
  </el-submenu>
</template>

<script>
export default {
  name: "left-menu-subitem",
  props: {
    indexNumber: {
      type: String,
      default() {
        return "100";
      },
    },
    iconName: {
      type: String,
      default() {
        return "el-icon-setting";
      },
    },
    menuName: {
      type: String,
      default() {
        return "";
      },
    },
    children: {
      type: Array,
      default() {
        return [];
      },
    },
    isClose: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style>
</style>