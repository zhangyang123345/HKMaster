<template>
  <div class='d-chart-item DashboardR15'>
    <!--<div class="chart-item">-->
      <!--<div class="arrow-top-left">-->
      <!--</div>-->
      <!--<div class="arrow-top-right">-->
      <!--</div>-->
      <div id='echarts_right2' style='margin:0 auto;height: 100%;width: 100%' ></div>
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'DashboardR15',
    data () {
      return {
        myChart: '',
        timer: '',
        value: 0.60,
        data: [{
          value: 0.6,
          direction: 'right', // 水波移动的方向，默认right,top 和bottom时，单条水波静止
          itemStyle: {
            normal: { // 正常样式
              color: 'rgba(1,115,178,0.7)',
              opacity: 0.6
            }
          }
        },
          {
            value: 0.6,
            direction: 'right', // 水波移动的方向，默认right,top 和bottom时，单条水波静止
            itemStyle: {
              normal: { // 正常样式
                color: 'rgba(1,115,178,0.7)',
                opacity: 0.6
              }
            }
          },
          {
            value: 0.6,
            direction: 'right', // 水波移动的方向，默认right,top 和bottom时，单条水波静止
            itemStyle: {
              normal: { // 正常样式
                color: 'rgba(1,115,178,0.7)',
                opacity: 0.6
              }
            }
          }],
        relData: 3000
      }
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      drawLine () {
        let _that = this
        this.myChart = this.$echarts.init(document.getElementById('echarts_right2'))
        this.myChart.setOption({
          series: [{
            type: 'liquidFill',
            radius: '100%',         // 半径大小
            center: ['50%', '50%'], // 布局位置
            waveAnimation: 1,      // 动画时长
            amplitude: 10,          // 振幅
            data: _that.data,
            backgroundStyle: {
              borderWidth: 5,
              color: 'rgb(255,0,255,0.01)'
            },
            label: {
              normal: {
                formatter: '今日用水量:' + _that.relData + 'm3',
                textStyle: {
                  fontSize: 12
                }
              }
            },
            outline: { // 轮廓设置
              show: false
            }
          }]
        })
      }
  }
  }
</script>

<style lang='scss' scoped>

  .DashboardR15 {
    left: 70%;
    top: 45%;
    width: 15%;
    height: 20%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
</style>
