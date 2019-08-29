<template>
  <div>
      <el-button v-if="isAdmin!='2'"   type="primary" plain @click="create(0)">新增</el-button>
  
            <el-table
                :data="devicelist"
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
                label="IP地址"
                width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ip }}</span>
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="机房"
                width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.door }}</span>   
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="编号"
                width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.num }}</span> 
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="宽带"
                width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.width }}</span> 
                </template>
                </el-table-column>
                <el-table-column
                align="center"
                label="状态"
                width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.status }}</span> 
                </template>
                </el-table-column>
                <el-table-column label="操作" align="center" >
                    <template slot-scope="scope">
                    <el-button 
                    v-if="isAdmin!='2'"                     
                    type="primary"
                    plain
                    @click="create(scope.row.id)">编辑</el-button>
                    <v-del   v-if="isAdmin!='2'" :idx="scope.row.id" @del="del($event)"></v-del>
                    <el-button 
                    v-if="isAdmin=='2'"                   
                    type="primary"
                    plain
                    @click="buy(scope.row.id)" :disabled="scope.row.status=='已出售'">购买</el-button>
                   </template> 
                </el-table-column>
            </el-table>
  </div>
</template>

<script>
import API from "../../public/js/api"
export default {
    data(){
      return{
        isAdmin:localStorage.getItem('isAdmin'),
        devicelist:[
          
        ],
     
      }
    },
    methods:{
        buy(id){
            this.$http({
                url:API.updateDevice,
                method:"get",
                params:{    
                    id:id,
                    status:'已出售',
                    }
            }).then(d=>{
                if(d.data.isok){                    
                   this.$router.push("/index/device/devicecreate?id="+id)
                }else{
                    this.$message({
                                message:"d.data.info",
                                type:"error"
                    })
                      
                }
            })

        },

        create(id){
            this.$router.push("/index/device/devicecreate?id="+id)
        },
        del(id){
            this.$http({
                url:API.delDevice,
                method:"get",
                params:{id:id}
            }).then(d=>{
                if(d.data.isok){
                     this.$http({
                        url:API.findDevice,
                        method:"get",
                        params:{}
                    }).then(d=>{
                        if(d.data.code==-1){
                            this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        });
                        this.$router.replace("/login")
                        }
                    
                        if(d.data.isok){
                            this.devicelist=d.data.data
                        }else{
                            this.$message({
                                message:"d.data.info",
                                type:"error"
                            })
                        }
                    })
                }
            })
        }
    },
    mounted(){
        this.$http({
            url:API.findDevice,
            method:"get",
            params:{}
        }).then(d=>{
            if(d.data.code==-1){
                this.$message({
                message: '很遗憾~~~'+d.data.info,
                type: 'error'
            });
            this.$router.replace("/login")
            }
           
            if(d.data.isok){
                this.devicelist=d.data.data
            }else{
                this.$message({
                    message:"d.data.info",
                    type:"error"
                })
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
   
</style>