<template>
    <div>
      <img :src="qrcode"/>
      <!--<p>{{this.count}}秒后跳转</p>-->
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
    export default {
        name: "QrCode",
      data(){
          return{
            orderNo:null,
            qrcode:null,
            count:10,
          }
      },
      methods:{
          ...mapGetters(['getOrderNo']),
        ...mapActions(['setOrderStatus']),
        goGrdoupRecor(){
          const TIME_COUNT = 20;
          if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(()=>{
              if(this.count > 0 && this.count <= TIME_COUNT){
                this.count--;
              }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                var _vm=this
                _vm.service.post("/order/detail.do",{
                  "orderNo":_vm.orderNo
                }).then(function (response) {
                  console.log(response)
                  _vm.setOrderStatus(response.data.data.status)
                  _vm.$router.push('/myOrder')
                }).catch(function (error) {
                  console.log(error)
                })
              }
            },1000)
          }
        },
      },
      mounted(){
          this.orderNo=this.getOrderNo()
        var _vm=this
        //通过axios发请求  get
        this.service.get("/order/pay.do/"+_vm.orderNo).then(function (response) {
          console.log(response)
          _vm.qrcode=response.data.data.qrcode
        }).catch(function (error) {
          console.log(error)
        })
        this.goGrdoupRecor()
      }
    }
</script>

<style scoped>

</style>
