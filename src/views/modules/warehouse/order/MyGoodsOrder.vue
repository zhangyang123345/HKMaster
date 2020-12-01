<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-select v-model="dataForm.order_type" placeholder="订单类型">
          <el-option label="入库" value="1"></el-option>
          <el-option label="出库" value="2"></el-option>
          <el-option label="报废" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.order_state" placeholder="订单状态">
          <el-option label="退单" value="-1"></el-option>
          <el-option label="待提交" value="0"></el-option>
          <el-option label="待EHS审核" value="1"></el-option>
          <el-option label="待主管审核" value="2"></el-option>
          <el-option label="待经理审核" value="3"></el-option>
          <el-option label="待厂长审核" value="4"></el-option>
          <el-option label="待处理" value="5"></el-option>
          <el-option label="待结单" value="6"></el-option>
          <el-option label="完成" value="7"></el-option>
        </el-select>
      </el-form-item>
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
        prop="order_no"
        header-align="center"
        align="center"
        label="订单号"
        width="180">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="job_no"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="发起人"-->
        <!--width="130">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="发起人"
        width="80">
      </el-table-column>
      <el-table-column
        prop="order_type"
        header-align="center"
        align="center"
        label="订单类型"
        width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.order_type==1">入库</div>
          <div v-if="scope.row.order_type==2">出库</div>
          <div v-if="scope.row.order_type==3">报废</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_state"
        header-align="center"
        align="center"
        label="订单状态"
        width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.order_state==-1">退单</div>
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
      <el-table-column
        prop="exam_type"
        header-align="center"
        align="center"
        label="审核类型">
        <template slot-scope="scope">
        <div v-if="scope.row.exam_type==1">EHS审核</div>
        <div v-if="scope.row.exam_type==2">主管审核</div>
        <div v-if="scope.row.exam_type==3">经理审核</div>
        <div v-if="scope.row.exam_type==4">厂长审核</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="review_user"
        header-align="center"
        align="center"
        label="审核主管">
      </el-table-column>
      <el-table-column
        prop="alltotal"
        header-align="center"
        align="center"
        label="订单总金额"
        width="140">
      </el-table-column>
      <el-table-column
        prop="reall_total"
        header-align="center"
        align="center"
        label="实际处理金额"
        width="140">
      </el-table-column>
      <el-table-column
        prop="stime"
        header-align="center"
        align="center"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="exp_date"
        header-align="center"
        align="center"
        label="预计需求时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="etime"
        header-align="center"
        align="center"
        label="结单时间"
        width="180">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="exp_date"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="审核时间">-->
      <!--</el-table-column>-->
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
        width="120"
        label="操作">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small" @click="openDetails (scope.row)">查看</el-button>-->
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">打开</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>
          <el-button v-if="scope.row.order_stata==0" type="text" size="small" @click="UpdateHandle(scope.row)">提交审核</el-button>
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
  import AddOrUpdate from './ZddGoodsOrder-add-or-update'

  export default {
    data () {
      return {
        dataForm: {
          keyTime: '',
          order_type: '',
          order_state: ''
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
      AddOrUpdate,
    },
    activated () {
      this.getDataList()
    },
    methods: {
      getDataList () {
        // if (this.dataForm.keyTime == '' || this.dataForm.keyTime == null || this.dataForm.keyTime == undefined) {
        //   if (moment(moment().valueOf()).format('MM-DD') < moment('09-01').format('MM-DD')) {
        //     this.dataForm.keyTime = [moment(moment().add(-1, 'years').valueOf()).format('YYYY-09-01'), moment(moment().valueOf()).format('YYYY-MM-DD')]
        //   } else {
        //     this.dataForm.keyTime = [moment(moment().valueOf()).format('YYYY-09-01'), moment(moment().valueOf()).format('YYYY-MM-DD')]
        //   }
        // }
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/orders/search'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'username':this.$store.state.user.name,
            'keytime': this.dataForm.keyTime + '',
            'order_type': this.dataForm.order_type,
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
      // 获取数据列表
      // getDataList () {
      //   this.dataListLoading = true
      //   this.$http({
      //     url: this.$http.adornUrl('/orders/search'),
      //     method: 'get',
      //     params: this.$http.adornParams({
      //       'page': this.pageIndex,
      //       'limit': this.pageSize,
      //       'key': 2
      //     })
      //   }).then(({data}) => {
      //     if (data && data.code === 0) {
      //       this.dataList = data.order.list
      //       this.totalPage = data.order.totalPage
      //     } else {
      //       this.dataList = []
      //       this.totalPage = 0
      //     }
      //     this.dataListLoading = false
      //   })
      // },
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
      UpdateHandle (row) {
        if (row.order_state === 0) {
            this.$http({
              url: this.$http.adornUrl('/order/goodsOrder/update'),
              method: 'post',
              data: this.$http.adornData({
                'orderId': row.order_id,
                'orderStata': 5
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
        } else if ( row.order_state === -1) {
          this.$message.error("退单无法在此提交！")
        } else {
          this.$message.error("已提交！")
        }
      },
      openDetails (val) {
        this.DetailsVisible = true
        this.$nextTick(() => {
          this.$refs.ViewDetails.init(val)
        })
      },
      // 新增
      addHandle () {
    //   this.$confirm(`确定新增订单？`, '提示', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    // }).then(() => {
    //     this.$http({
    //     url: this.$http.adornUrl('/order/goodsOrder/save'),
    //     method: 'post',
    //     data: this.$http.adornData()
    //   }).then(({data}) => {
    //     if (data && data.code === 0) {
    //       this.$message({
    //         message: '操作成功',
    //         type: 'success',
    //         duration: 1500,
    //         onClose: () => {
    //         this.getDataList()
    //     }
    //     })
    //     } else {
    //       this.$message.error(data.msg)
    //     }
    //   })
    //   })
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(1, 1)
        })
      },
       // 修改
      addOrUpdateHandle (val) {
          this.addOrUpdateVisible = true
          this.$nextTick(() => {
            this.$refs.addOrUpdate.init(val, 2)
          })
      },
      // 删除
      deleteHandle (row) {
        if (row.order_state === 0 || row.order_state === -1) {
          this.$http({
            url: this.$http.adornUrl('/orders/delete'),
            method: 'post',
            params: this.$http.adornParams({
              'id': row.id,
              'order_no': row.order_no
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
        } else {
          this.$message.error("已提交，无法删除")
        }
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
