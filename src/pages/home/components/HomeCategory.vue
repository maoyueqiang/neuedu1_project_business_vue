<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="(item,index1) of page"
        :key="index1"  >
          <div class="icon-img" @click="findByCategoryId(item.id)">
            <img class="icon-img-content" :src="item.image"/>
          </div>
          <p class="icon-desc">{{item.name}}</p>
        </div>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "HomeCategory",
      data(){
        return {
          swiperOption:{
            pagination:'.swiper-pagination',
            loop:false,
            autoplay:false
          },
          iconList:[]
        }
      },
      computed:{
        pages(){
          const pages=[]
          this.iconList.forEach((item,index)=>{
            //该元素在第几页
            const page=Math.floor(index/8)
            if(!pages[page]){
              pages[page]=[]
            }
            pages[page].push(item)
          })
          return pages
        }
      },
      mounted(){
        this.getCategory()
      },

      methods: {
          ...mapActions(['setKeyword','setCategoryId']),
        getCategory: function () {

          var _vm = this
          //通过axios发请求  get
          this.service.get("/category/get_category.do", {
                params:{
                  "categoryId":0
                }
            }
          ).then(function (response) {
            console.log(response)
            _vm.iconList = response.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        findByCategoryId:function (categoryId) {
          this.setKeyword(null)
          this.setCategoryId(categoryId)
          this.$router.push("/productList")
        }
      }
    }
</script>

<style scoped lang="stylus">
  @import '~styles/varibles.styl'
  @import '~styles/mixins.styl'
  .icons >>> .swiper-container
    height:0
    padding-bottom:50%
  .icons
    margin-top: .1rem
  .icon
    position :relative
    overflow:hidden
    float :left
    width :25%
    height :0
    padding-bottom :25%
    .icon-img
      position :absolute
      top :0
      left :0
      right:0
      bottom:.44rem
      box-sizing :border-box
      padding:.1rem
      .icon-img-content
        display :block
        margin:0 auto
        height:100%
        width:5em
  .icon-desc
    position :absolute
    left :0
    right:0
    bottom:0
    height :.44rem
    line-height :.44rem
    color :$darkTextColor
    text-align :center
    ellipsis()
</style>

