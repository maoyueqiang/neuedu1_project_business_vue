import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/pages/center/UserLogin'
import Cart from '@/pages/cart/Cart'
import ProductDetail from '@/pages/home/ProductDetail'
import ProductHome from '@/pages/home/ProductHome'
import Mine from '@/pages/center/Mine'
import UserCenter from '@/pages/center/UserCenter'
import MyOrder from '@/pages/center/order/MyOrder'
import ProductList from '@/pages/home/ProductList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/userLogin',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/',
      name: 'ProductHome',
      component: ProductHome
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/myOrder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/detail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/productList',
      name: 'ProductList',
      component: ProductList
    }
  ]
})
