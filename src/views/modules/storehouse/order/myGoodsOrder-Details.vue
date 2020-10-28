<template>
  <el-dialog
    :title="!dataForm.orderId ? '新增(只需添加物品信息)' : '订单详情'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row>
        <el-col :span="8">
    <el-form-item label="订单号">
      <el-input v-model="dataForm.orderId" placeholder="订单号" readonly></el-input>
    </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单发起人" >
            <el-input v-model="dataForm.promoterName" placeholder="订单发起人" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物件总数量">
            <el-input v-model="dataForm.num" placeholder="物件总数量" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="总价格">
            <el-input v-model="dataForm.alltotal" placeholder="总价格" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单状态">
            <el-input v-model="dataForm.orderStata" placeholder="订单状态" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单类型">
            <el-input v-model="dataForm.orderType" placeholder="订单类型" readonly>
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
        prop="zdd_order_id"
        header-align="center"
        align="center"
        label="子订单号">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        header-align="center"
        align="center"
        label="物品名称">
      </el-table-column>
      <el-table-column
        prop="num"
        header-align="center"
        align="center"
        label="物品总数量">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="总价格">
      </el-table-column>
      <el-table-column
        prop="zddType"
        header-align="center"
        align="center"
        label="订单类型">
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
          goodsId: '',
          name: '',
          alltotal: '',
          num: '',
          orderId: '',
          promoterName: '',
          orderStata: '',
          orderType: ''

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
      init (id, type) {
        this.dataListLoading = true
       if(type == 1){
         this.dataForm.orderId = id || ''
       }
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
