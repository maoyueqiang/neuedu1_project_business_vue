<template>
  <div>
    <mt-header title="注册账号">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="lastpage">返回</mt-button>
      </router-link>
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码"  v-model="password"></mt-field>
    <mt-field label="密保问题"  placeholder="请输入密保问题" v-model="question"></mt-field>
    <mt-field label="密保答案" placeholder="请输入密保答案"  v-model="answer"></mt-field>
    <mt-field label="邮箱"  placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
    <mt-field label="手机号"  placeholder="请输入手机号"  type="tel" v-model="phone"></mt-field>
    <mt-field label="ip"  placeholder="请输入ip"  v-model="ip"></mt-field>
    <mt-button type="primary" size="large" @click="define()">确定</mt-button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "UserRegister",
      data(){
          return {
            username:null,
            password:null,
            question:null,
            answer:null,
            email:null,
            phone:null,
            ip:null
          }
      },
      methods:{
          ...mapActions(['setIsShowFooterBar']),
          lastpage:function () {
            this.$router.go(-1)
          },
        define:async function () {
            var _vm=this
          await this.service.post("/user/register.do",{
            "username":_vm.username,
            "password":_vm.password,
            "question":_vm.question,
            "answer":_vm.answer,
            "email":_vm.email,
            "phone":_vm.phone,
            "ip":_vm.ip
          }).then(function (response){
            console.log(response)
          }).catch(function (error) {
            console.log(error)
          })
          this.$router.push("/userLogin")
        }
      },
      mounted() {
          this.setIsShowFooterBar(false)
      }
    }
</script>

<style scoped>

</style>
