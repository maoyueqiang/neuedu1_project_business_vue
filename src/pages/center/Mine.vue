<template>
    <div>
      <p v-text="optext" @click="logic"></p>

      <p @click="toMyOrder">全部订单</p>


    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "Mine",
      data(){
          return{
            optext:"去登录",
            isLogin:false
          }

      },
      computed:{
        ...mapGetters([
          'getUser'
        ])
      },
      mounted(){
        if(JSON.stringify(this.getUser)=='{}'){
          this.optext="去登录"
          this.isLogin=false
        }
        else{
          this.optext="编辑个人信息"
          this.isLogin=true
        }
      },
      methods:{
          logic:function () {
            if(this.isLogin){
              //已经登录
              this.$router.push('/userCenter')
            }
            else{
              //未登录
              this.$router.push('/userLogin')
            }
          },
        toMyOrder:function () {
          this.$router.push('/myOrder')
        }
      }
    }
</script>

<style scoped>

</style>
