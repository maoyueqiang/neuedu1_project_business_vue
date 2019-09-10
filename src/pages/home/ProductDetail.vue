<template>
  <div>
  <mt-header title="商品详情">
    <router-link to="/" slot="left" >
      <mt-button icon="back" @click="lastpage">返回</mt-button>
    </router-link>
  </mt-header>
    <div v-html="productDetail.detail">
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "ProductDetail",
      data(){
          return{
            productDetail:{}
          }
      },
      methods:{
        ...mapActions(['setIsShowFooterBar']),
        lastpage:function () {
          this.$router.go(-1)
          this.setIsShowFooterBar(true)
        }
      },
      mounted(){
        var _vm=this
        this.service.post("/product/detail.do",{
          "productId":this.$route.params.id
        }).then(function (response) {
          console.log(response)
          //当用户登录成功，保存用户信息到vuex中
          _vm.productDetail=response.data.data
        }).catch(function (error) {
          console.log(error)
        })
        this.setIsShowFooterBar(false)
      }
    }
</script>

<style scoped>

</style>
