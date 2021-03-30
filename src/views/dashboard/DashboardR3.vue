<template>
  <div class="d-chart-item DashboardR3">
    <div class="chart-item">
      <div class="arrow-top-left">
      </div>
      <div class="arrow-top-right">
      </div>
      <div id="echarts_left" style="height: 540px;width: 100%" ></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "DashboardR3",
    data () {
      return {
        myChart: ''
      }
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      drawLine () {
        var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC']
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('echarts_left'))
        this.myChart.setOption({
          grid: {
            left: '11%',
            right: '0%',
            bottom: '8%',
            containLabel: true
          },
          xAxis: [{
            show: false
          }],
          yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            offset: '27',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '16'
              }
            },
            data: ['MPC', '设备', '厂务', '生技', '阳极生产', 'PVD生产', '总人力']
          }, {
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '16'
              }
            },
            data: ['', '', '', '', '', '', '']
          }, {
            name: '总人力分布',
            nameTextStyle: {
              color: '#00b7ee',
              fontSize: '16',
              padding: [0, 0, 0, 200]
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)'
              }
            },
            data: []
          }],
          series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: [20, 50, 150, 300, 600, 2200, 3425],
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#ffffff',
                  fontSize: '16'
                }
              }
            },
            barWidth: 12,
            itemStyle: {
              normal: {
                color: function (params) {
                  var num = myColor.length
                  return myColor[params.dataIndex % num]
                }
              }
            },
            z: 2
          }, {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [99.5, 99.5, 180, 350, 650, 2300, 3500],
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#0e2147',
                barBorderRadius: 5
              }
            },
            z: 1
          }, {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: [99.5, 99.5, 180, 350, 650, 2300, 3500],
            barWidth: 24,
            itemStyle: {
              normal: {
                color: function (params) {
                  var num = myColor.length
                  return myColor[params.dataIndex % num]
                },
                barBorderRadius: 5
              }
            },
            z: 0
          }
          ]
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

  .DashboardR3 {
    right: 20px;
    top: 330px;
    width: 500px;
    height: 520px;
    border: 2px solid rgba(5, 44, 127, 1);
    border-top: none;
  }
</style>
