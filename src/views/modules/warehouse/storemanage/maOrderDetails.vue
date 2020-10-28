<template>
  <el-dialog
    width="90%"
    :title="!dataForm.order_no ? '新增(只需添加物品信息)' : '订单详情'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row>
         <el-col :span="8">
           <el-row>
             <el-col :span="12">
               <el-form-item label="订单号">
                 <el-input v-model="dataForm.order_no" placeholder="订单号" readonly></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="下单人" >
                 <el-input v-model="dataForm.name" placeholder="下单人" readonly></el-input>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
               <el-form-item label="总金额">
                 <el-input v-model="dataForm.alltotal" placeholder="总金额" readonly></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="已处理">
                 <el-input v-model="dataForm.reall_total" placeholder="已处理" readonly></el-input>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
               <el-form-item label="订单状态">
                 <el-input v-model="dataForm.orderStata" placeholder="订单状态" readonly></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="订单类型">
                 <el-input v-model="dataForm.orderType" placeholder="订单类型" readonly>
                 </el-input>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
               <el-form-item label="下单日期">
                 <el-input v-model="dataForm.stime" placeholder="下单日期" readonly></el-input>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="需求日期">
                 <el-input v-model="dataForm.exp_date" placeholder="需求日期" readonly>
                 </el-input>
               </el-form-item>
             </el-col>
           </el-row>
         </el-col>
        <el-col :span="16">
          <el-table
            :data="details"
            border
            height="300"
            v-loading="dataListLoading"
            style="width: 100%;">
            <el-table-column
              prop="article_no"
              header-align="center"
              v-if="showT"
              align="center"
              label="物品编码">
            </el-table-column>
            <el-table-column
              prop="article_name"
              header-align="center"
              align="center"
              label="物品名称">
            </el-table-column>
            <el-table-column
              prop="qunatity"
              header-align="center"
              align="center"
              label="物品总数量">
            </el-table-column>
            <el-table-column
              prop="actual_qunatity"
              header-align="center"
              align="center"
              label="已处理数量">
            </el-table-column>
            <el-table-column
              prop="actual_qunatity"
              header-align="center"
              align="center"
              label="现有库存">
            </el-table-column>
            <el-table-column
              prop="amount"
              header-align="center"
              align="center"
              label="订单总金额">
            </el-table-column>
            <el-table-column
              prop="actual_mount"
              header-align="center"
              align="center"
              label="已处理金额">
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
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">

        </el-col>
        <el-col :span="12">

        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-if="stata=='待提交'" type="primary" @click="addOrUpdateHandle()">新增子订单</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="init"></add-or-update>
  </el-dialog>
  <!-- 弹窗, 新增 / 修改 -->

</template>

<script>
  import AddOrUpdate from '../order/ZddGoodsOrder-add-or-update'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          name: '',
          alltotal: '',
          reall_total: '',
          stime: '',
          remarks: '',
          order_no: '',
          order_state: '',
          order_type: '',
          exp_date: ''
        },
        details: [],
        stata: '',
        showT: false,
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
      init (order_no) {
        this.dataListLoading = true
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (order_no != null) {
            this.$http({
              url: this.$http.adornUrl(`/orders/getDetail`),
              method: 'post',
              params: this.$http.adornParams({"order_no":order_no})
            }).then(({data}) => {
              if (data && data.code === 0) {
                  console.log(data.orders)
                this.details = data.orders.detail
                this.dataForm.order_no = data.orders.order_no
                this.dataForm.name = data.orders.name
                this.dataForm.alltotal = data.orders.alltotal
                this.dataForm.reall_total = data.orders.reall_total
                this.dataForm.stime = data.orders.stime
                this.dataForm.remarks = data.orders.remarks
                this.dataForm.order_state = data.orders.order_state
                this.dataForm.order_type = data.orders.order_type
                this.dataForm.exp_date = data.orders.exp_date
                console.log(data.orders)
                console.log(this.details)
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
<style>
  .el-col{
    margin-bottom:0px;
  }
  .el-form-item{
    margin-bottom:0px;
  }

</style>
