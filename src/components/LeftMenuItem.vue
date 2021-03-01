<template>
  <div>
       <el-menu-item :index="indexNumber">
          <i  :class="iconName"></i>
          <template #title>{{menuName}}</template>
        </el-menu-item>
  </div>
</template>

<script>

export default {
    name:'menu-item',
    components:{
    },
    props:{
      indexNumber:{
          type:String,
          default(){
              return '100'
          }
      },
      iconName:{
          type:String,
          default(){
              return 'el-icon-setting'
          }
      },
      menuName:{
        type:String,
        default(){
            return ""
        }
      }
    },
    setup() {
    }
}
</script>

<style>

</style>