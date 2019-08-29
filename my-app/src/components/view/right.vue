<template>
  <div class="right">
    <h2>{{$route.name}}</h2>
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {

 
}

</script>

<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
.right
  padding 20px
  flex 5
  position relative
  overflow auto
  height 100%
  // width 60%
  h2
    color $f-c2
    margin-bottom 20px


</style>