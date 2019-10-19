<template>
    <div>

      <mt-header title="我的订单">
        <router-link to="/mine" slot="left">
          <mt-button icon="back" @click="lastpage">返回</mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
      </mt-header>

      <!--父容器填充-->
    <div id="corder_loadmore" ref="wrapper" :style="{height:this.wrapperHeight+'px'}">
      <mt-loadmore :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore"
                   :autoFill="autoFill">

      <!-- tab-container -->

          <ul v-if="this.orderList!=null">
            <li class="orderItem_container"
                v-for="order in this.orderList"
                :key="order.orderNo">

              <div class="orderContainer">
                <div class="orderinfo">
                  <span class="orderNo" v-text="'订单号: ' + order.orderNo"></span>
                  <span  class="orderStatus" v-text=" order.statusDesc"></span>
                </div>
                <div class="orderContentContainer">
                  <ul>
                    <li class="orderItemContainer" v-for="orderItem in order.orderItemVOList" :key="order.orderNo">
                      <img class="productImage" :src="'http://img.cdn.imbession.top/'+orderItem.productImage" >
                      <div class="OrderItemInfo">
                        <p  class="productName" v-text="orderItem.productName"></p>
                        <p  class="quantity" v-text="'数量'+orderItem.quantity"></p>
                        <p class="totalprice" v-text="'总价格￥'+orderItem.totalPrice"></p>
                      </div>
                    </li>
                  </ul>
                  <div class="orderBtnDiv" v-if="order.status==10">
                    <mt-button class="orderBtn" size="small" @click="gotoOrderDetail2(order.orderNo)">去支付</mt-button>
                  </div>
                  <div class="orderBtnDiv" v-else>
                    <mt-button class="orderBtn" size="small" @click="gotoOrderDetail2(order.orderNo)">查看订单详情</mt-button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul v-else>
              无该类订单
          </ul>




    </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
        name: "MyOrder",
      data(){
          return {
            wrapperHeight:0,
            autoFill:true,
            allLoaded:false,
            pageModel:{},
            orderStatus:null
          }

      },
      computed:{
        orderList:function () {
          if(this.pageModel.list=="undefined"){
            return null;
          }
          else{
            return this.pageModel.list
          }
        }
      },
      methods:{
        ...mapActions(['setIsShowFooterBar','setOrderNo']),
        ...mapGetters(['getOrderStatus']),
        lastpage:function () {
          this.setIsShowFooterBar(true)
        },
        loadTop:function() {
          this.getMyOrderList('refresh',1,10)

          // 加载更多数据
          // this.$refs.loadmore.onTopLoaded();
        },
        loadBottom:function() {
          // 加载更多数据
          console.log("=======加载更多===")
          // this.$refs.loadmore.onBottomLoaded();
          console.log(this.pageModel.pageNum);
          if(this.pageModel.hasNextPage){
            this.getMyOrderList("loadmore",this.pageModel.pageNum+1,10)
          }else{
            this.allLoaded=true
            this.$refs.loadmore.onBottomLoaded();
          }
        },
        getMyOrderList:function (optype,pageNo,pageSize) {
          var _vm=this
          if(this.orderStatus==-1){
            this.service.post("/order/list.do",{
              "pageNum":pageNo,
              "pageSize":pageSize
            })
              .then(function(response){
                //_vm.orderList.push(response.data.data.list);
                console.log(response)
                if(optype=='refresh'){
                  _vm.pageModel=response.data.data
                  //组件消失动画效果
                  _vm.$refs.loadmore.onTopLoaded();
                  _vm.allLoaded=false
                }else if(optype=='loadmore'){
                  if(response.data.data.list.length>0){
                    const oldOrders= _vm.pageModel.list
                    console.log("=========旧数据===")
                    console.log(oldOrders)
                    var orderItem;
                    // for( var i=0 ;i<oldOrders.length;i++){
                    // response.data.data.list.splice(0,0,oldOrders[i])
                    // }
                    //将旧列表中的数据和新列表中的数据合并，重新赋值
                    var newArrayOrder=oldOrders.concat(response.data.data.list)
                    // 将新的数据返回给数据库
                    response.data.data.list=newArrayOrder
                    console.log("=========新数据===")
                    console.log( response.data.data.list)
                  }else{
                    //加载完成
                    _vm.allLoaded = true;// 若数据已全部获取完毕
                  }
                  _vm.pageModel=response.data.data
                  console.log("loadmore=")
                  console.log( _vm.pageModel.list)
                  _vm.$refs.loadmore.onBottomLoaded();
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
          else {
            this.service.post("/order/list2.do", {
              "pageNum": pageNo,
              "pageSize": pageSize,
              "orderStatus":this.orderStatus
            })
              .then(function (response) {
                //_vm.orderList.push(response.data.data.list);
                console.log(response)
                if (optype == 'refresh') {
                  _vm.pageModel = response.data.data
                  //组件消失动画效果
                  _vm.$refs.loadmore.onTopLoaded();
                  _vm.allLoaded = false
                } else if (optype == 'loadmore') {
                  if (response.data.data.list.length > 0) {
                    const oldOrders = _vm.pageModel.list
                    console.log("=========旧数据===")
                    console.log(oldOrders)
                    var orderItem;
                    // for( var i=0 ;i<oldOrders.length;i++){
                    // response.data.data.list.splice(0,0,oldOrders[i])
                    // }
                    //将旧列表中的数据和新列表中的数据合并，重新赋值
                    var newArrayOrder = oldOrders.concat(response.data.data.list)
                    // 将新的数据返回给数据库
                    response.data.data.list = newArrayOrder
                    console.log("=========新数据===")
                    console.log(response.data.data.list)
                  } else {
                    //加载完成
                    _vm.allLoaded = true;// 若数据已全部获取完毕
                  }
                  _vm.pageModel = response.data.data
                  console.log("loadmore=")
                  console.log(_vm.pageModel.list)
                  _vm.$refs.loadmore.onBottomLoaded();
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        },
        gotoOrderDetail2:function (orderNo) {
          this.setOrderNo(orderNo)
          this.$router.push("/orderDetail2")
        }
      },
      mounted(){
          this.setIsShowFooterBar(false)
          this.orderStatus=this.getOrderStatus()
        this.getMyOrderList('refresh',1,10)
        console.log("=====mounted====")

        // 界面高度-控件高度
        this.wrapperHeight = document.documentElement.clientHeight
          -this.$refs.wrapper.getBoundingClientRect().top;
        console.log(this.wrapperHeight)

      },
    }
</script>

<style scoped lang="stylus">
  /*@import "~styles/mixins.styl"*/
  #corder_loadmore
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; // 解决ios滑动不流畅的问题
    .orderItem_container
      width 95%
      margin 0px auto
      background #f0f0f0
      border-radius .1rem
      .orderContainer
        width 90%
        margin 0px auto
        .orderinfo
          display flex
          margin-top .2rem
          justify-content space-between
          padding-top .2rem
          padding-bottom .2rem
          border-bottom 1px solid #ffffff
      list-style none
      .orderContentContainer
        margin-top: .4rem

        .orderItemContainer
          display flex
          margin-top .2rem

          .OrderItemInfo
            width 90%
            margin-left .2rem
            position relative
            /*background red*/
            display flex
            flex-direction column
          .productImage
            width 0.618rem
            height 1rem
          .productName
            overflow :hidden
            white-space :nowrap
            text-overflow:ellipsis
          .quantity
            margin-top .1rem
          .totalprice
            margin-top .1rem
      .orderBtnDiv
        position relative
        /*background yellow*/
        height .9rem

      .orderBtn
        position absolute
        right .2rem
        bottom .2rem
</style>
