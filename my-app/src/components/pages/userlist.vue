<template>
  <div>
      <!-- id为0时走新增事件，id！=0时，走修改事件 -->
      <el-button type="primary" plain @click="create(0)">新增</el-button>
        <el-table
            :data="userList"
            style="width: 90%"
            max-height="250">
            <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
            prop="name"
            label="用户名"
            align="center"
            width="100">
            </el-table-column>
            <el-table-column
            prop="tel"
            align="center"
            label="电话"
            width="120">
            </el-table-column>
            <el-table-column
            prop="email"
            align="center"
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="50">
            </el-table-column>
            <el-table-column
            prop="idx"
            align="center"
            label="身份证"
            width="220">
            </el-table-column>
            <el-table-column
            prop="des"
            label="备注"
            align="center"
            width="100">
            </el-table-column>
            <el-table-column
            label="时间"
            align="center"
            width="100">
            <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.time|filterDate }}</span> 
                </template>
            </el-table-column>            
            <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="200">
            <template slot-scope="scope">
                <el-button                    
                    type="primary"
                    plain
                    @click="create(scope.row.id)">
                    编辑</el-button>
                <v-del :idx="scope.row.id" @del="del($event)"></v-del>                
            </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
import API from "../../public/js/api"
export default {
    props:["idx"],
    data(){
        return{
           
            userList:[
               
            ]
             
        }
    },
    methods:{
        //修改数据，需要对应id来锁定修改那一条数据，所以通过动态路由传参跳转到对应页面
        create(id){
            this.$router.push("/index/user/usercreate?id="+id)
        },
        del(id){
           this.$http({
               url:API.delUser,
               method:"get",
               params:{
                   id:id
               }
           }).then(d=>{
               if(d.data.isok){
                    this.$message({
                            message: '恭喜您~~~'+d.data.info,
                            type: 'success'
                        });
                   this.$http({
                       url:API.findUser,
                       method:"get",
                       params:{}
                   }).then(d=>{
                       if(d.data.isok){
                           this.userList=d.data.data
                       }else{
                            this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        });
                       }
                   })
               }else{
                    this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        });
               }
           })
        }
    },
    //1、打开页面第一步就是查询是否有数据，如果有数据就数据赋给userlist渲染在页面上，如果没有就走新增
    mounted(){
       this.$http({
           url:API.findUser,
           method:"get",
           params:{}
       }).then(d=>{
        if(d.data.code==-1){
             this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        });
            this.$router.replace("/login");
            return
        }
        if(d.data.isok){
            this.userList=d.data.data
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

.el-table
    margin-top 20px 

</style>