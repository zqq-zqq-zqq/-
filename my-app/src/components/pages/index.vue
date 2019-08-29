<template>
    <div class="wrap">
       <v-header></v-header>
       <div class="content">
           <v-left></v-left>
           <v-right></v-right>
       </div>
    </div>
    
</template>

<script>
import vHeader from "../view/header.vue"
import vRight from "../view/right.vue"
import vLeft from "../view/left.vue"

export default {
    components:{
        vHeader,
        vLeft,
        vRight
    }
}
</script>

<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
.wrap
    width 100vw
    height 100vh
    display flex
    flex-direction column
    .content
        display flex
        height 100%
       
        
    

</style>