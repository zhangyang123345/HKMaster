<template>
  <div class="d-chart-item DashboardR2">
    <div class="chart-item">
      <div class="arrow-top-left">
      </div>
      <div class="arrow-top-right">
      </div>
      <el-carousel indicator-position="outside" class="homeImage" interval="10000">
        <el-carousel-item v-for="item in imageList" :key="item">
          <!--<el-image style="width: 400px;height:300px;" :src="require(item)"></el-image>-->
          <img  :src="item" style="width: 658px;height:567px;"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'
  export default {
    name: 'DashboardR2',
    components: {
      vueSeamlessScroll
    },
    data () {
      return {
        myChart: '',
        imageList: []
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.$http({
          url: this.$http.adornUrl('/image/search'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            var basrURL = window.SITE_CONFIG.baseUrl
            for (var i in data.list) {
              this.imageList.push(basrURL + data.list[i].url)
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      drawLine () {
      }
    }
  }
</script>

<style lang="scss" scoped>

  .DashboardR2 {
    left: 500px;
    top: 330px;
    width: 550px;
    height: 520px;
    border: 2px solid rgba(5, 44, 127, 1);
    border-top: none;
  }
</style>
