编写项目的步骤

#  基础配置

1. 修改端口号,去掉校验规则
config---> index.js:
    port: 8888
    useEslint: false

配置访问地址:   config---> dev.env.js  和  prod.env.js

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://www.yueshushu.top/StockApi"',
  //BASE_API: '"http://localhost:8027/StockApi"',
})



2.1  配置日期插件的样式等

src---> main.js :

//  配置日期的国际化，  之前是 /en, 采用中国制度  zh-CN
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

2.2 首页文字 title 修改

src---> index.html 
    <!-- 首页文字修改-->>
    <title>首页展示1</title>

2.3  登录后右侧退出页

src/views/layout/components > Navbar.vue :

<el-dropdown-menu slot="dropdown" class="user-dropdown">
        <!--  配置右侧的菜单栏-->
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout"> 退出 </span>
        </el-dropdown-item>
      </el-dropdown-menu>

2.4   登录用户信息配置 

src/store/modules > user.js


actions: {
    // 登录
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      // return new Promise((resolve, reject) => {
      //   login(username, userInfo.password).then(response => {
      //     const data = response.data
      //     setToken(data.token)
      //     commit('SET_TOKEN', data.token)
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
      // TODO: yuejl 设置登录信息
      const data = {
        'token': 'admin'
      }

      setToken(data.token)
      commit('SET_TOKEN', data.token)
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      // return new Promise((resolve, reject) => {
      //   getInfo(state.token).then(response => {
      //     const data = response.data
      //     if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
      //       commit('SET_ROLES', data.roles)
      //     } else {
      //       reject('getInfo: roles must be a non-null array !')
      //     }
      //     commit('SET_NAME', data.name)
      //     commit('SET_AVATAR', data.avatar)
      //     resolve(response)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
      // TODO: yjl 设置获取用户的信息
      const data = {
        'roles': ['admin'],
        'name': 'admin',
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      }
      if (data.roles && data.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
      }
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        // TODO: yjl 设置退出
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }

2.5  全局请求头 token 配置
src/utils > request.js

  config => {
    if (store.getters.token) {
      // TODO: yjl 设置请求头信息
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },

#  页面功能开发

##  配置菜单路由
src/router---> index.js 

constantRouterMap 里面

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

##  编写 js 设置

src---> api ---> 功能.js  如   holiday.js

编写 查询方法:

import request from '@/utils/request'
const HOLIDAY_URL = '/holidayCalendar'
export default {
  getPageList(currentPage, pagesize, searchObj) {
    return request({
      url: `${HOLIDAY_URL}/list`,
      method: 'post',
      data: {
        'pageNum': currentPage,
        'pageSize': pagesize,
        'year': 2023
      }
    })
  }
}


##  页面编写功能 

src--->views --> 功能 holiday ---> index.vue 

<script>
import holidayApi from '@/api/holiday'
export default {
  // 定义 过滤器
  filters: {
    dateTypeFilter(dateType) {
      // const dateTypeMap = {
      //   1: '正常',
      //   2: '调休',
      //   3: '法定节假日'
      // }
      // return dateTypeMap[dateType]
      return '法定节假日'
    }
  },
  // 定义数据模型
  data() {
    return {
      listLoading: true,
      list: null,
      // 追加分页相关的数据信息
      searchObj: {}, // 查询条件
      currentPage: 1, // 当前页
      pagesize: 10, // 每页显示记录数
      total: 0 // 总记录数
    }
  },
  // 页面渲染成功后获取数据
  created() {
    // 调用 fetchData 方法
    this.listLoading = true
    this.fetchData()
  },
  methods: {
    fetchData(currentPage = 1, pagesize = 10) {
      console.log('翻页.....', currentPage, pagesize)
      // 异步获取数据 (ajax)
      this.currentPage = currentPage
      this.pagesize = pagesize
      holidayApi.getPageList(this.currentPage, this.pagesize, null).then(
        response => {
          this.list = response.data.list
          // 添加响应数
          this.total = response.data.total
          this.listLoading = false
        }
      ).catch(error => {
        // 请求失败，则打印错误
        console.log(error)
      })
    },
    // 页码控制
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage, this.pagesize)
    },
    // 页数控制
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      this.fetchData(this.currentPage, this.pagesize)
    }
  }
}
</script>

编写页面:

<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" prop="created_at" label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.holidayDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属年" width="200">
        <template slot-scope="scope">
          {{ scope.row.currYear }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.dateType |dateTypeFilter }}
        </template>
      </el-table-column>
    </el-table>
    <!--添加分页处理-->
    <el-pagination :total="total" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="limit" style="padding:30px 0; text-align: center;" layout="total, prev, pager, next,sizes, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange"/>
  </div>
</template>




















