<template>
  <div class="d-chart-item DashboardR11">
    <!--<div class="chart-item">-->
      <!--<div class="arrow-top-left">-->
      <!--</div>-->
      <!--<div class="arrow-top-right">-->
      <!--</div>-->
      <div id="echarts_left" style="height: 100%;width: 100%" ></div>
    <!--</div>-->
      <!--<el-col>-->
      <!--<el-row :span="1" type="flex"  class="el-row"  justify="center">-->
        <!--<h1 style="color: #00b7ee">产能&品质</h1>-->
      <!--</el-row>-->
      <!--<el-row :span="40" type="flex"  class="el-row"  justify="center">-->
        <!--<el-col>-->
          <!--<div id="echarts_out" style="top:-100px;height: 520px;width: 80%;position: relative;" ></div>-->
        <!--</el-col>-->
        <!--<el-col>-->
          <!--<div id="echarts_dds" style="top:-100px;height: 520px;width: 80%;position: relative;" ></div>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-col>-->
  </div>
</template>

<script>
  export default {
    name: 'DashboardR11',
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
        this.myChart = this.$echarts.init(document.getElementById('echarts_left'))
        this.myChart.setOption({
          title: {
            text: '人才分布',
            x: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          color: [
            'rgba(101, 191, 255,0.7)', 'rgba(96, 227, 255,0.7)'],
          series: [
            {
              type: 'funnel',
              x: '10%',
              y: 60,
              y2: 60,
              width: '80%',
              // height: {totalHeight} - y - y2,
              min: 0,
              minSize: '0%',
              maxSize: '100%',
              sort: 'ascending', // 'ascending', 'descending'
              labelLine: {        // 标签的视觉引导线样式
                normal: {
                  show: true,      // 是否显示引导线
                  length: 30  // 视觉引导线第一段的长度。
                }
              },
              gap: 2,
              data: [
                // {value: 300, name: 'VI'},
                // {value: 350, name: 'CNC'},
                // {value: 400, name: '分析室'},
                // {value: 450, name: '机械手'},
                // {value: 500, name: '自动化'},
                // {value: 550, name: '抛光'},
                // {value: 600, name: '喷砂'},
                // {value: 650, name: '镀膜'},
                // {value: 700, name: 'PVD'},
                // {value: 750, name: '阳极'},
                // {value: 800, name: '品质检验'},
                // {value: 850, name: '清洗'},
                // {value: 900, name: '镭雕'},
                // {value: 1000, name: '检验'}
                {value: 38, name: 'VI'},
                {value: 69, name: 'CNC'},
                {value: 85, name: '分析室'},
                {value: 100, name: '机械手'},
                {value: 105, name: '自动化'},
                {value: 128, name: '抛光'},
                {value: 132, name: '喷砂'},
                {value: 238, name: '镀膜'},
                {value: 249, name: 'PVD'},
                {value: 317, name: '阳极'},
                {value: 413, name: '品质检验'},
                {value: 473, name: '清洗'},
                {value: 525, name: '镭雕'},
                {value: 548, name: '检验'}
              ].sort(function (a, b) { return a.value - b.value }),
              roseType: true,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.name + ' ' + params.value + '人'
                  },
                  position: 'center'
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  shadowBlur: 30,
                  shadowOffsetX: 0,
                  shadowOffsetY: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }

            }

          ]
        })
      }
  }
  }
</script>

<style lang="scss" scoped>

  .DashboardR11 {
    left: 2%;
    top: 10%;
    width: 30%;
    height: 50%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
</style>
