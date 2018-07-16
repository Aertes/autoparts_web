import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/home',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    // hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    path: '/quote',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Quote',
        component: () => import('@/views/quote/index'),
        meta: { title: '报价管理', icon: 'quote' }
      }
    ]
  },
  {
    path: '/sales',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Sales',
        component: () => import('@/views/sales/index'),
        meta: { title: '退货管理', icon: 'sales' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'order' }
      }
    ]
  },
  {
    path: '/parts',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Parts',
        component: () => import('@/views/parts/index'),
        meta: { title: '配件管理', icon: 'parts' }
      }
    ]
  },
  {
    path: '/store',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Store',
        component: () => import('@/views/store/index'),
        meta: { title: '门店管理', icon: 'store' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Statistics',
        component: () => import('@/views/statistics/index'),
        meta: { title: '统计', icon: 'statistics' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    name: 'Account',
    redirect: '/account/userIndex',
    meta: { title: '账户管理', icon: 'account' },
    children: [
      {
        path: 'userIndex',
        name: 'User',
        component: () => import('@/views/account/userIndex'),
        meta: { title: '账户管理', icon: '00' }
      },
      {
        path: 'companyIndex',
        name: 'Company',
        component: () => import('@/views/account/companyIndex'),
        meta: { title: '配件公司管理', icon: '00' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

