<template>
  <el-row :gutter="24">
    <el-col :span="12">
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echartb1" style="height: 38vh"></div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echartb2" style="height: 38vh"></div>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echartb3" style="height: 38vh"></div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echartb4" style="height: 38vh"></div>
        </el-card>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import Velocity from 'velocity-animate'
  import moment from "moment"
  export default {
    data () {
      return {
        el: '#example',
        dataForm: {
          lxNum: 797,
          ztNum: 797,
          xxsAll: 0,
          xxsJion: 0,
          xxsJg: 0,
          gxwAll: 0,
          gxwJion: 0,
          gxwJg: 0,
          ypAll: 0,
          ypJion: 0,
          ypJg: 0,
          wqjAll: 0,
          wqjJion: 0,
          wqjJg: 0,
          zyAll: 0,
          zyJion: 0,
          zyJg: 0,
          dhjAll: 0,
          dhjJion: 0,
          dhjJg: 0,
          nearpassRate: [],
          nearparticipationRate: [],
          passRate: [],
          participationRate: [],
          keyTime1: '',
          keyTime2: '',
          keyTime3: '',
          key: '',
          jobNo: '451692'
        },
        show: false,
        exportList: [],
        nearDatalistJ: [81, 71, 90, 70, 80, 60],
        nearDatalistC: [100, 100, 100, 100, 100, 100],
        countIL: [],
        countDL: [],
        rateIL: [],
        rateDL: [],
        targetIL: [],
        targetDL: [],
        colors: [{color: 'rgb(46,199,201)'}, {color: 'rgb(182,162,222)'}, {color: 'rgb(90,177,239)'}, {color: 'rgb(255,185,128)'}, {color: 'rgb(51,132,123)'}],
        pieChart1: [],
        pieChart2: [],
        nameListIl: [],
        nameListDl: [],
        dateListTime: [],
        fileUploadBtnText: '导入数据',
        dataListIL: [],
        dataListDL: [],
        pageIndex: 1,
        pageSize: 5,
        totalPage: 0,
        dataListLoadingIL: false,
        dataListLoadingDL: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        myChart: '',
        myChart1: '',
        myChart2: '',
        myChart3: '',
        myChart4: '',
        myChart5: '',
        myChart6: ''
      }
    },
    components: {
    },
    activated () {
      this.getDataList()
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.transformOrigin = 'left'
      },
      enter: function (el, done) {
        Velocity(el, { opacity: 1, fontSize: '4.4em' }, { duration: 300 })
        Velocity(el, { fontSize: '1em' }, { complete: done })
      },
      leave: function (el, done) {
        Velocity(el, { rotateZ: '50deg' }, { duration: 600 })
        Velocity(el, { rotateZ: '100deg' }, { loop: 10 })
        Velocity(el, {
          rotateZ: '45deg',
          translateY: '30px',
          translateX: '30px',
          opacity: 0
        }, { complete: done })
      },
      // 卡片点击事件
      cardClick (jobNo) {
        this.dataForm.jobNo = jobNo
        this.getDataList('1')
        //  if (name == '岳平') {
        //    this.totalPage = 4
        //    this.nameList = ['岳平', '蒋春笋', '刘双龙', '陈名平']
        //    this.nearDatalistC = [98, 97, 94, 99]
        //    this.nearDatalistJ = [97, 95, 96, 97]
        //    this.dataList = [{id: '23422112', name: '李勇', supervisor: '陈名平'}, {id: '23447745', name: '熊杰', supervisor: '陈名平'}, {id: '1433433', name: '罗旋', supervisor: '陈名平'}, {id: '1342443', name: '张祥', supervisor: '陈名平'}]
        //  } else {
        //    this.nearDatalistJ = [81, 71, 90, 70, 80, 60]
        //    this.nearDatalistC = [90, 96, 91, 98, 96, 99]
        //    this.nameList = ['PVD厂', '郭祥伟', '岳平', '王启军', '周颖', '邓海军']
        //    this.dataList = [{id: '43560', name: '王全龙', supervisor: '王梅'}, {id: '422112', name: '雷小平', supervisor: '王梅'}, {id: '74745', name: '唐进', supervisor: '俞长勇'}, {id: '33433', name: '罗忠平', supervisor: '甘茂林'}, {id: '342443', name: '张祥', supervisor: '陈名平'}]
        //  }
        // let options = {
        //   xAxis: {
        //     data: this.nameList
        //   }
        // }
        // this.myChart.setOption(options)
        // nearDatalistJ: [81, 71, 90, 70, 80, 60],
        //   nearDatalistC: [90, 96, 91, 98, 96, 99],
      },
      tableRowStyle({ row, rowIndex }) {
        return 'background-color: lightblue'
      },
      // 修改table header的背景色
      tableHeaderColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background-color: lightseagreen;color: #fff;font-weight: 500;'
        }
      },
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('echartb1'))
        this.myChart2 = this.$echarts.init(document.getElementById('echartb2'))
        this.myChart3 = this.$echarts.init(document.getElementById('echartb3'))
        this.myChart4 = this.$echarts.init(document.getElementById('echartb4'))
        // 绘制图表
        this.myChart.setOption({

          title: {
            text: 'IL铜级完成率(%)'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />'
          },
          color: ['RGB(90,177,239)', 'RGB(46,199,201)'],
          legend: {
            data: ['完成率', '目标']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: this.nameListIl
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}%'
            },
            show: true
          },
          series: [
            {
              name: '完成率',
              type: 'line',
              data: this.rateIL,
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
              name: '目标',
              type: 'line',
              data: this.nearDatalistC,
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
        this.myChart2.setOption({

          title: {
            text: 'IL铜级数量(件)'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['RGB(90,177,239)', 'RGB(46,199,201)'],
          legend: {
            data: ['铜级数量', '目标']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: this.nameListIl
          },
          yAxis: {
            type: 'value',
            // axisLabel: {
            //   show: true,
            //   interval: 'auto',
            //   formatter: '{value}%'
            // },
            show: true
          },
          series: [
            {
              name: '铜级数量',
              type: 'bar',
              data: this.countIL,
              barWidth: 20, // 柱图宽度
              itemStyle: {
                normal: {
                  label: {
                    show: true,	 // 开启显示
                    position: 'top',	// 在上方显示
                    textStyle: {	    // 数值样式
                      color: 'black',
                      fontSize: 16
                    }
                  }
                }
              }
            },
            {
              name: '目标',
              type: 'bar',
              data: this.targetIL,
              // smooth: true,
              barWidth: 20,
              itemStyle: {
                normal: {
                  label: {
                    show: true,	 // 开启显示
                    position: 'top',	// 在上方显示
                    textStyle: {	    // 数值样式
                      color: 'black',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
        this.myChart3.setOption({

          title: {
            text: 'IDL铜级完成率(%)'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />'
          },
          color: ['RGB(90,177,239)', 'RGB(46,199,201)'],
          legend: {
            data: ['完成率', '目标']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: this.nameListDl
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}%'
            },
            show: true
          },
          series: [
            {
              name: '完成率',
              type: 'line',
              data: this.rateDL,
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
              name: '目标',
              type: 'line',
              data: this.nearDatalistC,
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
        this.myChart4.setOption({

          title: {
            text: 'IDL铜级数量(件)'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['RGB(90,177,239)', 'RGB(46,199,201)'],
          legend: {
            data: ['铜级数量', '目标']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: this.nameListDl
          },
          yAxis: {
            type: 'value',
            // axisLabel: {
            //   show: true,
            //   interval: 'auto',
            //   formatter: '{value}'
            // },
            show: true
          },
          series: [
            {
              name: '铜级数量',
              type: 'bar',
              data: this.countDL,
              barWidth: 20, // 柱图宽度
              itemStyle: {
                normal: {
                  label: {
                    show: true,	 // 开启显示
                    position: 'top',	// 在上方显示
                    textStyle: {	    // 数值样式
                      color: 'black',
                      fontSize: 16
                    }
                  }
                }
              }
            },
            {
              name: '目标',
              type: 'bar',
              data: this.targetDL,
              barWidth: 20,
              itemStyle: {
                normal: {
                  label: {
                    show: true,	 // 开启显示
                    position: 'top',	// 在上方显示
                    textStyle: {	    // 数值样式
                      color: 'black',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
      },
      getDataList2 () {
        this.$http({
          url: this.$http.adornUrl('/global/searchTable'),
          method: 'post',
          params: this.$http.adornParams({
            'costCategory': 'IL'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.nameListIl = data.data.name
          this.rateIL = data.data.rate
          this.countIL = data.data.count
          this.targetIL = data.data.target
          let options1 = {
            xAxis: {
              data: this.nameListIl
            },
            series: [
              {
                data: this.rateIL
              },
              {
                data: this.nearDatalistC
              }
            ]
          }
          let options2 = {
            xAxis: {
              data: this.nameListIl
            },
            series: [
              {
                data: this.countIL
              },
              {
                data: this.targetIL
              }
            ]
          }
          this.myChart.setOption(options1)
          this.myChart2.setOption(options2)
        } else {
          this.$message.error(data.msg)
        }
      })
        this.dataListLoadingIL = true
      },
      getDataList3 () {
        this.$http({
          url: this.$http.adornUrl('/global/searchTable'),
          method: 'post',
          params: this.$http.adornParams({
            'costCategory': 'DL'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.nameListDl = data.data.name
          this.rateDL = data.data.rate
          this.countDL = data.data.count
          this.targetDL = data.data.target
          let options1 = {
            xAxis: {
              data: this.nameListDl
            },
            series: [
              {
                data: this.rateDL
              },
              {
                data: this.nearDatalistC
              }
            ]
          }
          let options2 = {
            xAxis: {
              data: this.nameListDl
            },
            series: [
              {
                data: this.countDL
              },
              {
                data: this.targetDL
              }
            ]
          }
          this.myChart3.setOption(options1)
          this.myChart4.setOption(options2)
        } else {
          this.$message.error(data.msg)
        }
      })
        this.dataListLoadingDL = true
      },
      // 获取数据列表
      getDataList () {
        this.getDataList2()
        this.getDataList3()
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
      })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
    left: 0;
    font-size: 100%;
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
