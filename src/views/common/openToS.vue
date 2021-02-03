<template>
  <div
    class="site-wrapper"
    :class="{ 'site-sidebar--fold': sidebarFold }"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中">
    <template v-if="!loading">
      <main-navbar />
      <main-sidebar />
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main-content v-if="!$store.state.common.contentIsNeedRefresh" />
      </div>
    </template>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    data () {
      return {
        loading: true
      }
    },
    components: {
    },
    computed: {
    },
    created () {
      this.getUserInfo()
    },
    mounted () {
      this.resetDocumentClientHeight()
      this.open()
    },
    methods: {
      // 重置窗口可视高度
      resetDocumentClientHeight () {
        this.documentClientHeight = document.documentElement['clientHeight']
        window.onresize = () => {
          this.documentClientHeight = document.documentElement['clientHeight']
        }
      },
      // 获取当前管理员信息
      open () {
        var pathData = this.$router.apps[0]._route.query
        var data = new Object()
        data[pathData.userName] = pathData.userId
        data[pathData.passName] = pathData.passId
            this.$http({
              url: this.$http.adornUrl('/homeCentrol/openPAccess'),
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              data: Qs.stringify(pathData)
            }).then(res => {
            }).catch(err => {
            })
        window.document.location.href = pathData.direct
        // this.$http({
        //   url: this.$http.adornUrl('/homeCentrol/openJAccess'),
        //   method: 'post',
        //   params: pathData
        // }).then(({data}) => {
        //     if (data && data.code === 0) {
        //         if (data.Cookie != null) {
        //           window.name = pathData.domain
        //           for (var i in data.Cookie) {
        //             //var value = data.result.Cookie[i].value
        //             document.cookie = data.Cookie[i]//value.replace(/HttpOnly; /g, '')
        //             console.log(data.Cookie[i])
        //           }
        //         }
        //      window.document.location.href = pathData.direct
        //     }
        // })
        // window.document.location.href = pathData.direct
        // this.$http({
        //   url: pathData.proxyApi + pathData.loginPath,
        //   method: pathData.loginMethod,
        //   data: data,
        //   header: {
        //     Host: 'http://cnctug0pdmsap01',
        //     Origin: 'http://cnctug0pdmsap01',
        //     Referer: 'http://cnctug0pdmsap01/'
        //   }
        // }).then(res => {
        // }).catch(err => {
        // })
        // this.$http({
        //   url: pathData.proxyApi + pathData.return,
        //   method: pathData.returnMethod
        // }).then(res => {
        //     //window.document.body.innerHTML = res.data
        // }).catch(err => {
        //     // window.document.location.href = pathData.direct
        // })
         //window.document.location.href = pathData.direct
        //
        // this.$http({
        //   url: this.$http.adornUrl('/homeCentrol/openPIS'),
        //   method: 'post',
        //   params: pathData
        // }).then(({data}) => {
        // })
        }
    }
  }
</script>
