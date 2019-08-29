<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to,from,next){
    var isAdmin = localStorage.getItem('isAdmin')
    if(isAdmin !="2"){
      next()
    }else{
      next("/index")
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"

</style>