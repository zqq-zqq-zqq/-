<template>
  <div class="block">
      <el-button type="danger" plain @click="willDel()">删除</el-button>
  </div>
</template>

<script>
export default {
    props:['idx'],
    data(){
        return{
            isshow:false
        }
    },
    methods:{

        willDel(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            }).then(() => {
            this.$emit('del',this.idx)
            }).catch(() => {
            this.isshow=false    
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
            });
        }
    }
}
</script>


<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
.block
    display inline-block
// .el-button
//     width 60px
//     margin-top 10px
    
</style>