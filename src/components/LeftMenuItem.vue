<template>
    <template v-if="menu.children.length <= 0">
      <el-menu-item :index="menu.path">
        <i :class="menu.icon"></i>
        <template #title>{{ menu.name }}</template>
      </el-menu-item>
    </template>
    <template v-else>
      <el-submenu :index="menu.path">
        <template #title>
          <i :class="menu.icon"></i>
         <span> {{ menu.name }}</span>
        </template>
        <menu-item
          v-for="item in menu.children"
          :key="item.name"
          :menu="item"
        ></menu-item>
      </el-submenu>
    </template>
</template>

<script>
export default {
  name: "menu-item",
  components: {},
  props: {
    menu: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {},
};
</script>

<style></style>
