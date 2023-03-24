import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// TODO: yjl 配置日期的国际化，  之前是 /en, 采用中国制度  zh-CN
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import echarts from 'echarts' // 导入 echarts 组件

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // permission control
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  // TODO: yjl 调用处路由
  el: '#app',
  router,
  store,
  render: h => h(App)
})
