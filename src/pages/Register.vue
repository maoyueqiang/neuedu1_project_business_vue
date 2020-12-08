<template>
  <div class="login-wrapper1">
    <div class="login-content1">
      <div class="login-main">
        <el-form :model="form"
          :rules="ruleForm"
          label-position="right"
          label-width="80px"
          ref="form"
          @keyup.enter.native="submit()"
          status-icon
          >
          <el-form-item
            label="用户名"
            prop="userName"
          >
            <el-input
              type="text"
              v-model="form.userName"
              auto-complete="off"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="userEmail"
          >
            <el-input
              type="email"
              v-model="form.userEmail"
              auto-complete="off"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          <el-form-item
            label="手机"
            prop="userPhone"
          >
            <el-input
              type="text"
              v-model="form.userPhone"
              auto-complete="off"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item
            label="身份"
            prop="userAuthor"
          >
            <el-input
              type="text"
              v-model="form.userAuthor"
              auto-complete="off"
              placeholder="请输入身份"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="userPwd"
          >
            <el-input
              type="password"
              v-model="form.userPwd"
              auto-complete="off"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="userConfirmPwd"
          >
            <el-input
              type="password"
              v-model="form.userConfirmPwd"
              auto-complete="off"
              placeholder="请再一次输入密码"
            />
          </el-form-item>
          <el-form-item
            label="真实姓名"
            prop="userinfoName"
          >
            <el-input
              type="text"
              v-model="form.userinfoName"
              auto-complete="off"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item
            label="身份证号"
            prop="userinfoIdcard"
          >
            <el-input
              type="text"
              v-model="form.userinfoIdcard"
              auto-complete="off"
              placeholder="请输入身份证号"
            />
          </el-form-item>
          <el-form-item
            label="性别"
            prop="userinfoSex"
          >
            <el-input
              type="text"
              v-model="form.userinfoSex"
              auto-complete="off"
              placeholder="性别"
            />
          </el-form-item>
          <el-form-item
            label="出生日期"
            prop="userinfoBirth"
          >
            <el-input
              type="text"
              v-model="form.userinfoBirth"
              auto-complete="off"
              placeholder="请输入出生日期"
            />
          </el-form-item>
          <el-form-item
            label="住址"
            prop="userinfoAddr"
          >
            <el-input
              type="text"
              v-model="form.userinfoAddr"
              auto-complete="off"
              placeholder="请输入住址"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn-submit1"
              type="primary"
              @click="reset"
              :loading="logining"
            >
              重置
            </el-button>
            <el-button
              class="login-btn-submit1"
              type="primary"
              @click="register"
              :loading="logining"
            >注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      logining: false,
      form: {
        userName: '',
        userEmail:'',
        userPhone:'',
        userAuthor:'',
        userPwd: '',
        userConfirmPwd:'',
        userinfoName:'',
        userinfoIdcard:'',
        userinfoSex:'',
        userinfoBirth:null,
        userinfoAddr:''
      },
      ruleForm: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        userEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        userAuthor: [
          { required: true, message: '请输入身份', trigger: 'blur' },
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        userConfirmPwd: [
          { required: true, message: '请确认密码', trigger: 'blur' },
        ],
        userinfoIdcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        userinfoSex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
        ],
        // userinfoBirth: [
        //   { required: true, message: '请输入出生日期', trigger: 'blur' },
        // ]
      }
    }
  },
  methods: {
    reset(){
      this.logining = true;
      this.$refs['form'].resetFields();
      this.logining = false;
    },
    register() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          var _vm=this
          if(this.form.userPwd != this.form.userConfirmPwd){
            _vm.$message.warning("两次密码输入不一致");
            return false;
          }
          this.logining = true;
          this.service.post("/user/register.do",{
              "userName":this.form.userName,
              "userEmail":this.form.userEmail,
              // "userPhone":this.form.userPhone,
              "userAuthor":this.form.userAuthor,
              "userPwd":this.form.userPwd,
              "userConfirmPwd":this.form.userConfirmPwd,
              // "userinfoName":this.form.userinfoName,
              "userinfoIdcard":this.form.userinfoIdcard,
              "userinfoSex":this.form.userinfoSex,
              // // "userinfoBirth":this.form.userinfoBirth,
              // "userinfoAddr":this.form.userinfoAddr
          }).then(function (response) {
            console.log(response)
            if(response.data.status==0){
              //转到登录界面
              _vm.$router.push("/login")
            }
            else{
              _vm.$message.error(response.data.msg)
            }
          }).catch(function (error) {
            _vm.$message.error(error)
          }).finally(function (){
            _vm.logining = false
          })
        }
      })
    }
  }
}

</script>
<style>
  /* #poster {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
  }
  body{
    margin: 0px;
    padding: 0;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  } */
  .login_title {
    margin: 0px auto 40px auto;
    font-size: 22px;
    text-align: center;
  }
  .login-wrapper1 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    min-height: 800px;
    overflow: hidden;
    background-color: rgba(38, 50, 56, .6);
    background: url(~@/assets/login_bg.jpg) no-repeat;
    background-size: 100% 100%;
  }

  .login-content1 {
    border-radius: 10px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 3% auto;
    width: 400px;
    background-color: #112234;
    opacity: .8;
  }
  .login-btn-submit1{
    margin-left:40px
  }
  .login-main {
    color: beige;
    padding: 20px 20px 10px 20px;
  }
  .el-form-item__label{
    color:white;
  }
</style>
