<template>
  <div class="d-chart-item DashboardR10">


    <dv-border-box-11 title="人力">
      <div class='detail-list'>
      <div class='detail-list-item1'>
        <div class='detail-list'>
          <div class='detail-item-text'>
            <h3>{{dataForm.dataBox4}}</h3>
            <span>{{dataForm.textBox4}}</span>
          </div>
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
      </div>
    </dv-border-box-11>

    </div>
      <!--<el-col>-->
      <!--<el-row :span="1" type="flex"  class="el-row"  justify="center">-->
      <!--</el-row>-->
      <!--<el-row :span="40" type="flex"  class="el-row"  justify="center">-->
        <!--<el-col>-->
          <!--<div id="echarts_out" style="top:-100px;height: 520px;width: 80%;position: relative;" ></div>-->
        <!--</el-col>-->
        <!--<el-col>-->
          <!--<div id="echarts_dds" style="top:-100px;height: 520px;width: 80%;position: relative;" ></div>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-col>-->

</template>

<script>
  export default {
    name: 'DashboardR10',
    data () {
      return {
        myChart: '',
        runBuff: true,
        dataForm: {
          dataBox1: 10,
          dataBox2: 5,
          dataBox3: 1,
          dataBox4: 3,
          textBox1: '',
          textBox2: '',
          textBox3: '',
          textBox4: ''
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
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        console.log(111111111111111)
        this.$http({
          url: this.$http.adornUrl('/attendan/queryAtten'),
          method: 'post',
          params: this.$http.adornParams({
            'startDate': this.startDate,
            'endDate': this.endDate
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data)
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
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      update () {
        if (this.runBuff) {
          // this.current += 1
          this.dataForm.dataBox1 = (isNaN(this.articData.sarrive) ? 0 : this.articData.sarrive)
          this.dataForm.dataBox2 = (isNaN(this.articData.carrive) ? 0 : this.articData.carrive)
          this.dataForm.dataBox3 = (isNaN(this.articData.attendanl) ? '0%' : parseFloat(this.articData.attendanl)*100) + "%"
          this.dataForm.dataBox4 = (isNaN(this.articData.manpower) ? 0 : this.articData.manpower)
          this.dataForm.textBox1 = this.articData.date + '应到'
          this.dataForm.textBox2 = this.articData.date + '出勤'
          this.dataForm.textBox3 = this.articData.date + '出勤率'
          this.dataForm.textBox4 = this.articData.date + '总人力'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .DashboardR10 {
    left: 2%;
    top: 5%;
    width: 30%;
    height: 15%;
    border: 2px solid rgba(5, 44, 127, 0);
    border-top: none;
  }
  .detail-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-between;
    justify-content: space-around;
    width: 100%;
    height:10%;
    &-item1 {
      display: flex;
      align-items: center;
      position: relative;
      height: 6rem;
      padding: 0 1.125rem;
      width: 100%;
      border-radius: 5px;
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
      width: 100%;
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
