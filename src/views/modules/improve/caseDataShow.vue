<template>
  <el-row :gutter="24">
    <el-col :span="8">
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div align="center">
            <el-date-picker
              v-model="dataForm.keyTime1"
              unlink-panels
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button  type="primary" @click="getDataList1()">查询</el-button>
          </div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echart5" style="height: 35vh"></div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echart6" style="height: 35vh"></div>
        </el-card>
      </el-row>
      <!--<el-row :gutter="24" class="el-row">-->
        <!--<el-card class="box-card" style="background-color:rgba(245,248,253,1)">-->
          <!--<div style="height: 30vh"><p>改善详情模块</p>-->
            <!--<el-table-->
              <!--:data="dataList"-->
              <!--border-->
              <!--:row-style="tableRowStyle"-->
              <!--:header-cell-style="tableHeaderColor"-->
              <!--v-loading="dataListLoading"-->
              <!--@selection-change="selectionChangeHandle"-->
              <!--style="width: 100%;">-->
              <!--<el-table-column-->
                <!--prop="jobNo"-->
                <!--header-align="center"-->
                <!--align="center"-->
                <!--label="案件Id">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="sex"-->
                <!--header-align="center"-->
                <!--align="center"-->
                <!--label="状态">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="phone"-->
                <!--header-align="center"-->
                <!--align="center"-->
                <!--label="项目名称">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="email"-->
                <!--header-align="center"-->
                <!--align="center"-->
                <!--label="类型">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="position"-->
                <!--header-align="center"-->
                <!--align="center"-->
                <!--label="项目领导者">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                <!--prop="wclass"-->
                <!--header-align="center"-->
                <!--align="center"-->
                <!--label="项目队员">-->
              <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<el-pagination-->
              <!--@size-change="sizeChangeHandle"-->
              <!--@current-change="currentChangeHandle"-->
              <!--:current-page="pageIndex"-->
              <!--:page-sizes="[10, 20, 50, 100]"-->
              <!--:page-size="pageSize"-->
              <!--:total="totalPage"-->
              <!--layout="total, sizes, prev, pager, next, jumper">-->
            <!--</el-pagination>-->
          <!--</div>-->
        <!--</el-card>-->
      <!--</el-row>-->
    </el-col>
    <el-col :span="8">
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div align="center">
          <el-date-picker
            v-model="dataForm.keyTime2"
            unlink-panels
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
            <el-button  type="primary" @click="getDataList2()">查询</el-button>
          </div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echart2" style="height: 20vh"></div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echart1" style="height: 20vh"></div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div style="height: 30vh"><p>IL-排名</p>
            <el-table
              :data="dataListIL"
              border
              height="25vh"
              :row-style="tableRowStyle"
              :header-cell-style="tableHeaderColor"
              v-loading="dataListLoadingIL"
              style="width: 100%;">
              <el-table-column
                label="排名"
                type="index"
                width="50"
                align="center">
              </el-table-column>
              <el-table-column
                prop="jobNo"
                header-align="center"
                align="center"
                label="工号">
              </el-table-column>
              <el-table-column
                prop="name"
                header-align="center"
                align="center"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="director"
                header-align="center"
                align="center"
                label="主管">
              </el-table-column>
              <el-table-column
                prop="count"
                header-align="center"
                align="center"
                label="件数">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div align="center">
            <el-date-picker
              v-model="dataForm.keyTime3"
              unlink-panels
              type="monthrange"
              value-format="yyyy-MM"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button  type="primary" @click="getDataList3()">查询</el-button>
          </div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echart4" style="height: 20vh"></div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echart3" style="height: 20vh"></div>
        </el-card>
      </el-row>
      <el-row :gutter="24" class="el-row">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div style="height: 30vh"> <p>DL-排名</p>
            <el-table
              :data="dataListDL"
              border
              height="25vh"
              :row-style="tableRowStyle"
              :header-cell-style="tableHeaderColor"
              v-loading="dataListLoadingDL"
              style="width: 100%;">
              <el-table-column
                label="排名"
                type="index"
                width="50"
                align="center">
              </el-table-column>
              <el-table-column
                prop="jobNo"
                header-align="center"
                align="center"
                label="工号">
              </el-table-column>
              <el-table-column
                prop="name"
                header-align="center"
                align="center"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="director"
                header-align="center"
                align="center"
                label="主管">
              </el-table-column>
              <el-table-column
                prop="count"
                header-align="center"
                align="center"
                label="件数">
              </el-table-column>
            </el-table>
          </div>
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
          this.myChart = this.$echarts.init(document.getElementById('echart1'))
          this.myChart2 = this.$echarts.init(document.getElementById('echart2'))
          this.myChart3 = this.$echarts.init(document.getElementById('echart3'))
          this.myChart4 = this.$echarts.init(document.getElementById('echart4'))
          this.myChart5 = this.$echarts.init(document.getElementById('echart5'))
          this.myChart6 = this.$echarts.init(document.getElementById('echart6'))
          // 绘制图表
          this.myChart.setOption({

            title: {
              text: 'IL改善完成率(%)'
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
              smooth: true,
              data: this.nearDatalistC,
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
            text: 'IL改善数量(件)'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['RGB(90,177,239)', 'RGB(46,199,201)'],
          legend: {
            data: ['改善数量', '目标']
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
              name: '改善数量',
              type: 'bar',
              data: this.countIL,
              smooth: false,
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
            }
          ]
        })
        this.myChart3.setOption({

          title: {
            text: 'IDL改善完成率(%)'
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
            text: 'IDL改善数量(件)'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['RGB(90,177,239)', 'RGB(46,199,201)'],
          legend: {
            data: ['改善数量', '目标']
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
              name: '改善数量',
              type: 'bar',
              data: this.countDL,
              smooth: true,
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
              smooth: false,
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
            }
          ]
        })
        this.myChart5.setOption({
          title: {
            text: 'PVD改善节省金额各主管占比(共:' + this.dataForm.lxNum.toFixed(2) + '￥)',
            left: 'center',
            textStyle: {
              color: 'RGB(102,102,102)'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          visualMap: {
            show: false,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '类型',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                this.pieChart1
              ].sort(function (a, b) { return a.value - b.value; }),
              // roseType: 'radius',
              label: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                // color: '#c1c1c2',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                normal: {
                  label: {
                    // color: '#c1c1c2',
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: {show: true}
              }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200
              }
            }
          ]
      })
        this.myChart6.setOption({
          title: {
            text: 'PVD改善节省金额类型占比(共:' + this.dataForm.ztNum.toFixed(2) + '￥)',
            left: 'center',
            textStyle: {
              color: 'RGB(102,102,102)'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          visualMap: {
            show: false,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '状态',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                this.pieChart2
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                // color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                normal: {
                  label: {
                    // color: '#c1c1c2',
                    show: true,
                    formatter: '{b} : {c} ({d}%)'
                  },
                  labelLine: {show: true}
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200
              }
            }
          ]
        })
      },
        getDataList1 () {
          this.dataForm.ztNum = 0
          this.dataForm.lxNum = 0
          if (this.dataForm.keyTime1 == '' || this.dataForm.keyTime1 == null || this.dataForm.keyTime1 == undefined) {
          if (moment(moment().valueOf()).format('MM-DD') < moment('09-01').format('MM-DD')) {
            this.dataForm.keyTime1 = [moment(moment().add(-1, 'years').valueOf()).format('YYYY-09-01'), moment(moment().valueOf()).format('YYYY-MM-DD')]
          } else {
            this.dataForm.keyTime1 = [moment(moment().valueOf()).format('YYYY-09-01'), moment(moment().valueOf()).format('YYYY-MM-DD')]
          }}
          this.$http({
            url: this.$http.adornUrl('/project/moneyRate'),
            method: 'post',
            params: this.$http.adornParams({
              'keytime': this.dataForm.keyTime1 + ''
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.pieChart1 = data.list
            for (var i = 0; i < this.pieChart1.length; i++) {
              this.pieChart1[i].itemStyle = this.colors[i]
              this.dataForm.lxNum += this.pieChart1[i].value
            }
            let options = {
              title: {
                text: 'PVD改善节省金额各主管占比(共:' + this.dataForm.lxNum.toFixed(2) + '￥)',
              },
              series: [
                {
                  data: this.pieChart1
                }]
            }
            this.myChart5.setOption(options)
          } else {
            this.$message.error(data.msg)
          }
        })
          this.$http({
            url: this.$http.adornUrl('/project/impactRate'),
            method: 'post',
            params: this.$http.adornParams({
              'keytime': this.dataForm.keyTime1 + ''
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.pieChart2 = data.list
            for (var i = 0; i < this.pieChart2.length; i++) {
              this.pieChart2[i].itemStyle = this.colors[i]
              this.dataForm.ztNum += this.pieChart2[i].value
            }
            let options = {
              title: {
                text: 'PVD改善节省金额各状态占比(共:' + this.dataForm.ztNum.toFixed(2) + '￥)'
              },
              series: [
                {
                  data: this.pieChart2
                }]
            }
            this.myChart6.setOption(options)
          } else {
            this.$message.error(data.msg)
          }
        })
        },
        getDataList2 () {
            if (this.dataForm.keyTime2 == '' || this.dataForm.keyTime2 == null || this.dataForm.keyTime2 == undefined) {
              if (moment(moment().add(+3, 'days').valueOf()).format('E') < 6) {
              this.dataForm.keyTime2 = [ moment(moment().week(moment().week() - 1).startOf('week').add(-1, 'days').valueOf()).format('YYYY-MM-DD'),
                moment(moment().week(moment().week() - 1).endOf('week').add(-1, 'days').valueOf()).format('YYYY-MM-DD')]
            } else {
            this.dataForm.keyTime2 = [ moment(moment().week(moment().week()).startOf('week').add(-1, 'days').valueOf()).format('YYYY-MM-DD'),
              moment(moment().week(moment().week()).endOf('week').add(-1, 'days').valueOf()).format('YYYY-MM-DD')]
          }
            }
          this.$http({
            url: this.$http.adornUrl('/project/queryLTable'),
            method: 'post',
            params: this.$http.adornParams({
              'keytime': this.dataForm.keyTime2 + '',
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
          this.$http({
            url: this.$http.adornUrl('/project/queryTop'),
            method: 'post',
            params: this.$http.adornParams({
              'keytime': this.dataForm.keyTime2 + '',
              'costCategory': 'IL'
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.dataListIL = data.list
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoadingIL = false
        })
        },
        getDataList3 () {
          if (this.dataForm.keyTime3 == '' || this.dataForm.keyTime3 == null || this.dataForm.keyTime3 == undefined) {
            if (moment(moment().valueOf()).format('DD') < moment('16').format('DD')) {
              this.dataForm.keyTime3 = [moment(moment().add(-1, 'month').valueOf()).format('YYYY-MM'),
                moment(moment().add(-1, 'month').valueOf()).format('YYYY-MM')]
            } else {
              this.dataForm.keyTime3 = [moment(moment().valueOf()).format('YYYY-MM'),
                moment(moment().valueOf()).format('YYYY-MM')]
            }
          }
          this.$http({
            url: this.$http.adornUrl('/project/queryLTable'),
            method: 'post',
            params: this.$http.adornParams({
              'keytime': this.dataForm.keyTime3 + '',
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

          this.$http({
            url: this.$http.adornUrl('/project/queryTop'),
            method: 'post',
            params: this.$http.adornParams({
              'keytime': this.dataForm.keyTime3 + '',
              'costCategory': 'DL'
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.dataListDL = data.list
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoadingDL = false
        })
        },
      // 获取数据列表
      getDataList () {
        this.getDataList1()
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
      // 导出未考试人员
      export2Exce () {
        // 获取离职数据
        this.$http({
          url: this.$http.adornUrl('/unexam/exportExcel'),
          method: 'post',
          params: this.$http.adornParams({
            'jobNo': this.dataForm.jobNo
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.exportList = []
            this.exportList = data.list
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../../vendor/Export2Excel')
            const tHeader = ['工号', '姓名', '试卷名', '试卷类型', '状态', '部门', '职称', '主管']
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['jobNo', 'name', 'title', 'ptype', 'status', 'department', 'position', 'director']
            const list = this.exportList
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '未考试人员名单表')
        })
        }
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
