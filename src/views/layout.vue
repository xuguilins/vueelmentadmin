<template>
  <el-container>
    <el-aside :class="[collapse ? 'layout-left' : 'layout-left-close']">
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
        <left-menu-item v-for="menu in mentList" :key="menu.name" :menu="menu"></left-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-div">
          <div class="left-close" @click="collapse = !collapse">
            <span :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></span>
          </div>
          <div class="right-user">
            <div class="float-left">
              <img
                style="
                  position: relative;
                  top: 9px;
                  right: 5px;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                "
                src="../assets/images/user.jpg"
              />
              <el-dropdown @command="handlerClick">
                <span class="el-dropdown-link">
                  徐贵林
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="userhome">
                      <span class="el-icon-user"></span> 个人中心
                    </el-dropdown-item>
                    <el-dropdown-item command="userset">
                      <span class="el-icon-setting"></span> 个人设置
                    </el-dropdown-item>
                    <el-dropdown-item command="exit">
                      <span class="el-icon-circle-close"></span> 退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <div v-if="showTabBar">
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
                {{ item.name }}
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-main style="background: #f0f2f5">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LeftMenuItem from "../components/LeftMenuItem.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import mutationModel from "../store/mutationType.js";
import { config } from "../../public/config/index";
export default {
  name: "layout",
  components: {
    "left-menu-item": LeftMenuItem,
  },
  computed: {
    tabData() {
      const store = useStore();
      let tabData = store.getters.useTabData;
      let count = tabData.length;
      console.log("legfnth", tabData.length);
      if (tabData.length <= 0) {
        let json = { name: "首页", path: "/layout/home", isClose: false };
        tabData = [json];
        store.dispatch(mutationModel.SET_TABPAGE, json);
      } else if (count === 1) {
        this.activeName = tabData[0].name;
        console.log("this", this);
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
        name: "系统管理",
        path: "/2",
        icon: "el-icon-s-fold",
        id: "2",
        children: [
          {
            name: "角色管理",
            path: "/layout/roleGroup",
            icon: "el-icon-s-fold",
            id: "2-1",
            isClose: true,
             children: []
          },
          {
            name: "权限管理",
            path: "/layout/permissGroup",
            icon: "el-icon-s-fold",
            id: "2-3",
            isClose: true,
             children: []
          },
        ],
      },
    ]);
    const router = useRouter();
    const store = useStore();
    const menuSelect = (index) => {
      let objItem = parMentItem(mentList.value, index, "path");
      if (objItem !== undefined && objItem.name !== undefined) {
        activeName.value = objItem.name;
        store.dispatch(mutationModel.SET_TABPAGE, objItem);
        router.push({
          path: index,
        });
      }
    };
    const parMentItem = (itemChildern, name, fiterName) => {
      let objItem = {};
      for (let i = 0; i < itemChildern.length; i++) {
        let item = itemChildern[i];
        if (item.children <= 0) {
          if (item[fiterName] === name) {
            objItem = item;
            break;
          }
        } else {
          objItem = item.children.find((m) => m[fiterName] === name);
          if (objItem !== undefined && objItem !== null) break;
        }
      }
      return objItem;
    };
    const tabSelect = (element) => {
      let name = element.paneName;
      activeName.value = name;
      let item = parMentItem(mentList.value, name, "name");
      if (item !== null && item !== undefined && item.path !== undefined)
        router.push({
          path: item.path,
        });
    };
    const tabRemove = (name) => {
      console.log("name", name);
      let list = store.getters.useTabData;
      if (list.length === 1) {
        ElMessage.warning({
          message: "这是最后一个选项卡，您无法删除哦",
          type: "warning",
        });
        return;
      } else {
        store.dispatch(mutationModel.REMOVE_TABPAGE, name);
        let value = store.getters.GET_LASTTABPAGE;
        activeName.value = value.name;
        router.push({
          path: value.path,
        });
      }
    };
    const handlerClick = (ele) => {
      if (ele === "exit") {
        ElMessageBox.confirm("您确定要退出系统?", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal:false,
          roundButton:true
        })
          .then(() => {
            router.push({name:'login'})
          })
          .catch(() => {
            console.log("我关闭");
          });
      }
      // router.push({name:'login'})
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
      handlerClick,
      ...config,
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
  width: 201px !important;
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
.is-acitve-tab {
  color: #5f4e46;
  background: #f5f5f5;
}
</style>
