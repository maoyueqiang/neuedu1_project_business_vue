<template>
    <div>
      <ul>
        <div v-for="(item,index) of addressList" :key="index">
          <div class="address" >
            <div style="display: inline-block" @click="selectAddress(item)">
              <p>收货人姓名：{{item.receiverName}}</p>
              <p>收货人手机号：{{item.receiverMobile}}</p>
              <p>收货地址：{{item.receiverProvince}} {{item.receiverCity}} {{item.receiverDistrict}}</p>
              <p>详细地址：{{item.receiverAddress}}</p>
            </div>
            <div class="editAddress">
              <div class="editAddress_edit" @click="editAddress(item)">
                编辑
              </div>
              <div class="editAddress_border">
                <div class="editAddress_delete" @click="deleteAddress(item.id)">
                  删除
                </div>
              </div>

            </div>
          </div>
        </div>
      </ul>
      <mt-button type="danger" style="margin-left: 36%;margin-top:0.3rem" @click="addAddress()">添加地址</mt-button>
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
        ...mapActions(['setAddress','setJudgeAddress','setChangeAddress','setIsShowFooterBar']),
        selectAddress:function (item) {
          this.setAddress(item)
          console.log("选中订单")
          console.log(item)
          this.setJudgeAddress(true)
          console.log("选中订单true")
          this.$router.go(-1)
        },
        editAddress:function (item) {
          this.setAddress(item)
          console.log("选中订单")
          console.log(item)
          this.setChangeAddress(true)
          this.$router.push("/addressItem")
        },
        addAddress:function () {
          this.$router.push("/addressItem")
        },
        deleteAddress:function (id) {
          var _vm=this
          this.service.post("/shipping/del.do",{
            "shippingId":id
          }).then(function (response) {
            console.log(response)
            //当用户登录成功，保存用户信息到vuex中
          }).catch(function (error) {
            console.log(error)
          })
          this.getAddressList()
        },
        getAddressList:function () {
          var _vm = this
          //通过axios发请求  get
          this.service.get("/shipping/selectAllByUserId.do").then(function (response) {
            console.log(response)
            _vm.addressList = response.data.data.list
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      mounted(){
          this.setIsShowFooterBar(false)
        this.getAddressList()
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
  .editAddress
    display inline-block
    float right
    font-size:0.3rem

    color royalblue
    margin-right 0.2rem
    margin-top 0.2rem
  .editAddress_edit
    display inline-block
    width 0.3rem
    margin-right 0.2rem
  .editAddress_border
    display inline-block
    width 0.3rem
    border-left solid black
    margin-right 0.2rem
  .editAddress_delete
    width 0.3rem
    margin-left 0.2rem
  .addAddress
    margin-left: 40%
    margin-top:0.3rem
    background-color red
    color white
    font-size 0.4rem
    width 1.6rem
</style>
