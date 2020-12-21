<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <link rel="shortcut icon" type="image/x-icon" href="../../static/img/favicon3.ico">
        <a class="site-navbar__brand-lg" href="javascript:;">PVD内务</a>
        <a class="site-navbar__brand-mini" href="javascript:;">PVD内务</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">


        <!--功能隐藏-->
        <!--<el-menu-item index="1" @click="$router.push({ name: 'theme' })">-->
          <!--<template slot="title">-->
            <!--<el-badge value="new">-->
              <!--<icon-svg name="shezhi" class="el-icon-setting"></icon-svg>-->
            <!--</el-badge>-->
          <!--</template>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="2">-->
          <!--<el-badge value="hot">-->
            <!--<a href="https://www.renren.io/" target="_blank">官方社区</a>-->
          <!--</el-badge>-->
        <!--</el-menu-item>-->
        <!--<el-submenu index="3">-->
          <!--<template slot="title">Git源码</template>-->
          <!--<el-menu-item index="2-1"><a href="https://github.com/renrenio/renren-fast-vue" target="_blank">前端</a></el-menu-item>-->
          <!--<el-menu-item index="2-2"><a href="https://gitee.com/renrenio/renren-fast" target="_blank">后台</a></el-menu-item>-->
          <!--<el-menu-item index="2-3"><a href="https://gitee.com/renrenio/renren-generator" target="_blank">代码生成器</a></el-menu-item>-->
        <!--</el-submenu>-->
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img src="~@/assets/img/dongtai.gif" :alt="userName">{{noontip}}{{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
        noontip: '您好！', // 上下午提示
        updatePassowrdVisible: false
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.realname }
      }
    },
    mounted () {
      var width = window.innerWidth
      var rate = 1
      if (width >= 1500) {
        rate = 1
      } else if (width >= 1400) {
        rate = 0.80
      } else if (width >= 1300) {
        rate = 0.75
      } else if (width >= 1200) {
        rate = 0.70
      } else if (width >= 1000) {
        rate = 0.67
      }
      document.body.style.zoom = rate
    },
    created () {
      this.mynoontip()
    },
    methods: {
      // // 获取当前时间
      // mynoontip() {
      //   const that = this
      //   const date = new Date()
      //   if (date.getHours() >= 0 && date.getHours() < 12) {
      //     that.noontip = '上午好'
      //   } else if (date.getHours() >= 13 && date.getHours() < 18) {
      //     that.noontip = '下午好'
      //   } else if (date.getHours() == 12) {
      //     that.noontip = '中午好'
      //   } else {
      //     that.noontip = '晚上好'
      //   }
      // },
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
