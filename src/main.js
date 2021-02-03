import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import Blob from '@/vendor/Blob.js'
import Export2Excel from '@/vendor/Export2Excel.js'
import { Loading } from 'element-ui'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
//
// Vue.use(VueAxios, axios)


import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)


import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(VueCookie)
Vue.config.productionTip = false
// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

import cookies from 'vue-cookies'
Vue.prototype.$cookies = cookies
// 挂载全局
 Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法
//定义加载动画
Vue.prototype.startLoading = function () {
  // Loading.service(options); options 参数为 Loading 的配置项
  // 使用loading变量来接收Loading.service返回的实例

  this.loading = Loading.service({
    lock:true,    //是否锁定
    text:"拼命加载中...",   //显示在加载图标下方的加载文案
    background:'rgba(0,0,0,.7)',   //遮罩背景色
  });
}
//结束加载动画，调用该实例的 close 方法来关闭
Vue.prototype.endLoading = function () {
  this.loading.close();
}

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

//菜单控制全局变量
Vue.prototype.menuRout = new Map()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
