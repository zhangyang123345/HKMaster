<template>
  <div class="dwrapper" id = 'fullArea'>
    <div class="dcontainer">
      <div class="dashboard-bg-image"></div>
      <div style="height:100%;" :style="marginStyle">
        <el-row  :gutter = '20' class='chead'>
          <el-col span="24">
            <div class="backTalent">
              <h1 style="line-height: 40px;color:white;font-size: 3em">Exceptions Billboard</h1>
            </div>
          </el-col>
        </el-row>
        <div class="d-chart-item">
          <el-row>
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
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="chart-item" style="margin-top: 5px">
                <div class="arrow-top-left">
                </div>
                <div class="arrow-top-right">
                </div>
                <div class="div-block2">

                  <el-form :inline="true" :model="searchForm" :rules="searchFormRule" ref="searchForm" label-width="100px">
                    <el-row>
                      <div style="height: 50px"></div>
                    </el-row>
                    <el-row>


                    <el-form-item label="异常类型" prop="exception_type" autocomplete="off">
                      <el-input></el-input>
                    </el-form-item>
                    </el-row>
                    <el-row>


                      <el-form-item label="异常类型" prop="exception_type" autocomplete="off">
                        <el-input></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>


                      <el-form-item label="异常类型" prop="exception_type" autocomplete="off">
                        <el-input></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>


                      <el-form-item label="异常类型" prop="exception_type" autocomplete="off">
                        <el-input></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>


                      <el-form-item label="异常类型" prop="exception_type" autocomplete="off">
                        <el-input></el-input>
                      </el-form-item>
                    </el-row>
                  </el-form>

                </div>
              </div>
            </el-col>

            <el-col :span="16">
              <div style="margin-left: 4px">
                <div class="chart-item" style="margin-top: 5px">
                  <div class="arrow-top-left">
                  </div>
                  <div class="arrow-top-right">
                  </div>
                  <div class="div-block2">
                    <el-table
                      :data="dataListShow"
                      border
                      v-loading="dataListLoading"
                      cell-class-name="cellStyle"
                      header-cell-class-name="headerStyle"
                      header-row-class-name="rowStyle"
                      row-class-name="rowStyle"
                      :cell-style="tableCell"
                      style="width: 100%;height:65vh;font-size:15px;line-height: 58px;background-color: transparent !important;margin-top: 1px;margin-left: 2px;">
                      <el-table-column
                        prop="exception_type2"
                        header-align="center"
                        align="center"
                        width="100"
                        label="大类">
                      </el-table-column>
                      <el-table-column
                        prop="exception_type"
                        header-align="center"
                        align="center"
                        label="异常类型"
                        width="180">
                        <template slot-scope="scope">
                          <div v-if="scope.row.exception_type==1">异常情况</div>
                          <div v-if="scope.row.exception_type==2">内部稽核</div>
                          <div v-if="scope.row.exception_type==3">外部稽核</div>
                          <div v-if="scope.row.exception_type==4">工伤事件</div>
                          <div v-if="scope.row.exception_type==5">外部稽核</div>
                          <div v-if="scope.row.exception_type==6">Trace异常</div>
                          <div v-if="scope.row.exception_type==7">违纪</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="building"
                        header-align="center"
                        align="center"
                        label="楼栋"
                        width="100">
                        <template slot-scope="scope">
                          <div v-if="scope.row.building==1">E3-1F</div>
                          <div v-if="scope.row.building==2">E3-2F</div>
                          <div v-if="scope.row.building==3">D4-1F</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="exception_describe"
                        header-align="center"
                        align="center"
                        label="异常描述"
                        width="450">
                      </el-table-column>
                      <el-table-column
                        prop="happen_date"
                        header-align="center"
                        align="center"
                        label="发生时间"
                        width="165">
                      </el-table-column>
                      <el-table-column
                        prop="dri"
                        header-align="center"
                        align="center"
                        label="DRI"
                        width="120">
                      </el-table-column>


                    </el-table>

                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getComputedStyle} from '../../utils'
  export default {
    name: 'ExceptionDashBoard',
    data () {
      return {
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
          ehs: [],
          ehsCount: []
        },
        dataListLoading: false,
        dataList: [
          {exception_type: 1},
          {exception_type: 1},
          {exception_type: 1},
          {exception_type: 1},
          {exception_type: 1},
          {exception_type: 1},
          {exception_type: 2}
        ]
      }
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
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl(`/exceptionsRecord/searchException`),
          method: 'get',
          params: this.$http.adornParams({
            'exception_time': '',
            'exception_type': '',
            'audit_status': '1',
            'dri': '',
            'rows': null,
            'page': null
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataListShow = data.exceptionsRecord.list
            this.totalPage = data.exceptionsRecord.total
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
            'exception_type2': val
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (val === 1) {
              this.report.quality = data.data.dri.split(',')
              this.report.qualityCount = data.data.count1.split(',')
              this.eChartQuality.setOption({
                xAxis: {data: this.report.quality},
                series: [{data: this.report.qualityCount}]
              })
            } else if (val === 2) {
              this.report.trace = data.data.dri.split(',')
              this.report.traceCount = data.data.count1.split(',')
              this.eChartTrace.setOption({
                  xAxis: {data: this.report.trace},
                  series: [{data: this.report.traceCount}]
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
            'exception_type2': val
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
        window.addEventListener('resize', this.initScale, true)
        this.listenResize()
      },
      drawLine () {
        this.eChartQuality = this.$echarts.init(document.getElementById('eChartQuality'))
        this.eChartEHS = this.$echarts.init(document.getElementById('eChartEHS'))
        this.eChartTrace = this.$echarts.init(document.getElementById('eChartTrace'))
        this.eChartQuality.setOption({
          title: {
            text: '品质',
            left: 'center'
          },
          xAxis: {
          type: 'category',
            data: this.report.quality
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.report.qualityCount,
            type: 'bar'
          }]
        })
        this.eChartEHS.setOption({
            title: {
              show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
              text: 'EHS', //主标题文本，'\n'指定换行
              x: '14px',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
              y: '5px' //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>  {c}'
            },
            color: ['#029ffc', '#29dfec', '#fa6676', '#4339f1', '#a680fa', '#D6D22E', '#ffb60f'],
            legend: {
              icon: 'circle',
              show: true,
              x: 'center',
              y: '14%',
              textStyle: { //图例文字的样式
                color: '#a0e9f3',
                fontSize: 16
              },
              data: this.report.ehs
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['0%', '65%'],
                center: ['50%', '65%', '50%', '50%'],
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
        this.eChartTrace.setOption({
          title: {
            text: 'Trace',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: this.report.trace
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.report.traceCount,
            type: 'bar'
          }]
        })
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
    height: 37vh;
  }
  #eChartQuality {
    width:100%;
    height: 37vh;
  }
  #eChartTrace{
    width:100%;
    height: 37vh;
  }
  .div-block {
    height:36vh;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgba(5, 44, 127, 1);
    /*box-shadow: 2px -2px 8px 0px rgba(10, 47, 128, 1);*/
  }
  .div-block2{
    height:65vh;
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
    padding: 0px !important;
  }
  .cellStyle  .cell {
    padding: 0px !important;
    line-height: 108px;
    width: 100%;
    color: #ffffff;
    transform: scale(0.97)
  }

  .headerStyle{
    padding: 0px !important;
    font-size: 15px;
    background-color: transparent !important;
  }
  .headerStyle  .cell{
    padding: 0px !important;
    font-size: 15px;
    line-height: 38px;
    color: #ffffff;
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
