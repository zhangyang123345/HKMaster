<template>
  <el-dialog
    width= "90%"
    :title="!dataForm.orderId ? '新增(只需添加物品信息)' : '订单详情'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row>
        <el-col :span="4">
    <el-form-item label="订单号">
      <el-input v-model="dataForm.order_no" placeholder="订单号" readonly></el-input>
    </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="发起人工号">
            <el-input v-model="dataForm.job_no" placeholder="发起人工号" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="总金额">
            <el-input v-model="dataForm.alltotal" placeholder="总金额" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="审核人">
            <el-input v-model="dataForm.review_fir" placeholder="审核人" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="审核时间">
            <el-input v-model="dataForm.exp_date" placeholder="审核时间" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="实际金额">
            <el-input v-model="dataForm.reall_total" placeholder="实际金额" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="创建时间">
            <el-input v-model="dataForm.stime" placeholder="创建时间" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单类型">
            <el-input v-model="dataForm.exam_type" placeholder="订单类型" readonly>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="发起人姓名">
            <el-input v-model="dataForm.name" placeholder="发起人姓名" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="审核类型">
            <el-input v-model="dataForm.exam_type" placeholder="审核类型" readonly>
              <template scope="scope">
                <div v-if="dataForm.exam_type==1">待EHS审核</div>
                <div v-if="dataForm.exam_type==2">待主管审核</div>
                <div v-if="dataForm.exam_type==3">待经理审核</div>
                <div v-if="dataForm.exam_type==4">待厂长审核</div>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-if="stata=='待提交'" type="primary" @click="addOrUpdateHandle()">新增子订单</el-button>
</el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <!--<el-table-column-->
      <!--type="selection"-->
      <!--header-align="center"-->
      <!--align="center"-->
      <!--width="50">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="子订单号">
      </el-table-column>
      <el-table-column
        prop="article_name"
        header-align="center"
        align="center"
        label="物品名称">
      </el-table-column>
      <el-table-column
        prop="volume"
        header-align="center"
        align="center"
        label="体积">
      </el-table-column>
      <el-table-column
        prop="qunatity"
        header-align="center"
        align="center"
        label="订单数量">
      </el-table-column>
      <el-table-column
        prop="actual_mount"
        header-align="center"
        align="center"
        label="实际数量">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="unit"
        header-align="center"
        align="center"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="specs"
        header-align="center"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="dremark"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>

      <!--<el-table-column-->
        <!--fixed="right"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--width="150"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="text" size="small" @click="Details(scope.row.goodsId)">查看详情</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="init"></add-or-update>
  </el-dialog>
  <!-- 弹窗, 新增 / 修改 -->

</template>

<script>
   import AddOrUpdate from './ZddGoodsOrder-add-or-update'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: '',
          order_no: '',
          order_type: '',
          job_no: '',
          alltotal: '',
          reall_total: '',
          stime: '',
          exam_type: '',
          review_fir: '',
          etime: '',
          name: '',
          exp_date: ''
        },
        stata: '',
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false
        // dataRule: {
        //   name: [
        //     { required: true, message: '商品名称不能为空', trigger: 'blur' }
        //   ],
        //   intro: [
        //     { required: true, message: '介绍不能为空', trigger: 'blur' }
        //   ],
        //   price: [
        //     { required: true, message: '价格不能为空', trigger: 'blur' }
        //   ],
        //   num: [
        //     { required: true, message: '数量不能为空', trigger: 'blur' }
        //   ]
        // }
      }
    },
    components: {
      AddOrUpdate
    },
    methods: {
      getOrderType (val) {
        switch (val) {
          case 1:
        }
      },
      init (val, val2) {
        this.dataListLoading = true
        this.dataForm.id = val.id
        this.dataForm.order_no = val.order_no
        this.dataForm.stime = val.stime
        this.dataForm.job_no = val.job_no
        this.dataForm.alltotal = val.alltotal
        this.dataForm.reall_total = val.reall_total
        this.dataForm.exam_type = val.exam_type
        this.dataForm.review_fir = val.review_fir
        this.dataForm.etime = val.etime
        this.dataForm.name = val.name
        this.dataForm.exp_date = val.exp_date
        if (val2 === 1) {
          this.dataList = val.detail
        }
       // if(type == 1){
       //   this.dataForm.orderId = id || ''
       // }
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.orderId) {
            this.$http({
              url: this.$http.adornUrl(`/order/goodsOrder/info/${this.dataForm.orderId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.alltotal = data.orderInfo.alltotal
              this.dataForm.promoterName = data.orderInfo.username
                this.dataForm.orderStata = data.orderInfo.orderStata
              this.stata = data.orderInfo.orderStata
                this.dataForm.orderType = data.orderInfo.orderType
                this.dataForm.num = data.orderInfo.num
              this.dataList = data.zdd_list
              }
            })
          }
        })
        this.dataListLoading = false
      },
      // 表单提交
      dataFormSubmit () {
        this.visible = false
        this.$emit('refreshDataList')
      },
      // 新增 / 修改
      addOrUpdateHandle () {
        this.visible = true
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(this.dataForm.orderId)
      })
      }
    }
  }
</script>
