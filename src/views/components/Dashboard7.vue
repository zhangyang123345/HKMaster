<template>
    <div class="d-chart-item dashboard7">
        <div class="dashboard-top">
            <div class="dashboard-top-title">WIP</div>
        </div>
        <div class="chart-item">
            <div class="arrow-top-right"></div>
            <div id="echarts_WIP" style="height: 330px;width: 100%"></div>
        </div>
    </div>
</template>

<script>
  export default {
    inject: ['refresh'],
    name: "Dashboard7",
    data () {
      return {
        myChart: '',
        title: [],
        nameList: [],
        dataList3: [],
        dataList4: [],
        targetData: [],
        avdata3: [],
        avdata4: [],
        startDate: '',
        endDate: ''
      }
    },
    activated () {
      this.getData()
    },
    created () {
        setInterval(() => {
          this.getData()
      }, 600000)
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      getData () {
        this.$http({
          url: this.$http.adornUrl('/homeCentrol/getWIP'),
          method: 'post',
          params: this.$http.adornParams({
            'startDate': this.startDate,
            'endDate': this.endDate
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.title = data.wipData.title
          this.nameList = data.wipData.nameList
          this.Day8 = data.wipData.Day8
          this.Day9 = data.wipData.Day9
          this.Day10 = data.wipData.Day10
          this.WIP = data.wipData.WIP
          this.LISTR = data.wipData.LISTR
          this.NG = data.wipData.NG
          let options1 = {
            xAxis: {
              data: this.nameList
            },
            legend: {
              data: this.title
            },
            series: [
              {
                name: this.title[0],
                data: this.Day8
              }, {
                name: this.title[1],
                data: this.Day9
              }, {
                name: this.title[2],
                data: this.Day10
              }, {
                name: this.title[3],
                data: this.WIP
              }, {
                name: this.title[4],
                data: this.LISTR
              }, {
                name: this.title[5],
                data: this.NG
              }
            ]
          }
          this.myChart.setOption(options1)
        } else {
          this.$message.error(data.msg)
        }
      })
      },
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('echarts_WIP'))
        this.myChart.setOption({

          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a0}: {c0}%     {a3}: {c3}<br />{a1}: {c1}%     {a4}: {c4}<br />{a2}: {c2}%    {a5}: {c5} '
          },
          color: [ 'RGB(65, 55, 217)', 'rgb(137, 137, 18)', 'rgb(255, 55, 163)', 'RGB(29, 157, 255)', 'RGB(212, 130, 101)', 'RGB(252, 37, 1)' ],
          legend: {
            data: this.title,
            top: '5px',
            textStyle: {
              color: '#ffffff'
            },
            inactiveColor: 'rgb(100, 107, 119)'
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            data: this.nameList
          },
          yAxis: [{
            type: 'value',
            position: 'left',
            splitLine: {show: false}, //去除网格线
            axisLabel: {
              show: true,
              color: '#ffffff',
              formatter: '{value}%'
            },
            show: true
          }, {
              type: 'value',
              position: 'right',
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#333333'
                }},
              axisLabel: {
                show: true,
                color: '#ffffff'
              },
              show: true
            }
          ],
          series: [
            {
              name: this.title[0],
              type: 'line',
              icon: 'line',
              data: this.Day8,
              yAxisIndex: 0,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: false}
                }
              }
            },
            {
              name: this.title[1],
              type: 'line',
              icon: 'line',
              yAxisIndex: 0,
              data: this.Day9,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: true, formatter: '{c0}%', color: '#ffffff'}
                }
              }
            },
            {
              name: this.title[2],
              type: 'line',
              icon: 'line',
              data: this.Day10,
              yAxisIndex: 0,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: true, formatter: '{c0}%', color: '#ffffff'}
                }
              }
            },
            {
              name: this.title[3],
              type: 'bar',
              icon: 'bar',
              stack: 'PCS',
              data: this.WIP,
              yAxisIndex: 1,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: false}
                }
              }
            },
            {
              name: this.title[4],
              type: 'bar',
              icon: 'bar',
              yAxisIndex: 1,
              stack: 'PCS',
              data: this.LISTR,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: false}
                }
              }
            },
            {
              name: this.title[5],
              type: 'bar',
              icon: 'bar',
              yAxisIndex: 1,
              stack: 'PCS',
              data: this.NG,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: false}
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

    .dashboard7 {
        left: 0px;
        top: 770px;
        width: 32%;
        height: 288px;
        border: 2px solid rgba(5, 44, 127, 1);
        border-top: none;
    }
</style>
