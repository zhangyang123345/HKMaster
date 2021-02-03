<template>
  <div class="d-chart-item dashboard6" >
    <div class="dashboard-top" @click.stop="openHtml">
      <div class="dashboard-top-title">OEE</div>
    </div>
    <div class="chart-item">
      <div class="arrow-top-right"></div>
      <div id="echarts_D4OEE" style="height: 330px;width: 100%"></div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    inject: ['refresh'],
    name: "Dashboard6",
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

      this.getData()
    },
    created () {
        setInterval(() => {
          this.getData()
      }, 1800000)
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      getData () {
        this.startDate = moment(moment().add(-10, 'days').valueOf()).format('YYYY-MM-DD')
        this.endDate = moment(moment().valueOf()).format('YYYY-MM-DD')
        this.$http({
          url: this.$http.adornUrl('/homeCentrol/getOEE'),
          method: 'post',
          params: this.$http.adornParams({
            'startDate': this.startDate,
            'endDate': this.endDate
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.nameList = data.oeeData.nameList
          this.dataList3 = data.oeeData.dataList3
          this.dataList4 = data.oeeData.dataList4
          this.targetData = data.oeeData.targetData
          this.avdata3 = data.oeeData.avdata3
          this.avdata4 = data.oeeData.avdata4
          let options1 = {
            xAxis: {
              data: this.nameList
            },
            series: [
              {
                data: this.dataList3
              }, {
                data: this.dataList4
              }, {
                data: this.targetData
              }, {
                data: this.avdata3
              }, {
                data: this.avdata4
              }
            ]
          }
          this.myChart.setOption(options1)
        } else {
          this.$message.error(data.msg)
        }
      })
      },
      openHtml () {
        // var parma = new Object()
        // parma.proxyApi = 'PIS'
        // parma.userName = 'UserName'
        // parma.userId = '2680715'
        // parma.passName = 'Password'
        // parma.passId = 'Jabil$1234'
        // parma.token = '__RequestVerificationToken'
        // parma.domain = 'cnctug0pdmsap01'
        // parma.loginPath = '/Login/SignIn'
        // parma.loginMethod = 'POST'
        // parma.return = '/oeereport/oee_trendreport'
        // parma.returnMethod = 'get'
        // parma.direct = 'http://cnctug0pdmsap01/pis_m/oeereport/oee_trendreport'
        // const wind = this.$router.resolve({name: 'openToS', query: parma})
        // window.open(wind.href, '_blank')
      //<script>window.onload=function(){
        //  alert('TTTTTT')
       // }
       // <script>
         var wind = window.open('about:blank', '_blank')
        // 组装form表单
       var html = "<form action='http://cnctug0pdmsap01/PIS_M/Login/SignIn' method='post'>"
        html += "<input type='text' name='UserName' value='666666' style='display: none'>"
        html += "<input type='text' name='Password' value='123456' style='display: none'>"
        html += "<input type='checkbox' name='IsEmployee' value='1' class='js-checkbox-all' checked>"
        html += " </form> "
        wind.document.body.innerHTML = html
        wind.document.forms[0].submit()
        // wind.document.location.href = 'http://cnctug0pdmsap01/pis_m/oeereport/oee_trendreport'
      },
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('echarts_D4OEE'))
        this.myChart.setOption({

          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a2}: {c2}%<br />{a0}: {c0}%     {a3}: {c3}%<br />{a1}: {c1}%     {a4}: {c4}%<br />'
          },
          color: ['RGB(65, 55, 217)', 'RGB(72, 188, 177)', 'RGB(63, 196, 86)', 'RGB(212, 130, 101)', 'RGB(29, 157, 255)'],
          legend: {
            data: ['E3', 'D4', '目标', 'E3平均', 'D4平均'],
            icon: 'line',
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
                color: '#fff'
              }
            },
            data: this.nameList
          },
          yAxis: {
            type: 'value',
            min: function (value) {
              return value.min - 1
            },
            max: function (value) {
              return value.max + 1
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#333333'
              }},
            axisLabel: {
              show: true,
              color: '#ffffff',
              formatter: '{value}%'
            },
            show: true
          },
          series: [
            {
              name: 'E3',
              type: 'line',
              data: this.dataList3,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: true, formatter: '{c0}%', color: '#ffffff', position: 'top'}
                }
              }
            },
            {
              name: 'D4',
              type: 'line',
              data: this.dataList4,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: true, formatter: '{c0}%', color: 'RGB(72, 188, 177)', position: 'top'}
                }
              }
            },
            {
              name: '目标',
              type: 'line',
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
            },
            {
              name: 'E3平均',
              type: 'line',
              data: this.avdata3,
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
              name: 'D4平均',
              type: 'line',
              data: this.avdata4,
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

  .dashboard6 {
    left: 0px;
    top: 417px;
    width: 32%;
    height: 288px;
    border: 2px solid rgba(5, 44, 127, 1);
    border-top: none;
  }
</style>
