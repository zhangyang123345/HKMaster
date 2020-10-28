<template>
  <el-dialog
    :title="'订单详情'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单号">
            <el-autocomplete
              v-model="dataForm.orderId"
              :fetch-suggestions="querySearchAsync"
              placeholder="商品名"
              @select="handleSelect"
            ></el-autocomplete>
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
  </el-dialog>
  <!-- 弹窗, 新增 / 修改 -->

</template>

<script>
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
    methods: {
      init (msg) {
        this.visible = true
        console.log(msg)
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
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
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        this.$http({

          url: this.$http.adornUrl("/order/goodsOrder/Checkinfo"),

          method: "post",

          params: this.$http.adornParams({

            orderId:queryString

          })

        }).then(({ data }) => {
          console.log(data)
          this.newrestaurants = data.orderInfo
        for(var i=0;i<data.orderInfo.length;i++){

          this.newrestaurants[i].value = this.newrestaurants[i].orderId;

        }
        // console.log("this.newrestaurants="+JSON.stringify(this.newrestaurants))
        // var results = queryString ? data.page.list.filter(this.createStateFilter(queryString)) : data.page.list;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.newrestaurants);
      }, 100 * Math.random());
      });
      },
      handleSelect(item) {
        console.log(item)
        this.dataForm.alltotal = item.orderInfo.alltotal
        this.dataForm.promoterName = item.orderInfo.username
        this.dataForm.orderStata = item.orderInfo.orderStata
        this.stata = item.orderInfo.orderStata
        this.dataForm.orderType = item.orderInfo.orderType
        this.dataForm.num = item.orderInfo.num
        this.dataList = item.zdd_list
        // this.dataForm.goodsId = item.goodsId
        // this.dataForm.goodsName = item.goodsName
        // this.dataForm.goodsMaterial = item.goodsMaterial
        // this.dataForm.price = item.price
        // this.dataForm.specs = item.specs
        // this.dataForm.type = item.type
        // this.dataForm.life = item.life
        // this.dataForm.materialQuality = item.materialQuality
        // this.dataForm.manufacturer = item.manufacturer
        // this.dataForm.type = item.type
      }
    }
  }
</script>
