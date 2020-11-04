<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">新增</el-button>
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
        prop="order_type"
        header-align="center"
        align="center"
        label="订单类型">
        <template scope="scope">
          <div v-if="scope.row.order_type==1">入库</div>
          <div v-if="scope.row.order_type==2">出库</div>
          <div v-if="scope.row.order_type==3">报废</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_no"
        header-align="center"
        align="center"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="job_no"
        header-align="center"
        align="center"
        label="发起人">
      </el-table-column>
      <el-table-column
        prop="order_state"
        header-align="center"
        align="center"
        label="订单状态">
        <template scope="scope">
          <div v-if="scope.row.order_state ==0">待提交</div>
          <div v-if="scope.row.order_state==1">待EHS审核</div>
          <div v-if="scope.row.order_state==2">待主管审核</div>
          <div v-if="scope.row.order_state==3">待经理审核</div>
          <div v-if="scope.row.order_state==4">待厂长审核</div>
          <div v-if="scope.row.order_state==5">待处理</div>
          <div v-if="scope.row.order_state==6">待结单</div>
          <div v-if="scope.row.order_state==7">完成</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="alltotal"
        header-align="center"
        align="center"
        label="订单总金额">
      </el-table-column>
      <el-table-column
        prop="reall_total"
        header-align="center"
        align="center"
        label="实际处理金额">
      </el-table-column>
      <el-table-column
        prop="stime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="etime"
        header-align="center"
        align="center"
        label="结单时间">
      </el-table-column>
      <el-table-column
        prop="exam_type"
        header-align="center"
        align="center"
        label="审核类型">
        <template scope="scope">
          <div v-if="scope.row.exam_type==1">待EHS审核</div>
          <div v-if="scope.row.exam_type==2">待课级主管审核</div>
          <div v-if="scope.row.exam_type==3">待经理审核</div>
          <div v-if="scope.row.exam_type==4">待厂长审核</div>
        </template>

      </el-table-column>
      <el-table-column
        prop="review_fir"
        header-align="center"
        align="center"
        label="审核人">
      </el-table-column>
      <el-table-column
        prop="exp_date"
        header-align="center"
        align="center"
        label="审核时间">
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
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row,1)">查看明细</el-button>
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
  import AddOrUpdate from './myGoodsOrder-Details'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
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
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/orders/search'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': 1
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.order.list
            console.log(this.dataList)
            this.totalPage = data.order.totalPage
            console.log(this.totalPage)
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
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
      findDetail (val) {
        console.log(val)
      },
      // 详情
      addOrUpdateHandle (val, val2) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(val, val2)
          console.log(val.toString())
      })
      }
    }
  }
</script>
