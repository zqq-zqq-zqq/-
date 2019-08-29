<template>
  <div class="left f-16">
      <router-link to="/index/manage" v-if="isAdmin=='0'"  active-class="select">管理员管理</router-link>
      <router-link to="/index/user"  v-if="isAdmin!='2'" active-class="select">用户管理</router-link>
      <router-link to="/index/tell" active-class="select">通知管理</router-link>
      <router-link to="/index/device" active-class="select">设备管理</router-link>
  </div>

</template>

<script>


export default {
    data(){
        return{
            isAdmin:localStorage.getItem('isAdmin')
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
.left
    min-width 180px
    border-right 1px solid #CCCCFF 
    padding-top 30px
    background rgba(204,153,255,.3)
    
    a
        display block
        color #606266
        text-decoration none 
        text-align center
        line-height 50px; 
        font-weight bold
     
        &:hover
            color #606266
            background #CCCCFF        
    .select 
        background $one-color
        color: #ffffff;

</style>