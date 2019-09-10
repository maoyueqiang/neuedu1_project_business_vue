<template>
  <div class="wrapper">
    <swiper v-if="productList.length>1" :options="swiperOption" >
      <!-- slides -->
      <swiper-slide v-for="(item,index) of productList" :key="index " v-if="index<8" data-swiper-autoplay="3000">
        <img class="swiper-img" :src="'http://img.cdn.imbession.top/'+item.mainImage"/>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
    export default {
        name: "HomeCarousel",
      data (){
        return {
          productList:[],
          swiperOption:{
            pagination:'.swiper-pagination',
            loop:true,
            autoplay:true,
            autoplayDisableOnInteraction : false
          }
        }
      },
      mounted(){
        this.getProduct()
      },
      methods:{
        getProduct:function () {

          var _vm=this
          //通过axios发请求  get
          this.service.get("/product/bannerlist.do").then(function (response) {
            console.log(response)
            _vm.productList=response.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
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
    height :0
    padding-bottom :26%
    background :#eee
    .swiper-img
      width :100%
</style>
