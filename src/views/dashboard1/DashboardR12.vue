<template>
  <div class="d-chart-item DashboardR12">
    <!--<div class="chart-item">-->
      <!--<div class="arrow-top-left">-->
      <!--</div>-->
      <!--<div class="arrow-top-right">-->
      <!--</div>-->
      <div id="echarts_cent" style="height: 100%;width: 100%" ></div>
    <!--</div>-->
  </div>
</template>

<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'
  export default {
    name: 'DashboardR12',
    components: {
    },
    data () {
      return {
        timer: '',
        myChart: ''
      }
    },
    created () {
    },
    mounted () {
      this.getData()
      this.drawLine()
    },
    methods: {
      getData () {
        // this.$http({
        //   url: this.$http.adornUrl('/image/search'),
        //   method: 'get'
        // }).then(({data}) => {
        //   if (data && data.code === 0) {
        //     var basrURL = window.SITE_CONFIG.baseUrl
        //     for (var i in data.list) {
        //       this.imageList.push(basrURL + data.list[i].url)
        //     }
        //   } else {
        //     this.$message.error(data.msg)
        //   }
        // })
      },
      drawLine () {
        this.myChart = this.$echarts.init(document.getElementById('echarts_cent'))
        this.myChart.setOption({
          title: {
            text: 'KPI',
            top: 'center',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}' + ':' + '{c}%'
          },
          series: [
            {
                    center: ['50%', '50%'], // 布局位置
                    type: 'pie',
                    zlevel: 1,
                    silent: true,
                    /*
                    radius
                    饼图的半径。可以为如下类型：
                    number：直接指定外半径值。
                    string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
                    Array.<number|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
                    */
                    radius: ['100%', '99%'],
                    hoverAnimation: false,
                    color: "rgba(88,142,197,0.5)",
                    // animation:false,    //charts3 no
                    label: {
                      normal: {
                        show: false
                      },
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [1]
                  },
            {
              type: 'pie',
              zlevel: 2,
              silent: true,
              radius: ['98%', '97%'],
              startAngle: 50,
              hoverAnimation: false,
              // animation:false,    //charts3 no
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this._pie2()
            },
            {
              type: 'pie',
              zlevel: 3,
              silent: true,
              radius: ['96%', '95%'],
              label: {
                normal: {
                  show: false
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this._pie2()
            },
            {
              type: 'pie',
              zlevel: 4,
              silent: true,
              radius: ['94%', '93%'],
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this._pie3()
            },
            {
              type: 'pie',
              zlevel: 5,
              silent: true,
              radius: ['92%', '91%'],
              color: ["#fc8d89", "#46d3f3", "rgba(203,203,203,.2)"],
              startAngle: 50,
              hoverAnimation: false,
              // animation:false,    //charts3 no
              label: {
                normal: {
                  show: false
                },
              },
              data: [50, 20, 40]
            },
            // {
            //   name: '',
            //   type: 'gauge',
            //   splitNumber: 20, // 刻度数量
            //   min: 0,
            //   max: 100,
            //   radius: '92%', // 图表尺寸
            //   center: ['50%', '50%'],
            //   startAngle: 90,
            //   endAngle: -269.9999,
            //   axisLine: {
            //     show: false,
            //     lineStyle: {
            //       width: 0,
            //       shadowBlur: 0,
            //       color: [
            //         [1, '#0dc2fe']
            //       ]
            //     }
            //   },
            //   axisTick: {
            //     show: false,
            //     lineStyle: {
            //       color: 'auto',
            //       width: 2
            //     },
            //     length: 10,
            //     splitNumber: 5
            //   },
            //   splitLine: {
            //     show: true,
            //     length: 40,
            //     lineStyle: {
            //       color: 'auto'
            //     }
            //   },
            //   axisLabel: {
            //     show: false
            //   },
            //   pointer: { // 仪表盘指针
            //     show: 0
            //   },
            //   detail: {
            //     show: 0
            //   }
            // },
            // {
            //   name: '统计',
            //   type: 'gauge',
            //   splitNumber: 30, // 刻度数量
            //   min: 0,
            //   max: 100,
            //   radius: '85%', // 图表尺寸
            //   center: ['50%', '50%'],
            //   startAngle: 90,
            //   endAngle: -269.9999,
            //   axisLine: {
            //     show: true,
            //     lineStyle: {
            //       width: 0,
            //       shadowBlur: 0,
            //       color: [
            //       ]
            //     }
            //   },
            //   axisTick: {
            //     show: true,
            //     lineStyle: {
            //       color: '#0dc2fe',
            //       width: 2
            //     },
            //     length: 20,
            //     splitNumber: 5
            //   },
            //   splitLine: {
            //     show: true,
            //     length: 20,
            //     lineStyle: {
            //       color: '#0dc2fe',
            //     }
            //   },
            //   axisLabel: {
            //     show: false
            //   },
            //   pointer: { // 仪表盘指针
            //     show: 0
            //   }
            // },
            // {
            //   type: 'pie',
            //   silent: true,
            //   radius: ['77%', '76%'],
            //   color: ["#46d3f3","rgba(203,203,203,.2)"],
            //   startAngle: 50,
            //   hoverAnimation: false,
            //   // animation:false,    //charts3 no
            //   label: {
            //     normal: {
            //       show: false
            //     }
            //   },
            //   data: [{value: 10,
            //     itemStyle: {
            //       normal: {
            //         color: "rgba(88,142,197,0.5)",
            //         borderWidth: 0,
            //         borderColor: "rgba(0,0,0,0)"
            //       }
            //     }
            //   }]
            // },
            // {
            //   name: '中间环形图',
            //   type: 'pie',
            //   radius: ['66%', '75%'],
            //   avoidLabelOverlap: false,
            //   hoverAnimation: false,
            //   itemStyle: {
            //     normal: {
            //       color: '#80ADD2',
            //       borderColor: '#3D4268'
            //     }
            //   },
            //   label: {
            //     normal: {
            //       show: false,
            //       position: 'center'
            //
            //     },
            //     emphasis: {
            //       show: true,
            //       textStyle: {
            //         fontSize: '30',
            //         fontWeight: 'bold'
            //       }
            //     }
            //   },
            //   labelLine: {
            //     normal: {
            //       show: false
            //     }
            //   },
            //   data: [
            //     25, 25, 25, 25, 25, 25, 25, 25
            //   ]
            // },
            {
              type: 'pie',
              radius: ["24%", "23%"],
              data: [100],
              center: ['50%', '50%'],
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,0.3)'
                }
              },
              hoverAnimation: false,
              label: {
                show: false
              }
            },
            {
              type: 'pie',
              radius: ["22%", "21.5%"],
              data: [100],
              center: ['50%', '50%'],
              color: 'rgba(255,255,255,0.3)',
              hoverAnimation: false,
              label: {
                show: false
              }
            },
            {
              type: 'pie',
              startAngle: 0,
              clockwise: false,
              radius: ['25%', '89%'],
              center: ['50%', '50%'],
              roseType: 'area',
              avoidLabelOverlap: true,
              label: {
                position: 'inside',
                formatter: '{b}' + ':' + '{c}%',
                textStyle: {
                  fontWeight: '100',
                  fontFamily: 'Microsoft YaHei',
                  color: '#FAFAFA',
                  fontSize: 10
                }
              },
              data: [{
                value: 145,
                name: '厂内隐患排查',
                itemStyle: {
                  borderColor: '#2C6BA0',
                  borderWidth: 2,
                  shadowBlur: 10,
                  shadowColor: '#2C6BA0',
                  color: 'rgba(60,170,211,0.05)'
                }
              },
                {
                  value: 113,
                  name: '英语学习',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                },
                {
                  value: 100,
                  name: '重大工伤事故',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: '工伤发生率',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: 'Silver',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: 'Kaizen',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: 'DBP',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: 'Lean training',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: 'Hard saving',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: '专利申请',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: 'FOF项目推行',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }, {
                  value: 100,
                  name: 'Trace培训',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                },
                {
                  value: 100,
                  name: 'interlock',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                },
                {
                  value: 99.7,
                  name: 'D5X',
                  itemStyle: {
                    borderColor: '#2C6BA0',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#2C6BA0',
                    color: 'rgba(60,170,211,0.05)'
                  }
                },
                {
                  value: 94.3,
                  name: 'iPad',
                  itemStyle: {
                    borderColor: '#44388E',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#44388E',
                    color: 'rgba(60,170,211,0.05)'
                  }
                },
                {
                  value: 41.6,
                  name: 'A3',
                  itemStyle: {
                    borderColor: '#6A368B',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#6A368B',
                    color: 'rgba(60,170,211,0.05)'
                  }
                },
                {
                  value: 7,
                  name: 'Blize',
                  itemStyle: {
                    borderColor: '#7D3990',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#7D3990',
                    color: 'rgba(60,170,211,0.05)'
                  }
                },
                {
                  value: 0,
                  name: 'Bronze',
                  itemStyle: {
                    borderColor: '#7D3990',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#7D3990',
                    color: 'rgba(60,170,211,0.05)'
                  }
                }
              ]
            }
          ]
        })
        setTimeout(this.startTimer, 1000)
      },
      // drawLine () {
      //   this.myChart = this.$echarts.init(document.getElementById('echarts_cent'))
      //   this.myChart.setOption({
      //     title: {
      //     },
      //     series: [
      //       {
      //         center: ['50%', '50%'], // 布局位置
      //         type: 'pie',
      //         zlevel: 1,
      //         silent: true,
      //         /*
      //         radius
      //         饼图的半径。可以为如下类型：
      //         number：直接指定外半径值。
      //         string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
      //         Array.<number|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
      //         */
      //         radius: ['100%', '99%'],
      //         hoverAnimation: false,
      //         color: "rgba(88,142,197,0.5)",
      //         // animation:false,    //charts3 no
      //         label: {
      //           normal: {
      //             show: false
      //           },
      //         },
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data: [1]
      //       },
      //       {
      //         type: 'pie',
      //         zlevel: 2,
      //         silent: true,
      //         radius: ['90%', '91%'],
      //         startAngle: 50,
      //         hoverAnimation: false,
      //         // animation:false,    //charts3 no
      //         label: {
      //           normal: {
      //             show: false
      //           },
      //         },
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data: this._pie2()
      //       },
      //       {
      //         type: 'pie',
      //         zlevel: 3,
      //         silent: true,
      //         radius: ['88%', '87%'],
      //         label: {
      //           normal: {
      //             show: false
      //           },
      //         },
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data: this._pie2()
      //       },
      //       {
      //         type: 'pie',
      //         zlevel: 4,
      //         silent: true,
      //         radius: ['84%', '83%'],
      //         label: {
      //           normal: {
      //             show: false
      //           },
      //         },
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data: this._pie3()
      //       },
      //       {
      //         type: 'pie',
      //         zlevel: 5,
      //         silent: true,
      //         radius: ['80%', '78%'],
      //         color: ["#fc8d89", "#46d3f3", "rgba(203,203,203,.2)"],
      //         startAngle: 50,
      //         hoverAnimation: false,
      //         // animation:false,    //charts3 no
      //         label: {
      //           normal: {
      //             show: false
      //           },
      //         },
      //         data: [50, 20, 40]
      //       },
      //       {
      //         name: '',
      //         type: 'gauge',
      //         splitNumber: 30, // 刻度数量
      //         min: 0,
      //         max: 100,
      //         radius: '73%', // 图表尺寸
      //         center: ['50%', '50%'],
      //         startAngle: 90,
      //         endAngle: -269.9999,
      //         axisLine: {
      //           show: false,
      //           lineStyle: {
      //             width: 0,
      //             shadowBlur: 0,
      //             color: [
      //               [1, '#0dc2fe']
      //             ]
      //           }
      //         },
      //         axisTick: {
      //           show: false,
      //           lineStyle: {
      //             color: 'auto',
      //             width: 2
      //           },
      //           length: 20,
      //           splitNumber: 5
      //         },
      //         splitLine: {
      //           show: true,
      //           length: 32,
      //           lineStyle: {
      //             color: 'auto'
      //           }
      //         },
      //         axisLabel: {
      //           show: false
      //         },
      //         pointer: { // 仪表盘指针
      //           show: 0
      //         },
      //         detail: {
      //           show: 0
      //         }
      //       },
      //       {
      //         name: '统计',
      //         type: 'gauge',
      //         splitNumber: 30, // 刻度数量
      //         min: 0,
      //         max: 100,
      //         radius: '68%', // 图表尺寸
      //         center: ['50%', '50%'],
      //         startAngle: 90,
      //         endAngle: -269.9999,
      //         axisLine: {
      //           show: true,
      //           lineStyle: {
      //             width: 0,
      //             shadowBlur: 0,
      //             color: [
      //               [0, '#0dc2fe'],
      //               [1, '#0dc2fe']
      //             ]
      //           }
      //         },
      //         axisTick: {
      //           show: true,
      //           lineStyle: {
      //             color: '#0dc2fe',
      //             width: 2
      //           },
      //           length: 20,
      //           splitNumber: 5
      //         },
      //         splitLine: {
      //           show: true,
      //           length: 20,
      //           lineStyle: {
      //             color: '#0dc2fe',
      //           }
      //         },
      //         axisLabel: {
      //           show: false
      //         },
      //         pointer: { // 仪表盘指针
      //           show: 0
      //         },
      //         detail: {
      //           borderColor: '#fff',
      //           shadowColor: '#fff', // 默认透明
      //           shadowBlur: 2,
      //           offsetCenter: [0, '0%'], // x, y，单位px
      //           textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
      //             color: '#fff',
      //             fontSize: 30
      //           },
      //           formatter: '{value}'
      //         },
      //         data: [{
      //           name: '总产出',
      //           value: 21080
      //         }]
      //       },
      //       {
      //         type: 'pie',
      //         zlevel: 20,
      //         silent: true,
      //         radius: ['60%', '59%'],
      //         hoverAnimation: false,
      //         color: '#2dc0c9',
      //         // animation:false,
      //         data: [1],
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         }
      //       },
      //       {
      //         name: '中间环形图',
      //         type: 'pie',
      //         radius: ['35%', '55%'],
      //         avoidLabelOverlap: false,
      //         hoverAnimation: false,
      //         itemStyle: {
      //           normal: {
      //             color: '#80ADD2',
      //             borderColor: '#3D4268'
      //           }
      //         },
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'center'
      //
      //           },
      //           emphasis: {
      //             show: true,
      //             textStyle: {
      //               fontSize: '30',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data: [
      //           25, 25, 25, 25, 25, 25
      //         ]
      //       }
      //     ]
      //   })
      //   setTimeout(this.startTimer, 1000)
      // },
      _pie2 () {
    let dataArr = [];
    for (var i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 25,
          itemStyle: {
            normal: {
              color: "rgba(88,142,197,0.5)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: 20,
          itemStyle: {
            normal: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      }
    }
    return dataArr
  },
   _pie3 () {
    let dataArr = []
    for (var i = 0; i < 100; i++) {
      if (i % 2 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: 25,
          itemStyle: {
            normal: {
              color: "rgb(126,190,255)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: 20,
          itemStyle: {
            normal: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
              borderColor: "rgba(0,0,0,0)"
            }
          }
        })
      }
    }
    return dataArr
  },
   doing () {
    let option = this.myChart.getOption()
    option.series[3].startAngle = option.series[3].startAngle - 5
    // option.series[6].data[0].value = option.series[6].data[0].value + 1
    this.myChart.setOption(option)
  },
  startTimer () {
    this.timer = setInterval(this.doing, 700)
  }
  //  this.startTimer() {
  //   timer = setInterval(this.doing, 100);
  // }
  //
  //  this.stopTimer()
  // {
  //
  //   clearInterval(timer);
  //
  //   xzTimer = null;
  }
  }
</script>

<style lang="scss" scoped>

  .DashboardR12 {
    left: 32.5%;
    top: 30%;
    width: 37%;
    height: 65%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
</style>
