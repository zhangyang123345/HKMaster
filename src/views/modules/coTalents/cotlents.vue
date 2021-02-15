<template >
  <div class="cot-container">
    <el-row  :gutter = '20' class='chead'>
      <el-col span="24">
        <div class="backTalent">
          <h1 style="line-height: 90px;color:white;font-size: 2.2em">工程人才库</h1>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter = '20' class='cbody'>
      <el-col span="6">
         <el-row>
            <el-col span="12">
              <div class="cBox cBox1">
                  <div class="inerBox">计划人数</div>
                  <div class="inerBox2">{{this.dataFormMan.dataBox4}}</div>
              </div>
            </el-col>
            <el-col span="12">
              <div class="cBox cBox2">
                  <div class="inerBox">已完成</div>
                  <div class="inerBox2">{{this.dataFormMan.dataBox5}}</div>
              </div>
            </el-col>
         </el-row>
         <el-row>
            <el-col span="12">
              <div class="cBox cBox3">
                  <div class="inerBox">待完成</div>
                  <div class="inerBox2">{{this.dataFormMan.dataBox6}}</div>
              </div>
            </el-col>
            <el-col span="12">
              <div class="cBox cBox4">
                  <div class="inerBox">完成率</div>
                  <div class="inerBox2">{{this.dataFormMan.dataBox7}}</div>
              </div>
            </el-col>
         </el-row>
         <el-row>
            <el-col span="6">
              <div class="aBox aBox1">
                <div class="inerAox">总人力</div>
                <div class="inerAox2">{{this.dataFormMan.dataBox4}}</div>
              </div>
            </el-col>
            <el-col span="6">
              <div class="aBox aBox2">
                <div class="inerAox">应到</div>
                <div class="inerAox2">{{this.dataFormMan.dataBox1}}</div>
              </div>
            </el-col>
            <el-col span="6">
              <div class="aBox aBox3">
                <div class="inerAox">实到</div>
                <div class="inerAox2">{{this.dataFormMan.dataBox2}}</div>
              </div>
            </el-col>
            <el-col span="6">
              <div class="aBox aBox4">
                <div class="inerAox">出勤率</div>
                <div class="inerAox2">{{this.dataFormMan.dataBox3}}</div>
              </div>
            </el-col>
         </el-row>
         <el-row>
           <div class="ctBox">
             <el-form >
               <el-row>
                 <el-col span="12">
                   <el-form-item >
                     <el-select v-model="cacheData.department" placeholder="部门" @change="getDataList">
                       <el-option v-for="(item,index) in dataForm.permiss" :key="index" :label="item.label" :value="item.value" >
                       </el-option>
                     </el-select>
                   </el-form-item>
                 </el-col>
                 <el-col span="12">
                   <el-form-item >
                     <el-select v-model="cacheData.director"  placeholder="主管" @change="getDataList">
                       <el-option v-for="(item,index) in dataForm.director" :key="index" :label="item.label" :value="item.value" >
                       </el-option>
                     </el-select>
                   </el-form-item>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col span="12">
                   <el-form-item >
                     <el-select v-model="cacheData.position" placeholder="职别" @change="getDataList">
                       <el-option v-for="(item,index) in dataForm.position" :key="index" :label="item.label" :value="item.value" >
                       </el-option>
                     </el-select>
                   </el-form-item>
                 </el-col>
                 <el-col span="12">
                   <el-form-item >
                     <el-select v-model="cacheData.station" multiple collapse-tags  placeholder="工站" @change="getDataList">
                       <el-option v-for="(item,index) in report.kinSet" :key="index" :label="item" :value="item" >
                       </el-option>
                     </el-select>
                   </el-form-item>
                 </el-col>
               </el-row>
             </el-form>
             <el-table
               :data="talenList"
               :header-cell-style="{background:'blue',color:'white'}"
               v-loading="dataListLoading"
               height="41.6vh"
               style="width: 100%;border-radius:8px;">
               <el-table-column
                 prop="job_no"
                 header-align="center"
                 align="center"
                 label="工号">
               </el-table-column>
               <el-table-column
                 prop="name"
                 header-align="center"
                 width="80px"
                 align="center"
                 label="姓名">
               </el-table-column>
               <el-table-column
                 prop="director"
                 width="80px"
                 header-align="center"
                 align="center"
                 label="主管">
               </el-table-column>
               <el-table-column
                 prop="entry_date"
                 header-align="center"
                 align="center"
                 label="入职年限">
               </el-table-column>
               <el-table-column
                 prop="position"
                 header-align="center"
                 align="center"
                 label="职别">
               </el-table-column>
             </el-table>
           </div>
         </el-row>
      </el-col>
      <el-col span="13">
         <el-row>
            <el-col span="14">
               <div class="avelaue block-div">
                 <div class="lr_div" @contextmenu.prevent.stop="checkOut('age')">
                   <div id="pisGround1"></div>
                 </div>
                 <div class="lr_div">
                   <div id="pisGround2"></div>
                 </div>
                 <div class="lr_div" @contextmenu.prevent.stop="checkOut('sex')">
                   <div id="pisGround3"></div>
                 </div>
                 <div class="lr_div" @contextmenu.prevent.stop="checkOut('education')">
                   <div id="pisGround4"></div>
                 </div>
               </div>
            </el-col>
            <el-col span="10">
              <div class="ground block-div" @contextmenu.prevent.stop="checkOut('separtment')">
                <div id="pdiGround"></div>
              </div>
            </el-col>
         </el-row>
         <el-row>
            <el-col span="24">
               <div class="telec block-div" @contextmenu.prevent.stop="checkOut('skill')">
                 <div id="tecGround"></div>
               </div>
            </el-col>
         </el-row>
      </el-col>
      <el-col span="5">
        <el-row>
          <el-col span="24">
            <div class="block-div" @contextmenu.prevent.stop="checkOut('position')">
              <div id="piGround"></div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="24">
            <div class="block-div" @contextmenu.prevent.stop="checkOut('entry')">
              <div id="poGround"></div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getUUID } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: '',
          permiss: [ {value: '', label: ''}, {value: '厂务', label: '厂务'}, {value: '设备', label: '设备'} , {value: '品质', label: '品质'} , {value: '生技', label: '生技'} , {value: '办公室', label: '办公室'} , {value: '阳极生产', label: '阳极生产'} , {value: 'PVD生产', label: 'PVD生产'} ],
          director: [{value: '', label: ''}, {value: '岳平', label: '岳平'} ,{value: '邓海军', label: '邓海军'} , {value: '陈春陶', label: '陈春陶'} , {value: '周鹏', label: '周鹏'} , {value: '周颖', label: '周颖'} , {value: '王启军', label: '王启军'} , {value: '郭祥伟', label: '郭祥伟'}],
          position: [{value: '', label: ''}, {value: '经理', label: '经理'} ,{value: '副理', label: '副理'} , {value: '课长', label: '课长'} , {value: '专家技术员', label: '专家技术员'} , {value: '工程师 I', label: '工程师 I'} , {value: '工程师 II', label: '工程师 II'} , {value: '工程师 III', label: '工程师 III'}],
          carection: [{value: '', label: ''}, {value: '精通', label: '精通'} ,{value: '熟悉', label: '熟悉'} , {value: '入门', label: '入门'} , {value: '掌握', label: '掌握'}]
        },
        cacheData: {
          director: '',
          department: '',
          position: '',
          station: ''
        },
        queryData: {
          sage: '',
          eage: '',
          entry: '',
          position: '',
          sex: '',
          separtment: '',
          skill: '',
          education: ''
        },
        report: {
          eduCount: [],
          educations: [],
          entryCount: [],
          entryds: [],
          kill: [],
          killCount: [],
          kin1: [],
          kin2: [],
          kin3: [],
          kin4: [],
          kinSet: [],
          posiCount: [],
          positions: [],
          sepCount: [],
          separtments: [],
          sexCount: [],
          sexs: [],
          ageCount: [],
          arounds: []
        },
        talenList: [],
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
        },
        dataFormMan: {
          dataBox1: '',
          dataBox2: '',
          dataBox3: '',
          dataBox4: '',
          dataBox5: '',
          dataBox6: '',
          dataBox7: ''
        }
          // [{jobNo: 2922682 , name: '谭瑜' , director: '刘国良' , entrydate: '2020/11/23' , position: '技术员II'},
          // {jobNo: 2922682 , name: '谭瑜' ,director: '刘国良' , entrydate: '2020/11/23' , position: '技术员II'},
          // {jobNo: 2920707 , name: '梁松博' ,director: '刘国良' , entrydate: '2020/11/19' , position: '技术员I'},
          // {jobNo: 2919128 , name: '唐明' ,director: '刘国良' , entrydate: '2020/11/16' , position: '技术员II'},
          // {jobNo: 2919127 , name: '杨光学' ,director: '刘国良' , entrydate: '2020/11/16' , position: '技术员I'},
          // {jobNo: 2873619 , name: '廖淇林' ,director: '刘国良' , entrydate: '2020/11/25' , position: '技术员I'},
          // {jobNo: 2913049 , name: '何思龙' ,director: '刘国良' , entrydate: '2020/11/29' , position: '技术员II'},
          // {jobNo: 2909371 , name: '曾海波' ,director: '刘国良' , entrydate: '2020/11/22' , position: '技术员I'},
          // {jobNo: 2922682 , name: '谭瑜' ,director: '刘国良' , entrydate: '2020/11/23' , position: '技术员II'}]
      }
    },
    mounted () {
      this.drawLine()
      this.getDataList()
      this.getReport()
      this.getData()
    },
    methods: {
      update () {
        //应到
        this.dataFormMan.dataBox1 = (isNaN(this.articData.sarrive) ? 0 : this.articData.sarrive)
        //实到
        this.dataFormMan.dataBox2 = (isNaN(this.articData.carrive) ? 0 : this.articData.carrive)
        //出勤率
        this.dataFormMan.dataBox3 = (isNaN(this.articData.attendanl) ? '0%' : parseFloat(this.articData.attendanl)*100) +"%"
        //总人力
        this.dataFormMan.dataBox4 = (isNaN(this.articData.manpower) ? 0 : this.articData.manpower)
        this.getDataMan()
      },
      getDataMan () {//获取已完成人数
        this.dataListLoading = true
        var stage = ''
        for (var x in this.cacheData.station) {
          stage += this.cacheData.station[x] + ','
        }
        stage = stage.substring(0, stage.length - 1)
        this.$http({
          url: this.$http.adornUrl('/cotalent/search'),
          method: 'get',
          params: this.$http.adornParams({
            'page': 1,
            'rows': 10
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataFormMan.dataBox5 = data.cotalent.total
            this.dataFormMan.dataBox6 = parseInt(this.dataFormMan.dataBox4) - parseInt(this.dataFormMan.dataBox5)
            this.dataFormMan.dataBox7 = (parseFloat(this.dataFormMan.dataBox5) / parseFloat(this.dataFormMan.dataBox4)).toFixed(2) * 100 + "%"
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      getData () {//获取人力数据
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
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        var stage = ''
        for (var x in this.cacheData.station) {
          stage += this.cacheData.station[x] + ','
        }
        stage = stage.substring(0, stage.length - 1)
        this.$http({
          url: this.$http.adornUrl('/cotalent/search'),
          method: 'get',
          params: this.$http.adornParams({
            'page': 1,
            'rows': 10,
            'director': this.cacheData.director,
            'department': this.queryData.separtment ? this.queryData.separtment : this.cacheData.department,
            'position': this.queryData.position ? this.queryData.position : this.cacheData.position,
            'station': this.queryData.station ? this.queryData.station : stage,
            'sage': this.queryData.sage,
            'eage': this.queryData.eage,
            'entry': this.queryData.entry,
            'sex': this.queryData.sex,
            'education': this.queryData.education
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.talenList = data.cotalent.list
          this.totalPage = data.cotalent.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
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
      getReport () {
        this.$http({
          url: this.$http.adornUrl('/cotalent/report'),
          method: 'get',
          params: this.$http.adornParams({
            'sage': this.queryData.sage,
            'eage': this.queryData.eage,
            'entry': this.queryData.entry,
            'position': this.queryData.position,
            'sex': this.queryData.sex,
            'separtment': this.queryData.separtment,
            'station': this.queryData.skill,
            'education': this.queryData.education
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.report.eduCount = this.humanFormat(data.report.educations.split(','), data.report.eduCount.split(','))
            this.report.educations = data.report.educations.split(',')
            this.report.entryCount = data.report.entryCount.split(',')
            this.report.entryds = data.report.entrys.split(',')
            this.report.kill = data.report.kill.split(',')
            this.report.killCount = this.humanFormat(data.report.kill.split(','), data.report.killCount.split(','))
            this.report.kin1 = data.report.kin1
            this.report.kin2 = data.report.kin2
            this.report.kin3 = data.report.kin3
            this.report.kin4 = data.report.kin4
            this.report.kinSet = data.report.kinSet
            this.report.posiCount = data.report.posiCount.split(',')
            this.report.positions = data.report.positions.split(',')
            this.report.sepCount = this.humanFormat(data.report.separtments.split(','), data.report.sepCount.split(','))
            this.report.separtments = data.report.separtments.split(',')
            this.report.sexCount = this.humanFormat(data.report.sexs.split(','), data.report.sexCount.split(','))
            this.report.sexs = data.report.sexs.split(',')
            this.report.ageCount = this.humanFormat(data.report.arounds.split(','), data.report.ageCount.split(','))
            this.report.arounds = data.report.arounds.split(',')
            this.poGround.setOption({
              yAxis: {data: this.report.entryds},
              series: [{data: this.report.entryCount}]
            })
          this.piGround.setOption({
            yAxis: {data: this.report.positions},
            series: [{data: this.report.posiCount}]
          })
          this.pdiGround.setOption({
            legend: {data: this.report.separtments},
            series: [{data: this.report.sepCount }]
          })
          this.pisGround2.setOption({
            series: [{data: this.report.killCount}]
          })
          this.pisGround3.setOption({
            legend: {data: this.report.sexs},
            series: [{data: this.report.sexCount}]
          })
          this.pisGround4.setOption({
            legend: {data: this.report.educations},
            series: [{data: this.report.eduCount}]
          })
          this.tecGround.setOption({
            xAxis: {data: this.report.kinSet},
            series: [
              {data: this.report.kin1},
              {data: this.report.kin2},
              {data: this.report.kin3},
              {data: this.report.kin4}
            ]
          })
          this.pisGround1.setOption({
            legend: {data: this.report.arounds},
            series: [{data: this.report.ageCount }]
          })
          } else {
          }
      })
      },
      eClick (key , params) {
        if ('age' === key) {
          var keys =  ( params.name.indexOf('~') > 0) ?  params.name.split('~') :  params.name.split('<')
          this.queryData.sage = keys[0]
          this.queryData.eage = keys[1]
        } else {
          this.queryData[key] = params.name
        }
        this.getReport()
        this.getDataList()
      },
      checkOut (key) {
        if ('age' === key) {
          this.queryData.sage = ''
          this.queryData.eage = ''
        } else {
          this.queryData[key] = ''
        }
        this.getReport()
        this.getDataList()
      },
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        this.pisGround1 = this.$echarts.init(document.getElementById('pisGround1'))
        this.pisGround2 = this.$echarts.init(document.getElementById('pisGround2'))
        this.pisGround3 = this.$echarts.init(document.getElementById('pisGround3'))
        this.pisGround4 = this.$echarts.init(document.getElementById('pisGround4'))
        this.pdiGround = this.$echarts.init(document.getElementById('pdiGround'))
        this.tecGround = this.$echarts.init(document.getElementById('tecGround'))
        this.piGround = this.$echarts.init(document.getElementById('piGround'))
        this.poGround = this.$echarts.init(document.getElementById('poGround'))
        this.pisGround1.on('click', (params) => {this.eClick('age', params)})
        this.pisGround3.on('click', (params) => {this.eClick('sex', params)})
        this.pisGround4.on('click', (params) => {this.eClick('education', params)})
        this.pdiGround.on('click', (params) => {this.eClick('separtment', params)})
        this.tecGround.on('click', (params) => {this.eClick('skill', params)})
        this.piGround.on('click', (params) => {this.eClick('position', params)})
        this.poGround.on('click', (params) => {this.eClick('entry', params)})
        this.poGround.setOption({
          title: {
            text: '入职年限',
            x: '14px',
            y: '5px',
            click: this.checkOut('entry')
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} : {c}',
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
            }
          },
          grid: {
            top: '13%',
            left: '5%',
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
            data: this.report.entryds,
            axisLabel: {fontSize: 15},
            axisLine: {
              lineStyle: {
                color: '#000000',
                fontSize: 24
              }
            }
          },
          series: [
            {
              name: '入职年限',
              type: 'bar',
              barWidth: 20,
              label: {
                show: true,
                position: 'insideRight'
              },
              data: this.report.entryCount,
              itemStyle: {
                normal: {
                  color: 'RGB(29,157,255)',
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                      color: '#000000',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
        this.piGround.setOption({
          title: {
            text: '职称', //主标题文本，'\n'指定换行
            x: '14px',
            y: '5px'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} : {c}',
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
            }
          },
          grid: {
            top: '10%',
            left: '5%',
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
            data: this.report.positions,
            axisLabel: {fontSize: 15},
            axisLine: {
              lineStyle: {
                color: '#000000'
              }
            }
          },
          series: [
            {
              name: '职称',
              type: 'bar',
              barWidth: 20,
              label: {
                show: true,
                position: 'insideRight'
              },
              data: this.report.posiCount,
              itemStyle: {
                normal: {
                  color: 'RGB(29,157,255)',
                  label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                      color: '#000000',
                      fontSize: 16
                    }
                  }
                }
              }
            }
          ]
        })
        this.pdiGround.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '人力分布', //主标题文本，'\n'指定换行
            x: '14px',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: '5px' //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: ({d}%)<br/>      {c}'
          },
          color: ['#029ffc', '#29dfec', '#fa6676', '#4339f1', '#a680fa', '#D6D22E', '#ffb60f'],
          legend: {
            icon: 'circle',
            show: true,
            x: 'center',
            y: '14%',
            textStyle: { //图例文字的样式
              color: '#000000',
              fontSize: 16
            },
            data: this.report.separtments
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
                    formatter: '{b}\n{c}',
                    fontSize: 12
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
              data: this.report.sepCount
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
        this.pisGround1.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '年龄结构', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: '35%'//垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: <br/>{c} ({d}%)'
          },
          color: ['#029ffc', '#29dfec', '#fa6676', '#4339f1', '#a680fa', '#f3fb43', '#ffb60f'],
          legend: {
            show: true,
            icon: 'circle',
            x: 'center',
            y: '80%',
            textStyle: { //图例文字的样式
              color: '#000000',
              fontSize: 16
            },
            data: this.report.arounds
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['50%', '40%', '50%', '50%'],
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
                show: true,
                length: 0
              },
              data: this.report.ageCount
              //   [
              //   {value: 1043, name: '新员工'},
              //   {value: 932, name: '老员工'}
              // ]
            }
          ]
        })
        this.pisGround2.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '技能复合', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: '35%'//垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: <br/>{c} ({d}%)'
          },
            color: ['#029ffc', '#29dfec', '#fa6676', '#4339f1', '#a680fa', '#f3fb43', '#ffb60f'],
          legend: {
            show: true,
            icon: 'circle',
            x: 'center',
            y: '80%',
            textStyle: { //图例文字的样式
              color: '#000000',
              fontSize: 16
            },
            data: ['单技能', '多技能']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['50%', '40%', '50%', '50%'],
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
              data:this.report.killCount
              //   [
              //   {value: 1656, name: '单技能'},
              //   {value: 467, name: '多技能'}
              // ]
            }
          ]
        })
        this.pisGround3.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '性别比例', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: '35%'//垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: <br/>{c} ({d}%)'
          },
          color: ['#029ffc', '#29dfec', '#fa6676', '#4339f1', '#a680fa', '#f3fb43', '#ffb60f'],
          legend: {
            show: true,
            icon: 'circle',
            x: 'center',
            y: '80%',
            textStyle: { //图例文字的样式
              color: '#000000',
              fontSize: 16
            },
            data: this.report.sexs
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['50%', '40%', '50%', '50%'],
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
              data: this.report.sexCount
              //   [
              //   {value: 3210, name: '男'},
              //   {value: 1231, name: '女'}
              // ]
            }
          ]
        })
        this.pisGround4.setOption({
          title: {
            show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '学历分布', //主标题文本，'\n'指定换行
            x: 'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            y: '35%'//垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: <br/>{c} ({d}%)'
          },
          color: ['#029ffc', '#29dfec', '#fa6676', '#4339f1', '#a680fa', '#D6D22E', '#ffb60f'],
          legend: {
            show: true,
            icon: 'circle',
            x: 'center',
            y: '80%',
            textStyle: { //图例文字的样式
              color: '#000000',
              fontSize: 16
            },
            data: this.report.educations
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['50%', '40%', '50%', '50%'],
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
              data: this.report.eduCount
              //   [
              //   {value: 145, name: '初中'},
              //   {value: 246, name: '高中'},
              //   {value: 543, name: '大专'},
              //   {value: 654, name: '中专'},
              //   {value: 181, name: '本科'},
              //   {value: 4, name: '硕士'}
              // ]
            }
          ]
        })
        this.tecGround.setOption({

          title: {
            text: '技能熟练层别',
            x: '14px',
            y: '5px'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b0}<br/> {a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}<br/>{a3}: {c3}'
          },
          color: [ '#029ffc', '#4339f2', '#ffb60f', '#f23829' ],
          legend: {
            data: [ '入门', '熟练', '掌握', '精通' ],
            top: '50px',
            icon: 'circle',
            textStyle: {
              color: '#000000'
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
              fontSize: 15,
              textStyle: {
                color: '#000000'
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
              barWidth: 50,
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
              name: '掌握',
              type: 'bar',
              icon: 'bar',
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

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: black;
    }
  }

  /* reset element-ui css */
  .cot-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 100%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: black;
        height: 47px;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .backTalent{
      text-align: center;
      background: url('../../../assets/img/backTalent.png');
      background-size: 100% 100%;
      margin-top: -30px;
      //background: url('../../assets/img/background.jpg');
      width: 100%;
      margin-bottom: 20px;
      height:80px;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .el-table__row>td{
      border: none;
    }
  }
  #pane-coTalents-cotlents{
    .el-card__body{
      padding:0px!important;
    }
    .el-table .cell{
      padding-left: 0px!important;
      padding-right: 0px!important;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .cot-container {
    background-color: #edf2f6;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    /*min-height: 100%;*/
    /*width: 100%;*/
    overflow: hidden;

    .cBox{
      text-align: center;
      height: 10vh;
      margin: 0.8vh 0.8vh;
      border-radius:8px;
      color: #ffffff;
    }
    .cBox1{
      background-color: #4339f2;
    }
    .cBox2{
      background-color: #029ffc;
    }
    .cBox3{
      background-color: #ffb60f;
    }
    .cBox4{
      background-color: #f23829;
    }
    .inerBox{
      width: 100%;
      font-size: 1.6em;
      padding-top: 4%
    }
    .inerBox2{
      font-size: 55px;
      width: 100%;
    }
    .aBox{
      text-align: center;
      height: 6vh;
      margin: 0.1vh 0.6vh;
      border-radius:8px;
      color: #ffffff;
    }
    .aBox1{
      background-color: #4339f2;
    }
    .aBox2{
      background-color: #029ffc;
    }
    .aBox3{
      background-color: #2a9d0d;
    }
    .aBox4{
      background-color: #8d15ca;
    }
    .inerAox{
      width: 100%;
      font-size: 17px;
      padding-top: 2%
    }
    .inerAox2{
      font-size: 37px;
      width: 100%;
    }
    .ctBox{
      padding-top: 10px;
      padding-left: 5px;
      border-radius:8px;
      background-color:white;
      margin-top: 3vh;
      height: 55vh;
    }
    .el-select{
      width: 100%;
    }
    .el-input{
      width: 100%;
    }
    .el-form-item{
      margin-bottom: 12px;
      width: 97%;
    }
    .block-div{
      border-radius:8px;
      background-color:white;
    }
    .avelaue{
      margin-right:10px;
    }
    .ground{
      margin-left:10px;
    }
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .telec{
      margin-top: 20px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .lr_div{
      float:left;
      background-color: white;
      border-radius:8px;
      width:50%;
    }

    #pisGround1{
      width:100%;
      height: 26vh;
    }
    #pisGround2{
      width:100%;
      height: 26vh;
    }
    #pisGround3{
      width:100%;
      height: 26vh;
    }
    #pisGround4{
      height: 26vh;
      width:100%;
    }
    #pdiGround{
      width:100%;
      height: 52vh;
    }
    #tecGround{
      width:100%;
      height: 33.6vh;
    }
    #piGround{
      width:100%;
      height: 52vh;
      padding-right: 10px;
    }
    #poGround{
      width:100%;
      height: 33.6vh;
      margin-top:20px;
      padding-right: 10px;
    }


    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>

