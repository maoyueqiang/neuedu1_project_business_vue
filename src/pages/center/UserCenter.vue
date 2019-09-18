<template>
  <div>
  <mt-header title="个人中心">
    <router-link to="/" slot="left">
      <mt-button icon="back" @click="lastpage">返回</mt-button>
    </router-link>
    <!--<mt-button icon="more" slot="right"></mt-button>-->
  </mt-header>
    <mt-field label="用户名"  :readonly="readonly" v-model="this.getUser.username"></mt-field>
    <mt-field label="邮箱" :readonly="readonly" type="email" v-model="this.getUser.email"></mt-field>
    <mt-field label="手机号"  :readonly="readonly" type="tel" v-model="this.getUser.phone"></mt-field>
    <mt-field label="密保问题" :readonly="readonly" type="number" v-model="this.getUser.question"></mt-field>

  </div>
</template>

<script>
  import {mapGetters} from  'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "UserCenter",
      data(){
          return {
            readonly:true
          }
      },
      methods:{
          ...mapActions(['setIsShowFooterBar']),
        lastpage:function(){
            this.setIsShowFooterBar(true)
          this.$router.go(-1)
        },
      },
      computed:{
          ...mapGetters([
            'getUser'
          ])
      }


    }
</script>

<style scoped>

</style>
