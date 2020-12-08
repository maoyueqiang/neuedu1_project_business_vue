<template>
  <!-- <body id="poster">
    <el-form class="login-container" label-position="left" label-width="80px"
      ref="form" :model="form" :rules="ruleForm">
      <h3 class="login_title">人力资源管理系统</h3>
      <el-form-item label="用户名"
          prop="userName">
        <el-input type="text" v-model="form.userName" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码"
          prop="userPwd">
        <el-input type="password" v-model="form.userPwd" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
            style="float:left"
            type="primary"
            @click="registry"
            :loading="logining"
          >注册</el-button>
        <el-button style="float:right" type="primary"  v-on:click="submit"
          :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </body> -->

  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-main">
        <h2 class="login_title">人力资源管理系统</h2>
        <el-form :model="form"  :rules="ruleForm" ref="form" @keyup.enter.native="submit()" status-icon>
          <el-form-item  prop="userName">
              <el-input type="text" v-model="form.userName" auto-complete="off" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="userPwd">
              <el-input v-model="form.userPwd" type="password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit" type="primary" @click="registry()" :loading="logining">注册</el-button>
            <el-button class="login-btn-submit" type="primary" @click="submit()" :loading="logining">登录</el-button>
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
        userPwd: ''
      },
      ruleForm: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.logining = true
          var _vm=this
          this.service.post("/user/login.do",{
              "userName":this.form.userName,
              "userPwd":this.form.userPwd
          }).then(function (response) {
            console.log(response)
            //当用户登录成功，保存用户信息到vuex中
            if(response.data.status==0){
              _vm.setUser(response.data.data)
              _vm.$message.success("登录成功")
              _vm.$router.push("/home")
              //退到上一层
              // _vm.$router.push("/mine")
            }
            else{
              console.log(response.data.msg)
              _vm.$message.error(response.data.msg)
            }
          }).catch(function (error) {
            _vm.$message.error(error)
          }).finally(function (){
            _vm.logining = false
          })
        }
      })
    },
    registry(){
      this.logining = true;
      this.$router.push("/register")
      // this.$router.push({
      //     name: 'Register'
      //   })
      this.logining = false
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
    position: fixed;
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
  .login-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-color: rgba(38, 50, 56, .6);
    background: url(~@/assets/login_bg.jpg) no-repeat;
    background-size: 100% 100%;
    }

    .login-content {
      border-radius: 10px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      height: 300px;
      width: 400px;
      background-color: #112234;
      opacity: .8;
    }
    .login-btn-submit{
      margin-left:100px
    }

    .login-main {
      color: beige;
      padding: 20px 20px 10px 20px;
    }
</style>
