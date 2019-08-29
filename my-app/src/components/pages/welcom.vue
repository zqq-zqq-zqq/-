<template>
<div>
     <div class="imgs">
      
    </div>
    <transition  enter-active-class="animated bounceInRight">
         <div class="tit">**后台管理系统欢迎您！！！</div>
    </transition>
   
</div>
 
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
    .imgs
        position  absolute 
        top 0
        left 0
        width 100%
        height 100%
       
        img 
            width 100%
            height 100%
            opacity 0.5
     .tit
        color $font-color1
        margin-top 15% 
        margin-left 20%
        font-size 50px
        letter-spacing 1rem
        color #6699FF
      
       
</style>