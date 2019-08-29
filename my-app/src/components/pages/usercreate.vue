<template>
  <div>
       <div style="margin: 40px;"></div>
        <el-form  :model="user" status-icon :rules="rules" ref="user" style="width:900px"   label-width="100px"  class="demo-ruleForm">
            <el-form-item label="用户名" prop="name" required>
                <el-input :disabled="id!=0" type="text" placeholder="用户名长度为6-16位，可包含中文，数字，字母，下划线" v-model="user.name" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item status-icon label="密码" prop="pass" required>
                <el-input :disabled="id!=0" type="password" placeholder="密码长度为4-16位，可包含数字，字母，下划线" v-model="user.pass" show-password ></el-input>
            </el-form-item>
            <el-form-item v-if="id==0" label="确认密码" prop="confirm" required>
                <el-input   :disabled="id!=0" type="password" placeholder="请再次输入密码" v-model="user.confirm" show-password ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="tel" >
                <el-input type="text" placeholder="请填写手机号" v-model="user.tel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" >
                <el-input type="text" placeholder="请填写邮箱地址" v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" >
                <el-radio v-model="user.sex" label="男">男</el-radio>
                <el-radio v-model="user.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="身份证号" prop="idx" >
                <el-input type="text" placeholder="请填写身份证号码" v-model="user.idx"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="des" >
                <el-input type="text" placeholder="请填写备注" v-model="user.des"></el-input>
            </el-form-item>
           <div class="block">
                <el-form-item label="出生日期" prop="time" >
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
import API from "../../public/js/api"
export default {
    data(){
        //用户名
        var validateName = (blur,value,callback)=>{
            let reg =  /^[\u4E00-\u9FA5A-Za-z0-9_]{6,16}$/
            let flag = reg.test(value)
            if(value==""){
                 callback(new Error("请输入账号"))
            }else{
                if(flag){
                    callback()
                }else{
                    callback("用户名长度为6-16位，可包含中文，数字，字母，下划线")
                }
            }
        }
        //密码
        var validatePass = (blur,value,callback)=>{
            let reg =/^[a-zA-Z0-9_]{6,16}$/
            let flag = reg.test(value)
            if(value==""){
                callback("请输入密码")
            }else{
                if(flag){
                    callback()
                }else{
                    callback(new Error("密码长度为6-16位，可包含数字，字母，下划线"))
                }
            }
        }
        var validateConfirm = (blur,value,callback)=>{
            if(value==''){
                 callback("请确认密码")
            }else{
                if(this.user.confirm == this.user.pass){
                    callback()
                }else{
                    callback(new Error("密码输入不一致"))
                }
            }    
        } 
        var  validateTel = (blur,value,callback)=>{
            let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            let flag = reg.test(value)
            if(value == ''){
                callback("请输入手机号")
            }else{
                if(flag){
                    callback()
                }else{
                    callback(new Error("手机号输入错误"))
                }
            }
        }

        var validateEmail = (blur,value,callback)=>{
            let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            let flag = reg.test(value)
            if(value==''){
                callback("请输入邮箱地址")
            }else{
                if(flag){
                    callback()
                }else{
                    callback("邮箱地址输入错误")
                }   
            }
        }
         var validateIdx = (blur,value,callback)=>{
            let reg = /^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$/
            let flag = reg.test(value)
            if(value==''){
                callback("请输入您的身份证号")
            }else{
                if(flag){
                    callback()
                }else{
                    callback("身份证号输入错误")
                }   
            }
        }


        return{
            user:{
               name:'',
               pass:'',
               tel:'',
               email:'',
               sex:'',
               idx:'',
               des:'',
               time:'',
               confirm:''
            },
            id:'',
            rules:{ 
                 name: [
                        {validator: validateName, trigger: ['blur'] }
                    ],
                pass: [
                        { validator: validatePass, trigger: ['blur'] }
                    ],
                confirm: [
                        { validator: validateConfirm, trigger: ['blur'] }
                    ],
                tel : [
                    { validator: validateTel, trigger: ['blur'] }
                ],
                email : [
                    { validator: validateEmail, trigger: ['blur'] }
                ],
                idx : [
                    { validator: validateIdx, trigger: ['blur'] }
                ]
            }

        }
    },
    methods:{
        register(formName){
         
                this.$refs[formName].validate((valid) => {
                if (valid) {
                     this.$http({    
                        url:API.addUser,
                        method:"get",
                        params:this.user
                    }).then(d=>{
                        // console.log(d)
                        if(d.data.isok){
                            this.$message({
                                message:"恭喜您~~~"+d.data.info,
                                type: 'success'
                            })
                            this.$router.replace("/index/user/userlist")
                        }else{
                            this.$message({
                                message:"很遗憾~~~"+d.data.info,
                                type: 'error'
                            })
                        }
                    })
                } else {
                    return false;
                }
                });
        },
        updata(){
          delete this.user._id;
        //   delete this.user.confirm;
        //  console.log(this.user)
        this.$http({
            url:API.updateUser,
            method:"get",
            params:this.user
        }).then(d=>{
            if(d.data.isok){
                this.$router.replace("/index/user/userlist")
            }else{
                this.$message({
                        message:"很遗憾~~~"+d.data.info,
                        type: 'error'
                    })
            }
        })
    },
    },
    //1、通过用户列表传过来的id判断是创建还算是修改，如果为创建那么id=0,走注册事件，如果是修改，那么id!=0,走更新事件
    mounted(){
        this.id=this.$route.query.id;
        //如果id为0，就代表没有数据，如果不为0，就代表有数据，那么就查询这条数据展示在渲染在dom节点上
        if(this.id!=0){
            this.$http({
            url:API.findUser,
            method:"get",
            //查询参数为组件动态路由传过来的id
            params:{
                id:this.id
            }
        }).then(d=>{
        //若查询到了就将对应数据传给data里面定义的user对象
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

<style>

</style>