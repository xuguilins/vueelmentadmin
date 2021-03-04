<template>
  <div class="login-form">
    <p class="loing-p">Admin-Login</p>
    <div class="div-tip">一个简单的权限管理系统</div>
    <el-form  label-width="80px" >
      <el-form-item>
        <el-input placeholder="请输入用户名" v-model="userName" prefix-icon="iconfont icon-yonghuming"></el-input>
      </el-form-item>
      <el-form-item>
       <el-input placeholder="请输入密码"  v-model="passWord" prefix-icon="iconfont icon-mima"  show-password></el-input>
      </el-form-item>
       <div class="foot-div">
           <el-button type="primary"  :loading="isLoad" style="width: 100%;height: 45px;" @click="userLogin">{{bottontext}}</el-button>
       </div>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
export default {
  name: "login",
  setup() {
      const loginInfo =reactive({
          userName:'',
          passWord:'',
          bottontext:'登录',
          isLoad:false
      })
      const router  = useRouter()
      const userLogin =()=>{
        if(loginInfo.userName === ''){
          ElMessage.error("请输入用户名");
            return;
        }
        if (loginInfo.passWord === '') {
            ElMessage.error("请输入密码")
            return;
        }
        loginInfo.bottontext = '正在登录...'
        loginInfo.isLoad = true 
        setTimeout(()=>{
           router.push({
               name:'home'
           })
        },3000)
      }
      return {
          ...toRefs(loginInfo),
          userLogin
      }

  }
};
</script>
<style>
.el-form-item__content {
    margin: 0px  !important;
}
.login-form {
  width: 360px;
  height: 350px;
  margin: 150px auto;
}
.loing-p {
  text-align: center;
  margin: 39px auto 0px auto;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 33px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}
.div-tip {
  margin-top: 12px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  text-align: center;
}
.username-div {
  width: 100%;
  height: 35px;
  border: 1px solid red;
}
.foot-div {
    width: 100%;
    height: 45px;
    text-align: center;
    line-height: 45px;
    color: #fff;
    cursor: pointer;
}
</style>