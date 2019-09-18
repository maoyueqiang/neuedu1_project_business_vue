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
import OrderDetail from '@/pages/center/order/OrderDetail'
import OrderDetail2 from '@/pages/center/order/OrderDetail2'
import AddressList from '@/pages/center/order/AddressList'
import QrCode from '@/pages/center/order/QrCode'

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
      path: '/orderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/orderDetail2',
      name: 'OrderDetail2',
      component: OrderDetail2
    },
    {
      path: '/addressList',
      name: 'AddressList',
      component: AddressList
    },
    {
      path: '/qrCode',
      name: 'QrCode',
      component: QrCode
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
