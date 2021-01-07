<template>
    <div class="d-chart-item dashboard2">
        <div class="dashboard-top">
            <div class="dashboard-top-title">精益改善</div>
        </div>
        <div class="chart-item">
            <div class="arrow-top-right"></div>
            <div id="echarts_LEA" style="height: 330px;width: 100%" ></div>
        </div>
    </div>
</template>

<script>
  import moment from "moment";
  export default {
    inject: ['refresh'],
    name: "Dashboard2",
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
        endDate: '',
        target: [],
        director: [],
        closed: [],
        clorate: [],
        targetrate: []
      }
    },
    activated () {
      this.startDate = moment(moment().add(-14, 'days').valueOf()).format('YYYY-MM-DD')
      this.endDate = moment(moment().valueOf()).format('YYYY-MM-DD')
      // this.getData()
    },
    mounted () {
      this.drawLine()
      this.getData()
    },
    methods: {
      getData () {
        this.$http({
          url: this.$http.adornUrl('/attendan/getLearn'),
          method: 'post',
          params: this.$http.adornParams({
            'startDate': this.startDate,
            'endDate': this.endDate
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.target = JSON.parse(data.learnData.target)
            this.director = JSON.parse(data.learnData.director)
            this.closed = JSON.parse(data.learnData.closed)
            this.clorate = JSON.parse(data.learnData.clorate)
            this.targetrate = JSON.parse(data.learnData.targetrate)

            let options1 = {
              xAxis: {
                data: this.director
              },
              series: [
                {
                  data: this.clorate
                },
                {
                  data: this.targetrate
                },
                {
                  data: this.target
                },
                {
                  data: this.closed
                }
              ]
            }
            this.myChartl.setOption(options1)
        } else {
          this.$message.error(data.msg)
        }
      })
      },
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        this.myChartl = this.$echarts.init(document.getElementById('echarts_LEA'))
        this.myChartl.setOption({

          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a0}: {c0}%  {a1}: {c1}% <br />{a2}: {c2}  {a3}: {c3}'
          },
          color: [ 'RGB(65, 55, 217)', 'RGB(63, 196, 86)', 'rgb(202, 134, 34)', 'RGB(29, 157, 255)', 'RGB(252, 37, 1)', 'RGB(29, 157, 255)', 'RGB(212, 130, 101)' ],
          legend: {
            data: ['滚动年度目标件数', '通过件数', '达成率', '目标达成率'],
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
              interval: 0,
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 9
              }
            },
            // data: this.nameList
            data: this.director
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
              name: '达成率',
              type: 'line',
              icon: 'line',
              yAxisIndex: 0,
              // data: this.avdata4,
              data: this.clorate,
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
              name: '目标达成率',
              type: 'line',
              icon: 'line',
              // data: this.avdata3,
              data: this.targetrate,
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
              name: '滚动年度目标件数',
              type: 'bar',
              icno: 'bar',
              // data: this.dataList4,
              data: this.target,
              yAxisIndex: 1,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: true}
                }
              }
            },
            {
              name: '通过件数',
              type: 'bar',
              icon: 'bar',
              yAxisIndex: 1,
              // data: this.targetData,
              data: this.closed,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: true}
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

    .dashboard2 {
        right: 0px;
        top: 72px;
        width: 32%;
        height: 281px;
        border: 2px solid rgba(5, 44, 127, 1);
        border-top: none;
    }
</style>
