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
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="tabSelect" @tab-remove="tabRemove">
          <el-tab-pane
            v-for="item in tabData"
            :key="item.name"
            :name="item.name"
            :closable="item.isClose"
            lazy
          >
            <template #label>
              <span>
                <i class="el-icon-s-opportunity"></i>
                {{item.name}}
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-main style="background:#f0f2f5">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LeftMenuItem from "../components/LeftMenuItem.vue";
import LeftMenuSubItem from "../components/LeftMenuSubItem.vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import mutationModel from "../store/mutationType.js";
export default {
  name: "layout",
  components: {
    "left-menu-item": LeftMenuItem,
    "left-menu-subitem": LeftMenuSubItem,
  },
  computed: {
    tabData() {
      const store = useStore();
      let tabData = store.getters.useTabData;
      console.log('tabdata',tabData)
      if (tabData.length <= 0) {
        tabData = [{ name: "首页", path: "/layout/home", isClose: false }];
      }
      return tabData;
    },
  },
  setup() {
    const isActive = ref(false);
    const collapse = ref(false);
    const activeName = ref("首页");
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
            name: "学生管理",
            path: "/layout/student",
            icon: "el-icon-s-fold",
            id: "2-1",
          },
          {
            name: "教师信息管理",
            path: "/layout/teacher",
            icon: "el-icon-s-fold",
            id: "2-3",
          },
        ],
      },
    ]);
    const router = useRouter();
    const store = useStore();
    const menuSelect = (index, indexPath) => {
      debugger
      let objItem = {};
      let itemChildern = mentList.value;
      for (let i = 0; i < itemChildern.length; i++) {
        let item = itemChildern[i];
        if (item.children <= 0) {
          if (item.path === index) {
            objItem = item;
            break;
          }
        } else {
          objItem = item.children.find((m) => m.path === index);
        }
      }

      if (objItem !== undefined && objItem.name !== undefined) {
        store.dispatch(mutationModel.SET_TABPAGE, objItem);
        router.push({
          path: index,
        });
      }
    };
    const tabSelect = (element) => {
      activeName.value = element.paneName;
    };
    const tabRemove = (name) => {
      let list = tabList.value;
      if (list.length === 1) {
        ElMessage.warning({
          message: "这是最后一个选项卡，您无法删除哦",
          type: "warning",
        });
        return;
      } else {
        var index = list.findIndex((x) => x.name === name);
        list.splice(index, 1);
      }
    };
    console.log("menulist", mentList.value);
    return {
      menuSelect,
      isActive,
      collapse,
      mentList,
      tabSelect,
      activeName,
      tabRemove,
    };
  },
};
</script>

<style>
.el-tabs__nav-wrap {
  background: #fff;
  margin-bottom: 0px !important;
}
.el-tabs__header {
  margin: 0px !important;
}
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
  border-bottom: 1px solid #e8e8e8;
  line-height: 50px;
}
.el-header {
  padding: 0px !important;
  height: auto !important;
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