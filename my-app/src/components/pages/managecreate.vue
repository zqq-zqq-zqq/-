<template>
  <div>
      <div style="margin: 40px;"></div>
      <el-form  :model="user" status-icon :rules="rules" ref="user" style="width:900px"   label-width="100px"  class="demo-ruleForm">
         <el-form-item label="账号" prop="name" required>
            <el-input :disabled="id!=0"  type="text" placeholder="账号长度为6-16位，可包含中文，数字，字母，下划线" v-model="user.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item status-icon  label="密码" prop="pass" required>
            <el-input :disabled="id!=0" type="password" placeholder="密码长度为6-16位，可包含数字，字母，下划线" v-model="user.pass" show-password ></el-input>
        </el-form-item> 
        <el-form-item v-if="id==0" label="确认密码" prop="confirm" required>
            <el-input type="password" placeholder="请再次输入密码" v-model="user.confirm" show-password ></el-input>
        </el-form-item>
        <el-form-item label="属性" prop="prop" >
            <el-input type="text" placeholder="请填写属性" v-model="user.prop"></el-input>
        </el-form-item>
        <div class="block">
            <el-form-item label="日期时间" prop="time" >
            <el-date-picker
            v-model="user.time"
            type="datetime"
            style="width:800px"
            placeholder="选择日期时间">
            </el-date-picker>
            </el-form-item>
        </div>
        <el-form-item align="center">
            <el-button type="primary" @click="register('user')" v-if="id==0">提交</el-button>
            <el-button type="primary" @click="updata()" v-if="id!=0">修改</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import API from "../../public/js/api.js"

export default {
    data(){
        //账号验证
            var validateName = (rule,value,callback)=>{
                let reg =  /^[\u4E00-\u9FA5A-Za-z0-9_]{6,16}$/
                let flag = reg.test(value)
                if(value==""){
                    callback(new Error("请输入账号"))
                }else{
                    if(flag){
                        callback()
                    }else{
                        callback(new Error("账号长度为6-16位，可包含中文，数字，字母，下划线"))
                    }
                }
            }

        //密码验证
         var validatePass = (rule, value, callback) => {
                if(this.id!=0){
                    callback()
                    return
                }
                let reg = /^[a-zA-Z0-9_]{6,16}$/;
                let flag = reg.test(value);
            if (value == '') {
                callback(new Error('请输入密码'));
            } else {
                if (flag) {
                    callback();
                }else{
                    callback(new Error('密码长度为6-16位，可包含数字，字母，下划线'))
                }
            }
        };
        var validateConfirm = (rule,value,callback)=>{
            if(value == ""){
                callback(new Error('请再次输入密码'))
            }else{
               if(value !== this.user.pass){
                   callback(new Error('密码输入不一致，请重新输入'))
               }else{
                   callback()
               }
            }
        };

        return{
            user:{
               name:'',
               prop:'' ,
               pass:'',
               time:'',
               confirm:''
            },
           
            id:"",
            rules: {
                name: [
                        {validator: validateName, trigger: ['blur','change'] }
                    ],
                pass: [
                        { validator: validatePass, trigger: ['blur','change'] }
                    ],
                confirm: [
                        { validator: validateConfirm, trigger: ['blur','change'] }
                    ]
            }
        }
    },
    methods:{
       register(formName){

           this.$refs[formName].validate((valid) => {
            if (valid) {
               this.$http({
                url:API.addManage,
                method:"get",
                params:this.user
            }).then(d=>{
                    if(d.data.isok){
                        this.$message({
                            message: '恭喜您~~~'+d.data.info,
                            type: 'success'
                        });
                        this.$router.replace("/index/manage/managelist")
                    }else{
                        this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        });
                    }
                })
            } else {
                return false;
            }
        });

            
       },
       updata(){
        //    delete this.user.confirm
           delete this.user._id
           this.$http({
               url:API.updateManage,
               method:"get",
               params:this.user
           }).then(d=>{
               if(d.data.isok){
                    
                   this.$router.replace("/index/manage/managelist")
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
        this.id=this.$route.query.id
        if(this.id !=0){
            this.$http({
            url:API.findManage,
            method:"get",
            params:{
                id:this.id
            }
        }).then(d=>{
            console.log(d)
            if(d.data.isok){
                this.user=d.data.data[0]
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
.block
    display inline-block
.el-form
    margin-top 20px !important
</style>