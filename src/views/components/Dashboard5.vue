<template>
  <div class="d-chart-item dashboard5">
    <div class="dashboard-top" @click.stop="openHtml">
      <div class="dashboard-top-title">2H</div>
    </div>
    <div class="chart-item">
      <div class="arrow-top-right"></div>
      <div id="echarts_2H" style="height: 388px;width:100%">
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          cell-class-name="cellStyle"
          header-cell-class-name="headerStyle"
          header-row-class-name="rowStyle"
          row-class-name="rowStyle"
          :cell-style="tableCell"
          style="width:100%;font-size:8px;line-height: 19px;background-color: transparent !important;margin-top: 3px;margin-left: -2px;">
          <!--<el-table-column-->
          <!--type="selection"-->
          <!--header-align="center"-->
          <!--align="center"-->
          <!--width="50">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            width="45%"
            label="白/晚">
          </el-table-column>
          <el-table-column
            prop="clean"
            header-align="center"
            align="center"
            width="45%"
            label="清洗">
          </el-table-column>
          <el-table-column
            prop="assy"
            header-align="center"
            width="45%"
            align="center"
            label="组治具">
          </el-table-column>
          <el-table-column
            prop="d2d"
            header-align="center"
            width="45%"
            align="center"
            label="2D">
          </el-table-column>
          <el-table-column
            prop="ipqc3"
            header-align="center"
            width="45%"
            align="center"
            label="IPQC3">
          </el-table-column>
          <el-table-column
            prop="vi"
            header-align="center"
            width="45%"
            align="center"
            label="VI">
          </el-table-column>
          <el-table-column
            prop="io"
            header-align="center"
            width="45%"
            align="center"
            label="IO">
          </el-table-column>
          <el-table-column
            prop="rtcg"
            header-align="center"
            width="45%"
            align="center"
            label="RT/CG">
          </el-table-column>
          <el-table-column
            prop="split"
            header-align="center"
            align="center"
            width="45%"
            label="Split">
          </el-table-column>
          <el-table-column
            prop="dea"
            header-align="center"
            align="center"
            width="45%"
            label="A基准">
          </el-table-column>
          <el-table-column
            prop="deb"
            header-align="center"
            width="45%"
            align="center"
            label="B基准">
          </el-table-column>
          <el-table-column
            prop="dcr"
            width="45%"
            header-align="center"
            align="center"
            label="DCR">
          </el-table-column>
          <el-table-column
            prop="ipqc4"
            width="45%"
            header-align="center"
            align="center"
            label="IPQC4">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    inject: ['refresh'],
    name: "Dashboard5",
    data () {
      return {
        myChart: '',
        title: [],
        nameList: [],
        dataList: [],
        startDate: '',
        endDate: ''
      }
    },
    activated () {
      this.getData()
    },
    created () {
        setInterval(() => {
          this.getData()
      }, 300000)
    },
    mounted () {

    },
    methods: {
      getData () {
        this.endDate = moment(moment().valueOf()).format('YYYY-MM-DD')
        this.$http({
          url: this.$http.adornUrl('/homeCentrol/get2H'),
          method: 'post',
          params: this.$http.adornParams({
            'date': this.endDate
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.h2Data
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      openHtml () {
        // var parma = new Object()
        // parma.userName = 'UserID'
        // parma.userId = '1029674'
        // parma.passName = 'UserPassword'
        // parma.passId = '123456'
        // parma.token = '__RequestVerificationToken'
        // parma.domain = '10.128.19.168:8015'
        // parma.tokenPath = 'http://10.128.19.168:8015/'
        // parma.loginPath = 'http://10.128.19.168:8015/'
        // parma.direct = 'http://10.128.19.168:8015/PVD/pvdreport'
        // const wind = this.$router.resolve({name: 'openToS', query: parma})
        // window.open(wind.href, '_blank')
        var wind = window.open('about:blank', '_blank')
        //组装form表单
        var html = "<form action='http://10.128.19.168:8015/' method='post'>"
        html += "<input type='text' name='UserID' value='1029674' style='display: none'>"
        html += "<input type='text' name='UserPassword' value='123456' style='display: none'>"
        html += " </form> "
        wind.document.body.innerHTML = html
        wind.document.forms[0].submit()
      },
      tableCell ({row, column, rowIndex, columnIndex}) {
        if ((rowIndex == 2 || rowIndex == 5) && columnIndex != 0 ) {
            if (parseFloat(row[column.property]) >= 98) {
              return 'padding: 0px !important; background-color:green; color: white;'
            } else if (parseFloat(row[column.property]) > 90) {
              return 'padding: 0px !important; background-color:#c7c718; color: white;'
            } else if (parseFloat(row[column.property]) != 0) {
              return 'padding: 0px !important; background-color:red; color: white;'
            }
        } else {
          return 'padding: 0px !important;'
        }
      }
    }
  }
</script>

<style lang="scss">

  .dashboard5 {
    left: 0px;
    top: 72px;
    width: 32%;
    height: 281px;
    border: 2px solid rgba(5, 44, 127, 1);
    border-top: none;
  }
  .dashboard5 .el-table__body{
    width:100%!important;
  }
  .dashboard5 .el-table__header{
    width:100%!important;
    table-layout:unset!important;
  }
  .cellStyle{
    padding: 0px !important;
  }
  .cellStyle  .cell {
    padding: 0px !important;
    line-height: 38px;
    width: 100%;
    color: #ffffff;
    transform: scale(0.97)
  }

  .headerStyle{
    padding: 0px !important;
    font-size: 12px;
    background-color: transparent !important;
  }
  .headerStyle  .cell{
    padding: 0px !important;
    font-size: 12px;
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
