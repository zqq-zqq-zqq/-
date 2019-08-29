<template>
  <div class="header">
      <div class="tit f-32">后台管理系统</div>
      <div class="right">
        <div class="imgs">
          <el-image
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            >
          </el-image>
       </div>
        <div class="h" @click="show()">admin</div>
      </div>
      <transition enter-active-class="animated bounceInRight">
        <div @click="back()" class="box" v-if="this.show1">退出登录</div>
      </transition>
      
       
  </div>
  
</template>

<script>
export default {
  data(){
    return{
      show1:false
    }
  },
   methods:{
     show(){
       this.show1 = !this.show1
     },
      back(){
        this.$message({
          message:"退出登录",
          type:"success"
        })
        this.$router.replace("/login")
      }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
  .header
    width 100vw
    height 80px
    background linear-gradient(45deg, #6699FF 17%,#66CCFF 40%,#CC99FF 66%,#CC66FF 80% )
    display flex
    justify-content space-between
    align-items center
    padding-right 40px
    padding-left 20px
    .tit
      color $f-c2
      font-weight bold
      letter-spacing 1rem
    .right
        height 100%
        display flex
        align-items center
       
        .el-image{
          width 55px
          height 55px
          border-radius 50%
        }
        .h
          height 40px
          font-size 25px
          margin-left 20px
          color #fff
          font-weight bold 
          position relative
          cursor pointer
    .box
          position absolute
          top 70px
          right 28px
          width 80px
          height 30px
          line-height 30px
          text-align:center
          background rgba(204,153,255,0.5)
          color $one-color
          cursor pointer
          font-weight bold  
          z-index 999     
         
        


     
</style>