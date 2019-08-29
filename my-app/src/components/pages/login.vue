<template>
  <div class="mask">
      <div class="box text-center" >
        <h3 class="text-center">登录</h3>
        <hr style=" height: 1px; border:none">
        <div>
           <el-select v-model="user.type" clearable placeholder="请选择">
         
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
           </el-select>          
        </div>
      <div>

        <el-input
          placeholder="请输入账号"
          v-model="user.name"
          clearable>
        </el-input> 
      </div>   
      <div>
        <el-input
          placeholder="请输入密码"
          v-model="user.pass"
          show-password>
        </el-input> 
      </div> 
      <el-button type="primary" round @click="login()" >登 录</el-button>
    
      </div>
  </div>
</template>

<script>

import API from "../../public/js/api.js"
import axios from "axios";
export default {
  data(){
    return{
        options:[
          {
            label:"超级管理员",
            value:"0"
          },
           {
            label:"普通管理员",
            value:"1"
          },
           {
            label:"用户",
            value:"2"
          }
        ],
        value: '',
       
       
        user:{
          type:'',
          name:'',
          pass:''
        }
    }
  },
  methods:{
    login(){
      axios({
        url:API.login,
        method:"post",
        data:this.$qs.stringify(this.user)
      }).then(d=>{
        if(d.data.isok){
          this.$message({
            message: '哇哦!恭喜您'+d.data.info,
            type: 'success'
          });
          localStorage.setItem('isAdmin',d.data.isAdmin)
          this.$router.push("/index")
        }else {
           this.$message({
            message: '很遗憾~~~，'+d.data.info,
            type: 'error'
          });
        }
      
      })

    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
.el-select,.el-input
  width 300px
  margin 10px
hr 
  background-color $one-color
.el-button
  width 100px
  height 35px
  // line-height 35px
  // margin-top 10px
  background $one-color
  // font-weight bold
  // letter-spacing 1rem
  
.el-alert
  width 500px
  margin 20px auto  
.mask
  width 100vw
  height 100vh
  position fixed
  top 0
  left 0
  background url("../../assets/img/back.jpg") 0 0 no-repeat
  background-size 100vw 100vh
  .box
    width 390px
    height 340px
    background rgba(255,255,255,0.5)
    color $f-c1
    position absolute 
    top 0 
    left 0
    right 0
    bottom 0 
    margin auto 
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    


</style>