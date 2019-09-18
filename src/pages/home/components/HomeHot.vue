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
