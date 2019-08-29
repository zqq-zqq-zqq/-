<template>
  <div>
       <div style="margin: 40px;"></div>
       <el-form  :model="device" :rules="rules"  ref="device" style="width:900px"   label-width="100px"  class="demo-ruleForm">
         <el-form-item label="IP地址" prop="ip" >
            <el-input type="text" :disabled="isAdmin==2" placeholder="请填写IP地址" v-model="device.ip" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="机房" prop="door" >
            <el-input type="text" :disabled="isAdmin==2" placeholder="请填写机房号" v-model="device.door"  ></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="num" >
            <el-input type="text" :disabled="isAdmin==2" placeholder="请填写编码" v-model="device.num"  ></el-input>
        </el-form-item>
         <el-form-item label="宽带" prop="width" >
            <el-input type="text" :disabled="isAdmin==2" placeholder="请填写宽带" v-model="device.width"  ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" >
                <el-radio v-model="device.status" label="空闲">空闲</el-radio>
                <el-radio v-model="device.status" label="已出售">{{isAdmin==2?'购买':'已出售'}}</el-radio>
        </el-form-item>
        <el-form-item align="center">
            <el-button type="primary" @click="create('device')" v-if="id==0">提交</el-button>
            <el-button type="primary" @click="updata()" v-if="id!=0">{{isAdmin==2?'购买':'修改'}}</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import API from "../../public/js/api"
export default {

    data(){
         var validateIp = (rule, value, callback) => {
            var reg = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/
            var flag= reg.test(value)
            if (value == '') {
                callback(new Error('请输入ip地址'));
            } else {
                if (flag) {
                    callback();
                }
                callback("请输入正确的ip地址");
            }
        };
        return{
             rules: {
                ip: [
                    { validator: validateIp, trigger: 'blur' }
                ]
             },

            isAdmin:localStorage.getItem('isAdmin'),
            device:{
               ip:'',
               door:'',
               num:'',
               width:'',
               status:''     
            },
            id:''
        }
    },
    methods:{
        create(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http({
                    url:API.addDevice,
                    method:"get",
                    params:this.device
                    }).then(d=>{
                        if(d.data.isok){
                            this.$router.replace("/index/device/devicelist")
                            this.$message({
                                message: '恭喜您~~~'+d.data.info,
                                type: 'success'
                            });
                        
                        }else{
                            this.$message({
                            message: '很遗憾~~~'+d.data.info,
                            type: 'error'
                        })   
                        }
                    })
                        
                    } else {
                        return false
                     }
                });   


            
        },
        updata(){
            delete this.device._id
            this.$http({
                url:API.updateDevice,
                method:"get",
                params:this.device
            }).then(d=>{
                if(d.data.isok){
                    this.$router.push("/index/device/devicelist")
                }else{
                    this.$message({
                    message: '很遗憾~~~'+d.data.info,
                    type: 'error'
                  })   
                }
            })
        }
    },

    mounted(){
        this.id=this.$route.query.id;
        if(this.id!=0){
            this.$http({
                url:API.findDevice,
                method:"get",
                params:{id:this.id}
            }).then(d=>{
                if(d.data.isok){
                    this.device=d.data.data[0]
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