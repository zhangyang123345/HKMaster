<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('order:goodsOrder:save')" type="primary" @click="addHandle()">新增</el-button>
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
        prop="orderId"
        header-align="center"
        align="center"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="promoterName"
        header-align="center"
        align="center"
        label="发起人">
      </el-table-column>
      <el-table-column
        prop="num"
        header-align="center"
        align="center"
        label="物件总数量">
      </el-table-column>
      <el-table-column
        prop="alltotal"
        header-align="center"
        align="center"
        label="总价格">
      </el-table-column>
      <el-table-column
        prop="orderType"
        header-align="center"
        align="center"
        label="订单类型">
        <template scope="scope">
          <div v-if="scope.row.orderType==1">普通</div>
          <div v-if="scope.row.orderType==2">刀具类</div>
          <div v-if="scope.row.orderType==3">衣裤鞋子类</div>
          <div v-if="scope.row.orderType==4">化学品</div>
          <div v-if="scope.row.orderType==''">暂无数据</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderStata"
        header-align="center"
        align="center"
        label="当前状态">
        <template scope="scope">
          <div v-if="scope.row.orderStata==-2">订单异常结束</div>
          <div v-if="scope.row.orderStata==-1">存在异常</div>
          <div v-if="scope.row.orderStata==0">待提交</div>
          <div v-if="scope.row.orderStata==1">待一级审核</div>
          <div v-if="scope.row.orderStata==2">待二级审核</div>
          <div v-if="scope.row.orderStata==3">待三级审核</div>
          <div v-if="scope.row.orderStata==4">待四级审核</div>
          <div v-if="scope.row.orderStata==5">待领取</div>
          <div v-if="scope.row.orderStata==6">待确认</div>
          <div v-if="scope.row.orderStata==7">完成</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="check1Name"
        header-align="center"
        align="center"
        label="一级审核人">
      </el-table-column>
      <el-table-column
        prop="check2Name"
        header-align="center"
        align="center"
        label="二级审核人">
      </el-table-column>
      <el-table-column
        prop="check3Name"
        header-align="center"
        align="center"
        label="三级审核人">
      </el-table-column>
      <el-table-column
        prop="check4Name"
        header-align="center"
        align="center"
        label="四级审核人">
      </el-table-column>
      <el-table-column
        prop="realityAlltotal"
        header-align="center"
        align="center"
        label="实际出库金额">
      </el-table-column>
      <el-table-column
        prop="recheckName"
        header-align="center"
        align="center"
        label="出库人员">
      </el-table-column>
      <el-table-column
        prop="remarks"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="stime"
        header-align="center"
        align="center"
        label="发起时间">
      </el-table-column>
      <el-table-column
        prop="etime"
        header-align="center"
        align="center"
        label="结束时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.orderId)">查看详情</el-button>
          <el-button v-if="scope.row.orderStata==0" type="text" size="small" @click="UpdateHandle(scope.row.orderId)">提交审核</el-button>
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
  // import AddOrUpdate from './myGoodsOrder-add-or-update'
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
        addOrUpdateVisible: false,
        DetailsVisible: false
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
          url: this.$http.adornUrl('/order/goodsOrder/mylist'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': 2
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.list
            this.totalPage = data.list.length
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
      // 提交审核
      UpdateHandle (id) {
        this.$http({
          url: this.$http.adornUrl('/order/goodsOrder/update'),
          method: 'post',
          data: this.$http.adornData({
            'orderId': id,
            'orderStata': 1
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
          this.getDataList()
        }
        })
        } else {
          this.$message.error(data.msg)
        }
      })
      },
      // 新增
      addHandle (id) {
      this.$confirm(`确定新增订单？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
        this.$http({
        url: this.$http.adornUrl('/order/goodsOrder/save'),
        method: 'post',
        data: this.$http.adornData()
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
            this.getDataList()
        }
        })
        } else {
          this.$message.error(data.msg)
        }
      })
      })
      },
       // 详情
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id, 1)
      })
      }
      // // 详情
      // Details (id) {
      //   this.DetailsVisible = true
      //   this.$nextTick(() => {
      //     this.$refs.Details.init(id)
      // })
      // }
    }
  }
</script>
