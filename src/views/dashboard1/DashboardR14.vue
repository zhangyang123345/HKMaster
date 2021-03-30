<template>
  <div class="d-chart-item DashboardR14">
    <!--<div class="chart-item">-->
      <!--<div class="arrow-top-left">-->
      <!--</div>-->
      <!--<div class="arrow-top-right">-->
      <!--</div>-->
      <div id='echarts_left2' style='margin:0 auto;height: 100%;width: 100%' ></div>
  <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'DashboardR11',
    data () {
      return {
        myChart: '',
        angle: 0,
        value: 80,
        option: '',
        timerId: ''
      }
    },
    mounted () {
      this.drawLine()
      // setTimeout(this.startTimer, 500)
    },
    methods: {
      drawLine () {
        let _that = this
        _that.myChart = this.$echarts.init(document.getElementById('echarts_left2'))
        this.myChart.setOption({
          title: {
            text: 'WIP',
            left: 'center',
            y: 0,
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            bottom: 40
          },
          xAxis: {
            data: ['Boston', 'V17', 'W95G', 'Toronto'],
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 129, 109, 0.1)',
                width: 1 // 这里是为了突出显示加上的
              }
            },
            axisLabel: {
              textStyle: {
                color: '#999',
                fontSize: 12
              }
            }
          },
          yAxis: [{
            show: false
          }
          ],
          series: [{
            name: 'hill',
            type: 'pictorialBar',
            barCategoryGap: '0%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            label: {
              show: true,
              position: 'top',
              distance: 15,
              color: '#66a6ff',
              fontWeight: 'bolder',
              fontSize: 20
            },
            itemStyle: {
              normal: {
                // color: {
                //   type: 'linear',
                //   x: 0,
                //   y: 0,
                //   x2: 0,
                //   y2: 1,
                //   colorStops: [{
                //     offset: 0.4,
                //     color: 'rgba(201, 22, 31, 0.8)' //  0%  处的颜色
                //   },
                //     {
                //       offset: 0.5,
                //       color: 'rgba(255, 212, 16, 0.8)' //  100%  处的颜色
                //     },
                //     {
                //       offset: 1,
                //       color: 'rgba(13, 149, 25, 0.8)' //  100%  处的颜色
                //     }
                //   ],
                //   global: false //  缺省为  false
                // }
              },
              emphasis: {
                opacity: 1
              }
            },
            data: [{value: 311879,
              itemStyle: {
                normal: {
              color: { type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0.1,
                  color: 'rgba(201, 22, 31, 0.8)' //  0%  处的颜色
                },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 212, 16, 0.8)' //  100%  处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(13, 149, 25, 0.8)' //  100%  处的颜色
                  }
                ],
                global: false }}}},
              {value: 24306,
                itemStyle: {
                  normal: {
                    color: { type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 1,
                          color: 'rgba(13, 149, 25, 0.8)' //  100%  处的颜色
                        }
                      ],
                      global: false }}}},
              {value: 16287,
                itemStyle: {
                  normal: {
                    color: { type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 1,
                          color: 'rgba(13, 149, 25, 0.8)' //  100%  处的颜色
                        }
                      ],
                      global: false }}}},
              {value: 84274,
                itemStyle: {
                  normal: {
                    color: { type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0.5,
                          color: 'rgba(255, 212, 16, 0.8)' //  100%  处的颜色
                        },
                        {
                          offset: 1,
                          color: 'rgba(13, 149, 25, 0.8)' //  100%  处的颜色
                        }
                      ],
                      global: false }}}}],
            z: 10
          }]
        })
      }
  }
  }
</script>

<style lang="scss" scoped>

  .DashboardR14 {
    left: 2%;
    top: 60%;
    width: 35%;
    height: 38%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
</style>
