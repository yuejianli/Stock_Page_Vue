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
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // TODO: yjl 配置路由， 实际上是菜单信息
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  // TODO: yjl 菜单的配置信息  路径 组件 路由到哪里 名称 是否隐藏 子菜单:[子菜单路径 子菜单组件]
  // meta 里面的 title 才表示菜单展示的名称
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example一级菜单',
    meta: { title: 'Example一级菜单11', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table二级菜单',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table二级菜单22', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree二级菜单',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree二级菜单22', icon: 'tree' }
      }
    ]
  },
  // TODO: yjl 添加菜单路由
  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/clear',
    name: '小工具模块',
    meta: { title: '小工具模块', icon: 'example' },
    children: [
      {
        path: 'clear',
        name: '清仓',
        component: () => import('@/views/toolsconfig/clear/index'),
        meta: { title: '股票清仓', icon: 'table' }
      },
      {
        path: 'cover',
        name: '补仓',
        component: () => import('@/views/toolsconfig/cover/index'),
        meta: { title: '股票补仓', icon: 'table' }
      },
      {
        path: 'reduce',
        name: '减仓',
        component: () => import('@/views/toolsconfig/reduce/index'),
        meta: { title: '股票减仓', icon: 'table' }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/holiday',
    name: '系统配置',
    meta: { title: '系统配置', icon: 'example' },
    children: [
      {
        path: 'holiday',
        name: '假期查询',
        component: () => import('@/views/sysconfig/holiday/index'),
        meta: { title: '假期查询', icon: 'table' }
      },
      {
        path: 'config',
        name: '全局参数配置',
        component: () => import('@/views/sysconfig/configparam/index'),
        meta: { title: '全局参数配置', icon: 'table' }
      },
      {
        path: 'cache',
        name: '缓存key列表查询',
        component: () => import('@/views/sysconfig/cacheKey/index'),
        meta: { title: '缓存key列表查询', icon: 'table' }
      },
      {
        path: 'jobInfo',
        name: '执行任务信息',
        component: () => import('@/views/sysconfig/jobInfo/index'),
        meta: { title: '执行任务信息', icon: 'table' }
      }
    ]
  },
  {
    path: '/tradeConfig',
    component: Layout,
    redirect: '/tradeConfig/method',
    name: '股票交易配置',
    meta: { title: '股票交易配置', icon: 'example' },
    children: [
      {
        path: 'method',
        name: '交易方法',
        component: () => import('@/views/tradeconfig/method/index'),
        meta: { title: '交易方法', icon: 'table' }
      },
      {
        path: 'stockRule',
        name: '股票对应规则查询',
        component: () => import('@/views/tradeconfig/stockrule/index'),
        meta: { title: '股票对应规则查询', icon: 'table' }
      },
      {
        path: 'buyRule',
        name: '买入规则配置',
        component: () => import('@/views/tradeconfig/buyrule/index'),
        meta: { title: '买入规则配置', icon: 'table' }
      },
      {
        path: 'sellRule',
        name: '卖出规则配置',
        component: () => import('@/views/tradeconfig/sellrule/index'),
        meta: { title: '卖出规则配置', icon: 'table' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // TODO: yjl 历史记录可开 //后端支持可开
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
