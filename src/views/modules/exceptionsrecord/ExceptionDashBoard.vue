<template>
  <div class="dwrapper" id = 'fullArea'>
    <div class="dcontainer">
      <div class="dashboard-bg-image"></div>
      <div style="height:100%;" :style="marginStyle">
        <el-row  :gutter = '20' class='chead'>
          <el-col :span="24">
            <div class="backTalent">
              <h1 style="line-height: 40px;color:white;font-size: 3em">Exceptions Billboard</h1>
            </div>
          </el-col>
        </el-row>
        <div class="d-chart-item">
          <el-row>
            <div style="padding: 2px">
            <el-col :span="8">


              <div class="chart-item">
                <div class="arrow-top-left">
                </div>
                <div class="arrow-top-right">
                </div>
                <div class="div-block">
                  <!--<h1 style="line-height: 50px;color:white;font-size: 2.2em" >品质</h1>-->
                    <div id="eChartQuality"></div>
                </div>
              </div>

            </el-col>
            <el-col :span="8">
              <div style="margin-left: 4px">
              <div class="chart-item">
                <div class="arrow-top-left">
                </div>
                <div class="arrow-top-right">
                </div>
                <div class="div-block">
                  <!--<h1 style="line-height: 50px;color:white;font-size: 2.2em" >EHS</h1>-->
                  <div id="eChartEHS"></div>
                </div>
              </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin-left: 4px">

              <div class="chart-item">
                <div class="arrow-top-left">
                </div>
                <div class="arrow-top-right">
                </div>
                <div class="div-block">
                  <div id="eChartTrace"></div>
                </div>
              </div>
              </div>
            </el-col>
            </div>
          </el-row>
          <el-row>
            <!--<el-col :span="8">-->
              <!--<div class="chart-item" style="margin-top: 5px">-->
                <!--<div class="arrow-top-left">-->
                <!--</div>-->
                <!--<div class="arrow-top-right">-->
                <!--</div>-->
                <!--<div class="div-block2">-->

                  <!--<el-form :inline="true" :model="searchForm" ref="searchForm" label-width="100px">-->
                    <!--<el-row>-->
                      <!--<div style="height: 50px"></div>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                      <!--<el-form-item label="发生时间" prop="happen_date" autocomplete="off">-->
                        <!--<el-input></el-input>-->
                      <!--</el-form-item>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                    <!--<el-form-item label="大类" prop="exception_type2" autocomplete="off">-->
                      <!--<el-input></el-input>-->
                    <!--</el-form-item>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                      <!--<el-form-item label="异常类型" prop="exception_type" autocomplete="off">-->
                        <!--<el-input></el-input>-->
                      <!--</el-form-item>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                      <!--<el-form-item label="DRI" prop="dri" autocomplete="off">-->
                        <!--<el-input></el-input>-->
                      <!--</el-form-item>-->
                    <!--</el-row>-->
                    <!--<el-row>-->
                      <!--<el-form-item label="区域" prop="building" autocomplete="off">-->
                        <!--<el-input></el-input>-->
                      <!--</el-form-item>-->
                    <!--</el-row>-->
                  <!--</el-form>-->
                  <!--&lt;!&ndash;<el-table ref="dailyRef" :data="tableData1" max-height="680px" class="table" :row-class-name="tableRowClassName" v-loading="templateLoading" element-loading-text="加载中"&ndash;&gt;-->
                            <!--&lt;!&ndash;element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-table-column prop="plantName" label="企业名称" width="200"></el-table-column>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-table-column label="排放量(tCO2)">&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="emCurDayVal" label="本日"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="emLastDayVal" label="同期"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="emCurMonthVal" label="本月"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="emLastMonthVal" label="同期"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="emCurYearVal" label="本年"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="emLastYearVal" label="同期"></el-table-column>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-table-column label="供电排放强度(tCO2/MWh)">&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="pemiCurDayVal" label="本日"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="pemiLastDayVal" label="同期"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="pemiCurMonthVal" label="本月"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="pemiLastMonthVal" label="同期"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="pemiCurYearVal" label="本年"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="pemiLastYearVal" label="同期"></el-table-column>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-table-column label="供热排放强度(tCO2/GJ)">&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="hemiCurDayVal" label="本日"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="hemiLastDayVal" label="同期"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="hemiCurMonthVal" label="本月"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="hemiLastMonthVal" label="同期"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="hemiCurYearVal" label="本年"></el-table-column>&ndash;&gt;-->
                      <!--&lt;!&ndash;<el-table-column prop="hemiLastYearVal" label="同期"></el-table-column>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
                  <!--&lt;!&ndash;</el-table>&ndash;&gt;-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
            <div style="padding: 2px">
            <el-col :span="24">

                <div class="chart-item" style="margin-top: 5px">
                  <div class="arrow-top-left">
                  </div>
                  <div class="arrow-top-right">
                  </div>
                  <div class="div-block2" :class="{anim:animate==true}" @mouseenter="mouseenter" @mouseleave="mouseleave">
                    <el-table
                      :data="tableData"
                      border
                      v-loading="dataListLoading"
                      cell-class-name="cellStyle"
                      header-cell-class-name="headerStyle"
                      header-row-class-name="rowStyle"
                      row-class-name="rowStyle"
                      style="width: 100%;font-size:15px;background-color: transparent !important;margin-top: 1px;margin-left: 2px;">
                      <el-table-column
                        prop="exception_type2"
                        header-align="center"
                        align="center"
                        width="110"
                        label="大类">
                        <template slot-scope="scope">
                          <div v-if="scope.row.exception_type2==1">品质</div>
                          <div v-if="scope.row.exception_type2==2">Trace</div>
                          <div v-if="scope.row.exception_type2==0">EHS</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="exception_type"
                        header-align="center"
                        align="center"
                        label="异常类型"
                        width="170">
                        <template slot-scope="scope">
                          <div v-if="scope.row.exception_type==1">异常情况</div>
                          <div v-if="scope.row.exception_type==2">内部稽核</div>
                          <div v-if="scope.row.exception_type==3">外部稽核</div>
                          <div v-if="scope.row.exception_type==4">工伤事件</div>
                          <div v-if="scope.row.exception_type==6">违纪</div>
                          <div v-if="scope.row.exception_type==7">Trace异常</div>
                          <div v-if="scope.row.exception_type==8">品质异常</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="building"
                        header-align="center"
                        align="center"
                        label="楼栋"
                        width="130">
                        <template slot-scope="scope">
                          <div v-if="scope.row.building==1">E3-1F</div>
                          <div v-if="scope.row.building==2">E3-2F</div>
                          <div v-if="scope.row.building==3">D4-1F</div>
                          <div v-if="scope.row.building==4">D4-2F</div>
                          <div v-if="scope.row.building==5">B6-2F</div>
                          <div v-if="scope.row.building==6">B1-1F</div>
                          <div v-if="scope.row.building==7">B1-2F</div>
                          <div v-if="scope.row.building==8">E4-1F</div>
                          <div v-if="scope.row.building==9">E4-2F</div>
                          <div v-if="scope.row.building==10">E3-1.5F</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="exception_describe"
                        header-align="center"
                        align="center"
                        label="异常描述"
                        width="660">
                      </el-table-column>
                      <el-table-column
                        prop="happen_date"
                        header-align="center"
                        align="center"
                        label="发生时间"
                        width="220">
                      </el-table-column>
                      <el-table-column
                        prop="dri"
                        header-align="center"
                        align="center"
                        label="DRI"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="current_situation"
                        header-align="center"
                        align="center"
                        label="当前状态"
                        width="100">
                        <template slot-scope="scope">
                          <div v-if="scope.row.current_situation === 0">
                            <el-tag
                              :key="items[3].label"
                              :type="items[3].type"
                              effect="dark">
                              {{ items[3].label }}
                            </el-tag>
                          </div>
                          <div v-if="scope.row.current_situation === 1">
                            <el-tag
                              :key="items[1].label"
                              :type="items[1].type"
                              effect="dark">
                              {{ items[1].label }}
                            </el-tag>
                          </div>
                        </template>
                      </el-table-column>

                      <el-table-column
                        header-align="center"
                        label="稽核图例"
                        width="429">
                        <template slot-scope="scope">
                          <div style="text-align: center; margin: 0px">
                            <img :src="scope.row.img_url" style="width: 300px;height:83px;"/>
                          </div>
                        </template>
                      </el-table-column>

                    </el-table>

                  </div>
                </div>

            </el-col>
            </div>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import {getComputedStyle} from '../../utils'
  export default {
    name: 'ExceptionDashBoard',
    data () {
      return {
        driMax: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
        startDate: '',
        endDate: '',
        items: [
          { type: '', label: '' },
          { type: 'success', label: '已解决' },
          { type: 'info', label: '' },
          { type: 'danger', label: '处理中' },
          { type: 'warning', label: '' }
        ],
        loadsgn: 0,
        tableData: [],
        animate: true,
        interval: null,
        baseUrl: '',
        dataListShow: [],
        scaleX: 1,
        scaleY: 1,
        marginHorizontal: 0,
        fullscreen: false,
        title: '异常信息记录',
        report: {
          quality: [],
          qualityCount: [],
          trace: [],
          traceCount: [],
          ehs: ['ZP','SS','MV'],
          ehsCount: [{name:'ZP',value:'7'}, {name:'SS',value:7},{name:'MV',value:8}]
        },
        queryData: {
          dri: '',
          type: ''
        },
        dataListLoading: false
      }
    },
    activated () {
      this.startDate = moment(moment().add(-30, 'days').valueOf()).format('YYYY-MM-DD')
      this.endDate = moment(moment().valueOf()).format('YYYY-MM-DD')
      // this.getData()
    },
    created () {
      this.getDataList()
      this.interval = setInterval(this.scroll, 3000)
    },
    mounted () {
      this.init()
      this.getDataList()
      this.drawLine()
      this.getDri(1)
      this.getDri(2)
      this.getEHS(0)
    },
    computed: {
      transformStyle: function () {
      },
      marginStyle: function () {
        return {
          margin: `0px ${this.marginHorizontal}px;`
        }
      },
      dwrapperStyle: function () {
        return {
          height: this.height + 'px'
        }
      }
    },
    methods: {
      mouseenter () {
        var self = this
        clearInterval(self.interval)
        self.interval = null
      },
      mouseleave () {
        var self = this
        this.interval = setInterval(self.scroll, 3000)
      },
      scroll () {
        this.animate = !this.animate
        var that = this // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
        setTimeout(function () {
          if (that.loadsgn > that.dataListShow.length - 2) {
            that.loadsgn = 0
          }
          that.tableData.push(that.dataListShow[that.loadsgn])
          if (that.tableData.length > 5) {
            that.tableData.shift()
            that.loadsgn = that.loadsgn + 1
          } else {
            that.loadsgn = that.loadsgn + 1
          }

          that.animate = !that.animate
          setTimeout(function () {}, 50000) // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        }, 2000)
      },
      getDataList () {
        this.startDate = moment(moment().add(-30, 'days').valueOf()).format('YYYY-MM-DD')
        this.endDate = moment(moment().valueOf()).format('YYYY-MM-DD')
        this.dataListLoading = true
        this.baseUrl = window.SITE_CONFIG.baseUrl
        this.$http({
          url: this.$http.adornUrl(`/exceptionsRecord/getDataList`),
          method: 'get',
          params: this.$http.adornParams({
            'exception_time': this.startDate + ',' + this.endDate,
            'exception_type': this.queryData.type,
            'audit_status': '1',
            'dri': this.queryData.dri,
            'rows': 100,
            'page': null
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataListShow = data.exceptionsRecord.list
            for (let j = 0; j < this.dataListShow.length; j++) {
              if (this.dataListShow[j].img_url === '' || this.dataListShow[j].img_url === null){
                this.dataListShow[j].img_url = this.baseUrl + '/static/images/default.png'
              } else {
                this.dataListShow[j].img_url = this.baseUrl +  this.dataListShow[j].img_url
              }
            }
            this.totalPage = data.exceptionsRecord.total
            // this.tableData = this.dataListShow
            this.dataListLoading = false
          } else {
            this.dataListLoading = false
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      getDri (val) {
        this.$http({
          url: this.$http.adornUrl(`/exceptionsRecord/reDri`),
          method: 'get',
          params: this.$http.adornParams({
            'exception_type2': val,
            // 'exception_time': this.startDate + ',' + this.endDate,
            // 'audit_status': '1'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (val === 1) {
              this.report.quality = data.data.dri.split(',')
              this.report.qualityCount = data.data.count1.split(',')
              let driMaxs = this.driMax
              driMaxs = driMaxs.slice(0, this.report.quality.length)
              this.eChartQuality.setOption({
                title:{text:'品质' },
                xAxis: {data: this.report.quality},
                series: [{
                  type: 'custom',
                  renderItem: function(params, api) {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                      type: 'group',
                      children: [{
                        type: 'CubeLeft',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: 'rgba(47,102,192,.27)'
                        }
                      }, {
                        type: 'CubeRight',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: 'rgba(59,128,226,.27)'
                        }
                      }, {
                        type: 'CubeTop',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: 'rgba(72,156,221,.27)'
                        }
                      }]
                    }
                  },
                  data: driMaxs
                }, {
                  type: 'custom',
                  renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                      type: 'group',
                      children: [{
                        type: 'CubeLeft',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#3B80E2'
                          },
                            {
                              offset: 1,
                              color: '#49BEE5'
                            }
                          ])
                        }
                      }, {
                        type: 'CubeRight',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#3B80E2'
                          },
                            {
                              offset: 1,
                              color: '#49BEE5'
                            }
                          ])
                        }
                      }, {
                        type: 'CubeTop',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#3B80E2'
                          },
                            {
                              offset: 1,
                              color: '#49BEE5'
                            }
                          ])
                        }
                      }]
                    }
                  },
                  data: this.report.qualityCount
                }, {
                  type: 'bar',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      formatter: (e) => {
                        switch (e.name) {
                          case '10kV线路':
                            return this.report.qualityCount[0]
                          case '公用配变':
                            return this.report.qualityCount[1]
                          case '35kV主变':
                            return this.report.qualityCount[2]
                          case '水':

                        }
                      },
                      fontSize: 16,
                      color: '#fff',
                      offset: [4, -25]
                    }
                  },
                  itemStyle: {
                    color: 'transparent'
                  },
                  data: this.report.qualityCount
                }]
                // xAxis: {data: this.report.quality},
                // series: [{data: this.report.qualityCount}]
              })
            } else if (val === 2) {
              this.report.trace = data.data.dri.split(',')
              this.report.traceCount = data.data.count1.split(',')
              let driMaxs = this.driMax
              driMaxs = driMaxs.slice(0, this.report.trace.length)
              this.eChartTrace.setOption({
                title: {text:'Trace'},
                xAxis: {data: this.report.trace},
                series: [{
                  type: 'custom',
                  renderItem: function(params, api) {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                      type: 'group',
                      children: [{
                        type: 'CubeLeft',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: 'rgba(47,102,192,.27)'
                        }
                      }, {
                        type: 'CubeRight',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: 'rgba(59,128,226,.27)'
                        }
                      }, {
                        type: 'CubeTop',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: 'rgba(72,156,221,.27)'
                        }
                      }]
                    }
                  },
                  data: driMaxs
                }, {
                  type: 'custom',
                  renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                      type: 'group',
                      children: [{
                        type: 'CubeLeft',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#3B80E2'
                          },
                            {
                              offset: 1,
                              color: '#49BEE5'
                            }
                          ])
                        }
                      }, {
                        type: 'CubeRight',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#3B80E2'
                          },
                            {
                              offset: 1,
                              color: '#49BEE5'
                            }
                          ])
                        }
                      }, {
                        type: 'CubeTop',
                        shape: {
                          api,
                          xValue: api.value(0),
                          yValue: api.value(1),
                          x: location[0],
                          y: location[1],
                          xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                          fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#3B80E2'
                          },
                            {
                              offset: 1,
                              color: '#49BEE5'
                            }
                          ])
                        }
                      }]
                    }
                  },
                  data: this.report.traceCount
                }, {
                  type: 'bar',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      formatter: (e) => {
                        switch (e.name) {
                          case '10kV线路':
                            return this.report.traceCount[0]
                          case '公用配变':
                            return this.report.traceCount[1]
                          case '35kV主变':
                            return this.report.traceCount[2]
                          case '水':
                        }
                      },
                      fontSize: 16,
                      color: '#fff',
                      offset: [4, -25]
                    }
                  },
                  itemStyle: {
                    color: 'transparent'
                  },
                  data: this.report.traceCount
                }]
                  // series: [{data: this.report.traceCount}]
              })
            } else {
              // this.report.ehs = data.data.dri.split(',')
              // this.report.ehsCount = data.data.count1.split(',')
            }
          } else {
            this.dataListLoading = false
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      getEHS (val) {
        this.$http({
          url: this.$http.adornUrl(`/exceptionsRecord/reEHS`),
          method: 'get',
          params: this.$http.adornParams({
            'exception_type2': val,
            // 'exception_time': this.startDate + ',' + this.endDate,
            // 'audit_status': '1'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (val === 1) {
              // this.report.quality = data.data.ex_type.split(',')
              // this.report.qualityCount = data.data.count1.split(',')
            } else if (val === 2) {
              // this.report.trace = data.data.ex_type.split(',')
              // this.report.traceCount = data.data.count1.split(',')
            } else {
              this.report.ehs = data.data.ex_type.split(',')
              this.report.ehsCount = this.humanFormat(data.data.ex_type.split(','), data.data.count1.split(','))
              this.eChartEHS.setOption({
                legend: {data: this.report.ehs},
                series: [{ data: this.report.ehsCount }]
              })
            }
          } else {
            this.dataListLoading = false
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        })
      },
      init () {
        window.addEventListener('keydown', this.KeyDown, true)// 监听按键事件
        // window.addEventListener('resize', this.initScale, true)
        this.listenResize()
      },
      eClick (key, params){ //echarts点击事件
        let templet = ''
        if ('type' === key) {
          switch (params.name) {
            case '异常情况' : templet = '1'
                  break;
            case '内部稽核' : templet = '2'
              break;
            case '外部稽核' : templet = '3'
              break;
            case '工伤事件' : templet = '4'
              break;
            case '违纪' : templet = '6'
              break;
            case 'Trace异常' : templet = '7'
              break;
            case '品质异常' : templet = '8'
              break;
            default: templet = ''
          }
          this.queryData[key] = templet
        } else {
          this.queryData[key] = params.name
        }
        console.log(key)
        this.getDataList()

        // this.getReport()
        // this.getDataList()
      },
      drawLine () {
        const CubeLeft = echarts.graphic.extendShape({
          shape: {
            x: 0,
            y: 0
          },
          buildPath: function(ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c0 = [shape.x, shape.y]
            const c1 = [shape.x - 9, shape.y - 9]
            const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9]
            const c3 = [xAxisPoint[0], xAxisPoint[1]]
            ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
          }
        })
        const CubeRight = echarts.graphic.extendShape({
          shape: {
            x: 0,
            y: 0
          },
          buildPath: function(ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c1 = [shape.x, shape.y]
            const c2 = [xAxisPoint[0], xAxisPoint[1]]
            const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
            const c4 = [shape.x + 18, shape.y - 9]
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
          }
        })
        const CubeTop = echarts.graphic.extendShape({
          shape: {
            x: 0,
            y: 0
          },
          buildPath: function(ctx, shape) {
            const c1 = [shape.x, shape.y]
            const c2 = [shape.x + 18, shape.y - 9]
            const c3 = [shape.x + 9, shape.y - 18]
            const c4 = [shape.x - 9, shape.y - 9]
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
          }
        })
        echarts.graphic.registerShape('CubeLeft', CubeLeft)
        echarts.graphic.registerShape('CubeRight', CubeRight)
        echarts.graphic.registerShape('CubeTop', CubeTop)
        const MAX = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
        const VALUE = [12, 12, 10, 10, 10, 9, 8, 8, 8, 7]
        const option1 = {
          // backgroundColor: "#012366",
          title: {
            text: '',
            top: 10,
            left: 18,
            textStyle: {
              color: '#00F6FF',
              fontSize: 24
            }
          },
          tooltip: { //明细内容
            trigger: 'axis',
            formatter: '{b0}<br/>'
          },
          grid: {
            left: 20,
            right: 40,
            bottom: '19%',
            top: 80,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['郭祥伟', '王启军', '岳平','周鹏','肖卫华','陈春陶',
              '陶虎','芮科文','刘国梁','聂海'],
            axisLine: {
              show: true,
              lineStyle: {
                color: 'white'
              }
            },
            offset: 20,
            axisTick: {
              show: false,
              length: 9,
              alignWithLabel: true,
              lineStyle: {
                color: '#7DFFFD'
              }
            },
            axisLabel: {
              fontSize: 10
            }
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 15,
            axisLine: {
              show: true,
              lineStyle: {
                color: 'white'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              fontSize: 16
            },
            boundaryGap: ['20%', '20%']
          },
          series: [{
            type: 'custom',
            renderItem: function(params, api) {
              const location = api.coord([api.value(0), api.value(1)])
              return {
                type: 'group',
                children: [{
                  type: 'CubeLeft',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: 'rgba(47,102,192,.27)'
                  }
                }, {
                  type: 'CubeRight',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: 'rgba(59,128,226,.27)'
                  }
                }, {
                  type: 'CubeTop',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: 'rgba(72,156,221,.27)'
                  }
                }]
              }
            },
            data: MAX
          }, {
            type: 'custom',
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)])
              return {
                type: 'group',
                children: [{
                  type: 'CubeLeft',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#3B80E2'
                    },
                      {
                        offset: 1,
                        color: '#49BEE5'
                      }
                    ])
                  }
                }, {
                  type: 'CubeRight',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#3B80E2'
                    },
                      {
                        offset: 1,
                        color: '#49BEE5'
                      }
                    ])
                  }
                }, {
                  type: 'CubeTop',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0])
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#3B80E2'
                    },
                      {
                        offset: 1,
                        color: '#49BEE5'
                      }
                    ])
                  }
                }]
              }
            },
            data: VALUE
          }, {
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: (e) => {
                  switch (e.name) {
                    case '10kV线路':
                      return VALUE[0]
                    case '公用配变':
                      return VALUE[1]
                    case '35kV主变':
                      return VALUE[2]
                    case '水':

                  }
                },
                fontSize: 16,
                color: '#fff',
                offset: [4, -25]
              }
            },
            itemStyle: {
              color: 'transparent'
            },
            data: VALUE
          }]
        }
        this.eChartQuality = this.$echarts.init(document.getElementById('eChartQuality'))
        this.eChartEHS = this.$echarts.init(document.getElementById('eChartEHS'))
        this.eChartTrace = this.$echarts.init(document.getElementById('eChartTrace'))
        // this.eChartQuality.on('click', (params) => {this.eClick('dri', params)})
        // this.eChartEHS.on('click', (params) => {this.eClick('type', params)})
        // this.eChartTrace.on('click', (params) => {this.eClick('dri', params)})
        this.eChartQuality.setOption(option1)
        this.eChartEHS.setOption({
          title: {
            text: 'EHS',
            top: 10,
            left: 18,
            textStyle: {
              color: '#00F6FF',
              fontSize: 24
            }
          },
            tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>  {c}'
            },
            color: ['#029ffc', '#29dfec', '#fa6676', '#4339f1', '#a680fa', '#D6D22E', '#ffb60f'],
            legend: {
              icon: 'circle',
              show: true,
              width: '45%',
              x: '25%',
              y: '85%',
              textStyle: { //图例文字的样式
                color: '#a0e9f3',
                fontSize: 12
              },
              data: this.report.ehs
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['0%', '65%'],
                center: ['50%', '45%', '50%', '50%'],
                avoidLabelOverlap: true,
                itemStyle: {
                  // color: '#c1c1c2',
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  normal: {
                    label: {
                      show: true,
                      formatter: '{b}\n{c}\n{d}%',
                      fontSize: 14
                    },
                    labelLine: {
                      show: true
                    }
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
                  show: true,
                  normal: {
                    length: 5
                  }
                },
                data: this.report.ehsCount
                //   [{value: 335, name: '生技'},
                //   {value: 2310, name: 'PVD生产'},
                //   {value: 634, name: '阳极生产'},
                //   {value: 185, name: '设备'},
                //   {value: 135, name: '厂务'},
                //   {value: 35, name: '办公室'},
                //   {value: 835, name: '品质'}
                // ]
              }
            ]

        })
        this.eChartTrace.setOption(option1)
      },
      scanHome () {
        var rate = 1 / ((window.innerWidth / 1920) * 0.95)
        return "transform: scale(" + rate + ")"
      },
      KeyDown () {
        if (event.keyCode === 122 && document.getElementById('fullArea') != null) {
          event.returnValue = false
          this.fullScreen()   //触发全屏的按钮
        }
      },
      fullScreen () {
        var fullArea = document.getElementById('fullArea')
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (fullArea.requestFullscreen) {
            fullArea.requestFullscreen();
          } else if (fullArea.webkitRequestFullScreen) {
            fullArea.webkitRequestFullScreen();
          } else if (fullArea.mozRequestFullScreen) {
            fullArea.mozRequestFullScreen();
          } else if (fullArea.msRequestFullscreen) {
            // IE11
            fullArea.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },
      initScale () {
        let $container = document.querySelector('.container')
        let containerWidth = getComputedStyle($container, 'width').replace("px", "")
        let containerHeight = getComputedStyle($container, 'height').replace("px", "")
        containerWidth = Number(containerWidth)
        containerHeight = Number(containerHeight)
        containerWidth = isNaN(containerWidth) ? 0 : containerWidth
        containerHeight = isNaN(containerHeight) ? 0 : containerHeight

        let defaultHeight = 1080
        let defaultWidth = 1920
        // sacle 缩放比例。
        let scale = 1
        if (containerHeight < defaultHeight) {
          scale = containerHeight / defaultHeight
        }

        this.scaleX = scale
        this.scaleY = scale

        let marginWidth = defaultWidth * scale
        //
        this.marginHorizontal = 0
        if (containerWidth > marginWidth) {
          marginWidth = (containerWidth - marginWidth) / 2
          this.marginHorizontal = marginWidth
        }
      },
      listenResize () {
        // this.initScale()
      },
      humanFormat (nameList, dataList) {//数据类型设定
        var list = []
        for (var i = 0, len = dataList.length; i < len; i++) {
          var data = new Object()
          data.value = dataList[i]
          data.name = nameList[i]
          list.push(data)
        }
        return list
      }
    }
  }
</script>

<style lang="scss">

  .dwrapper {
    height:1080px;
    width: 102.5%;
    margin: -20px;
    position: relative;
  }

  .dcontainer {
    background-color: rgb(3, 12, 59);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  #eChartEHS{
    width:100%;
    height: 380px;
  }
  #eChartQuality {
    width:100%;
    height: 380px;
  }
  #eChartTrace{
    width:100%;
    height: 380px;
  }
  .div-block {
    height:380px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgba(5, 44, 127, 1);
    /*box-shadow: 2px -2px 8px 0px rgba(10, 47, 128, 1);*/
  }
  .div-block2{
    height:580px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgba(5, 44, 127, 1);
  }
  .dashboard-bg-image {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url('../../../assets/img/background.jpg');
  }

  .dashboard-container {
    position: relative;
    user-select: none;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
    transition: all .3s linear;
    overflow: hidden;
  }

  .dashboard-error {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .dashboard-error-inner {
      color: #fff;
      font-size: 32px;
    }
  }
  .d-chart-item {
    position: relative;
    .chart-item {
      position: relative;
      height: 100%;
      background: rgba(14, 36, 59, 0.59);
      overflow: hidden;

      &::after {
        position: absolute;
        content: '';
        width: 17px;
        height: 15px;
        background: url("../../../assets/img/border-arrow.png");
        left: 0;
        bottom: 0;
      }

      &::before {
        position: absolute;
        content: '';
        width: 17px;
        height: 15px;
        background: url("../../../assets/img/border-arrow.png");
        right: 0;
        bottom: 0;
        transform: rotate(-90deg);
      }

      .arrow-top-left {
        position: absolute;
        content: '';
        width: 17px;
        height: 15px;
        background: url("../../../assets/img/border-arrow.png");
        left: 0;
        top: 0;
        transform: rotate(90deg);
      }

      .arrow-top-right {
        position: absolute;
        content: '';
        width: 17px;
        height: 15px;
        background: url("../../../assets/img/border-arrow.png");
        right: 0;
        top: 0;
        transform: rotate(180deg);
      }
    }
  }


  .dashboard-top, .dashboard-top-big {
    position: absolute;
    top: -31px;
    left: -2px;


    .dashboard-top-title {
      position: relative;
      font-size: 18px;
      color: #77C6FF;
      width: 155px;
      text-align: center;
      line-height: 31px;
      overflow: hidden;
      height: 100%;
    }
  }

  .dashboard-top {
    width: 453px;
    height: 31px;
    background: url("../../../assets/img/db-top2.png") no-repeat;
    background-size: 100% 100%;
  }

  .dashboard-top-big {
    width: 462px;
    height: 31px;
    background: url("../../../assets/img/db-top-big2.png") no-repeat;
    background-size: 100% 100%;
  }


  .item-loading{
    text-align: center;
    line-height: 200px;
    font-size: 16px;
    color: rgba(92, 197, 227, 1);
  }
  .backTalent{
    text-align: center;
    background-size: 100% 100%;
    margin-top: 0px;
    width: 100%;
    margin-bottom: 20px;
    height:50px;
  }
  .cellStyle{
    height: 82px;
  }
  .cellStyle  .cell {
    padding: 0px !important;
    font-size: 18px;
    color: #ffffff;
    transform: scale(0.98);
    background-color: transparent !important;
  }

  .headerStyle{
    padding: 0px !important;
    font-size: 18px;
    background-color: transparent !important;
  }
  .headerStyle  .cell{
    padding: 0px !important;
    font-size: 20px;
    line-height: 50px;
    color: #00F6FF;
    transform: scale(0.98);
    background-color: transparent !important;
  }
  .rowStyle{
    background-color: transparent !important;
  }
  .rowStyle :hover{
    background-color: transparent !important;
  }


</style>
