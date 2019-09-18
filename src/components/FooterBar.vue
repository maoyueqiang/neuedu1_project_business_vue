<template>
  <div>

    <div >
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="producthome">
          <img slot="icon" :src="home_img">
          首页
        </mt-tab-item>
        <mt-tab-item id="cart">
          <img slot="icon" :src="cart_img">
          购物车
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" :src="mine_img">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>


    export default {
        name: "FooterBar",
      data(){
          return {
            home_img:'static/images/home_selected.png',
            cart_img:'static/images/cart_unselected.png',
            mine_img:'static/images/mine_unselected.png',
            selected:'producthome'
          }
      },
      watch:{
          selected:function () {
            if(this.selected=='producthome'){
              //首页
              this.$router.push("/"),
                this.home_img="static/images/home_selected.png",
                this.cart_img="static/images/cart_unselected.png",
                this.mine_img="static/images/mine_unselected.png"
            }
            else if(this.selected=='cart'){
              //购物车
              this.$router.push("/cart"),
                this.home_img="static/images/home_unselected.png",
                this.cart_img="static/images/cart_selected.png",
                this.mine_img="static/images/mine_unselected.png"
            }
            else if(this.selected=='mine'){
              //我的
              this.$router.push("/mine"),
                this.home_img="static/images/home_unselected.png",
                this.cart_img="static/images/cart_unselected.png",
                this.mine_img="static/images/mine_selected.png"
            }
          }
      },

    }
</script>

<style scoped>

</style>
