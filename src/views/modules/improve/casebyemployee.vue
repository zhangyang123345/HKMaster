<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.jobNo" placeholder="工号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.director" placeholder="主管" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.pjName" placeholder="上级" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.lineType" placeholder="线别" clearable filterable multiple collapse-tags="false">
          <el-option v-for="(item,index) in lineTypes" :key="index" :label="item.lineType" :value="item.lineType" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.position" placeholder="职称" clearable filterable multiple collapse-tags="false">
          <el-option v-for="(item,index) in positions" :key="index" :label="item.position" :value="item.position" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.costCategory" placeholder="成本别" clearable>
          <el-option v-for="(item,index) in costCategorys" :key="index" :label="item.value" :value="item.value" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.state" placeholder="案件状态" clearable filterable multiple collapse-tags="false">
          <el-option v-for="(item,index) in states" :key="index" :label="item.value" :value="item.value" >
          </el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-select  v-model="dataForm.supervisor" placeholder="主管" clearable>-->
          <!--<el-option v-for="(item,index) in supervisors" :key="index" :label="item.value" :value="item.id" >-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-date-picker
          v-model="dataForm.keyTime"
          unlink-panels
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList('1')">查询</el-button>
        <el-button type="primary" @click="export2Exce()" ><i class="fa fa-lg fa-level-down"
                                                             style="margin-right: 5px"></i>导出数据
        </el-button>
        <!--<el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
        <!--<el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
          <!--<el-upload-->
            <!--:show-file-list="false"-->
            <!--accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"-->
            <!--action="#"-->
            <!--:on-success="fileUploadSuccess"-->
            <!--:on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"-->
            <!--:before-upload="beforeFileUpload" style="display: inline">-->
            <!--<el-button  type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"-->
                                                                               <!--style="margin-right: 5px"></i>{{fileUploadBtnText}}-->
            <!--</el-button>-->
          <!--</el-upload>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
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
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="department"
        header-align="center"
        align="center"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        align="center"
        label="职称">
      </el-table-column>
      <el-table-column
        prop="lineType"
        header-align="center"
        align="center"
        label="线别">
      </el-table-column>
      <el-table-column
        prop="director"
        header-align="center"
        align="center"
        label="主管">
      </el-table-column>
      <el-table-column
        prop="A3"
        header-align="center"
        align="center"
        label="A3件数">
      </el-table-column>
      <el-table-column
        prop="Blitz"
        header-align="center"
        align="center"
        label="Blitz件数">
      </el-table-column>
      <el-table-column
        prop="other"
        header-align="center"
        align="center"
        label="其他件数">
      </el-table-column>
      <el-table-column
        prop="count"
        header-align="center"
        align="center"
        label="总完成件数">
      </el-table-column>
      <el-table-column
        prop="target"
        header-align="center"
        align="center"
        label="总目标件数">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="costCategory"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="leader">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="wclass"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="member">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="rate"
        header-align="center"
        align="center"
        label="个人完成率(%)">
        <template scope="scope">
          <div>{{(scope.row.rate*100).toFixed(2)}}%</div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="80"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.jobNo)">详情</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './casebyep-add-or-update'
  import moment from "moment"
  export default {
    data () {
      return {
        dataForm: {
          keyTime: '',
          key: '',
          active: 1,
          level: '',
          lineType: '',
          costCategory: '',
          director: '',
          pjName: '',
          jobNo: '',
          department: '',
          name: '',
          position: '',
          state: ['Closed']
        },
        exportList: [],
        supervisors: [],
        states: [{value: 'Regional Admin Review'}, {value: 'Closed'}, {value: 'Finance Review'}, {value: 'In Progress'}, {value: 'Planned'}, {value: 'Submitted'}],
        costCategorys: [{id: 0, value: 'IL'}, {id: 1, value: 'DL'}],
        levels: [],
        lineTypes: [],
        fileUploadBtnText: '导入案件数据',
        dataList: [],
        positions: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    created () {
      this.getDataJB()
    },
    methods: {
      // 获取基本参数
      getDataJB () {
        // 获取线别
        this.$http({
          url: this.$http.adornUrl('/lineType/search'),
          method: 'post',
          data: this.$http.adornData(this.dataList, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.lineTypes = data.data
        }
      })
        // 获取职称
        this.$http({
          url: this.$http.adornUrl('/position/search'),
          method: 'post',
          data: this.$http.adornData(this.dataList, false)
        }).then(({data}) => {
          console.log(data)
        if (data && data.code === 0) {
          this.positions = data.data
        }
      })
      },
      // 获取数据列表
      getDataList (type) {
        if (type == '1') {
          this.pageIndex = 1
          this.pageSize = 10
          this.totalPage = 0
        }
        if (this.dataForm.keyTime == '' || this.dataForm.keyTime == null || this.dataForm.keyTime == undefined) {
          if (moment(moment().valueOf()).format('MM-DD') < moment('09-01').format('MM-DD')) {
            this.dataForm.keyTime = [moment(moment().add(-1, 'years').valueOf()).format('YYYY-09-01'), moment(moment().valueOf()).format('YYYY-MM-DD')]
          } else {
            this.dataForm.keyTime = [moment(moment().valueOf()).format('YYYY-09-01'), moment(moment().valueOf()).format('YYYY-MM-DD')]
          }
        }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/project/search'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'jobNo': this.dataForm.jobNo,
            'name': this.dataForm.name,
            'position': this.dataForm.position + '',
            'costCategory': this.dataForm.costCategory + '',
            'director': this.dataForm.director + '',
            'pjName' : this.dataForm.pjName +'',
            'lineType': this.dataForm.lineType + '',
            'keytime': this.dataForm.keyTime + '',
            'state': this.dataForm.state + ''
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.data.list
            this.totalPage = data.data.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 导出数据
      export2Exce () {
        this.startLoading()
        this.$http({
          url: this.$http.adornUrl('/project/listAll'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'jobNo': this.dataForm.jobNo,
            'name': this.dataForm.name,
            'position': this.dataForm.position + '',
            'costCategory': this.dataForm.costCategory + '',
            'director': this.dataForm.director + '',
            'pjName' : this.dataForm.pjName +'',
            'lineType': this.dataForm.lineType + '',
            'keytime': this.dataForm.keyTime + '',
            'state': this.dataForm.state + ''
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.exportList = data.list
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel')
            const tHeader = ['工号', '姓名', '邮箱', '联系方式', '部门', '职称', '线别', '主管', 'A3件数', 'Blitz件数', '其它件数', '总完成件数', '总目标件数', '个人完成率(%)']
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['jobNo', 'name', 'email', 'phone', 'department', 'position', 'lineType', 'director', 'A3', 'Blitz', 'other', 'count', 'target', 'rate']
            const list = this.exportList
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '人员案件信息列表')
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
          this.$refs.addOrUpdate.init(id, this.dataForm.state, this.dataForm.keyTime)
        })
      },
      // 修改状态
      // changeStata (id, type) {
      //   this.$confirm(`确定对[id=${id}]进行修改操作?`, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$http({
      //       url: this.$http.adornUrl('/employee/setQuit'),
      //       method: 'post',
      //     params: this.$http.adornParams({
      //       'id': id,
      //       'active': type
      //     })
      //     }).then(({data}) => {
      //       if (data && data.code === 0) {
      //         this.$message({
      //           message: '操作成功',
      //           type: 'success',
      //           duration: 1500,
      //           onClose: () => {
      //             this.getDataList()
      //           }
      //         })
      //       } else {
      //         this.$message.error(data.msg)
      //       }
      //     })
      //   })
      // },
      fileUploadSuccess (response, file, fileList) {
        if (response) {
          this.$message({type: response.status, message: response.msg})
        }
        // this.loadEmps()
        this.fileUploadBtnText = '导入数据'
      },
      fileUploadError (err, file, fileList) {
        // this.fileUploadBtnText = '正在导入'
      },
      beforeFileUpload (file) {
        this.fileUploadBtnText = '正在导入'
        let formData = new FormData()
        formData.append('file', file)
        this.$http.post(this.$http.adornUrl('/employee/import'), formData)
          .then(({data}) => {
          if (data && data.code === 0) {
          this.$message.success('导入成功')
          this.fileUploadBtnText = '导入数据'
          this.getDataList()
        } else {
          this.$message.error(data.msg)
          this.fileUploadBtnText = '导入数据'
        }
      })
      }
    }
  }
</script>
