<template>
    <div>
      <router-view></router-view>
      <footer-bar v-show="this.getisShowFooterBar"></footer-bar>
    </div>
</template>

<script>
  import FooterBar from '@/components/FooterBar'
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "Home",
      components:{
        FooterBar:FooterBar
      },
      computed:{
        ...mapGetters([
          'getisShowFooterBar'
        ])
      },
      methods:{
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

<style scoped>

</style>
