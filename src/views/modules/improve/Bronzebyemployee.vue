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
        <el-select  v-model="dataForm.valid" placeholder="状态" clearable filterable multiple collapse-tags="false">
          <el-option v-for="(item,index) in valids" :key="index" :label="item.name" :value="item.value" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.active" placeholder="人员状态" clearable>
          <el-option v-for="(item,index) in actives" :key="index" :label="item.value" :value="item.id" >
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
                                                             style="margin-right: 5px"></i>导出报表
        </el-button>
        <el-upload
          v-if="isAuth('Bronze:import')"
          :show-file-list="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          action="#"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
          :before-upload="beforeFileUpload" style="display: inline">
          <el-button  type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"
                                                                             style="margin-right: 5px"></i>{{fileUploadBtnText}}
          </el-button>
        </el-upload>
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
        prop="costCategory"
        header-align="center"
        align="center"
        label="成本别">
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
        prop="certificationNo"
        header-align="center"
        align="center"
        label="证书编号">
      </el-table-column>
      <el-table-column
        prop="valid"
        header-align="center"
        align="center"
        label="是否有效">
        <template scope="scope">
          <div v-if="scope.row.valid == 1">有效</div>
          <div v-if="scope.row.valid == 0">无效</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="certificationDate"
        header-align="center"
        align="center"
        label="认证日期">
      </el-table-column>
      <el-table-column
        prop="expireOn"
        header-align="center"
        align="center"
        label="有效日期">
      </el-table-column>
      <el-table-column
        prop="passExam"
        header-align="center"
        align="center"
        label="铜级考核">
        <template scope="scope">
          <div v-if="scope.row.passExam == 1">通过</div>
          <div v-if="scope.row.passExam == 0">未通过</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="blitz"
        header-align="center"
        align="center"
        label="Blitz">
      </el-table-column>
      <el-table-column
        prop="pja_1"
        header-align="center"
        align="center"
        label="A3/DMA*">
      </el-table-column>
      <el-table-column
        prop="pja_2"
        header-align="center"
        align="center"
        label="A3/DMA*">
      </el-table-column>
      <el-table-column
        prop="pja_3"
        header-align="center"
        align="center"
        label="A3/DMA*">
      </el-table-column>
      <el-table-column
        prop="pja_4"
        header-align="center"
        align="center"
        label="A3/DMA*">
      </el-table-column>
      <!--<el-table-column-->
      <!---->
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
          valid: '1'
        },
        exportList: [],
        supervisors: [],
        valids: [{value: '1', name: '通过'}, {value: '0', name: '未通过'}],
        actives: [{id: 0, value: '离职'}, {id: 1, value: '在职'},{id: 3, value: '异常'}],
        costCategorys: [{id: 0, value: 'IL'}, {id: 1, value: 'DL'}],
        levels: [],
        lineTypes: [],
        fileUploadBtnText: '导入铜级数据',
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
        // if (this.dataForm.keyTime == '' || this.dataForm.keyTime == null || this.dataForm.keyTime == undefined) {
        //   if (moment(moment().valueOf()).format('MM-DD') < moment('09-01').format('MM-DD')) {
        //     this.dataForm.keyTime = [moment(moment().add(-1, 'years').valueOf()).format('YYYY-09-01'), moment(moment().valueOf()).format('YYYY-MM-DD')]
        //   } else {
        //     this.dataForm.keyTime = [moment(moment().valueOf()).format('YYYY-09-01'), moment(moment().valueOf()).format('YYYY-MM-DD')]
        //   }
        // }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/global/search'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'jobNo': this.dataForm.jobNo,
            'name': this.dataForm.name,
            'position': this.dataForm.position + '',
            'costCategory': this.dataForm.costCategory + '',
            'director': this.dataForm.director + '',
            'pjName': this.dataForm.pjName + '',
            'lineType': this.dataForm.lineType + '',
            'keytime': this.dataForm.keyTime + '',
            'valid': this.dataForm.valid + '',
            'active': this.dataForm.active
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
          url: this.$http.adornUrl('/global/listAll'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'jobNo': this.dataForm.jobNo,
            'name': this.dataForm.name,
            'position': this.dataForm.position + '',
            'costCategory': this.dataForm.costCategory + '',
            'director': this.dataForm.director + '',
            'pjName': this.dataForm.pjName + '',
            'lineType': this.dataForm.lineType + '',
            'keytime': this.dataForm.keyTime + '',
            'valid': this.dataForm.valid + ''
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.exportList = data.list
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel')
            const tHeader = ['工号', '姓名', '邮箱', '成本别', '部门', '职称', '线别', '主管', '证书编号', '是否有效', '认证日期', '有效日期', '铜级考核', 'Blitz','A3/DMA*','A3/DMA*','A3/DMA*','A3/DMA*']
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['jobNo', 'name', 'email', 'costCategory', 'department', 'position', 'lineType', 'director', 'certificationNo' , 'valid','certificationDate','expireOn','passExam','blitz','pja_1','pja_2','pja_3','pja_4']
            const list = this.exportList
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '人员铜级信息列表')
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
          this.$refs.addOrUpdate.init(id, this.dataForm.valid, this.dataForm.keyTime)
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
        this.fileUploadBtnText = '导入铜级数据'
      },
      fileUploadError (err, file, fileList) {
        // this.fileUploadBtnText = '正在导入'
      },
      beforeFileUpload (file) {
        this.fileUploadBtnText = '正在导入'
        let formData = new FormData()
        formData.append('file', file)
        this.$http.post(this.$http.adornUrl('/global/import'), formData)
          .then(({data}) => {
          if (data && data.code === 0) {
          this.$message.success('导入成功')
          this.fileUploadBtnText = '导入铜级数据'
          this.getDataList()
        } else {
          this.$message.error(data.msg)
          this.fileUploadBtnText = '导入铜级数据'
        }
      })
      }
    }
  }
</script>
<style>
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: rgb(232, 247, 246) !important;
  }
</style>
