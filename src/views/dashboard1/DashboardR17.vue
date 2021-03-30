<template>
  <div class="d-chart-item DashboardR17">
    <!--<div class="chart-item">-->
      <!--<div class="arrow-top-left">-->
      <!--</div>-->
      <!--<div class="arrow-top-right">-->
      <!--</div>-->
    <el-col :gutter="24" class="el-row" style='height:100%;width: 100%' type="flex">
      <el-row :span="1" style='height:10%;width: 100%'>
        <p class="ptitle">人均单片(iPad)</p>
      </el-row>
      <el-row :span="23" style='height:90%;width: 100%'>
      <div id='echarts_top2' style='margin:0 auto;height: 100%;width: 100%' ></div>
      </el-row>
    </el-col>
  <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'DashboardR16',
    data () {
      return {
        myChart1: '',
        myChart2: '',
        angle: 0,
       value: 94.3,
        option: '',
      timerId: ''
      }
    },
    created () {
      // setTimeout(this.startTimer, 1000)
    },
    mounted () {
      // this.drawLine()
      this.drawLine()
      setTimeout(this.startTimer, 50)
    },
    methods: {
      drawLine () {
        let _that = this
        this.myChart = this.$echarts.init(document.getElementById('echarts_top2'))
        this.option = {
          title: {
            text: '{a|' + this.value + '}{c|%}',
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 28,
                  color: '#29EEF3'
                },

                c: {
                  fontSize: 20,
                  color: '#ffffff',
                  // padding: [5,0]
                }
              }
            }
          },

          series: [
            // 紫色
            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (0 + _that.angle) * Math.PI / 180,
                    endAngle: (90 + _that.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#8383FA",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5", //紫点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
                let point = _that.getCirlPoint(x0, y0, r, (90 + _that.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#8450F9", //绿
                    fill: "#8450F9"
                  },
                  silent: true
                };
              },
              data: [0]
            },
            // 蓝色

            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (180 + _that.angle) * Math.PI / 180,
                    endAngle: (270 + _that.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0dfa1a",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            },
            {
              name: "ring5", // 蓝色
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6;
                let point = _that.getCirlPoint(x0, y0, r, (180 + _that.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#17fa27", //绿
                    fill: "#4386FA"
                  },
                  silent: true
                };
              },
              data: [0]
            },

            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (270 + -_that.angle) * Math.PI / 180,
                    endAngle: (40 + -_that.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#1410ff",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            },
            // 橘色

            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (90 + -_that.angle) * Math.PI / 180,
                    endAngle: (220 + -_that.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#FF8E89",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _that.getCirlPoint(x0, y0, r, (90 + -_that.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#FF8E89", //粉
                    fill: "#FF8E89"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5", //绿点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _that.getCirlPoint(x0, y0, r, (270 + -_that.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB", //绿
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }
          ]
        }
      },
      getCirlPoint (x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
        let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
        return {
          x: x1,
          y: y1
        }
      },
      draw () {
        this.angle = this.angle + 3
        this.myChart.setOption(this.option, true)
      },
      startTimer () {
        this.timer = setInterval(this.draw, 70)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .DashboardR17 {
    left: 52%;
    top: 14%;
    width: 20%;
    height: 25%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
  .ptitle{
    font-size: 150%;
    font-family: '宋体';
    color: #0CD3DB;
    font-style: italic;
    margin-top: 10%;
    font-weight: bold;
    position:relative;
    text-align:center;
  }
</style>
