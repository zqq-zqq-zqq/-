<template>
  <div>
      <div style="margin: 40px;"></div>
      <el-form  :model="tell"   ref="user" style="width:900px"   label-width="100px"  class="demo-ruleForm">
         <el-form-item label="题目" prop="tit" >
            <el-input :disabled="isAdmin=='2'" type="text" placeholder="请填写题目" v-model="tell.tit" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="con" >
            <el-input :disabled="isAdmin=='2'" type="text" placeholder="请填写内容" v-model="tell.con"  ></el-input>
        </el-form-item>
        <div class="block">
            <el-form-item label="注册时间" prop="time" >
            <el-date-picker
            v-model="tell.time"
            type="datetime"
            style="width:800px"
            :disabled="isAdmin=='2'"
            placeholder="选择日期时间">
            </el-date-picker>
            </el-form-item>
        </div>
        <el-form-item align="center">
            <el-button type="primary" @click="create()" v-if="id==0">提交</el-button>
            <el-button type="primary" @click="updata()" v-if="id!=0">修改</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import API from "../../public/js/api"
export default {
    data(){
        return{
            tell:{
                tit:'',
                con:'',
                time:''
            },
            isAdmin:localStorage.getItem('isAdmin'),
            id:''
        }
    },

    methods:{
        create(){
            this.$http({
                url:API.addNews,
                method:"get",
                params:this.tell,
            }).then(d=>{
                if(d.data.isok){
                    this.$message({
                        message: '恭喜您~~~'+d.data.info,
                        type: 'success'
                    });
                    this.$router.replace("/index/tell/telllist")
                }else{
                     this.$message({
                        message: '很遗憾~~~'+d.data.info,
                        type: 'error'
                    });
                }
            })
        },
        updata(){
           delete this.tell._id
            this.$http({
                url:API.updateNews,
                method:"get",
                params:this.tell
            }).then(d=>{
                if(d.data.isok){
                    
                    this.$router.push("/index/tell/telllist")
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
        this.id = this.$route.query.id
        if(this.id!=0){
            this.$http({
            url:API.findNews,
            method:"get",
            params:{
                id:this.id
            }
        }).then(d=>{
            if(d.data.isok){
                this.tell=d.data.data[0]
            }else{
                 this.$message({
                        message: '很遗憾~~~'+d.data.info,
                        type: 'error'
                    });
            }
        })
        }
       
    }
}
</script>


<style lang="stylus" scoped>
@import "../../public/stylus/index.styl"
.btn
    display flex

</style>