<template>
  <el-container>
    <el-aside :class="[collapse?'layout-left':'layout-left-close']">
      <el-menu
        default-active="/layout/home"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#1890ff"
        @select="menuSelect"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <div v-for="menu in mentList" :key="menu.name">
          <left-menu-item
            v-if="menu.children.length<=0"
            :indexNumber="menu.path"
            :iconName="menu.icon"
            :menuName="menu.name"
          ></left-menu-item>
          <left-menu-subitem
            :children="menu.children"
            :menuName="menu.name"
            :indexNumber="menu.path"
            :isClose="collapse"
            v-else
          ></left-menu-subitem>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-div">
          <div class="left-close" @click="collapse=!collapse">
            <span :class="[ collapse ?'el-icon-s-unfold':'el-icon-s-fold']"></span>
          </div>
          <div class="right-user">
            <div class="float-left">
              <img
                style="position: relative; top: 9px;right: 5px;width: 30px;height: 30px;border-radius: 50%;"
                src="../assets/images/user.jpg"
              />
              <el-dropdown>
                <span class="el-dropdown-link">
                  徐贵林
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <span class="el-icon-user"></span> 个人中心
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span class="el-icon-setting"></span> 个人设置
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span class="el-icon-circle-close"></span> 退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {  ref } from "vue";
import {  useRouter } from "vue-router";
import LeftMenuItem from "../components/LeftMenuItem.vue";
import LeftMenuSubItem from "../components/LeftMenuSubItem.vue";
export default {
  name: "layout",
  components: {
    "left-menu-item": LeftMenuItem,
    "left-menu-subitem": LeftMenuSubItem,
  },
  setup() {
    const isActive = ref(false);
    const collapse = ref(false);
    const mentList = ref([
      {
        name: "首页",
        path: "/layout/home",
        icon: "el-icon-s-fold",
        children: [],
        id: "1",
      },
      {
        name: "基础数据管理",
        path: "/2",
        icon: "",
        id: "2",
        children: [
          {
            name: "用户信息管理",
            path: "/2-1",
            icon: "el-icon-s-fold",
            id: "2-1",
          },
          {
            name: "学生信息管理",
            path: "/2-2",
            icon: "el-icon-s-fold",
            id: "2-2",
          },
          {
            name: "教师信息管理",
            path: "/2-3",
            icon: "el-icon-s-fold",
            id: "2-3",
          },
          {
            name: "车位信息管理",
            path: "/2-4",
            icon: "el-icon-s-fold",
            id: "2-4",
          },
          {
            name: "住宿信息管理",
            path: "/2-5",
            icon: "el-icon-s-fold",
            id: "2-5",
          },
        ],
      },
      {
        name: "学习管理",
        path: "/",
        icon: "",
        id: "3",
        children: [
          {
            name: "展示信息管理",
            path: "/",
            icon: "el-icon-s-fold",
            id: "3-1",
          },
          {
            name: "头部信息管理",
            path: "/",
            icon: "el-icon-s-fold",
            id: "3-2",
          },
          {
            name: "底部信息管理",
            path: "/",
            icon: "el-icon-s-fold",
            id: "3-3",
          },
          {
            name: "边上信息管理",
            path: "/",
            icon: "el-icon-s-fold",
            id: "3-4",
          },
        ],
      },
    ]);
    const router = useRouter();
    const menuSelect = (index, indexPath) => {
      router.push({
        path: index,
      });
    };
    console.log("menulist", mentList.value);
    return {
      menuSelect,
      isActive,
      collapse,
      mentList,
    };
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 100vh;
}
.el-menu--collapse {
  width: 60px !important;
  height: 100vh;
}
.layout-left {
  background: #001529;
  /* height: 100vh; */
  width: auto !important;
}
.layout-left-close {
  background: #001529;
  /* height: 100vh; */
  width: 200px !important;
}
.active-item {
  background: #1890ff !important;
}
.header-div {
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #f7f7f7;
  box-shadow: -1px 2px 5px #d2d0d0;
  line-height: 50px;
}
.el-header {
  padding: 0px !important;
}
.left-close {
  float: left;
  width: 50px;
  height: 50px;
  margin-left: 5px;
  text-align: center;
  line-height: 50px;
  font-size: 25px;
  cursor: pointer;
}
.right-user {
  height: 50px;
  float: right;
  margin-right: 20px;
}
.float-left {
  float: left;
}
</style>