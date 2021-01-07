<template>
    <div class="d-chart-item dashboard3">
        <div class="dashboard-top">
            <div class="dashboard-top-title">品质</div>
        </div>
        <div class="chart-item">
            <div class="arrow-top-right"></div>
            <div id="echarts_QTS" style="height: 330px;width: 100%"></div>
        </div>
    </div>
</template>

<script>
  import moment from "moment";
  export default {
    inject: ['refresh'],
    name: "Dashboard3",
    data () {
      return {
        myChart: '',
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
      this.startDate = moment(moment().add(-14, 'days').valueOf()).format('YYYY-MM-DD')
      this.endDate = moment(moment().valueOf()).format('YYYY-MM-DD')
      this.getData()
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      getData () {
        this.$http({
          url: this.$http.adornUrl('/homeCentrol/getQCS'),
          method: 'post',
          params: this.$http.adornParams({
            'startDate': this.startDate,
            'endDate': this.endDate
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.nameList = data.QTEData.nameList
          this.dataList3 = data.QTEData.firstCheck
          this.dataList4 = data.QTEData.firstOk
          this.targetData = data.QTEData.firstNG
          this.avdata3 = data.QTEData.firstTarget
          this.avdata4 = data.QTEData.firstRate
          let options1 = {
            xAxis: {
              data: this.nameList
            },
            series: [
              {
                data: this.avdata4
              }, {
                data: this.avdata3
              }, {
                data: this.dataList4
              }, {
                data: this.targetData
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
        this.myChart = this.$echarts.init(document.getElementById('echarts_QTS'))
        this.myChart.setOption({

          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a0}: {c0}%  {a1}: {c1}% <br />{a2}: {c2}  {a3}: {c3}'
          },
          color: [ 'RGB(65, 55, 217)', 'RGB(63, 196, 86)','RGB(29, 157, 255)', 'RGB(252, 37, 1)','RGB(29, 157, 255)', 'RGB(212, 130, 101)' ],
          legend: {
            data: ['PVD一次良率', '目标', '良品数', '不良数'],
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
              interval: 0,
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
              name: 'PVD一次良率',
              type: 'line',
              icon: 'line',
              yAxisIndex: 0,
              data: this.avdata4,
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
              name: '目标',
              type: 'line',
              icon: 'line',
              data: this.avdata3,
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
              name: '良品数',
              type: 'bar',
              icon: 'bar',
              stack: 'PCS',
              data: this.dataList4,
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
              name: '不良数',
              type: 'bar',
              icon: 'bar',
              yAxisIndex: 1,
              stack: 'PCS',
              data: this.targetData,
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
    .dashboard3{
        top: 417px;
        right: 0px;
        width: 32%;
        height: 288px;
        border: 2px solid rgba(5, 44, 127, 1);
        border-top: none;
    }
</style>
