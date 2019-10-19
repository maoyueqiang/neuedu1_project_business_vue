<template>
    <div>
      <!--{{this.getUser}}-->
      <!--<button @click="setUserInfo('lisi')">点击修改</button>-->
      <mt-header title="用户登录">
        <router-link to="/mine" slot="left">
          <mt-button icon="back" >返回</mt-button>
        </router-link>
        <mt-button  @click="register" slot="right">注册</mt-button>
      </mt-header>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username" name="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" name="password"></mt-field>
      <mt-button type="primary" size="large" @click="userLogin">登录</mt-button>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex' //获取数据需导入
  import {mapActions} from 'vuex' //修改数据需导入
  import {MessageBox} from 'mint-ui'
    export default {
        name: "UserLogin",
        data(){
          return {
            username:"",
            password:""
          }
        },
        methods:{
          ...mapActions([
            'setUserInfo','setIsShowFooterBar'
          ]),
          userLogin:function () {
            //通过axios发请求  get
            // this.service.get("/user/login.do",{
            //   params:{
            //     "username":this.username,
            //     "password":this.password
            //   }
            // }).then(function (response) {
            //   console.log(response)
            // }).catch(function (error) {
            //   console.log(error)
            // }),
              //通过axios发请求  post
              var _vm=this
              this.service.post("/user/login.do",{
                  "username":this.username,
                  "password":this.password
              }).then(function (response) {
                console.log(response)
                //当用户登录成功，保存用户信息到vuex中
                if(response.data.status==0){
                  _vm.setUserInfo(response.data.data)
                  //退到上一层
                  _vm.setIsShowFooterBar(true)
                  _vm.$router.push("/mine")
                }
                else{
                  MessageBox("提示",response.data.msg)
                }
              }).catch(function (error) {
                console.log(error)
              })

          },
          register:function () {
            this.$router.push('/userRegister')
          }


        },
      computed:{
          ...mapGetters([
            'getUser'
          ])
      },
      mount(){
          this.setIsShowFooterBar(false)
      }

    }
</script>

<style scoped>

</style>
