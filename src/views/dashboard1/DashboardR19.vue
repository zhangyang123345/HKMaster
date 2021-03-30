<template>
  <div class='d-chart-item DashboardR19'>
    <!--<div class="chart-item">-->
      <!--<div class="arrow-top-left">-->
      <!--</div>-->
      <!--<div class="arrow-top-right">-->
      <!--</div>-->
      <div id='echarts_right3' style='margin:0 auto;height: 100%;width: 100%' ></div>
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'DashboardR19',
    data () {
      return {
        myChart: '',
        timer: '',
        value: 0.60,
        data: [],
        relData: 3000
      }
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      drawLine () {
        var highlight = '#03b7c9'
        var demoData = [
          {
            value: 90,
            unit: '%',
            pos: ['50%', '50%'],
            range: [0, 100],
            splitNum: 10,
            YS: [
              [0.6, '#f3390d'],
              [0.8, '#dac928'],
              [1, '#30da74']
            ]
          }
        ]
        this.myChart = this.$echarts.init(document.getElementById('echarts_right3'))
        this.myChart.setOption({
          series: (function () {
            var result = []
            demoData.forEach(function (item) {
              result.push(
                // 外围刻度
                {
                  type: 'gauge',
                  center: item.pos,
                  radius: '85%', // 1行2个
                  splitNumber: item.splitNum || 10,
                  min: item.range[0],
                  max: item.range[1],
                  startAngle: 225,
                  endAngle: -45,
                  axisLine: {
                    show: true,
                    lineStyle: {
                      width: 2,
                      shadowBlur: 0,
                      color: [
                        [1, highlight]
                      ]
                    }
                  },
                  axisTick: {
                    show: true,
                    lineStyle: {
                      color: highlight,
                      width: 1
                    },
                    length: -5,
                    splitNumber: 10
                  },
                  splitLine: {
                    show: true,
                    length: -10,
                    lineStyle: {
                      color: highlight,
                    }
                  },
                  axisLabel: {
                    distance: -18,
                    textStyle: {
                      color: highlight,
                      fontSize: '10',

                    }
                  },
                  pointer: {
                    show: 0
                  },
                  detail: {
                    show: 0
                  }
                }, {
                  name: '速度',
                  type: 'gauge',
                  center: item.pos,
                  splitNumber: item.splitNum || 10,
                  min: item.range[0],
                  max: item.range[1],
                  radius: '85%',
                  axisLine: { // 坐标轴线
                    show: false,
                    lineStyle: { // 属性lineStyle控制线条样式
                      color: item.YS,
                      shadowColor: "#ccc",
                      shadowBlur: 25,
                      width: 0
                    }
                  },
                  axisLabel: {
                    show: false
                  },
                  axisTick: { // 坐标轴小标记
                    // show: false,
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                      color: 'auto',
                      width: 2
                    }
                  },
                  splitLine: { // 分隔线
                    show: false,
                    length: 20, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                      color: 'auto'
                    }
                  },
                  title: {
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      fontWeight: 'bolder',
                      fontSize: 20,
                      fontStyle: 'italic'
                    }
                  },
                  detail: {
                    show: true,
                    offsetCenter: [0, '100%'],
                    textStyle: {
                      fontSize: 12,
                      color: '#2C6BA0'
                    },
                    formatter: [
                      'OEE: ' + '{value} ' + (item.unit || '')
                    ].join('\n')
                  },
                  data: [{
                    value: item.value
                  }],
                  pointer: {
                    width: 5
                  }
                },
                // 内侧指针、数值显示
                {
                  name: item.name,
                  type: 'gauge',
                  center: item.pos,
                  radius: '90%',
                  startAngle: 225,
                  endAngle: -45,
                  min: item.range[0],
                  max: item.range[1],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      width: 16,
                      color: [
                        [1, 'rgba(75,228,255,.1)']
                      ]
                    }
                  },
                  axisTick: {
                    show: 0,
                  },
                  splitLine: {
                    show: 0,
                  },
                  axisLabel: {
                    show: 0
                  },
                  pointer: {
                    show: true,
                    length: '90%',
                    width: 3,
                  },
                  itemStyle: { //表盘指针的颜色
                    color: 'rgba(255, 153, 0, 0.31)',
                    borderColor: '#ff9900',
                    borderWidth: 1
                  },
                  detail: {
                    show: false,
                    offsetCenter: [0, '100%'],
                    textStyle: {
                      fontSize: 20,
                      color: '#2C6BA0'
                    },
                    formatter: [
                      '{value} ' + (item.unit || '')
                    ].join('\n')
                  },

                  data: [{
                    value: item.value
                  }]
                }
              );
            });
            return result;
          })()
        })
      }
  }
  }
</script>

<style lang='scss' scoped>

  .DashboardR19 {
    right: 20px;
    top: 42%;
    width: 13%;
    height: 25%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
</style>
