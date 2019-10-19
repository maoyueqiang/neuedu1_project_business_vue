<template>
    <div>
      <mt-header title="确认订单">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click="lastpage">返回</mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>

      <p class="bigone">收货地址</p>
      <div style="padding: 0.5rem;background-color: #cccccc">
        <div>
          <p>收货人姓名：{{address.receiverName}}</p>
          <p>收货人手机号：{{address.receiverPhone}}</p>
          <p>收货地址：{{address.receiverCity}} {{address.receiverDistrict}}</p>
          <p>详细地址：{{address.receiverAddress}}</p>
        </div>
      </div>

      <p class="bigone">商品清单</p>
      <div v-for="(item,index) in order.orderItemVOList">
        <div style="background-color: #cccccc;margin: 0.2rem 0.2rem 0 0.2rem;">
          <p>{{item.productName}}</p>
          <p>商品数量：{{item.quantity}}</p>
          <p>商品单价：{{item.currentUnitPrice|formatMoney}}</p>
        </div>
      </div>
      <div style="float: right;margin-top: 0.1rem;">
        <p>总价：{{order.payment|formatMoney}}</p>
        <button v-if="order.status==10" style="width: 100%;height:0.5rem;background-color: red;color: white;line-height: 0.5rem" @click="pay">支付</button>
      </div>

    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "OrderDetail2",
      data(){
          return{
            orderNo:"",
            order:{},
            shippingId:"",
            address:{},
          }
      },
      methods:{
          ...mapGetters(['getOrderNo']),
        ...mapActions(['setOrderNo','setIsShowFooterBar']),
        lastpage:function(){
          this.$router.go(-1)
        },
        getAddress:function () {
          var _vm=this
          //通过axios发请求  post
          this.service.post("/shipping/select.do",{
            "shippingId":_vm.shippingId
          }).then(function (response) {
            console.log(response)
            _vm.address=response.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        pay:function () {
          this.setOrderNo(this.orderNo)
          this.$router.push("/qrCode")
        }
      },
      mounted() {
          this.setIsShowFooterBar(false)
          this.orderNo=this.getOrderNo()
        var _vm=this
        //通过axios发请求  post
        this.service.post("/order/detail.do",{
          "orderNo":_vm.orderNo
        }).then(function (response) {
          console.log(response)
          _vm.order=response.data.data
          _vm.shippingId=_vm.order.shippingId
          _vm.getAddress()
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
</script>

<style scoped lang="stylus">
  @import '~styles/mixins.styl'
  .recommend-title
    line-height :.8rem
    background :#eee
    margin-top:.2rem
    text-indent:.2rem
  .bigone
    height:0.4rem
    font-size:0.3rem
    font:weight
    margin-top:0.3rem
    margin-left:0.2rem
  .item
    overflow :hidden
    height:1.9rem
    display :flex
    .item-img
      width :1.7rem
      height :1.7rem
      padding :.1rem
    .item-info
      flex:1
      padding .1rem
      min-width:0
      .item-title
        line-height: .54rem
        font-size :.32rem
        ellipsis()
      .item-desc
        line-height :.4rem
        color:#ccc
        ellipsis()
      .item-price
        margin-top:.16rem
        line-height :.32rem
        font-size :.32rem
        color:red

</style>
