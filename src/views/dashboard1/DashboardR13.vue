<template>
  <div class="d-chart-item DashboardR13">
      <!--<div id="echarts_right" style="margin:0 auto;height: 100%;width: 100%" ></div>-->
    <img  src="../.././../static/img/wx20210325143733.png" style="width: 100%;height:100%;"/>
  </div>
</template>
<script>
  export default {
    name: 'DashboardR13',
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
        // this.myChart = this.$echarts.init(document.getElementById('echarts_right'))
        this.myChart.setOption({
          title: {
            text: '总人力分布',
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
              'MPC',
              '设备',
              '厂务',
              '生技',
              '阳极生产',
              'PVD生产',
              '总人力'
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
            data: [20, 50, 150, 300, 600, 2200, 3425]

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
</script>
<style lang="scss" scoped>

  .DashboardR13 {
    right: 2%;
    top: 10%;
    width: 28%;
    height: 30%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
</style>
