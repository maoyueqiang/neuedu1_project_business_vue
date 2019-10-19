<template>
    <div>
      <!--<div class="icons" >-->
        <!--<div class="icon">-->
          <!--<div id="update" class="icon-img"  >-->
            <!--<img class="icon-img-content" :src="image"/>-->
          <!--</div>-->
          <!--<p class="icon-desc" @click="logic" v-text="optext"></p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="order">-->
        <!--<p @click="toMyOrder" class="order-order">我的订单</p>-->
      <!--</div>-->

      <div class="head">
        <div class="avatar">
          <img :src=image>
        </div>
        <div class="profile">
          <p class="icon-desc" @click="logic" v-text="optext"></p>
        </div>
      </div>
      <div class="order">
        <div class="order-icon">
          <img src="image/order.png" alt="">
          <p>我的订单</p>
        </div>
        <div class="order-more">
          <p @click="toMyOrder(-1)">查看全部订单 ></p>
        </div>
      </div>
      <div class="mine-nav">
        <div @click="toMyOrder(10)" >
          <span class="iconfont">&#xe607;</span>
          <p>待付款</p>
        </div>
        <div @click="toMyOrder(20)" >
          <span class="iconfont">&#xe618;</span>
          <p>待发货</p>
        </div>
        <div @click="toMyOrder(40)" >
          <span class="iconfont">&#xe62f;</span>
          <p>已发货</p>
        </div>
        <div @click="toMyOrder(50)" >
          <span class="iconfont">&#xe6a1;</span>
          <p>交易成功</p>
        </div>
        <div @click="toMyOrder(0)" >
          <span class="iconfont">&#xe601;</span>
          <p>已取消</p>
        </div>
      </div>
    </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "Mine",
      data(){
          return{
            optext:"去登录",
            isLogin:false,
            image:""
          }

      },
      computed:{
        ...mapGetters(['getUser'])
      },
      mounted(){
          this.setIsShowFooterBar(true)
        console.log("用户："+JSON.stringify(this.getUser))
        if(JSON.stringify(this.getUser)=='{}'){
          this.optext="去登录"
          this.isLogin=false
          this.image="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=310329945,3969783838&fm=26&gp=0.jpg"
        }
        else{
          this.optext="查看个人信息"
          this.isLogin=true
          this.image=this.getUser.image
        }
      },
      methods:{
          logic:function () {
            if(this.isLogin){
              //已经登录
              this.setIsShowFooterBar(false)
              this.$router.push('/userCenter')
            }
            else{
              //未登录
              this.setIsShowFooterBar(false)
              this.$router.push('/userLogin')
            }
          },
        ...mapActions(['setOrderStatus','setIsShowFooterBar']),
        toMyOrder:function (orderStatus) {
            this.setOrderStatus(orderStatus)
          this.$router.push('/myOrder')
        }
      }
    }
</script>

<style scoped  lang="stylus">
  @import '~styles/varibles.styl'
.head
  display: flex
  padding :5%
  background-color $bgColor
  .avatar
    height: 1.2rem
    width: 1.2rem
    img
      width: 100%
      height: 100%
      border-radius: 50%
  .profile
    margin-left: 10%
    p
      margin-top:0.35rem
      color: white
      font-size 0.4rem
      letter-spacing: 0.04rem
.order
  padding: 5%
  .order-icon
    display: flex
    width: 3.6rem
    height: 0.5rem
    float: left
    img
      width: 0.4rem
      height: 0.4rem
    p
      margin-left: 5%
  .order-more
    float: right
    p
      letter-spacing: 0.02rem
      color #20a0ff
      font-size: 0.3rem
.mine-nav
  padding: 5% 5% 5% 5%
  background-color: #ffffff
  height: 60px
  div
    display:inline-block
    text-align center
    width: 19%
    .iconfont
      font-size:1.1rem
    p
      color: #262626
      font-size: 14px
      margin-top: 5%
</style>
