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
    path: '/stock',
    component: Layout,
    redirect: '/stock/stock',
    name: '股票信息模块',
    meta: { title: '股票信息模块', icon: 'example' },
    children: [
      {
        path: 'stock',
        name: '股票模块',
        component: () => import('@/views/stock/stock/index'),
        meta: { title: '股票模块', icon: 'table' }
      },
      {
        path: 'selected',
        name: '自选股票',
        component: () => import('@/views/stock/selected/index'),
        meta: { title: '自选股票', icon: 'table' }
      },
      {
        path: 'stock_history',
        name: '自选股票最近交易记录',
        component: () => import('@/views/stock/stock_history/index'),
        meta: { title: '自选股票最近交易记录', icon: 'table' }
      },
      {
        path: 'stock_update_log',
        name: '股票更新日志',
        component: () => import('@/views/stock/stock_update_log/index'),
        meta: { title: '股票更新日志', icon: 'table' }
      }
    ]
  },
  {
    path: '/bk',
    component: Layout,
    redirect: '/bk/stock',
    name: '板块/概念模块',
    meta: { title: '板块/概念模块', icon: 'example' },
    children: [
      {
        path: 'stock',
        name: '股票关联版块查询',
        component: () => import('@/views/bk/stock/index'),
        meta: { title: '股票关联版块查询', icon: 'table' }
      },
      {
        path: 'bkHistory',
        name: '股票板块历史查询',
        component: () => import('@/views/bk/bkHistory/index'),
        meta: { title: '股票板块历史查询', icon: 'table' }
      },
      {
        path: 'gnHistory',
        name: '股票概念历史查询',
        component: () => import('@/views/bk/gnHistory/index'),
        meta: { title: '股票概念历史查询', icon: 'table' }
      },
      {
        path: 'bktop',
        name: '板块涨幅度查询',
        component: () => import('@/views/bk/bktop/index'),
        meta: { title: '板块涨幅度查询', icon: 'table' }
      },
      {
        path: 'gntop',
        name: '概念涨幅度查询',
        component: () => import('@/views/bk/gntop/index'),
        meta: { title: '概念涨幅度查询', icon: 'table' }
      }
    ]
  },
  {
    path: '/stat',
    component: Layout,
    redirect: '/stat/stock',
    name: '统计分析功能',
    meta: { title: '统计分析功能', icon: 'example' },
    children: [
      {
        path: 'stock_stat',
        name: '周和图表统计',
        component: () => import('@/views/stat/stock_stat/index'),
        meta: { title: '周和图表统计', icon: 'table' }
      },
      {
        path: 'history_stat',
        name: '股票历史记录统计',
        component: () => import('@/views/stat/history_stat/index'),
        meta: { title: '股票历史记录统计', icon: 'table' }
      },
      {
        path: 'history_ten10_stat',
        name: '最近十天交易汇总',
        component: () => import('@/views/stat/history_ten10_stat/index'),
        meta: { title: '最近十天交易汇总', icon: 'table' }
      },
      {
        path: 'history_pool',
        name: '最近股票池汇总',
        component: () => import('@/views/stat/history_pool/index'),
        meta: { title: '最近股票池汇总', icon: 'table' }
      },
      {
        path: 'bk_stat',
        name: '股票版块统计',
        component: () => import('@/views/stat/bk_stat/index'),
        meta: { title: '股票版块统计', icon: 'table' }
      },
      {
        path: 'gn_stat',
        name: '股票概念统计',
        component: () => import('@/views/stat/gn_stat/index'),
        meta: { title: '股票概念统计', icon: 'table' }
      }
    ]
  },
  {
    path: '/mocktrade',
    component: Layout,
    redirect: '/mocktrade/position',
    name: '虚拟业务处理',
    meta: { title: '虚拟业务处理', icon: 'example' },
    children: [
      {
        path: 'position',
        name: '持仓信息',
        component: () => import('@/views/mocktrade/position/index'),
        meta: { title: '持仓信息', icon: 'table' }
      },
      {
        path: 'entrust',
        name: '今日委托信息',
        component: () => import('@/views/mocktrade/entrust/index'),
        meta: { title: '今日委托信息', icon: 'table' }
      },
      {
        path: 'hisentrust',
        name: '历史委托信息',
        component: () => import('@/views/mocktrade/hisentrust/index'),
        meta: { title: '历史委托信息', icon: 'table' }
      },
      {
        path: 'deal',
        name: '今日成交记录',
        component: () => import('@/views/mocktrade/deal/index'),
        meta: { title: '今日成交记录', icon: 'table' }
      },
      {
        path: 'hisdeal',
        name: '历史成交记录',
        component: () => import('@/views/mocktrade/hisdeal/index'),
        meta: { title: '历史成交记录', icon: 'table' }
      },
      {
        path: 'hisposition',
        name: '历史持仓记录',
        component: () => import('@/views/mocktrade/hisposition/index'),
        meta: { title: '历史持仓记录', icon: 'table' }
      },
      {
        path: 'hismoney',
        name: '历史金额记录',
        component: () => import('@/views/mocktrade/hismoney/index'),
        meta: { title: '历史金额记录', icon: 'table' }
      }
    ]
  },
  {
    path: '/realtrade',
    component: Layout,
    redirect: '/realtrade/position',
    name: '真实业务处理',
    meta: { title: '真实业务处理', icon: 'example' },
    children: [
      {
        path: 'position',
        name: '持仓信息',
        component: () => import('@/views/realtrade/position/index'),
        meta: { title: '持仓信息', icon: 'table' }
      },
      {
        path: 'entrust',
        name: '今日委托信息',
        component: () => import('@/views/realtrade/entrust/index'),
        meta: { title: '今日委托信息', icon: 'table' }
      },
      {
        path: 'hisentrust',
        name: '历史委托信息',
        component: () => import('@/views/realtrade/hisentrust/index'),
        meta: { title: '历史委托信息', icon: 'table' }
      },
      {
        path: 'deal',
        name: '今日成交记录',
        component: () => import('@/views/realtrade/deal/index'),
        meta: { title: '今日成交记录', icon: 'table' }
      },
      {
        path: 'hisdeal',
        name: '历史成交记录',
        component: () => import('@/views/realtrade/hisdeal/index'),
        meta: { title: '历史成交记录', icon: 'table' }
      },
      {
        path: 'hisposition',
        name: '历史持仓记录',
        component: () => import('@/views/realtrade/hisposition/index'),
        meta: { title: '历史持仓记录', icon: 'table' }
      },
      {
        path: 'hismoney',
        name: '历史金额记录',
        component: () => import('@/views/realtrade/hismoney/index'),
        meta: { title: '历史金额记录', icon: 'table' }
      }
    ]
  },
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
