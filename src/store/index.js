import  Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'


//全局注册
Vue.use(Vuex)

const state={
  userInfo:{},
  isShowFooterBar:true,
  productList:[],
  product:null,
  keyword:null,
  categoryId:null,
  orderStatus:null,
  judgeAddress:false,
  address:{},
  orderNo:null,
}

//vuex实例
export const store=new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
