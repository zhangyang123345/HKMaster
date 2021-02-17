<template>
  <div class="d-chart-item dashboard8" @mouseleave="runCon">
    <div class='detail-list'>
      <div class='detail-list-item3'>
        <div class='detail-item-text'>
          <h3 id="h3-1"  ></h3>
        </div>
        <div class='detail-item-text'>
          <h3 id="h3-2" style="color: #77C6FF">PVD人才分布</h3>
        </div>
        <div class='detail-item-text'>
          <h3 id="h3-3" ></h3>
        </div>
      </div>
      <div class='detail-list-item1' key='3'>
        <div class='detail-list'>
          <div class='detail-item-text'>
            <h3>{{dataForm.dataBox4}}</h3>
            <span>{{dataForm.textBox4}}</span>
          </div>
          <div class='detail-item-text'>
            <h3>{{dataForm.dataBox1}}</h3>
            <span>{{dataForm.textBox1}}</span>
          </div>
          <div class='detail-item-text'>
            <h3>{{dataForm.dataBox2}}</h3>
            <span>{{dataForm.textBox2}}</span>
          </div>
          <div class='detail-item-text'>
            <h3>{{dataForm.dataBox3}}</h3>
            <span>{{dataForm.textBox3}}</span>
          </div>
        </div>
      </div>
      <div  class="tableItem" v-show="current==2">
        <div class='detail-list-item' key='2'>
        <div id="tecGround" style="height: 300px;width: 100%">
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dashboard8",
    data () {
      return {
        myChart: '',
        myChart1: '',
        myChart4: '',
        current: 2,
        runBuff: true,
        dataForm: {
          dataBox1: 10,
          dataBox2: 5,
          dataBox3: '',
          dataBox4: '',
          textBox1: '',
          textBox2: '',
          textBox3: '',
          textBox4: ''
        },
        report: {
          kin1: [],
          kin2: [],
          kin3: [],
          kin4: [],
          kinSet: []
        },
        articData: {
          date: '',
          typeNList: [],
          other: '',
          sarrive: '',
          added: '',
          attend: 0,
          rLineCount: [],
          roundDList: [],
          traceLineN: [],
          carrive: '',
          ehs: 0,
          absenteeism: '',
          trace: 0,
          tracelineD: [],
          tracelineN: [],
          roundNList: [],
          ehslineN: [],
          vacation: '',
          quite: '',
          attendanl: '',
          manpower: '',
          typeNDList: [],
          rLineName: [],
          typeVDList: '',
          ehslineD: []
        }
      }
    },
    created () {
      /* 每20秒对list方法进行一次刷新 */
      setInterval(() => {
        this.getData()
      }, 50000)
      // setInterval(() => {
      //   this.update()
      // }, 5000)
    },
    mounted () {
      this.getData()
      this.getNewData()
      this.drawLine()
    },
    methods: {
      update () {
        if (this.runBuff) {
            // this.current += 1
            this.dataForm.dataBox1 = (isNaN(this.articData.sarrive) ? 0 : this.articData.sarrive)
            this.dataForm.dataBox2 = (isNaN(this.articData.carrive) ? 0 : this.articData.carrive)
            this.dataForm.dataBox3 = (isNaN(this.articData.attendanl) ? '0%' : parseFloat(this.articData.attendanl)*100) +"%"
          this.dataForm.dataBox4 = (isNaN(this.articData.manpower) ? 0 : this.articData.manpower)
            this.dataForm.textBox1 = this.articData.date + '应到'
            this.dataForm.textBox2 = this.articData.date + '出勤'
            this.dataForm.textBox3 = this.articData.date + '出勤率'
          this.dataForm.textBox4 = this.articData.date + '总人力'
        }
      },
      addClass: function (index) {
        this.runBuff = true
        this.current = index
        this.update()
        this.runBuff = false
      },
      runCon () {
          // this.runBuff = true
      },
      getNewData () {
        this.$http({
          url: this.$http.adornUrl('/cotalent/report'),
          method: 'get',
          params: this.$http.adornParams({
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data)
            this.report.kin1 = data.report.kin1
            this.report.kin2 = data.report.kin2
            this.report.kin3 = data.report.kin3
            this.report.kin4 = data.report.kin4
            this.report.kinSet = data.report.kinSet
            var kinAll = []
            for (var i = 0, len = this.report.kin1.length; i < len; i++) {
              let kinTemp = parseInt(this.report.kin1[i]) + parseInt(this.report.kin2[i])  + parseInt(this.report.kin3[i]) + parseInt(this.report.kin4[i])
              kinAll.push(kinTemp)
            }
            this.tecGround.setOption({
              xAxis: {data: this.report.kinSet},
              series: [
                {data: []},
                {data: []},
                {data: kinAll},
                {data: []}
              ]
            })
          } else {
            this.$message.error(data.msg)
          }
        },
        function (err) {
          this.$message.error(err.toString())
        })
      },
      getData () {
            this.$http({
              url: this.$http.adornUrl('/attendan/queryAtten'),
              method: 'post',
              params: this.$http.adornParams({
                'startDate': this.startDate,
                'endDate': this.endDate
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                  this.articData.date = data.attenData.date
                  this.articData.typeNList = data.attenData.typeNList
                  this.articData.other = data.attenData.other
                  this.articData.sarrive = data.attenData.sarrive
                  this.articData.added = data.attenData.added
                  this.articData.rLineCount = data.attenData.rLineCount
                  this.articData.roundDList = data.attenData.roundDList
                  this.articData.traceLineN = data.attenData.traceLineN
                  this.articData.carrive = data.attenData.carrive
                  this.articData.ehs = data.attenData.ehs
                  this.articData.absenteeism = data.attenData.absenteeism
                  this.articData.trace = data.attenData.trace
                  this.articData.tracelineD = data.attenData.tracelineD
                  this.articData.tracelineN = data.attenData.tracelineN
                  this.articData.roundNList = data.attenData.roundNList
                  this.articData.ehslineN = data.attenData.ehslineN
                  this.articData.vacation = data.attenData.vacation
                  this.articData.quite = data.attenData.quite
                  this.articData.attendanl = data.attenData.attendanl
                  this.articData.manpower = data.attenData.manpower
                  this.articData.typeNDList = data.attenData.typeNDList
                  this.articData.rLineName = data.attenData.rLineName
                  this.articData.typeVDList = data.attenData.typeVDList
                  this.articData.ehslineD = data.attenData.ehslineD
                  this.articData.attend = data.attenData.attend
                this.update()
            } else {
              this.$message.error(data.msg)
            }
        })
      },
      humanFormat (nameList, dataList) {
          var list = []
          for (var i = 0, len = dataList.length; i < len; i++) {
             var data = new Object()
             data.value = dataList[i]
             data.name = nameList[i]
             list.push(data)
          }
          return list
      },
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        this.tecGround = this.$echarts.init(document.getElementById('tecGround'))
        this.tecGround.setOption({

          title: {
            text: '技能熟练层别',
            show: false,
            x: '14px',
            y: '5px'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a0}: {c0}'
          },
          color: [ 'RGB(29,157,255)' ],
          legend: {
            show: true,
            data: [ '', '', 'PVD人员技能掌握分布', '' ],
            top: '50px',
            icon: 'circle',
            textStyle: {
              color: '#fff'
            },
            inactiveColor: 'rgb(100, 107, 119)'
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '30%',
            buttom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            axisLabel: {
              show: true,
              fontSize: 10,
              textStyle: {
                color: '#fff'
              },
              interval: 0
            },
            data: this.report.kinSet
          },
          yAxis: [{
            show: false,
            type: 'value',
            position: 'left',
            splitLine: {show: false}, //去除网格线
            axisLabel: {
              show: true,
              color: '#000000'
            }
          }],
          series: [
            {
              name: '入门',
              type: 'bar',
              icon: 'bar',
              barWidth: 30,
              stack: 'PCS',
              data: this.report.kin1,
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
              name: '熟练',
              type: 'bar',
              icon: 'bar',
              barWidth: 30,
              stack: 'PCS',
              data: this.report.kin2,
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
              name: 'PVD人员技能掌握分布',
              type: 'bar',
              icon: 'bar',
              barWidth: 30,
              stack: 'PCS',
              data: this.report.kin3,
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
              name: '精通',
              type: 'bar',
              icon: 'bar',
              barWidth: 30,
              stack: 'PCS',
              data: this.report.kin4,
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
  .ischeck {
    color: rgb(29, 157, 255) !important;
    font-weight: normal;
  }

  .tableItem {
    width: 100%;
    display: flex;
  }
  .Home_echar {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .dashboard8 {
    top: 100px;
    left: 32.5%;
    width: 35%;
    height: 356px;
    box-shadow: 2px -2px 8px 0px rgba(10, 47, 128, 1);
    border-radius: 4px;
    border: 2px solid rgba(5, 44, 127, 1);
  }

  .detail-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-between;
    justify-content: space-around;
    width: 100%;
    &-item1 {
      display: flex;
      align-items: center;
      position: relative;
      height: 6rem;
      padding: 0 1.125rem;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #343f4b;
      background-color: rgba(19, 25, 47, 0.8);
      img {
        width: 4.25rem;
        height: 4.25rem;
      }
      .detail-item-text {
        h3 {
          color: RGB(255, 255, 255);
          font-size: 25px;
          margin-bottom: 0.25rem;
          text-align: center;
        }
        span {
          font-size: 1rem;
          font-weight: bolder;
          background: linear-gradient(to bottom, #fff, #a9aaa5);
          color: RGB(76, 155, 253);
          -webkit-background-clip: text;
        }
        .unit {
          font-size: 0.2rem;
          margin-left: 0.125rem;
        }
      }
    }
    &-item {
      display: flex;
      align-items: center;
      position: relative;
      height: 13rem;
      padding: 0 1.125rem;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #343f4b;
      background-color: rgba(19, 25, 47, 0.8);
      img {
        width: 4.25rem;
        height: 4.25rem;
      }
      .detail-item-text {
        margin-left: 1.125rem;
        h3 {
          color: #a9aaa5;
          font-size: 25px;
          margin-bottom: 0.25rem;
        }
        span {
          font-size: 1rem;
          font-weight: bolder;
          color: RGB(76, 155, 253);
          -webkit-background-clip: text;
        }
        .unit {
          font-size: 0.2rem;
          margin-left: 0.125rem;
        }
      }
    }
    &-item3 {
      display: flex;
      align-items: center;
      position: relative;
      height: 3rem;
      padding: 0 1.125rem;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #343f4b;
      background-color: rgba(19, 25, 47, 0.8);
      img {
        width: 4.25rem;
        height: 4.25rem;
      }
      .detail-item-text {
        margin-left: 8rem;
        h3 {
          color: #a9aaa5;
          font-size: 20px;
          margin-bottom: 1.3rem;
        }
        span {
          font-size: 1rem;
          font-weight: bolder;
          color: RGB(76, 155, 253);
          -webkit-background-clip: text;
        }
        .unit {
          font-size: 0.2rem;
          margin-left: 0.125rem;
        }
      }
    }
    #current2{
      margin-left: -7%;
    }
    #current1{
      margin-left: -7%;
    }
    #exception1{
      margin-left: -7%;
    }
    #exception2{
      margin-left: -7%;
    }
  }
</style>
