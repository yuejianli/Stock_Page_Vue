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
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/mylogin',
    component: () => import('@/views/login/myindex'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/relation',
    component: () => import('@/views/relation'),
    hidden: true
  },
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
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // TODO: yjl 历史记录可开 //后端支持可开
  mode: 'history',
  base: '/Stock',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: initMap(constantRouterMap)
})

export function initMap(constantRouterMap) {
  const menuList = JSON.parse(localStorage.getItem('menuList')) || []
  if (menuList.length <= 0) {
    return constantRouterMap
  }
  console.log('menuList', menuList)
  const topMenuUrlList = []
  const secondMenuUrlList = []

  for (var id in menuList) {
    console.log('menu', menuList[id])
    if (menuList[id].pid === 0) {
      topMenuUrlList.push(menuList[id].url)
    } else if (menuList[id].pid !== 0) {
      secondMenuUrlList.push(menuList[id].url)
    }
  }
  // 股票权限
  if (topMenuUrlList.includes('stock')) {
    const firstMenu = {
      path: '/stock',
      component: Layout,
      redirect: '/stock/stock',
      name: 'stock',
      meta: {
        title: '股票信息模块',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('stock')) {
      firstMenu.children.push({
        path: 'stock',
        name: 'stock',
        component: () => import('@/views/stock/stock/index'),
        meta: {
          title: '股票模块',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('selected')) {
      firstMenu.children.push({
        path: 'selected',
        name: '自选股票',
        component: () => import('@/views/stock/selected/index'),
        meta: {
          title: '自选股票',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('stock_history')) {
      firstMenu.children.push({
        path: 'stock_history',
        name: '自选股票最近交易记录',
        component: () => import('@/views/stock/stock_history/index'),
        meta: {
          title: '自选股票最近交易记录',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('stock_update_log')) {
      firstMenu.children.push({
        path: 'stock_update_log',
        name: '股票更新日志',
        component: () => import('@/views/stock/stock_update_log/index'),
        meta: {
          title: '股票更新日志',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  // 板块
  if (topMenuUrlList.includes('bk')) {
    const firstMenu = {
      path: '/bk',
      component: Layout,
      redirect: '/bk/stock',
      name: '板块/概念模块',
      meta: {
        title: '板块/概念模块',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('bkStock')) {
      firstMenu.children.push({
        path: 'bkStock',
        name: '股票关联版块查询',
        component: () => import('@/views/bk/stock/index'),
        meta: {
          title: '股票关联版块查询',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('bkHistory')) {
      firstMenu.children.push({
        path: 'bkHistory',
        name: '股票板块历史查询',
        component: () => import('@/views/bk/bkHistory/index'),
        meta: {
          title: '股票板块历史查询',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('gnHistory')) {
      firstMenu.children.push({
        path: 'gnHistory',
        name: '股票概念历史查询',
        component: () => import('@/views/bk/gnHistory/index'),
        meta: {
          title: '股票概念历史查询',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('bktop')) {
      firstMenu.children.push({
        path: 'bktop',
        name: '板块涨幅度查询',
        component: () => import('@/views/bk/bktop/index'),
        meta: {
          title: '板块涨幅度查询',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('gntop')) {
      firstMenu.children.push({
        path: 'gntop',
        name: '概念涨幅度查询',
        component: () => import('@/views/bk/gntop/index'),
        meta: {
          title: '概念涨幅度查询',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  // 股票权限
  if (topMenuUrlList.includes('stat')) {
    const firstMenu = {
      path: '/stat',
      component: Layout,
      redirect: '/stat/stock',
      name: '统计分析功能',
      meta: {
        title: '统计分析功能',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('stock_stat')) {
      firstMenu.children.push({
        path: 'stock_stat',
        name: '周和图表统计',
        component: () => import('@/views/stat/stock_stat/index'),
        meta: {
          title: '周和图表统计',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('history_stat')) {
      firstMenu.children.push({
        path: 'history_stat',
        name: '股票历史记录统计',
        component: () => import('@/views/stat/history_stat/index'),
        meta: {
          title: '股票历史记录统计',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('history_ten10_stat')) {
      firstMenu.children.push({
        path: 'history_ten10_stat',
        name: '最近十天交易汇总',
        component: () => import('@/views/stat/history_ten10_stat/index'),
        meta: {
          title: '最近十天交易汇总',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('history_pool')) {
      firstMenu.children.push({
        path: 'history_pool',
        name: '最近股票池汇总',
        component: () => import('@/views/stat/history_pool/index'),
        meta: {
          title: '最近股票池汇总',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('bk_stat')) {
      firstMenu.children.push({
        path: 'bk_stat',
        name: '股票版块统计',
        component: () => import('@/views/stat/bk_stat/index'),
        meta: {
          title: '股票版块统计',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('gn_stat')) {
      firstMenu.children.push({
        path: 'gn_stat',
        name: '股票概念统计',
        component: () => import('@/views/stat/gn_stat/index'),
        meta: {
          title: '股票概念统计',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  // 工具权限
  if (topMenuUrlList.includes('tools')) {
    const firstMenu = {
      path: '/tools',
      component: Layout,
      redirect: '/tools/clear',
      name: '小工具模块',
      meta: {
        title: '小工具模块',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('clear')) {
      firstMenu.children.push({
        path: 'clear',
        name: '清仓',
        component: () => import('@/views/toolsconfig/clear/index'),
        meta: {
          title: '股票清仓',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('cover')) {
      firstMenu.children.push({
        path: 'cover',
        name: '补仓',
        component: () => import('@/views/toolsconfig/cover/index'),
        meta: {
          title: '股票补仓',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('reduce')) {
      firstMenu.children.push({
        path: 'reduce',
        name: '减仓',
        component: () => import('@/views/toolsconfig/reduce/index'),
        meta: {
          title: '股票减仓',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  // 系统配置
  if (topMenuUrlList.includes('sys')) {
    const firstMenu = {
      path: '/sys',
      component: Layout,
      redirect: '/sys/holiday',
      name: '系统配置',
      meta: {
        title: '系统配置',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('holiday')) {
      firstMenu.children.push({
        path: 'holiday',
        name: '假期查询',
        component: () => import('@/views/sysconfig/holiday/index'),
        meta: {
          title: '假期查询',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('config')) {
      firstMenu.children.push({
        path: 'config',
        name: '全局参数配置',
        component: () => import('@/views/sysconfig/configparam/index'),
        meta: {
          title: '全局参数配置',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('cache')) {
      firstMenu.children.push({
        path: 'cache',
        name: '缓存key列表查询',
        component: () => import('@/views/sysconfig/cacheKey/index'),
        meta: {
          title: '缓存key列表查询',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('jobInfo')) {
      firstMenu.children.push({
        path: 'jobInfo',
        name: '执行任务信息',
        component: () => import('@/views/sysconfig/jobInfo/index'),
        meta: {
          title: '执行任务信息',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  // 股票交易配置
  if (topMenuUrlList.includes('tradeConfig')) {
    const firstMenu = {
      path: '/tradeConfig',
      component: Layout,
      redirect: '/tradeConfig/method',
      name: '股票交易配置',
      meta: {
        title: '股票交易配置',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('method')) {
      firstMenu.children.push({
        path: 'method',
        name: '交易方法',
        component: () => import('@/views/tradeconfig/method/index'),
        meta: {
          title: '交易方法',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('stockRule')) {
      firstMenu.children.push({
        path: 'stockRule',
        name: '股票对应规则查询',
        component: () => import('@/views/tradeconfig/stockrule/index'),
        meta: {
          title: '股票对应规则查询',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('buyRule')) {
      firstMenu.children.push({
        path: 'buyRule',
        name: '买入规则配置',
        component: () => import('@/views/tradeconfig/buyrule/index'),
        meta: {
          title: '买入规则配置',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('sellRule')) {
      firstMenu.children.push({
        path: 'sellRule',
        name: '卖出规则配置',
        component: () => import('@/views/tradeconfig/sellrule/index'),
        meta: {
          title: '卖出规则配置',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  // 虚拟业务配置
  if (topMenuUrlList.includes('mocktrade')) {
    const firstMenu = {
      path: '/mocktrade',
      component: Layout,
      redirect: '/mocktrade/position',
      name: '虚拟业务处理',
      meta: {
        title: '虚拟业务处理',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('position')) {
      firstMenu.children.push({
        path: 'position',
        name: '持仓信息',
        component: () => import('@/views/mocktrade/position/index'),
        meta: {
          title: '持仓信息',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('entrust')) {
      firstMenu.children.push({
        path: 'entrust',
        name: '今日委托信息',
        component: () => import('@/views/mocktrade/entrust/index'),
        meta: {
          title: '今日委托信息',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('hisentrust')) {
      firstMenu.children.push({
        path: 'hisentrust',
        name: '历史委托信息',
        component: () => import('@/views/mocktrade/hisentrust/index'),
        meta: {
          title: '历史委托信息',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('deal')) {
      firstMenu.children.push({
        path: 'deal',
        name: '今日成交记录',
        component: () => import('@/views/mocktrade/deal/index'),
        meta: {
          title: '今日成交记录',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('hisdeal')) {
      firstMenu.children.push({
        path: 'hisdeal',
        name: '历史成交记录',
        component: () => import('@/views/mocktrade/hisdeal/index'),
        meta: {
          title: '历史成交记录',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('hisposition')) {
      firstMenu.children.push({
        path: 'hisposition',
        name: '历史持仓记录',
        component: () => import('@/views/mocktrade/hisposition/index'),
        meta: {
          title: '历史持仓记录',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('hismoney')) {
      firstMenu.children.push({
        path: 'hismoney',
        name: '历史金额记录',
        component: () => import('@/views/mocktrade/hismoney/index'),
        meta: {
          title: '历史金额记录',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  // 真实业务配置
  if (topMenuUrlList.includes('realtrade')) {
    const firstMenu = {
      path: '/realtrade',
      component: Layout,
      redirect: '/realtrade/login',
      name: '真实业务处理',
      meta: {
        title: '真实业务处理',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('rlogin')) {
      firstMenu.children.push({
        path: 'rlogin',
        name: '交易用户登录',
        component: () => import('@/views/realtrade/login/index'),
        meta: {
          title: '交易用户登录',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('rposition')) {
      firstMenu.children.push({
        path: 'position',
        name: '持仓信息',
        component: () => import('@/views/realtrade/position/index'),
        meta: {
          title: '持仓信息',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('rentrust')) {
      firstMenu.children.push({
        path: 'entrust',
        name: '今日委托信息',
        component: () => import('@/views/realtrade/entrust/index'),
        meta: {
          title: '今日委托信息',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('rhisentrust')) {
      firstMenu.children.push({
        path: 'hisentrust',
        name: '历史委托信息',
        component: () => import('@/views/realtrade/hisentrust/index'),
        meta: {
          title: '历史委托信息',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('rdeal')) {
      firstMenu.children.push({
        path: 'deal',
        name: '今日成交记录',
        component: () => import('@/views/realtrade/deal/index'),
        meta: {
          title: '今日成交记录',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('rhisdeal')) {
      firstMenu.children.push({
        path: 'hisdeal',
        name: '历史成交记录',
        component: () => import('@/views/realtrade/hisdeal/index'),
        meta: {
          title: '历史成交记录',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('rhisposition')) {
      firstMenu.children.push({
        path: 'hisposition',
        name: '历史持仓记录',
        component: () => import('@/views/realtrade/hisposition/index'),
        meta: {
          title: '历史持仓记录',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('rhismoney')) {
      firstMenu.children.push({
        path: 'hismoney',
        name: '历史金额记录',
        component: () => import('@/views/realtrade/hismoney/index'),
        meta: {
          title: '历史金额记录',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  // 用户资源配置
  if (topMenuUrlList.includes('user')) {
    const firstMenu = {
      path: '/user',
      component: Layout,
      redirect: '/user/user',
      name: '用户资源配置',
      meta: {
        title: '用户资源配置',
        icon: 'example'
      },
      children: []
    }
    if (secondMenuUrlList.includes('user')) {
      firstMenu.children.push({
        path: 'user',
        name: '用户',
        component: () => import('@/views/user/user/index'),
        meta: {
          title: '用户',
          icon: 'table'
        }
      })
    }
    if (secondMenuUrlList.includes('role')) {
      firstMenu.children.push({
        path: 'role',
        name: '角色',
        component: () => import('@/views/user/role/index'),
        meta: {
          title: '角色',
          icon: 'table'
        }
      })
    }
    constantRouterMap.push(firstMenu)
  }
  return constantRouterMap
}
