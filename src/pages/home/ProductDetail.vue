<template>
  <div>
  <mt-header title="商品详情">
    <router-link to="/" slot="left" >
      <mt-button icon="back" @click="lastpage">返回</mt-button>
    </router-link>
  </mt-header>

    <div class="wrapper">
      <swiper v-if="subImageList.length>1" :options="swiperOption" >
        <!-- slides -->
        <swiper-slide v-for="(item,index) of subImageList" :key="index " v-if="index<6" data-swiper-autoplay="3000">
          <img class="swiper-img" :src="'http://img.cdn.imbession.top/'+item"/>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>

    <div>
      <p>{{productDetail.name}}</p>
      <p>库存剩余：{{productDetail.stock}}</p>
      商品单价：<span>{{price|formatMoney}}</span>
      <div class="quantity">
        要购买的数量：
        <a href="javascript:void 0" @click="minNum()">-</a>
        <input style="width: 30px;align:center" type="text" v-model="quantity" >
        <a href="javascript:void 0" @click="addNum()">+</a>
      </div>
    </div>


    <div class="buycell">
      <button class="insertcart cell" @click="insertintocart()">加入购物车</button>
      <button class="buynow cell" @click="buynow()">立即购买</button>
    </div>


    <div class="htmlcss" v-html="productDetail.detail">
    </div>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
        name: "ProductDetail",
      data(){
          return{
            productList:[],
            productDetail:{},
            subImages:"",
            quantity:1,
            swiperOption:{
              pagination:'.swiper-pagination',
              loop:true,
              autoplay:true,
              autoplayDisableOnInteraction : false
            }
          }
      },
      computed:{
        subImageList:function () {
          return this.subImages.split(",")
        },
        price:function () {
          return this.productDetail.price
        }
      },
      methods:{
        ...mapActions(['setProduct','setIsShowFooterBar']),
        ...mapGetters(['getProduct']),
        lastpage:function () {
          this.$router.go(-1)
          this.setIsShowFooterBar(true)
        },
        minNum:function () {
          if(this.quantity>1) {
            this.quantity--
          }
        },
        addNum:function () {
          this.quantity++
        },
        insertintocart:function () {
          var _vm=this
          //通过axios发请求  post
          this.service.post("/cart/add.do",{
            "productId":_vm.productDetail.id,
            "count":_vm.quantity
          }).then(function (response) {
            console.log(response)
          }).catch(function (error) {
            console.log(error)
          })
        },
        buynow:async function () {
          var _vm=this
          //通过axios发请求  post
          await this.service.post("/cart/add.do",{
            "productId":_vm.productDetail.id,
            "count":_vm.quantity
          }).then(function (response) {
            console.log(response)
          }).catch(function (error) {
            console.log(error)
          })
          _vm.setProduct(_vm.productDetail)
          console.log("全局商品"+_vm.getProduct())
          _vm.jump()
        },
        jump:function () {
          this.$router.push("/orderDetail")
        }
      },
      mounted(){
          this.setIsShowFooterBar(false)
          if(this.getProduct()==null){
            var _vm=this
            this.service.post("/product/detail.do",{
              "productId":this.$route.params.id
            }).then(function (response) {
              console.log(response)
              //当用户登录成功，保存用户信息到vuex中
              _vm.productDetail=response.data.data
              _vm.subImages=_vm.productDetail.subImages
            }).catch(function (error) {
              console.log(error)
            })
          }else{
            this.productDetail=this.getProduct()
            this.subImages=this.productDetail.subImages
          }


      }
    }
</script>

<style scoped lang="stylus">
  .wrapper >>> .swiper-pagination-bullet-active
    background :#ffffff
  .wrapper
    /*设置图片宽高自适应*/
    overflow :hidden
    width :100%
    height 7rem
    background :#eee
    .swiper-img
      width:100%
      height:7rem
  .htmlcss
    width:100%
  .quantity
    input
      border:solid 0.02rem
  .buycell
    float:right
    .insertcart
      background-color #EE7A23
      color: white
    .buynow
      background-color red
      color white
    .cell
      line-height 0.5rem
      height 0.5rem
</style>
