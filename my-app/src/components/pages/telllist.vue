<template>
  <div>
    <el-button type="primary" plain @click="create(0)">新增</el-button>
        <div class="tabl">
            <el-table
                :data="telllist"
                style="width:90%"
                >
                <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center">
                </el-table-column>
                <el-table-column
                align="center"
                label="题目"
                width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.tit }}</span>
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="内容"
                width="250">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.con }}</span>   
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="注册时间"
                width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.time|filterDate }}</span> 
                </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                    <el-button                    
                    type="primary"
                    plain
                    @click="create(scope.row.id)">{{isAdmin=='2'?'查看':'编辑'}}</el-button>
                    <v-del v-if="isAdmin!='2'" :idx="scope.row.id" @del="del($event)"></v-del>
                   </template> 
                </el-table-column>
            </el-table>
        </div>
  </div>
</template>

<script>
import API from "../../public/js/api"
export default {
    data(){
      return{
        isAdmin:localStorage.getItem('isAdmin'),
        telllist:[
          
        ]
      }
    },
    methods:{


      
      create(id){
        this.$router.push("/index/tell/tellcreate?id="+id)
      },
      del(id){
        this.$http({
          url:API.delNews,
          method:"get",
          patams:{
            id:id
          }
        }).then(d=>{
          if(d.data.isok){
            this.$http({
              url:API.findNews,
              method:"get",
              params:this.tell
            }).then(d=>{
              if(d.data.isok){
                this.telllist=d.data.data
              }else{
                this.$message({
                message: '很遗憾~~~'+d.data.info,
                type: 'error'
            });
              }
            })
          }
        })
      }
    },
    mounted(){
      this.$http({
        url:API.findNews,
        method:"get",
        params:{}
      }).then(d=>{
        // console.log(d)
        if(d.data.code==-1){
            this.$message({
                message: '很遗憾~~~'+d.data.info,
                type: 'error'
            });
            this.$router.replace("/login")
        }
        if(d.data.isok){
          this.telllist=d.data.data
        }else{
          this.$message({
                message: '很遗憾~~~'+d.data.info,
                type: 'error'
            });
        }
      })
    }
}
</script>


<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
.btn
    display flex
.el-table
    margin-top 20px
    max-height 800px
   
</style>