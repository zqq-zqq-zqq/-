<template>
  <div class="managelist" >
      <el-button type="primary" plain @click="create(0)">新增</el-button>
        <div class="tabl">
            <el-table
                :data="manageList"
                style="width: 90%"
                >
                <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center">
                </el-table-column>
                <el-table-column
                align="center"
                label="用户名"
                width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="属性"
                width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.prop }}</span>   
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
                    @click="create(scope.row.id)">编辑</el-button>
                    <v-del :idx="scope.row.id" @del="del($event)"></v-del>
                   </template> 
                </el-table-column>
            </el-table>
        </div>
  </div> 
</template>

<script>
import API from "../../public/js/api"
import axios from "axios";
export default {
    data(){
        return{
            manageList:[
                
            ]
             
        }
    },
    methods:{
        init(){
            this.$http({
            url:API.findManage,
            method:"get"
        }).then(d=>{
            // console.log(d)
            if(d.data.code==-1){
                this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        });
                this.router.replace("/login")
                return
            }
            if(d.data.isok){
                this.manageList=d.data.data
            }else{
                this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        });
            }
        })
        },
        create(id){
            this.$router.push("/index/manage/managecreate?id="+id)

        },
        del(id){
            this.$http({
                url:API.delManage,
                method:"get",
                params:{
                    id:id
                }
            }).then(d=>{
                // console.log(d)
                if(d.data.isok){
                    this.init()
                }else{
                     this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        });
                }

            })
        }
    },
    mounted(){
       
       this.init()
    }
}
</script>

<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"

.el-table
    margin-top 20px
   
    .el-table_2_column_10 .cell
        display flex 

   
</style>