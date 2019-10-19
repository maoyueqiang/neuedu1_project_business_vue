<template>
    <div class="header">
      <div class="header-left">
        <span class="iconfont">&#xe600;</span>
      </div>
      <div class="header-content">
        <span class="iconfont">&#xe62b;</span>
        <input class="warn" placeholder="请输入要搜索的商品" v-model="productname">
        <button class="search" @click="findByKeyword">搜索</button>
      </div>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {Toast} from 'mint-ui'
    export default {
        name: "HomeHeader",
      data(){
          return {
            productname:null
          }
      },
      methods:{
          ...mapActions(['setKeyword','setCategoryId']),
        findByKeyword:function () {
            if(this.productname==null){
              Toast({
                message: '请输入内容',
                position: 'center',
                duration: 3000
              });
            }
          else {
              this.setKeyword(this.productname)
              this.setCategoryId(null)
              this.$router.push("/productList")
            }
        }

      }
    }
</script>

<!--scoped作用：使style内的样式只作用于本组件-->
<style scoped lang="stylus">
@import '~styles/varibles.styl'
.header
  height:0.88rem
  line-height:0.88rem
  background-color: $bgColor
  display :flex
  .header-left
    width:.72rem
    height:.72rem
    color: white
  .iconfont
    margin-left :0.15rem
    font-size:.55rem
  .header-content
    flex:1
    background-color :white
    height:.6rem
    line-height:.6rem
    margin-top:.14rem
    margin-right:.2rem
    border-radius:.1rem
    -webkit-border-radius :.1rem
    -moz-border-radius :.1rem
    .warn
      margin-left :.1rem
      height:.6rem
      line-height:.6rem
      margin-bottom :0.26rem
      width:5.2rem
    .search
      height:.6rem
      line-height:.6rem
      margin-bottom :0.26rem
      margin-right:0.2rem
      float:right
      font-size :0.4rem
      color :blue
      background-color white
</style>
