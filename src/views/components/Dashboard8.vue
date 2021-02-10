<template>
  <div class="d-chart-item dashboard8" @mouseleave="runCon">
    <div class='detail-list'>
      <div class='detail-list-item3'>
        <div class='detail-item-text'>
          <h3 id="h3-1" v-bind:class="{ischeck:current==1}" v-on:click="addClass(3)" >人力</h3>
        </div>
        <div class='detail-item-text'>
          <h3 id="h3-2" v-bind:class="{ischeck:current==2}" v-on:click="addClass(1)">考勤</h3>
        </div>
        <div class='detail-item-text'>
          <h3 id="h3-3" v-bind:class="{ischeck:current==3}" v-on:click="addClass(2)">异常</h3>
        </div>
      </div>
      <div class='detail-list-item1' key='3'>
        <div class='detail-list'>
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
      <div  class="tableItem" v-show="current==1">
        <div class='detail-list-item' key='2'>
          <div id="human1" style="height: 200px;width: 100%"></div>
        </div>
        <div class='detail-list-item' key='1'>
          <div id="human2" style="height: 200px;width: 100%"></div>
        </div>
      </div>
      <div  class="tableItem" v-show="current==2">
        <div class='detail-list-item' key='2'>
          <div id="current1" style="height: 200px;width: 350px"></div>
        </div>
        <div class='detail-list-item' key='1'>
          <div id="current2" style="height: 200px;width: 350px"></div>
        </div>
      </div>
      <div  class="tableItem" v-show="current==3">
        <div class='detail-list-item' key='2'>
          <div id="exception1" style="height: 200px;width: 350px"></div>
        </div>
        <div class='detail-list-item' key='1'>
          <div id="exception2" style="height: 200px;width: 350px"></div>
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
        current: 1,
        runBuff: true,
        dataForm: {
          dataBox1: 10,
          dataBox2: 5,
          dataBox3: '',
          textBox1: '',
          textBox2: '',
          textBox3: ''
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
      setInterval(() => {
        this.update()
      }, 5000)
    },
    mounted () {
      this.drawLine()
      this.getData()
    },
    methods: {
      update () {
        if (this.runBuff) {
          if (this.current >= 3) {
            this.current = 1
            this.dataForm.dataBox1 = (isNaN(this.articData.manpower) ? 0 : this.articData.manpower)
            this.dataForm.dataBox2 = (isNaN(this.articData.added) ? 0 : this.articData.added)
            this.dataForm.dataBox3 = (isNaN(this.articData.quite) ? 0 : this.articData.quite)
            this.dataForm.textBox1 = '总人力'
            this.dataForm.textBox2 = this.articData.date + '新增'
            this.dataForm.textBox3 = this.articData.date + '离职'
          } else if (this.current >= 2) {
            this.current += 1
            this.dataForm.dataBox1 = (isNaN(this.articData.ehs) ? 0 : this.articData.ehs)
            this.dataForm.dataBox2 = (isNaN(this.articData.attend) ? 0 : this.articData.attend)
            this.dataForm.dataBox3 = (isNaN(this.articData.trace) ? 0 : this.articData.trace)
            this.dataForm.textBox1 = '当月EHS异常'
            this.dataForm.textBox2 = '当月考勤异常'
            this.dataForm.textBox3 = '当月Trace异常'
          } else {
            this.current += 1
            this.dataForm.dataBox1 = (isNaN(this.articData.sarrive) ? 0 : this.articData.sarrive)
            this.dataForm.dataBox2 = (isNaN(this.articData.carrive) ? 0 : this.articData.carrive)
            this.dataForm.dataBox3 = (isNaN(this.articData.attendanl) ? '0%' : parseFloat(this.articData.attendanl)*100) +"%"
            this.dataForm.textBox1 = this.articData.date + '应到'
            this.dataForm.textBox2 = this.articData.date + '出勤'
            this.dataForm.textBox3 = this.articData.date + '出勤率'
          }
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

                  this.myChart.setOption({
                    yAxis: {
                      data: this.articData.typeNList
                    },
                    series: [
                      {
                        name: '男',
                        type: 'bar',
                        data: this.articData.typeNDList
                      },
                      {
                        name: '女',
                        type: 'bar',
                        data: this.articData.typeVDList
                      }
                    ]
                  })
                  this.myChart1.setOption({
                    series: [
                      {
                        name: '访问来源',
                        type: 'pie',
                        data: this.humanFormat(this.articData.roundNList, this.articData.roundDList)
                      }
                    ]
                  })
                this.current1.setOption({
                  xAxis: {
                    type: 'category',
                    data: this.articData.rLineName
                  },
                  series: [
                    {
                      name: '缺勤人数',
                      type: 'line',
                      data: this.articData.rLineCount
                    }
                  ]
                })
                this.current2.setOption({
                  series: [
                    {
                      data: [
                        {value: this.articData.absenteeism, name: '旷工', itemStyle: {color: "RGB(255,160,34)"}},
                        {value: this.articData.vacation, name: '请假', itemStyle: {color: "RGB(0,108,255)"}},
                        {value: this.articData.other, name: '其他假', itemStyle: {color: "RGB(159,230,184)"}}
                      ]
                    }
                  ]
                })
                this.exception1.setOption({
                  xAxis: {
                    type: 'category',
                    data: this.articData.ehslineD
                  },
                  series: [
                    {
                      type: 'bar',
                      data: this.articData.ehslineN
                    }
                  ]
                })
                this.exception2.setOption({
                  series: [
                    {
                      data: this.humanFormat(this.articData.tracelineN, this.articData.tracelineD)
                    }
                  ]
                })
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
        this.myChart = this.$echarts.init(document.getElementById('human1'))
        this.myChart1 = this.$echarts.init(document.getElementById('human2'))
        this.current1 = this.$echarts.init(document.getElementById('current1'))
        this.current2 = this.$echarts.init(document.getElementById('current2'))
        this.exception1 = this.$echarts.init(document.getElementById('exception1'))
        this.exception2 = this.$echarts.init(document.getElementById('exception2'))
        this.myChart.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '各类别男女占比', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            // backgroundColor: 'rgba(15,27,71,1)', //标题背景颜色，默认'rgba(0,0,0,0)'透明
            // borderColor: '#ccc', //标题边框颜色,默认'#ccc'
            // borderWidth: 1, //标题边框线宽，单位px，默认为0（无边框）
            // padding: 5, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
            textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#fff',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            x: 'right',
            y: 'bottom',
            textStyle: { //图例文字的样式
              color: '#fff',
              fontSize: 16
            },
            data: ['男', '女']
          },
          grid: {
            top: '20%',
            left: '1%',
            right: '8%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            show: false,
            splitLine: {show: false},
            type: 'value'
          },
          yAxis: {
            splitLine: {show: false},
            type: 'category',
            data: this.articData.typeNList,
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: [
            {
              name: '男',
              type: 'bar',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: this.articData.typeNDList,
              itemStyle: {
                normal: {
                  color: 'RGB(29,157,255)',
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                      color: 'white',
                      fontSize: 16
                    }
                  }
                }
              }
            },
            {
              name: '女',
              type: 'bar',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: this.articData.typeVDList,
              itemStyle: {
                normal: {
                  color: 'RGB(50,197,233)',
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                      color: 'white',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
        this.myChart1.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '人力分布', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            // backgroundColor: 'rgba(15,27,71,1)', //标题背景颜色，默认'rgba(0,0,0,0)'透明
            // borderColor: '#ccc', //标题边框颜色,默认'#ccc'
            // borderWidth: 1, //标题边框线宽，单位px，默认为0（无边框）
            // padding: 5, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
            textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#fff',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: ({d}%)<br/>      {c}'
          },
          legend: {
            show: false,
            x: 'right',
            y: 'bottom',
            textStyle: { //图例文字的样式
              color: '#fff',
              fontSize: 10
            },
            data: this.articData.roundNList
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['0%', '64%'],
              center: ['50%', '65%', '50%', '50%'],
              avoidLabelOverlap: true,
              itemStyle: {
                // color: '#c1c1c2',
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                normal: {
                  label: {
                    show: true,
                    formatter: '{b}\n{c}',
                    fontSize: 12
                  },
                  labelLine: {show: true}
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: this.articData.roundDList
              //   [
              //   {value: 335, name: '生计', itemStyle: {color: "RGB(255,160,34)"}},
              //   {value: 2310, name: '生产', itemStyle: {color: "RGB(0,108,255)"}},
              //   {value: 634, name: '阳极', itemStyle: {color: "RGB(159,230,184)"}},
              //   {value: 185, name: '设备', itemStyle: {color: "RGB(29,157,255)"}},
              //   {value: 135, name: '厂务', itemStyle: {color: "RGB(29,157,255)"}},
              //   {value: 35, name: '办公室', itemStyle: {color: "RGB(29,157,255)"}},
              //   {value: 835, name: '品质', itemStyle: {color: "RGB(29,157,255)"}},
              // ]
            }
          ]
        })
        this.current1.setOption({

          title: {
            text: '7日缺勤人数',
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            // backgroundColor: 'rgba(15,27,71,1)', //标题背景颜色，默认'rgba(0,0,0,0)'透明
            // borderColor: '#ccc', //标题边框颜色,默认'#ccc'
            // borderWidth: 1, //标题边框线宽，单位px，默认为0（无边框）
            // padding: 5, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
            textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#fff',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a0}: {c0}'
          },
          color: ['RGB(65, 55, 217)', 'RGB(72, 188, 177)', 'RGB(63, 196, 86)', 'RGB(212, 130, 101)', 'RGB(29, 157, 255)'],
          grid: {
            left: '3%',
            right: '10%',
            top: '20%',
            bottom: '5%',
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
            data: this.articData.rLineName
          },
          yAxis: {
            type: 'value',
            max: function (value) {
              return value.max
            },
            min: function (value) {
              return value.min
            },
            splitLine: {show: false}, //去除网格线
            axisLabel: {
              show: true,
              color: '#ffffff'
            },
            show: true
          },
          series: [
            {
              name: '缺勤人数',
              type: 'line',
              data: this.articData.rLineCount,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: true, color: '#ffffff'}
                }
              }
            }
          ]
        })
        this.current2.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '7日缺勤分布', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            // backgroundColor: 'rgba(15,27,71,1)', //标题背景颜色，默认'rgba(0,0,0,0)'透明
            // borderColor: '#ccc', //标题边框颜色,默认'#ccc'
            // borderWidth: 1, //标题边框线宽，单位px，默认为0（无边框）
            // padding: 5, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
            textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#fff',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['50%', '60%', '50%', '50%'],
              avoidLabelOverlap: true,
              itemStyle: {
                // color: '#c1c1c2',
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                normal: {
                  label: {
                    show: true,
                    formatter: '{b}\n{c}',
                    fontSize: 12
                  },
                  labelLine: {show: true}
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: [
                {value: this.articData.absenteeism, name: '旷工', itemStyle: {color: "RGB(255,160,34)"}},
                {value: this.articData.vacation, name: '请假', itemStyle: {color: "RGB(0,108,255)"}},
                {value: this.articData.other, name: '其他假', itemStyle: {color: "RGB(159,230,184)"}}
              ]
            }
          ]
        })
        this.exception1.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '当月EHS异常情况', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            // backgroundColor: 'rgba(15,27,71,1)', //标题背景颜色，默认'rgba(0,0,0,0)'透明
            // borderColor: '#ccc', //标题边框颜色,默认'#ccc'
            // borderWidth: 1, //标题边框线宽，单位px，默认为0（无边框）
            // padding: 5, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
            textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#fff',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 'normal'
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}:{c0}'
          },
          color: ['RGB(65, 55, 217)', 'RGB(72, 188, 177)', 'RGB(63, 196, 86)', 'RGB(212, 130, 101)', 'RGB(29, 157, 255)'],
          legend: {
            data: ['EHS异常'],
            icon: 'line',
            top: '5px',
            textStyle: {
              color: '#ffffff'
            },
            inactiveColor: 'rgb(100, 107, 119)'
          },
          grid: {
            left: '3%',
            right: '10%',
            top: '20%',
            bottom: '5%',
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
            data: this.articData.ehslineN
          },
          yAxis: {
            type: 'value',
            max: function (value) {
              return value.max
            },
            splitLine: {show: false}, //去除网格线
            axisLabel: {
              show: true,
              color: '#ffffff'
            },
            show: true
          },
          series: [
            {
              type: 'bar',
              data: this.articData.ehslineD,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  },
                  label: {show: true, fontSize: 16, color: '#ffffff'}
                }
              }
            }
          ]
        })
        this.exception2.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '当月Trace异常分布', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: 'top', //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            // backgroundColor: 'rgba(15,27,71,1)', //标题背景颜色，默认'rgba(0,0,0,0)'透明
            // borderColor: '#ccc', //标题边框颜色,默认'#ccc'
            // borderWidth: 1, //标题边框线宽，单位px，默认为0（无边框）
            // padding: 5, //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
            textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#fff',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 'normal'
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['50%', '60%', '50%', '50%'],
              avoidLabelOverlap: true,
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                normal: {
                  label: {
                    show: true,
                    formatter: '{b}\n{c}',
                    fontSize: 12
                  },
                  labelLine: {show: true}
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: [
                // {value: 1, name: '苏美晨', itemStyle: {color: "RGB(255,160,34)"}},
                // {value: 1, name: '俞长勇', itemStyle: {color: "RGB(0,108,255)"}},
                // {value: 1, name: '陈春陶', itemStyle: {color: "RGB(159,230,184)"}},
                // {value: 1, name: '陶虎', itemStyle: {color: "RGB(29,157,255)"}},
                // {value: 1, name: '肖卫华', itemStyle: {color: "RGB(29,157,255)"}}
              ]
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
      width: 50%;
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
