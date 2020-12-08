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
import AddressItem from '@/pages/center/order/AddressItem'
import UserRegister from '@/pages/center/UserRegister'

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import Menu from '@/pages/home/components/Menu'
import Distribute from '@/pages/home/components/Distribute'
import User from '@/pages/home/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:{
        name:'Login'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect:{
        name:'User'
      },
      children:[
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/distribute',
          name: 'Distribute',
          component: Distribute
        },
        {
          path: '/user',
          name: 'User',
          component: User
        }
      ]
    },
    {
      path: '/userLogin',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/userRegister',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    // {
    //   path: '/',
    //   name: 'ProductHome',
    //   component: ProductHome
    // },
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
      path: '/addressItem',
      name: 'AddressItem',
      component: AddressItem
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
