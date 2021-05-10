<template>
  <div class="d-chart-item DashboardR11">
    <!--<div class="chart-item">-->
      <!--<div class="arrow-top-left">-->
      <!--</div>-->
      <!--<div class="arrow-top-right">-->
      <!--</div>-->
    <dv-border-box-8>
      <div id="echarts_left" style="height: 100%;width: 100%" ></div>
    </dv-border-box-8>
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
            left: 'center',
            y: 0,
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            left: 80,
            top: 50,
            bottom: 0
          },
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 14
            },
            formatter: '{b0}:{c0}'
          },
          xAxis: {
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [{
            type: 'category',
            inverse: false,
            data: [
              'VI',
              '检验',
              '镭雕',
              '清洗',
              '品质检验',
              '阳极',
              'PVD',
              '镀膜',
              '喷砂',
              '抛光',
              '自动化',
              '机械手',
              '分析室',
              'CNC'
            ],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#fff',
                fontSize: 16.25
              }
            }
          }
          ],
          series: [{
            type: 'pictorialBar',
            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC',
            symbolRepeat: true,
            symbolMargin: '5%',
            symbolClip: 'true',
            symbolSize: 20,
            symbolPosition: 'start',

            label: {
              normal: {
                show: true,
                position: 'insideRight',
                offset: [40, 0],
                color: '#fff',
                formatter: function (params) {
                  return params.value
                }
              }
            },
            symbolBoundingData: 10000,
            show: true,
            data: [38, 69, 85, 100, 105, 128, 132, 238, 249, 317, 413, 473, 525, 548]
          }]
        })
      },
      reInfo () {
        setTimeout(this.ondoing, 1000)
      },
      ondoing () {
        this.myChart.resize()
      }
    }
  }
  // export default {
  //   name: 'DashboardR11',
  //   data () {
  //     return {
  //       myChart: ''
  //     }
  //   },
  //   mounted () {
  //     this.drawLine()
  //   },
  //   methods: {
  //     drawLine () {
  //       this.myChart = this.$echarts.init(document.getElementById('echarts_left'))
  //       this.myChart.setOption({
  //         title: {
  //           text: '人才分布',
  //           x: 'center',
  //           textStyle: {
  //             color: '#fff'
  //           }
  //         },
  //         color: [
  //           'rgba(101, 191, 255,0.7)', 'rgba(96, 227, 255,0.7)'],
  //         series: [
  //           {
  //             type: 'funnel',
  //             x: '10%',
  //             y: 60,
  //             y2: 60,
  //             width: '80%',
  //             // height: {totalHeight} - y - y2,
  //             min: 0,
  //             minSize: '0%',
  //             maxSize: '100%',
  //             sort: 'ascending', // 'ascending', 'descending'
  //             labelLine: {        // 标签的视觉引导线样式
  //               normal: {
  //                 show: true,      // 是否显示引导线
  //                 length: 30  // 视觉引导线第一段的长度。
  //               }
  //             },
  //             gap: 2,
  //             data: [
  //               // {value: 300, name: 'VI'},
  //               // {value: 350, name: 'CNC'},
  //               // {value: 400, name: '分析室'},
  //               // {value: 450, name: '机械手'},
  //               // {value: 500, name: '自动化'},
  //               // {value: 550, name: '抛光'},
  //               // {value: 600, name: '喷砂'},
  //               // {value: 650, name: '镀膜'},
  //               // {value: 700, name: 'PVD'},
  //               // {value: 750, name: '阳极'},
  //               // {value: 800, name: '品质检验'},
  //               // {value: 850, name: '清洗'},
  //               // {value: 900, name: '镭雕'},
  //               // {value: 1000, name: '检验'}
  //               {value: 38, name: 'VI'},
  //               {value: 69, name: 'CNC'},
  //               {value: 85, name: '分析室'},
  //               {value: 100, name: '机械手'},
  //               {value: 105, name: '自动化'},
  //               {value: 128, name: '抛光'},
  //               {value: 132, name: '喷砂'},
  //               {value: 238, name: '镀膜'},
  //               {value: 249, name: 'PVD'},
  //               {value: 317, name: '阳极'},
  //               {value: 413, name: '品质检验'},
  //               {value: 473, name: '清洗'},
  //               {value: 525, name: '镭雕'},
  //               {value: 548, name: '检验'}
  //             ].sort(function (a, b) { return a.value - b.value }),
  //             roseType: true,
  //             label: {
  //               normal: {
  //                 formatter: function (params) {
  //                   return params.name + ' ' + params.value + '人'
  //                 },
  //                 position: 'center'
  //               }
  //             },
  //             itemStyle: {
  //               normal: {
  //                 borderWidth: 0,
  //                 shadowBlur: 30,
  //                 shadowOffsetX: 0,
  //                 shadowOffsetY: 10,
  //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
  //               }
  //             }
  //
  //           }
  //
  //         ]
  //       })
  //     },
  //     reInfo () {
  //       setTimeout(this.ondoing, 1000)
  //     },
  //     ondoing () {
  //       this.myChart.resize()
  //     }
  // }
  // }
</script>

<style lang="scss" scoped>

  .DashboardR11 {
    left: 2%;
    top: 20%;
    width: 30%;
    height: 40%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
</style>
