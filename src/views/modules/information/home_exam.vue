<template>
  <div >
  <el-row :gutter="24" class="el-row" type="flex">
    <div style="height: 40px;width: 100%;background-color:RGB(0,60,107)"></div>
  </el-row>
    <el-row :gutter="24" class="el-row" type="flex">
    <el-col :span="4" style="cursor:pointer;">
      <div class="cardEl" @click="cardClick('451692')">
      <el-card class="box-card" style="background-color:rgba(245,248,253,0)">
        <el-row :gutter="24" class="el-row" type="flex">
          <el-col :span="8">
            <p class="homePVD">PVD厂</p>
          </el-col>
          <el-col :span="16">
            <el-row class="paddingS">
              <span class="homespan">参与人数：</span>
              <span class="homevalue">{{dataForm.xxsJion}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">及格人数：</span>
              <span class="homevalue">{{dataForm.xxsJg}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">总人数：</span>
              <span class="homevalue">{{dataForm.xxsAll}}</span>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      </div>
    </el-col>
    <el-col :span="4" style="cursor:pointer;">
      <div class="cardEl" @click="cardClick('243221')">
      <el-card class="box-card" style="background-color:rgba(245,248,253,0)">
        <el-row :gutter="24" class="el-row" type="flex">
          <el-col :span="8">
            <el-row>
               <!--<span class="el-dropdown-link">-->
              <img class="homeimg" src="~@/assets/img/gxw.jpg">
               <!--</span>-->
              </el-row>
            <el-row>
            <p class="homeP">郭祥伟</p>
              </el-row>
          </el-col>
          <el-col :span="16">
            <el-row class="paddingS">
              <span class="homespan">参与人数：</span>
              <span class="homevalue">{{dataForm.gxwJion}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">及格人数：</span>
              <span class="homevalue">{{dataForm.gxwJg}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">总人数：</span>
              <span class="homevalue">{{dataForm.gxwAll}}</span>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      </div>
    </el-col>
    <el-col :span="4" style="cursor:pointer;">
      <div class="cardEl" @click="cardClick('915484')">
      <el-card class="box-card" style="background-color:rgba(245,248,253,0)">
        <el-row :gutter="24" class="el-row" type="flex">
          <el-col :span="8">
            <el-row>
              <!--<span class="el-dropdown-link">-->
              <img class="homeimg" src="~@/assets/img/yp.jpg">
              <!--</span>-->
            </el-row>
            <el-row>
            <p class="homeP">岳平</p>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-row class="paddingS">
              <span class="homespan">参与人数：</span>
              <span class="homevalue">{{dataForm.ypJion}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">及格人数：</span>
              <span class="homevalue">{{dataForm.ypJg}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">总人数：</span>
              <span class="homevalue">{{dataForm.ypAll}}</span>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      </div>
    </el-col>
    <el-col :span="4" style="cursor:pointer;">
      <div class="cardEl" @click="cardClick('308586')">
      <el-card class="box-card" style="background-color:rgba(245,248,253,0)">
        <el-row :gutter="24" class="el-row" type="flex">
          <el-col :span="8">
            <el-row>
              <!--<span class="el-dropdown-link">-->
              <img class="homeimg" src="~@/assets/img/wqj.jpg">
              <!--</span>-->
            </el-row>
            <el-row>
            <p class="homeP">王启军</p>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-row class="paddingS">
              <span class="homespan">参与人数：</span>
              <span class="homevalue">{{dataForm.wqjJion}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">及格人数：</span>
              <span class="homevalue">{{dataForm.wqjJg}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">总人数：</span>
              <span class="homevalue">{{dataForm.wqjAll}}</span>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      </div>
    </el-col>
    <el-col :span="4" style="cursor:pointer;">
      <div class="cardEl" @click="cardClick('943139')">
      <el-card class="box-card" style="background-color:rgba(245,248,253,0)">
        <el-row :gutter="24" class="el-row" type="flex">
          <el-col :span="8">
            <el-row>
              <!--<span class="el-dropdown-link">-->
              <img class="homeimg" src="~@/assets/img/zy.jpg">
              <!--</span>-->
            </el-row>
            <el-row>
            <p class="homeP">周颖</p>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-row class="paddingS">
              <span class="homespan">参与人数：</span>
              <span class="homevalue">{{dataForm.zyJion}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">及格人数：</span>
              <span class="homevalue">{{dataForm.zyJg}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">总人数：</span>
              <span class="homevalue">{{dataForm.zyAll}}</span>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      </div>
    </el-col>
    <el-col :span="4" style="cursor:pointer;">
      <div class="cardEl" @click="cardClick('951976')">
      <el-card class="box-card" style="background-color:rgba(245,248,253,0)">
        <el-row :gutter="24" class="el-row" type="flex">
          <el-col :span="8">
            <el-row>
              <!--<span class="el-dropdown-link">-->
              <img class="homeimg" src="~@/assets/img/dhj.jpg">
              <!--</span>-->
            </el-row>
            <el-row>
            <p class="homeP">邓海军</p>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-row class="paddingS">
              <span class="homespan">参与人数：</span>
              <span class="homevalue">{{dataForm.dhjJion}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">及格人数：</span>
              <span class="homevalue">{{dataForm.dhjJg}}</span>
            </el-row>
            <el-row class="paddingS">
              <span class="homespan">总人数：</span>
              <span class="homevalue">{{dataForm.dhjAll}}</span>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      </div>
    </el-col>
  </el-row>
    <el-row :gutter="24" class="el-row" type="flex">
      <el-col :span="12">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
        <div id="echart1" style="height: 35vh"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div style="height: 35vh">
            <span @click="export2Exce()" style="cursor:pointer;"><p class="ptitle">未考试人员名单(点击导出)</p></span>
            <el-table
              :data="dataList"
              border
              :row-style="tableRowStyle"
              :header-cell-style="tableHeaderColor"
              v-loading="dataListLoading"
              style="width: 100%;">
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
            </el-table>
            <el-pagination
              @size-change="sizeChangeHandle"
              @current-change="currentChangeHandle"
              :current-page="pageIndex"
              :page-sizes="[5]"
              :page-size="pageSize"
              :total="totalPage"
              layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="el-row" type="flex">
      <el-col :span="24">
        <el-card class="box-card" style="background-color:rgba(245,248,253,1)">
          <div id="echart2" style="height: 30vh"></div>
        </el-card>
      </el-col>
    </el-row>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
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
          keytwo: '',
          key: '',
          jobNo: '451692'
        },
        exportList: [],
        nearDatalistJ: [],
        nearDatalistC: [],
        hisDatalistJ: [],
        hisDatalistC: [],
        nameList: [],
        dateListTime: [],
        fileUploadBtnText: '导入数据',
        dataList: [],
        pageIndex: 1,
        pageSize: 5,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        myChart: '',
        myChart1: ''
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
         this.myChart1 = this.$echarts.init(document.getElementById('echart2'))
        // 绘制图表
        this.myChart.setOption({

          title: {
            text: '近期考试数据'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />'
          },
          color: ['RGB(90,177,239)', 'RGB(46,199,201)'],
          legend: {
            data: ['及格率', '参与率']
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
            data: this.nameList
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
              name: '及格率',
              type: 'line',
              data: this.nearDatalistJ,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  }
                }
              }
            },
            {
              name: '参与率',
              type: 'line',
              data: this.nearDatalistC,
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 3
                  }
                }
              }
            }
          ]
        })
        this.myChart1.setOption({
            title: {
              text: '历史考核数据'
            },
            tooltip: {
              trigger: 'axis',
              formatter: '{b0}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />'
            },
          color: ['RGB(90,177,239)', 'RGB(46,199,201)'],
            legend: {
              data: ['及格率', '参与率']
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
              data: this.dateListTime
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
                name: '及格率',
                type: 'line',
                data: this.hisDatalistJ,
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 3
                    }
                  }
                }
              },
              {
                name: '参与率',
                type: 'line',
                data: this.hisDatalistC,
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 3
                    }
                  }
                }
              }
            ]
      })
      },
      // 获取数据列表
      getDataList (type) {
        if (type == '1') {
          this.pageIndex = 1
            this.pageSize = 5
            this.totalPage = 0
        }
        this.nameList = []
        this.nearDatalistC = []
        this.nearDatalistJ = []
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ansower/examDataByDirector'),
          method: 'post',
          params: this.$http.adornParams({
            'jobNo': this.dataForm.jobNo
          })
        }).then(({data}) => {
          console.log('===============')
          console.log(data)
          if (data && data.code === 0) {
            for (var i = 0; i < data.list.length; i++) {
              if(this.dataForm.jobNo == '451692'){
              if (data.list[i].name == 'PVD厂') {
                this.dataForm.xxsAll = data.list[i].total
                this.dataForm.xxsJion = data.list[i].examCount
                this.dataForm.xxsJg = data.list[i].qualified
                  this.nameList.push(data.list[i].name)
                this.nearDatalistC.push(data.list[i].examRate)
                this.nearDatalistJ.push(data.list[i].qualifRate)
              }
              if (data.list[i].name == '郭祥伟') {
                this.dataForm.gxwAll = data.list[i].total
                this.dataForm.gxwJion = data.list[i].examCount
                this.dataForm.gxwJg = data.list[i].qualified
                this.nameList.push(data.list[i].name)
                this.nearDatalistC.push(data.list[i].examRate)
                this.nearDatalistJ.push(data.list[i].qualifRate)
              }
              if (data.list[i].name == '王启军') {
                this.dataForm.wqjAll = data.list[i].total
                this.dataForm.wqjJion = data.list[i].examCount
                this.dataForm.wqjJg = data.list[i].qualified
                this.nameList.push(data.list[i].name)
                this.nearDatalistC.push(data.list[i].examRate)
                this.nearDatalistJ.push(data.list[i].qualifRate)
              }
              if (data.list[i].name == '岳平') {
                this.dataForm.ypAll = data.list[i].total
                this.dataForm.ypJion = data.list[i].examCount
                this.dataForm.ypJg = data.list[i].qualified
                this.nameList.push(data.list[i].name)
                this.nearDatalistC.push(data.list[i].examRate)
                this.nearDatalistJ.push(data.list[i].qualifRate)
              }
              if (data.list[i].name == '邓海军') {
                this.dataForm.dhjAll = data.list[i].total
                this.dataForm.dhjJion = data.list[i].examCount
                this.dataForm.dhjJg = data.list[i].qualified
                this.nameList.push(data.list[i].name)
                this.nearDatalistC.push(data.list[i].examRate)
                this.nearDatalistJ.push(data.list[i].qualifRate)
              }
              if (data.list[i].name == '周颖') {
                this.dataForm.zyAll = data.list[i].total
                this.dataForm.zyJion = data.list[i].examCount
                this.dataForm.zyJg = data.list[i].qualified
                this.nameList.push(data.list[i].name)
                this.nearDatalistC.push(data.list[i].examRate)
                this.nearDatalistJ.push(data.list[i].qualifRate)
              }
              } else {
                this.nameList.push(data.list[i].name)
                this.nearDatalistC.push(data.list[i].examRate)
                this.nearDatalistJ.push(data.list[i].qualifRate)
              }
            }
            console.log('sj====' + this.nearDatalistC)
          let options = {
            xAxis: {
              data: this.nameList
            },
            series: [
              {
                name: '及格率',
                type: 'line',
                data: this.nearDatalistJ,
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 3
                    }
                  }
                }
              },
              {
                name: '参与率',
                type: 'line',
                data: this.nearDatalistC,
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 3
                    }
                  }
                }
              }
            ]
          }
          this.myChart.setOption(options)
          } else {
            // this.dataList = []
            // this.totalPage = 0
          }
          this.dataListLoading = false
        })
        this.$http({
          url: this.$http.adornUrl('/unexam/searchListByDirector'),
          method: 'post',
          params: this.$http.adornParams({
            'jobNo': this.dataForm.jobNo,
            'page': this.pageIndex,
            'rows': this.pageSize
          })
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 0) {
            this.dataList = data.data.list
          this.totalPage = data.data.total
        } else {
        }
      })
        this.$http({
          url: this.$http.adornUrl('/ansower/hisDataByDirector'),
          method: 'post',
          params: this.$http.adornParams({
            'jobNo': this.dataForm.jobNo
          })
        }).then(({data}) => {
          console.log(data)
        if (data && data.code === 0) {
          this.dateListTime = data.data.time
          this.hisDatalistC = data.data.examRate
          this.hisDatalistJ = data.data.qualifRate
          let options1 = {
            xAxis: {
              data: this.dateListTime
            },
            series: [
              {
                name: '及格率',
                type: 'line',
                data: this.hisDatalistJ,
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 3
                    }
                  }
                }
              },
              {
                name: '参与率',
                type: 'line',
                data: this.hisDatalistC,
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 3
                    }
                  }
                }
              }
            ]
          }
          this.myChart1.setOption(options1)
        } else {
        }
      })
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
