<template>
  <div style="background-color: RGB(240,242,245)">
    <el-row :gutter="24" class="el-row" type="flex">
    <el-col :span="24" style="cursor:pointer;">
      <div style="height: 10vh;background-color: #2D64B3;">
        <p class="ptitle1">XXXXXXX</p>
      </div>
    </el-col>
    </el-row>
  <el-row :gutter="24" class="el-row" type="flex">
    <el-col :span="12" style="cursor:pointer;">
      <div id="myChart" style="height: 40vh"></div>
    </el-col>
    <el-col :span="12" style="cursor:pointer;">
      <div id="myChart1" style="height: 40vh"></div>
    </el-col>
  </el-row>
    <el-row :gutter="24" class="el-row" type="flex" style="margin-top: 2vh">
      <el-col :span="24" style="cursor:pointer;">
        <div style="height: 40vh">
          <span style="cursor:pointer;"><p class="ptitle">不良产品流动信息(点击导出)</p></span>
          <el-table
            :data="dataList"
            border
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
            row-key="id"
            border
            style="width: 100%;">
            <el-table-column
              prop="SN"
              header-align="center"
              align="center"
              label="不良SN">
            </el-table-column>
            <el-table-column
              prop="name"
              header-align="center"
              align="center"
              label="机台信息">
            </el-table-column>
            <el-table-column
              prop="time"
              header-align="center"
              align="center"
              label="通过时间">
            </el-table-column>
            <el-table-column
              prop="type"
              header-align="center"
              align="center"
              label="不良类型">
            </el-table-column>
          </el-table>
        </div>
        <!--<div id="myChart2" style="height: 40vh"></div>-->
      </el-col>
      <!--<el-col :span="12" style="cursor:pointer;">-->
        <!--<div style="height: 40vh">-->
          <!--<span style="cursor:pointer;"><p class="ptitle">不良产品通过机台信息(点击导出)</p></span>-->
          <!--<el-table-->
            <!--:data="dataList"-->
            <!--border-->
            <!--:row-style="tableRowStyle"-->
            <!--:header-cell-style="tableHeaderColor"-->
            <!--v-loading="dataListLoading"-->
            <!--style="width: 100%;">-->
            <!--<el-table-column-->
              <!--prop="jobNo"-->
              <!--header-align="center"-->
              <!--align="center"-->
              <!--label="机台信息">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="name"-->
              <!--header-align="center"-->
              <!--align="center"-->
              <!--label="不良SN">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="director"-->
              <!--header-align="center"-->
              <!--align="center"-->
              <!--label="通过时间">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</div>-->
        <!--&lt;!&ndash;<div id="myChart3" style="height: 40vh"></div>&ndash;&gt;-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  export default {
    data (){
      return {
        dataList: [],
        myChart: '',
        myChart1: '',
        myChart2: '',
        myChart3: '',myChartData: [{
          name: "自然资源厅",
          label: {
            backgroundColor: '#48a9ee'
          },
          children: [{//子集
            name: "娱乐场所治安管理"
          }, {
            name: "安保工作"
          }, {
            name: "精神病人管控工作"
          }, {
            name: "物流寄递业"
          }, {
            name: "推进基层基础工作创新"
          }, {
            name: "地网建设工作"
          }, {
            name: "无人机管理"
          }, {
            name: "加强社会面巡逻防控"
          }
          ]
        }]
      }
    },
    activated () {
      this.getData()
    },
    mounted () {
      this.drawLine()
      this.getData()
    },
    methods: {
      getData () {
        var dataList1 = [{id: 1, SN: 'FM70165005BQ44Y380', name: '2D-3', time: '2020-07-16 19:19', type: '三伤', parentId: 0}, {id: 2, SN: 'FM70166005BQ4Y3FG08', name: '清洗-1', time: '2020-07-16 19:20', type: '麻点', parentId: 1}, {id: 3, SN: 'FM70165005BQ44Y3808', name: '清洗-2', time: '2020-07-16 16:50', type: '三伤', parentId: 2}, {id: 4, SN: 'FM70165005BQ44Y3808', name: '清洗-2', time: '2020-07-16 16:50', type: '三伤', parentId: 3}]
        this.dataList = treeDataTranslate(dataList1, 'id')
        this.$http({
          url: this.$http.adornUrl('/homeCentrol/getPISH'),
          method: 'post',
          params: this.$http.adornParams({
            'startDate': this.startDate,
            'endDate': this.endDate
          })
        }).then(({data}) => {
          console.log(data)
        })
      },
      drawLine () {
        var myColor = ['RGB(182,162,222,1)'];
        var dataLine = [23, 40,  56]
        var dataLine1 = [43, 50,  66];
        var positionLeft = 10;
        var g_cellBar0_y = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAoCAYAAAAhf6DEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA6SURBVEhLY2x8/vY/A4mg3zwcTDOBSTLBqGYSwahmEsGoZhLBqGYSwahmEsGoZhLBqGYSwZDUzMAAAJldBMF2UASmAAAAAElFTkSuQmCC';
        var g_cellBarImg0_y = new Image();
        g_cellBarImg0_y.src = g_cellBar0_y;
        this.myChart2 = this.$echarts.init(document.getElementById('myChart'))
        this.myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // this.myChart = this.$echarts.init(document.getElementById('myChart2'))
        // this.myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        // this.myChart.setOption({
        //   backgroundColor: '#101E44',
        //   tooltip: {
        //     trigger: 'item',
        //     formatter: '{b}'
        //   },
        //   series: [{
        //     type: 'tree',
        //     name: '自然资源厅',
        //     edgeShape: 'polyline',//链接线是折现还是曲线
        //     data: this.myChartData,
        //     top: '10%',       //距离上
        //     left: '7%',      //左
        //     bottom: '30%',    //下
        //     right: '20%',    //右的距离
        //     orient: 'vertical',
        //     symbolSize: 1,
        //     initialTreeDepth: 10,
        //     label: {
        //       normal: {
        //         position: 'center',
        //         verticalAlign: 'middle',
        //         align: 'left',
        //         backgroundColor: '#99d97c',
        //         color: '#fff',
        //         padding: 3,
        //         formatter: [
        //           '{box|{b}}'
        //         ].join('\n'),
        //         rich: {
        //           box: {
        //             color: '#fff',
        //             padding: [0, 5],
        //             align: 'center'
        //           }
        //         }
        //       }
        //     },
        //     leaves: {
        //       label: {
        //         normal: {
        //           position: 'center',
        //           verticalAlign: 'middle',
        //           rotate: -90,
        //           align: 'left',
        //           backgroundColor: '#f3857c',
        //           formatter: [
        //             '{box|{b}}'
        //           ].join('\n'),
        //           rich: {
        //             box: {
        //               height: 8,
        //               color: '#fff',
        //               padding: [0, 5],
        //               align: 'center'
        //             }
        //           }
        //         }
        //       }
        //     },
        //     expandAndCollapse: true,
        //     animationDuration: 550,
        //     animationDurationUpdate: 750
        //   },
        //   ]
        // })
        this.myChart1.setOption({
          title: {
            text: '当日不良类型TOP3',
            x:'center',
            y:'top',
            textAlign:'left',
            textStyle:{
              //文字颜色
              color:'#c22312',
              //字体风格,'normal','italic','oblique'
              fontStyle:'normal',
              //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
              fontWeight:'bold',
              //字体系列
              fontFamily:'sans-serif',
              //字体大小
              fontSize:18
            }
          },
          backgroundColor: 'RGB(255,255,255)',
          grid: [{
            left: '8%',
            top: '12%',
            right: '5%',
            bottom: '8%',
            containLabel: true
          },
            {
              left: '10%',
              top: '12%',
              right: '5%',
              bottom: '8%',
              containLabel: true
            }
          ],
          xAxis: [{
            //   max:max,
            show: false
          }],
          yAxis: [{
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              inside: true,
              align: 'left',
              textStyle: {
                color: 'RGB(102,102,102,1)',
                fontSize: '16'
              }
            },
            z: 10,
            data: ['三伤', '脏污', '麻点']
          }, {
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              inside: true,
              align: 'right',
              textStyle: {
                color: '#c22312',
                fontSize: '16'
              }
            },
            z: 10,
            data: [23, 40,  56]
          }, {

            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)'
              }
            },
            data: []
          }],
          series: [

            { //间距
              type: 'bar',
              barWidth: 30,
              stack: 'b',
              legendHoverLink: false,
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)'
                }
              },
              z: 3,
              data: [positionLeft, positionLeft, positionLeft, positionLeft, positionLeft]
            }, {
              name: '条',
              type: 'bar',
              stack: 'b',
              yAxisIndex: 0,
              data: dataLine,
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  distance: 10,
                  formatter: function(param) {
                    return param.value + '%'
                  },
                  textStyle: {
                    color: '#ffffff',
                    fontSize: '16'
                  }
                }
              },
              barWidth: 30,
              itemStyle: {
                color: {
                  image: g_cellBarImg0_y,
                  repeat: 'repeat'
                }
                /*normal: {
                    color: function(params) {
                        var num = myColor.length
                        return myColor[params.dataIndex % num]
                    }
                }*/
              },
              z: 2
            }, {
              name: '白框',
              type: 'bar',
              yAxisIndex: 1,
              barGap: '-100%',
              data: [100, 100, 100],
              barWidth: 57,
              itemStyle: {
                normal: {
                  color: 'RGB(255,255,255,1)',
                  barBorderRadius: 2
                }
              },
              z: 1
            },
            {
              name: '外框',
              type: 'bar',
              yAxisIndex: 2,
              barGap: '-100%',
              data: [100, 100, 100],
              barWidth: 59,
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  distance: 10,
                  formatter: function(data) {
                    return dataLine[data.dataIndex] + "%";
                  },
                  textStyle: {
                    color: '#ffffff',
                    fontSize: '16'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    var num = myColor.length
                    return myColor[params.dataIndex % num]
                  },
                  barBorderRadius: [0, 7, 0, 7]
                }
              },
              z: 0
            },
          ]
        })
          this.myChart2.setOption({
            title: {
              text: '当日机台通过不良产品TOP3',
              x:'center',
              y:'top',
              textAlign:'left',
              textStyle:{
                //文字颜色
                color:'#c22312',
                //字体风格,'normal','italic','oblique'
                fontStyle:'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight:'bold',
                //字体系列
                fontFamily:'sans-serif',
                //字体大小
                fontSize:18
              }
            },
            backgroundColor: 'RGB(255,255,255)',
            grid: [{
              left: '8%',
              top: '12%',
              right: '5%',
              bottom: '8%',
              containLabel: true
            },
              {
                left: '10%',
                top: '12%',
                right: '5%',
                bottom: '8%',
                containLabel: true
              }
            ],
            xAxis: [{
              //   max:max,
              show: false
            }],
            yAxis: [{
              axisTick: 'none',
              axisLine: 'none',
              axisLabel: {
                inside: true,
                align: 'left',
                textStyle: {
                  color: 'RGB(102,102,102,1)',
                  fontSize: '16'
                }
              },
              z: 10,
              data: ['2D-3', '清洗-2', '2D-10']
            }, {
              axisTick: 'none',
              axisLine: 'none',
              show: true,
              axisLabel: {
                inside: true,
                align: 'right',
                textStyle: {
                  color: '#c22312',
                  fontSize: '16'
                }
              },
              z: 10,
              data: [43, 50,  66]
            }, {

              axisLine: {
                lineStyle: {
                  color: 'rgba(0,0,0,0)'
                }
              },
              data: []
            }],
            series: [

              { //间距
                type: 'bar',
                barWidth: 30,
                stack: 'b',
                legendHoverLink: false,
                itemStyle: {
                  normal: {
                    color: 'rgba(0,0,0,0)'
                  }
                },
                z: 3,
                data: [positionLeft, positionLeft, positionLeft, positionLeft, positionLeft]
              }, {
                name: '条',
                type: 'bar',
                stack: 'b',
                yAxisIndex: 0,
                data: dataLine1,
                label: {
                  normal: {
                    show: false,
                    position: 'right',
                    distance: 10,
                    formatter: function(param) {
                      return param.value + '%'
                    },
                    textStyle: {
                      color: '#c22312',
                      fontSize: '16'
                    }
                  }
                },
                barWidth: 30,
                itemStyle: {
                  color: {
                    image: g_cellBarImg0_y,
                    repeat: 'repeat'
                  }
                  /*normal: {
                      color: function(params) {
                          var num = myColor.length
                          return myColor[params.dataIndex % num]
                      }
                  }*/
                },
                z: 2
              }, {
                name: '白框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [100, 100, 100],
                barWidth: 57,
                itemStyle: {
                  normal: {
                    color: 'RGB(255,255,255,1)',
                    barBorderRadius: 2
                  }
                },
                z: 1
              },
              {
                name: '外框',
                type: 'bar',
                yAxisIndex: 2,
                barGap: '-100%',
                data: [100, 100, 100],
                barWidth: 59,
                label: {
                  normal: {
                    show: false,
                    position: 'right',
                    distance: 10,
                    formatter: function(data) {
                      return dataLine[data.dataIndex] + "%";
                    },
                    textStyle: {
                      color: '#c22312',
                      fontSize: '16'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: function(params) {
                      var num = myColor.length
                      return myColor[params.dataIndex % num]
                    },
                    barBorderRadius: [0, 7, 0, 7]
                  }
                },
                z: 0
              },
            ]
          })
      }
    }
  }
</script>
<style>
  #login {
    /*background-color: rgba(239,241,244,1);*/
    /*height: 85vh;*/
    /*width: 100vw;*/
  }
  .cardEl {
    transition: all .5s;
    padding: 0;
    background-color:rgba(245,248,253,1)
  }
  .cardEl:hover{
    margin-top: -10px;
    background: RGB(49,199,201);
  }
  .homeP{
    font-family: "宋体","仿宋",sans-serif;/*若电脑不支持宋体，则用仿宋，若不支持仿宋，则在sans-serif中找*/
    font-weight: bold;
    position: absolute;
    left: 0;
    font-size: 80%;
    /*font-style: italic;*/
    color: RGB(54, 163, 247);/*字体颜色*/
    opacity: 1;/*字体的透明度：1：默认样式，0：全透明*/
  }
  .homePVD{
    font-family: "宋体","仿宋",sans-serif;/*若电脑不支持宋体，则用仿宋，若不支持仿宋，则在sans-serif中找*/
    font-weight: bold;
    position: absolute;
    left: 0;
    font-size: 150%;
    /*font-style: normal;*/
    color: RGB(54, 163, 247);/*字体颜色*/
    opacity: 1;/*字体的透明度：1：默认样式，0：全透明*/
  }
  .homespan{
    font-family: "宋体","仿宋",sans-serif;/*若电脑不支持宋体，则用仿宋，若不支持仿宋，则在sans-serif中找*/
    font-weight: bold;
    font-size: 100%;
    /*font-style: italic;*/
    color: RGB(140,140,140);/*字体颜色*/
    opacity: 1;/*字体的透明度：1：默认样式，0：全透明*/
  }
  .homevalue{
    font-family: "宋体","仿宋",sans-serif;/*若电脑不支持宋体，则用仿宋，若不支持仿宋，则在sans-serif中找*/
    font-weight: bold;
    font-size: 120%;
    color: RGB(102,102,102);/*字体颜色*/
    opacity: 1;/*字体的透明度：1：默认样式，0：全透明*/
  }
  .ptitle{
    font-size: 150%;
    font-family: '宋体';
    color: #aa1111;
    font-style: italic;
    opacity: 0.5;
    font-weight: bold;
    position:relative;
    text-align:center;
    margin:0;
  }
  .ptitle1{
    font-size: 300%;
    font-family: '宋体';
    color: RGB(255,255,255);
    /*font-style: italic;*/
    opacity: 1;
    font-weight: bold;
    text-align:center;
    margin:0 auto;
  }
  .homeimg {
    width: 36px;
    height: auto;
    margin-right: 5px;
    border-radius: 100%;
    vertical-align: middle;
  }
  .paddingS{
    margin-top: 10px;
  }
</style>
