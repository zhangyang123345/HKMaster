<template>
  <div class="ExceptionsRecord">
    <el-form :inline="true" :model="dataForm"  ref="dataForm" >
      <el-form-item prop="building" label="日期">
        <el-date-picker
          v-model="dataForm.exceptionTime"
          unlink-panels
          type="daterange"
          value-format="yyyy-MM-dd"
          align="right"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="building" label="异常类型">
        <el-select v-model="dataForm.excepType" clearable placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="building" label="审核状态">
        <el-select v-model="dataForm.auditType" clearable placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="governor" label="主管">
        <el-input v-model="dataForm.governor"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDataList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle">异常新增</el-button>
      </el-form-item>
      <!--<el-button type="primary" @click="export2Exce()" v-if="isAuth('employee:export')">-->
      <el-button type="primary" @click="export2Exce()">
        <i class="fa fa-lg fa-level-down"style="margin-right: 5px"></i>导出信息
      </el-button>
    </el-form>
    <el-table
      :data="dataListShow"
      border
      v-loading="dataListLoading"
      element-loading-background = "rgb(217, 217,217)"
      element-loading-text = "数据正在加载中"
      element-loading-spinner = "el-icon-loading"
      style="width: 100%;">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        label="id"
        width="80">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="goodsId"-->
      <!--header-align="center"-->
      <!--align="center"-->
      <!--label="商品ID">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="exception_type"
        header-align="center"
        align="center"
        label="异常类型"
        width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.exception_type===1">异常情况</div>
          <div v-if="scope.row.exception_type===2">内部稽核</div>
          <div v-if="scope.row.exception_type===3">外部稽核</div>
          <div v-if="scope.row.exception_type===4">工伤事件</div>
          <div v-if="scope.row.exception_type===6">违纪</div>
          <div v-if="scope.row.exception_type===7">Trace异常</div>
          <div v-if="scope.row.exception_type===8">品质异常</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="building"
        header-align="center"
        align="center"
        label="楼栋"
        width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.building==1">_E3.2F</div>
          <div v-if="scope.row.building==2">_E4.1F</div>
          <div v-if="scope.row.building==3">_E4.2F</div>
          <div v-if="scope.row.building==4">_D4.1F</div>
          <div v-if="scope.row.building==5">_A5</div>
          <div v-if="scope.row.building==6">_B1.2F</div>
          <div v-if="scope.row.building==7">_B4.1F</div>
          <div v-if="scope.row.building==8">_B6.2F</div>
          <div v-if="scope.row.building==9">_B1.1F</div>
          <div v-if="scope.row.building==10">_E1.1F</div>
          <div v-if="scope.row.building==11">_E3.1F</div>
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
      <el-table-column
        prop="create_man"
        header-align="center"
        align="center"
        label="创建人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="audit_status"
        header-align="center"
        align="center"
        label="审核状态"
        width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.audit_status==0">待审核</div>
          <div v-if="scope.row.audit_status==1">审核通过</div>
          <div v-if="scope.row.audit_status==2">退回</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="audit_man"
        header-align="center"
        align="center"
        label="审核人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="create_time"
        header-align="center"
        align="center"
        label="创建时间"
        width="165">
      </el-table-column>
      <el-table-column
        key="articleNo"
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button  type="text" size="small" @click="updateException(scope.row)">修改</el-button>
          <el-button  type="text" size="small" @click="deleteExceptions(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <add-or-update :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate" ref="addOrUpdateRef"></add-or-update>
  </div>
</template>


<script>
  import addOrUpdate from './ExceptionsDetail'
  export default {
    data() {
      return {
        msg: '初始代模板',
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataForm: {
          exceptionTime: '',
          auditType: '',
          excepType: '',
          governor: '',
          excepDate: ''
        },
        dataListShow: [],
        dataListLoading: false,
        addOrUpdateVisible: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
        options1: [{
          value: '1',
          label: '异常情况'
        }, {
          value: '2',
          label: '内部稽核'
        }, {
          value: '3',
          label: '外部稽核'
        }, {
          value: '4',
          label: '工伤事件'
        },{
          value: '6',
          label: '违纪'
        }, {
          value: '7',
          label: 'Trace异常'
        }, {
        value: '8',
        label: '品质异常'
      }],
        options2: [{
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '审核未通过'
        }]
      }
    },
    components: {
      addOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 导出数据
      export2Exce () {
        this.startLoading()
        this.$http({
          url: this.$http.adornUrl('/exceptionsRecord/export'),
          method: 'post',
          params: this.$http.adornParams({
            'exception_time': this.dataForm.exceptionTime,
            'audit_status': this.dataForm.auditType,
            // 'create_man': this.dataForm.create_man,
            'exception_type': this.dataForm.excepType,
            // 'exception_type2': this.dataForm.exception_type2,
            'page': this.pageIndex,
            'rows': this.pageSize
            // 'jobNo': this.dataForm.jobNo,
            // 'name': this.dataForm.name,
            // 'lineType': this.dataForm.lineType,
            // 'costCategory': this.dataForm.costCategory,
            // 'position': this.dataForm.position,
            // 'director': this.dataForm.director,
            // 'active': this.dataForm.active
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.exportList = data.list
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/vendor/Export2Excel')
              const tHeader = ['大类', '二类','发生日期','完成日期','异常描述','整改措施', '创建人', '楼栋', '区域主管', '班别','稽核人', '工站','当事人工号','惩处', '确认人','责任班长','责任股长','责任课长','责任理级','隐患类型','稽核条例']
              // 上面设置Excel的表格第一行的标题
              const filterVal = ['exception_type2', 'exception_type', 'happen_date', 'finish_date','exception_describe','up_measures','create_man','building', 'dri', 'class_no','ordinance_man', 'station','client_no','pu_measures', 'identify_man', 'monitor', 'unit_chief', 'section', 'manager', 'hazard_type', 'ordinance']
              const list = this.exportList
              const data = this.formatJson(filterVal, list)
              export_json_to_excel(tHeader, data, 'EHS稽核')
            })
          } else {
            this.$message.error(data.msg)
          }
          this.endLoading()
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      deleteExceptions (val) {
        this.$confirm('是否确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (val.audit_status === 1 ){
            this.$message({
              message: "已审核，无法删除",
              type: 'error'
            })
          } else {
            this.$http({
              url: this.$http.adornUrl(`/exceptionsRecord/deleteExceptions`),
              method: 'Post',
              params: this.$http.adornParams({
                'id': val.id
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: "删除成功",
                  type: 'success'
                })
                this.getDataList()
                this.dataListLoading = false
              } else {
                this.$message({
                  message: data.message,
                  type: 'error'
                })
                this.getDataList()
                this.dataListLoading = false
              }
            })
          }
        })
      },
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl(`/exceptionsRecord/searchException`),
          method: 'get',
          params: this.$http.adornParams({
            'exception_time': this.dataForm.exceptionTime + '',
            'exception_type': this.dataForm.excepType,
            'audit_status': this.dataForm.auditType,
            'dri': this.dataForm.governor,
            'rows': this.pageSize,
            'page': this.pageIndex
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
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      addOrUpdateHandle(){
        this.addOrUpdateVisible = true
        //初始化子组件
        this.$nextTick(() => {
          this.$refs.addOrUpdateRef.init(1,1)
        })
      },
      updateException(val){
        this.addOrUpdateVisible = true
        //初始化子组件
        this.$nextTick(() => {
          this.$refs.addOrUpdateRef.init(val, 2)
        })
      },
      showAddOrUpdate(data){
        if(data === 'false'){
          this.addOrUpdateVisible = false
          this.getDataList()
        }else{
          this.addOrUpdateVisible = true
        }
      }
  }
  }
</script>
