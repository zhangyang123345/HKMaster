<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.store_id" placeholder="请选择导入仓库" clearable>
          <el-option v-for="(item,index) in storeArr" :key="index" :label="item.store_name" :value="item.store_id" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.order_state" placeholder="订单状态">
          <el-option label="待处理" value="5"></el-option>
          <el-option label="待结单" value="6"></el-option>
          <el-option label="完成" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          :show-file-list="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          action=""
          v-if="isAuth('store:goods:import')"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
          :before-upload="beforeFileUpload" style="display: inline">
          <el-button  type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"
                                                                             style="margin-right: 5px"></i>{{fileUploadBtnText}}
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="template()">导出模板</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!--<el-table-column-->
      <!--type="selection"-->
      <!--header-align="center"-->
      <!--align="center"-->
      <!--width="50">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="order_no"
        header-align="center"
        align="center"
        width="180px"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        width="80px"
        label="发起人">
      </el-table-column>
      <el-table-column
        prop="alltotal"
        header-align="center"
        width="140px"
        align="center"
        label="订单总金额">
      </el-table-column>
      <el-table-column
        prop="reall_total"
        header-align="center"
        width="140px"
        align="center"
        label="实际处理金额">
      </el-table-column>
      <el-table-column
        prop="exam_type"
        header-align="center"
        width="100px"
        align="center"
        label="审核类型">
        <template scope="scope">
          <div v-if="scope.row.exam_type==1">EHS审核</div>
          <div v-if="scope.row.exam_type==2">主管审核</div>
          <div v-if="scope.row.exam_type==3">经理审核</div>
          <div v-if="scope.row.exam_type==''">厂长审核</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_type"
        header-align="center"
        width="80px"
        align="center"
        label="订单类型">
        <template scope="scope">
          <div v-if="scope.row.order_type==1">入库</div>
          <div v-if="scope.row.order_type==2">出库</div>
          <div v-if="scope.row.order_type==3">报废</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_state"
        header-align="center"
        width="100px"
        align="center"
        label="当前状态">
        <template scope="scope">
          <div v-if="scope.row.order_state==-2">订单异常结束</div>
          <div v-if="scope.row.order_state==-1">存在异常</div>
          <div v-if="scope.row.order_state==0">待提交</div>
          <div v-if="scope.row.order_state==1">待EHS审核</div>
          <div v-if="scope.row.order_state==2">待主管审核</div>
          <div v-if="scope.row.order_state==3">待经理审核</div>
          <div v-if="scope.row.order_state==4">待厂长审核</div>
          <div v-if="scope.row.order_state==5">待处理</div>
          <div v-if="scope.row.order_state==6">待结单</div>
          <div v-if="scope.row.order_state==7">完成</div>
        </template>
      </el-table-column>
      <!--   <el-table-column
           prop="review_fir"
           header-align="center"
           align="center"
           label="一级审核人">
         </el-table-column>
         <el-table-column
           prop="review_sec"
           header-align="center"
           align="center"
           label="二级审核人">
         </el-table-column>
         <el-table-column
           prop="review_thi"
           header-align="center"
           align="center"
           label="三级审核人">
         </el-table-column>
         <el-table-column
           prop="review_fou"
           header-align="center"
           align="center"
           label="四级审核人">
         </el-table-column>-->
      <el-table-column
        prop="stime"
        header-align="center"
        width="180px"
        align="center"
        label="发起时间">
      </el-table-column>
      <el-table-column
        prop="exp_date"
        header-align="center"
        align="center"
        width="180px"
        label="需求时间">
      </el-table-column>
      <el-table-column
        prop="etime"
        header-align="center"
        align="center"
        width="180px"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="remarks"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="80"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.order_no)">处理</el-button>
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
  import AddOrUpdate from './handInDetails';
  export default {
    data () {
      return {
        dataForm: {
          key: '',
          store_id: '',
          order_state: '5'
        },
        dataList: [],
        storeArr: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        fileUploadBtnText: '导入库存',
      }
    },
    components: {
      AddOrUpdate,
    },
    activated () {
      this.$http({
        url: this.$http.adornUrl('/store/store/list'),
        method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.storeArr = data.storeData.list
        }
      })
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/orders/search'),
          method: 'get',
          params: this.$http.adornParams({
            'macheck': true,
            'page': this.pageIndex,
            'rows': this.pageSize,
            'key': 1,
            'order_type': 1,
            'order_state': this.dataForm.order_state
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.dataList = data.order.list
          this.totalPage = data.order.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
      },
      // 导出模板
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      template () {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['料号', '品名', '库存']
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['article_no', 'article_name', 'manufacturer_no']
          const list = [{'article_no':'CCUN07616', 'article_name':'大美工刀', 'manufacturer_no':'200'},
            {'article_no':'CLND04138', 'article_name':'无铁劳保鞋 牛刚王 009', 'manufacturer_no':'400'},
            {'article_no':'CLND04139', 'article_name':'无尘服', 'manufacturer_no':'130'}]
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '库存信息模板')
       })
      },
      fileUploadSuccess (response, file, fileList) {
        if (response) {
          this.$message({type: response.status, message: response.msg})
        }
        // this.loadEmps()
        this.fileUploadBtnText = '导入库存'
      },
      fileUploadError (err, file, fileList) {
        this.fileUploadBtnText = '导入库存'
      },
      beforeFileUpload (file) {
        if(this.dataForm.store_id == ''){
          this.$message({
            message: "请选择导入仓库！",
            type: 'error'
          });
        } else {
            this.fileUploadBtnText = '正在导入'
            let formData = new FormData()
            formData.append('file', file)
            formData.append('store_id',this.dataForm.store_id)
            this.$http.post(this.$http.adornUrl('/inoutmsg/import'), formData)
              .then(({data}) => {
              if (data && data.code === 0) {
                  this.$message({
                    message: "导入成功！",
                    type: 'success'
                  });
                  this.getDataList()
                } else {
                  this.$message.error(data.msg)
                }
                this.fileUploadBtnText = '导入库存'
              })
          }
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
      // 详情
      addOrUpdateHandle (order_no) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(order_no)
      })
      }
    }
  }
</script>
