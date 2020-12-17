<template>
  <div :style="backgroundDiv">
    <div style="width: 100%;height: 60px;background-color: #00a2d4;text-align: center;" >
       <span  class=" title">
            仓库管理数据展示
        </span>
      <div class=" title2">
        (负责人：姚江)
      </div>
    </div>
    <el-row :gutter="24"  class="el-row" type="flex" style="background-color:rgba(51,94,193,0.4)">
      <el-col :span="7">
        <el-card class="box-card" style="min-height: 200px;background-color:rgba(51,94,193,0)" align="middle"  >
          <!--<div   class="el-card__body mid">-->
          <div tyle="min-height: 200px;" id="myChart1"></div>
          <!--</div>-->
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card dasDiv" style="min-height: 200px;background-color:rgba(51,94,193,0)" align="middle" >
          <div class=" title1">
            安全库存警报
          </div>
          <el-table :header-cell-style="getRowClass"
                    :data="dataList"
                    border
                    cell-style="font-weight: 900;color: #FFFFFF"
                    style="width: 100%;">
            <!--<el-table-column-->
            <!--prop="goodsId"-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--label="商品ID">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="goodsName"
              header-align="center"
              align="center"
              label="物品名">
            </el-table-column>
            <el-table-column
              prop="storename"
              header-align="center"
              align="center"
              label="所属仓库">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="number"-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--label="预购数量">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="stata"
              header-align="center"
              align="center"
              label="当前状态">
              <template slot-scope="scope">
                <div v-if="scope.row.stata=='0'" style="background-color: red">未处理</div>
                <div v-if="scope.row.stata=='1'" style="background-color: #ffb209">处理中</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sTime"
              header-align="center"
              align="center"
              label="预警开始时间">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="time"-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--label="预计入库时间">-->
            <!--</el-table-column>-->
          </el-table>
          <h2 v-if="isOk1" class="not-found-title">OK</h2>
          <!--<div class="el-card__body mid">-->
          <!--<el-button  icon="el-icon-circle-plus" circle></el-button>-->
          <!--<el-button style="margin-left: 0;color: #505458" type="text">添加APP</el-button>-->
          <!--</div>-->
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card" style="min-height: 200px;background-color:rgba(51,94,193,0)" align="middle" >
          <!--<div   class="el-card__body mid">-->
          <div tyle="min-height: 200px;" id="myChart2"></div>
          <!--</div>-->
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card" style="min-height: 200px;background-color:rgba(51,94,193,0)" align="middle" >
          <!--<div   class="el-card__body mid">-->
          <div tyle="min-height: 200px;" id="myChart3"></div>
          <!--</div>-->
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card dasDiv" style="min-height: 200px;background-color:rgba(51,94,193,0)" align="middle" >
          <div class=" title1">
            各段化学品建浴预警状况
          </div>
          <el-table :header-cell-style="getRowClass"
                    :data="dataList1"
                    border
                    cell-style="font-weight: 900;color: #FFFFFF"
                    style="width: 100%;">
            <!--<el-table-column-->
            <!--prop="goodsId"-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--label="商品ID">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="processName"
              header-align="center"
              align="center"
              label="制程">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              header-align="center"
              align="center"
              label="化学品">
            </el-table-column>
            <el-table-column
              prop="stata"
              header-align="center"
              align="center"
              label="当前状态">
              <template slot-scope="scope">
                <div v-if="scope.row.stata=='0'" style="background-color: red">未处理</div>
                <div v-if="scope.row.stata=='1'" style="background-color: #ffb209">处理中</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="nextTime"
              header-align="center"
              align="center"
              label="预计下次建浴时间">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="time"-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--label="预警开始时间">-->
            <!--</el-table-column>-->
          </el-table>
          <h2 v-if="isOk2" class="not-found-title">OK</h2>
          <!--<div class="el-card__body mid">-->
          <!---->
          <!--</div>-->
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card" style="min-height: 200px;background-color:rgba(51,94,193,0)" align="middle" >
          <!--<div   class="el-card__body mid">-->
          <div tyle="min-height: 200px;" id="myChart4"></div>
          <!--</div>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import moment from "moment"
  export default {
    inject: ['refresh'],
    data () {
      return {
        timer: null,  // 定时器
        isFullscreen: false,
        backgroundDiv: {
          backgroundImage: 'url(' + require('../../../../assets/img/46.jpg') + ')'
        },
        isOk1: true,
        isOk2: true,
        autoHeight: '',
        keyTime1: '',
        keyTime3: '',
        storages: [73489, 89034, 104970, 131744, 90230], //库存量
        stores: ['仓库1', '仓库2', '仓库3', '仓库4', '仓库5'],
        manage1: [],
        manage1_val: [],
        manage2: [],
        manage2_val: [],
        manage3: [],
        manage3_val: [],
        manage4: ['420', '硫酸', '纯水树脂', '无水乙醇', '钝化剂'],
        manage4_val: [700, 1205, 1900, 3320, 6720],
        numgeg: [],
        // manage2: ['王梅', '李洪', '代彦明', '俞长勇', '甘茂林', '齐传信', '陈文章', '陈伟峰'],
        // manage2_val: [73489, 12501, 32102, 65212, 65123],
        dataList: [],
        dataListall: [
          // {value: 23489, name: '物品1', selected: true},
          // {goodsId: 1, name: '得力剪刀', type: '未处理', time: '2020年4月28', store: 'A5耗材仓'},
          // {goodsId: 2, name: '保护膜', type: '未处理', time: '2020年4月28', store: 'E3耗材仓'},
          // {goodsId: 3, name: '纯水树脂', type: '未处理', time: '2020年4月27', store: 'D4化学品仓'},
          // {goodsId: 4, name: '钝化剂', type: '处理中', time: '2020年4月27', store: 'E3化学品仓'},
          // {goodsId: 5, name: '报废纸箱', type: '未处理', time: '2020年4月28', store: 'A5耗材仓'},
          // {goodsId: 6, name: 'PK纸', type: '处理中', time: '2020年4月28', store: 'E3耗材仓'},
          // {goodsId: 7, name: '医用橡胶手套', type: '处理中', time: '2020年4月28', store: 'A5耗材仓'},
          // {goodsId: 8, name: '夹具软托盘', type: '未处理', time: '2020年4月29', store: 'E3耗材仓'},
          // {goodsId: 9, name: '串杆', type: '处理中', time: '2020年4月28', store: 'A5耗材仓'},
          // {goodsId: 10, name: 'ML38', type: '处理中', time: '2020年4月28', store: 'E3耗材仓'}
        ], // 物品
        dataList1: [],
        myChart1: '',
        myChart2: '',
        myChart3: '',
        myChart4: '',
        dataListall1: [
          // {value: 23489, name: '物品1', selected: true},
          // {goodsId: 1, name: '1011', type: '处理中', time_out: '2020年4月30', time: '2020年4月29', store: 'A5耗材仓', process: 'B1T处理'},
          // {goodsId: 2, name: '无水乙醇', type: '未处理', time_out: '2020年4月29', time: '2020年4月28', store: 'E3耗材仓', process: 'E3清洗'},
          // {goodsId: 3, name: '420', type: '处理中', time_out: '2020年4月30', time: '2020年4月29', store: 'D4化学品仓', process: 'D4T处理'},
          // {goodsId: 4, name: '硫酸', type: '处理中', time_out: '2020年4月30', time: '2020年4月29', store: 'E3化学品仓', process: 'E3清洗'},
          // {goodsId: 5, name: '硝酸', type: '未处理', time_out: '2020年4月29', time: '2020年4月28', store: 'A5耗材仓', process: 'D4退镀'}
        ] // 物品
      }
    },
    mounted () {
      // const that = this
      // window.onresize = () => {
      //   return (() => {
      //     window.screenHeight = document.body.clientHeight
      //   that.screenHeight = window.screenHeight
      // })()
      // }
      this.drawLine()
    },
    // 每600秒刷新一次
    created () {
      let _this = this
      _this.play()
      _this.play1()
      _this.timer = setInterval(() =>{
        _this.refresh()
      // _this.reload();
    },1000* 600)
    },
    // 可以判断如果定时器还在运行就关闭 或者直接关闭
    destroyed () {
      clearInterval(this.timer)
    },
    methods: {
      getRowClass({ row, column, rowIndex, columnIndex }) {
        return "background:#3f5c6d2c;";
      },
      change () {
        this.dataListall.push(this.dataListall[0]);//把第一条数据插入数组最后一条
        this.dataListall.shift() //删除数组中第一条数据
        this.dataList = []
        this.dataList.push(this.dataListall[0])
        this.dataList.push(this.dataListall[1])
        this.dataList.push(this.dataListall[2])
        this.dataList.push(this.dataListall[3])
        this.dataList.push(this.dataListall[4])
        // this.dataList.push(this.dataListall[5])
        // this.dataList.push(this.dataListall[6])
        // this.dataList = this.dataListall
      },
      change1 () {
        this.dataListall1.push(this.dataListall1[0]);//把第一条数据插入数组最有一条
        this.dataListall1.shift() //删除数组中第一条数据1
        this.dataList1 = []
        this.dataList1.push(this.dataListall1[0])
        this.dataList1.push(this.dataListall1[1])
        this.dataList1.push(this.dataListall1[2])
        this.dataList1.push(this.dataListall1[3])
        this.dataList1.push(this.dataListall1[4])
        // this.dataList.push(this.dataListall[5])
        // this.dataList.push(this.dataListall[6])
        // this.dataList = this.dataListall
      },
      play () {
        if (this.dataListall.length < 6) {
          this.dataList = this.dataListall
        } else {
          this.dataList = []
          this.dataList.push(this.dataListall[0])
          this.dataList.push(this.dataListall[1])
          this.dataList.push(this.dataListall[2])
          this.dataList.push(this.dataListall[3])
          this.dataList.push(this.dataListall[4])
          // this.dataList.push(this.dataListall[5])
          // this.dataList.push(this.dataListall[6])
          setInterval(this.change, 800);//每两秒执行一次插入删除操作
        }
      },
      play1 () {
        if (this.dataListall1.length < 6) {
          this.dataList1 = this.dataListall1
        } else {
          this.dataList1 = []
          this.dataList1.push(this.dataListall1[0])
          this.dataList1.push(this.dataListall1[1])
          this.dataList1.push(this.dataListall1[2])
          this.dataList1.push(this.dataListall1[3])
          this.dataList1.push(this.dataListall1[4])
          // this.dataList.push(this.dataListall[5])
          // this.dataList.push(this.dataListall[6])
          setInterval(this.change1, 800);//每两秒执行一次插入删除操作
        }
      },
      getTopFiveList () {
        // console.log(this.manage3_val)
        this.manage3 = []
        this.manage3_val = []
        this.manage4 = []
        this.manage4_val = []
        this.$http({
          url: this.$http.adornUrl('/goodsFiles/inorout/TopFivelist'),
          method: 'get',
          params: this.$http.adornParams({
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          for (var i = 0; i < data.materialTopFive.length; i++) {
            this.manage3.push(data.materialTopFive[i].goodsName + '(' + data.materialTopFive[i].manufacturer + ')')
            this.manage3_val.push(Number(data.materialTopFive[i].tatol))
          }
          for (var i = 0; i < data.chemicalsTopFive.length; i++) {
            this.manage4.push(data.chemicalsTopFive[i].goodsName + '(' + data.chemicalsTopFive[i].manufacturer + ')')
            this.manage4_val.push(data.chemicalsTopFive[i].tatol)
          }
          var option3 = {
            series: [ {
              data: this.manage3_val
            } ],
            yAxis: [{
              data: this.manage3
            }]
          }
          var option4 = {
            series: [ {
              data: this.manage4_val
            } ],
            yAxis: [{
              data: this.manage4
            }]
          };
          this.myChart3.setOption(option3)
          this.myChart4.setOption(option4)
        }
      })
        //   this.manage3_val.push(23)
        //   this.manage3_val.push(23)
        //   this.manage3_val.push(23)
      },
      getList () {
        this.isOk1 = true
        this.isOk2 = true
        this.dataListall = []
        this.$http({
          url: this.$http.adornUrl('/warning/msg/home_list'),
          method: 'get',
          params: this.$http.adornParams({
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          for (var i = 0; i< data.list.length; i++) {
            if (data.list[i].type == '1' || data.list[i].type == '2') {
              this.dataListall.push(data.list[i])
            } else {
              this.dataListall1.push(data.list[i])
            }
          }
          if (this.dataListall.length > 0) {
            this.isOk1 = false
          }
          if (this.dataListall1.length > 0) {
            this.isOk2 = false
          }
          this.play()
          this.play1()
        }
      })
        this.keyTime1 = [moment(moment().add(-7, 'days').valueOf()).format('YYYY-MM-DD 00:00:00'), moment(moment().valueOf()).format('YYYY-MM-DD 00:00:00')]
          this.$http({
            url: this.$http.adornUrl('/store/store/costData'),
            method: 'get',
            params: this.$http.adornParams({
              'keytime': this.keyTime1 + ''
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.manage1 = data.costData.name
              this.manage1_val = data.costData.cost
              var option = {
                series: [ {
                  data: data.costData.cost
                } ],
                yAxis: [{
                  data: data.costData.name
                }]
              }
              this.myChart1.setOption(option);
          }
        })
            this.keyTime3 = [moment(moment().add(-30, 'days').valueOf()).format('YYYY-MM-DD 00:00:00'), moment(moment().valueOf()).format('YYYY-MM-DD 00:00:00')]
            this.$http({
              url: this.$http.adornUrl('/store/store/costArt'),
              method: 'get',
              params: this.$http.adornParams({
                'keytime': this.keyTime3 + '',
                'store_type': 1
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.manage3 = data.costArt.name
                this.manage3_val = data.costArt.cost
                var option = {
                  series: [ {
                    data: data.costArt.cost
                  } ],
                  yAxis: [{
                    data: data.costArt.name
                  }]
                }
                this.myChart3.setOption(option);
            }
          })
          this.$http({
            url: this.$http.adornUrl('/store/store/costDay'),
            method: 'get',
            params: this.$http.adornParams({})
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.manage2 = data.costDay.name
            this.manage2_val = data.costDay.cost
            var option = {
              series: [ {
                data: data.costDay.cost
              } ],
              yAxis: [{
                data: data.costDay.name
              }]
            }
            this.myChart2.setOption(option);
          }
        })
        this.$http({
          url: this.$http.adornUrl('/store/store/costArt'),
          method: 'get',
          params: this.$http.adornParams({
            'keytime': this.keyTime3 + '',
            'store_type': 2
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.manage4 = data.costArt.name
            this.manage4_val = data.costArt.cost
            var option = {
              series: [ {
                data: data.costArt.cost
              } ],
              yAxis: [{
                data: data.costArt.name
              }]
            }
            this.myChart4.setOption(option);
        }
      })
      },
      drawLine () {
        this.getList()
        // 基于准备好的dom，初始化echarts实例
        this.myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        this.autoHeight = this.storages.length * 60 + 50 // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        this.myChart1.resize({height: this.autoHeight})
        // 绘制图表
        this.myChart1.setOption({
          color: ['#43AAB3'],
          title: {
            text: '近7天费用状况',
            // color: '#4b67c2',
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#FFFFFF'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          toolbox: {
            show: true,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              dataView: {readOnly: false},
              magicType: {type: ['bar']},
              saveAsImage: {}
            }
          },
          legend: {
            show: false,
            data: ['2011年']
          },
          grid: {
            top: '10%',
            left: '0%',
            right: '12%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            name: '￥',
            type: 'value',
            boundaryGap: [0, 0.1],
            splitLine: {show: false},
            axisLabel: {
              interval: 0,//0：全部显示，1：间隔为1显示对应类目，2：依次类推，（简单试一下就明白了，这样说是不是有点抽象）
              rotate: -90//倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
              // formatter: '{value} 元'
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }}
          },
          yAxis: {
            type: 'category',
            data: this.manage1,
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }}
          },
          series: [
            {
              // name: '2011年',
              type: 'bar',
              data: this.manage1_val,
              barWidth: 16,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                      color: '#FFFFFF',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
        this.myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        this.autoHeight = this.storages.length * 60 + 50 // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        this.myChart2.resize({height: this.autoHeight})
        // 绘制图表
        this.myChart2.setOption({
          color: ['#43AAB3'],
          title: {
            text: '储存时长前十',
            // color: '#4b67c2',
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#FFFFFF'
            }
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {readOnly: false},
              magicType: {type: ['bar']},
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: false,
            data: ['2011年']
          },
          grid: {
            top: '10%',
            left: '0%',
            right: '12%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            name: '天',
            type: 'value',
            boundaryGap: [0, 0.1],
            splitLine: {show: false},
            axisLabel: {
              interval: 0,//0：全部显示，1：间隔为1显示对应类目，2：依次类推，（简单试一下就明白了，这样说是不是有点抽象）
              rotate: -90//倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
              // formatter: '{value} 元'
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }}
          },
          yAxis: {
            type: 'category',
            data: this.manage2,
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }}
          },
          series: [
            {
              // name: '2011年',
              type: 'bar',
              data: this.manage2_val,
              barWidth: 20,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                      color: '#FFFFFF',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
        this.myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        this.autoHeight = this.storages.length * 60 + 50 // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        this.myChart3.resize({height: this.autoHeight})
        // 绘制图表
        this.myChart3.setOption({
          color: ['#43AAB3'],
          title: {
            text: '近30天耗材费用前十',
            // color: '#4b67c2',
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#FFFFFF'
            }
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {readOnly: false},
              magicType: {type: ['bar']},
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: false,
            data: ['2011年']
          },
          grid: {
            top: '10%',
            left: '0%',
            right: '12%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            name: '￥',
            type: 'value',
            boundaryGap: [0, 0.1],
            splitLine: {show: false},
            axisLabel: {
              interval: 0, // 0：全部显示，1：间隔为1显示对应类目，2：依次类推，（简单试一下就明白了，这样说是不是有点抽象）
              rotate: -90// 倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
              // formatter: '{value} 元'
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }}
          },
          yAxis: {
            type: 'category',
            data: this.manage3,
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisLabel: {
              formatter: function (value) {
                value = value.toString()
                var maxlength = 10
                if (value.length > maxlength) {
                  return value.substring(0, maxlength - 1) + '...'
                } else {
                  return value
                }
              }
            }
          },
          series: [
            {
              // name: '2011年',
              type: 'bar',
              data: this.manage3_val,
              barWidth: 20,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                      color: '#FFFFFF',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
        this.myChart4 = this.$echarts.init(document.getElementById('myChart4'))
        this.autoHeight = this.storages.length * 60 + 50 // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        this.myChart4.resize({height: this.autoHeight})
        // 绘制图表
        this.myChart4.setOption({
          color: ['#43AAB3'],
          title: {
            text: '当月化学品费用前十',
            // color: '#4b67c2',
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              color: '#FFFFFF'
            }
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {readOnly: false},
              magicType: {type: ['bar']},
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: false,
            data: ['2011年']
          },
          grid: {
            top: '10%',
            left: '0%',
            right: '12%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            name: '￥',
            type: 'value',
            boundaryGap: [0, 0.1],
            splitLine: {show: false},
            axisLabel: {
              interval: 2, //0：全部显示，1：间隔为1显示对应类目，2：依次类推，（简单试一下就明白了，这样说是不是有点抽象）
              rotate: -90 //倾斜显示，-：顺时针旋转，+或不写：逆时针旋转
              // formatter: '{value} 元'
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }}
          },
          yAxis: {
            type: 'category',
            data: this.manage4,
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }},
            axisLabel: {
              formatter: function (value) {
                value = value.toString()
                var maxlength = 10
                if (value.length > maxlength) {
                  return value.substring(0, maxlength - 1) + '...'
                } else {
                  return value
                }
              }
            }
          },
          series: [
            {
              // name: '2011年',
              type: 'bar',
              data: this.manage4_val,
              barWidth: 20,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                      color: '#FFFFFF',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
        this.getTopFiveList()
      }
    }
  }
</script>


<style type="text/css">
  .all{
    margin-top: -30px;
    word-break: break-all;
    height: 100%;
  }
  .mid{
    margin-top: 2%;
    height: 50%;
  }
  .mid_item{
    justify-content: center;
    align-items: center;
  }
  .item {
    margin-bottom: 10px;
  }
  .item_tag{
    float:left;
    text-align:left;
  }
  .item_desr{
    margin-left: 0%;
    min-height: 10px;
    text-align:left;
  }
  .text {
    width: 100%;
    font-size: 12px;
    font-family: "Microsoft YaHei";
    color: #909399;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .el-card {
    min-width: 100%;
    height: 100%;
    margin-right: 20px;
    /*transition: all .5s;*/
  }
  /*鼠标移入效果*/
  /*.el-card:hover{*/
  /*margin-top: -5px;*/
  /*}*/
  .el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }
  .el-col {
    border-radius: 4px;
    align-items: stretch;
    margin-bottom: 40px;
  }
  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }

  el-table th, .el-table tr {
    background-color: transparent;
  }
  .dasDiv{

  }
  .dasDiv .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #1bc227 !important;
  }
  .title {
    font-size: 30px;
    font-weight: bold;
    color: #FFFFFF;
  }
  .title1 {
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    text-shadow:5px 1px 6px #F93;
  }
  .title2 {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .not-found-title {
    margin: 20px 0 15px;
    font-size: 10em;
    font-weight: 400;
    color: rgb(34,139,34);
  }
</style>


