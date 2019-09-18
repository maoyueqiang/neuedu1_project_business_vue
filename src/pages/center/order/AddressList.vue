<template>
    <div>
      <ul>
        <div v-for="(item,index) of addressList" :key="index">
          <div class="address" @click="selectAddress(item)">
            <p>收货人姓名：{{item.receiverName}}</p>
            <p>收货人手机号：{{item.receiverPhone}}</p>
            <p>收货地址：{{item.receiverCity}} {{item.receiverDistrict}}</p>
            <p>详细地址：{{item.receiverAddress}}</p>
          </div>
          <!--<div class="editAddress" @click="editAddress(item)">-->
            <!--编辑-->
          <!--</div>-->
        </div>
      </ul>
      <!--<div class="addAddress">-->
        <!--<button class="addAddress_button">添加地址</button>-->
      <!--</div>-->
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "AddressList",
      data(){
          return{
            addressList:[],
          }
      },
      methods:{
        ...mapActions(['setAddress','setJudgeAddress']),
        selectAddress:function (item) {
          this.setAddress(item)
          this.setJudgeAddress(true)
          this.$router.go(-1)
        },
        editAddress:function (item) {

        }
      },
      mounted(){
        var _vm = this
        //通过axios发请求  get
        this.service.get("/shipping/selectAllByUserId.do").then(function (response) {
          console.log(response)
          _vm.addressList = response.data.data.list
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
</script>

<style scoped lang="stylus">
  .address
    display inline-block
    border:0.01rem solid
    margin-top  0.3rem
    margin-left 0.3rem
    width :90%
    background-color #cccccc
  /*.editAddress*/
    /*display inline-block*/
    /*float right*/
    /*font-size:0.3rem*/
  /*.addAddress*/
    /*align:center*/
    /*background-color red*/
    /*font-size: 0.3rem*/
    /*color:white*/
</style>
