<template>
  <div>
    <div class="recommend-title">热销推荐</div>
    <ul>
      <router-link
        tag="li"
        class="item border-bottom"
        v-for="(item,index) of hots"
        :key="index"
        :to="{name:'ProductDetail',params:{id:item.id}}">
        <img class="item-img" :src="'http://img.cdn.imbession.top/'+item.mainImage"/>
        <div class="item-info">
          <p class="item-title">{{item.name}} </p>
          <p class="item-desc">{{item.subtitle}}</p>
          <p class="item-price">{{item.price|formatMoney}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "HomeHot",
      data(){
          return {
            hots:[]
          }
      },
      mounted(){
        this.gethots()
      },

      methods: {
        gethots: function () {
          var _vm = this
          //通过axios发请求  get
          this.service.get("/product/hotlist.do").then(function (response) {
            console.log(response)
            _vm.hots = response.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        ...mapActions(['setIsShowFooterBar']),
      },
      created(){
        var _vm=this
        window.onscroll = function(){
          //变量scrollTop是滚动条滚动时，距离顶部的距离
          var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
          //变量windowHeight是可视区的高度
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          //变量scrollHeight是滚动条的总高度
          var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          //滚动条到底部的条件
          if((scrollTop+windowHeight+60)>=scrollHeight){
            //写后台加载数据的函数
            console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
            _vm.setIsShowFooterBar(false)
          }else{
            _vm.setIsShowFooterBar(true)
          }
        }
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
