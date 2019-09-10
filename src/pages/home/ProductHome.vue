<template>
  <div>
    <home-header></home-header>
    <home-carousel></home-carousel>
    <home-category></home-category>
    <home-hot></home-hot>
  </div>
</template>

<script>
  import HomeHeader from './components/HomeHeader'
  import HomeCarousel from './components/HomeCarousel'
  import HomeCategory from './components/HomeCategory'
  import HomeHot from './components/HomeHot'
    export default {
        name: "ProductHome",
      components:{
        HomeHeader,HomeCarousel,HomeCategory,HomeHot
      }
    }
</script>

<style scoped>

</style>
