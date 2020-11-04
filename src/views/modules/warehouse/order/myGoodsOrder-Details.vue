<template>
  <el-dialog
    width= "90%"
    :title="!dataFormState ? '新增(只需添加物品信息)' : '订单详情'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row v-if=dataFormState>
        <el-col :span="4">
          <el-form-item label="订单号" prop="order_no">
            <el-input v-model="dataForm.order_no"  placeholder="订单号" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" v-if=dataFormState>
          <el-form-item label="发起人工号" prop="job_no">
            <el-input v-model="dataForm.job_no" placeholder="发起人工号" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="5" v-if=dataFormState >-->
          <!--<el-form-item label="发起人姓名">-->
            <!--<el-input v-model="dataForm.name" placeholder="发起人姓名" :disabled=dataFormState></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="5" v-if=dataFormState>
          <el-form-item label="审核人" prop="review_fir">
            <el-input v-model="dataForm.review_fir" placeholder="审核人" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="5" v-if=dataFormState>-->
          <el-col :span="5" v-if="etime != null && etime != ''">
          <el-form-item label="结单时间" prop="etime">
            <el-input v-model="dataForm.etime" placeholder="结单时间" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="创建时间" prop="stime">
            <el-input v-model="dataForm.stime" placeholder="创建时间" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="订单类型" prop="order_type">
            <el-input v-if="dataFormState" v-model="dataForm.order_type" placeholder="审核类型" :disabled=dataFormState>
              <template scope="scope">
                <div v-if="dataForm.order_type==1">入库</div>
                <div v-if="dataForm.order_type==2">出库</div>
                <div v-if="dataForm.order_type==3">报废</div>
              </template>
            </el-input>
            <el-select  v-else  v-model="dataForm.order_type" placeholder="订单类型" >
              <el-option label="入库" value="1"></el-option>
              <el-option label="出库" value="2"></el-option>
              <el-option label="报废" value="3"></el-option>
            </el-select>
            <!--<el-input v-if="dataForm.order_type===1">待EHS审核</el-input>-->
              <!--<el-input v-if="dataForm.order_type===2">待主管审核</el-input>-->
              <!--<el-input v-if="dataForm.order_type===3">待经理审核</el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="预计需求时间" prop="exp_date">
            <el-date-picker :disabled=dataFormState
              v-model="dataForm.exp_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="总金额" prop="alltotal">
            <el-input v-model="dataForm.alltotal" placeholder="总金额" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5"  v-if=dataFormState>
          <el-form-item label="实际金额" prop="reall_total">
            <el-input v-model="dataForm.reall_total" placeholder="实际金额" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" v-if=dataFormState >
          <el-form-item label="审核类型" prop="exam_type">
            <el-input v-model="dataForm.exam_type" placeholder="审核类型" :disabled=dataFormState>
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
      <el-form-item prop="tableData">
        <!--<el-button v-if="stata=='待提交'" type="primary" @click="addOrUpdateHandle()">新增子订单</el-button>-->

      <el-table
        v-if="!dataFormState"
        :data="dataForm.tableData"

        border
        v-loading="dataListLoading"
        align="left"
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
          align="left"
          label="序号"
          width="70">
          <template slot-scope="scope">
            <el-form-item>
              {{scope.$index+1}}
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="article_name"
          header-align="center"
          align="center"
          label="物品名称"
          width="450">
          <template slot-scope="scope" width="100%">
            <el-form-item  :prop="'tableData.' + scope.$index + '.article_name'" align="center">
              <el-autocomplete v-if="scope.row.edit"
                v-model="scope.row.article_name"
                :fetch-suggestions="querySearchAsync"
                placeholder="物品名称"
                @select="handleSelect"
              ></el-autocomplete>
              <span v-else>{{scope.row.article_name}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="qunatity"
          header-align="center"
          align="center"
          label="订单数量"
          width="140">
          <template slot-scope="scope" width="100%">
            <el-form-item :prop="'tableData.' + scope.$index + '.qunatity'" align="center">
              <el-input  v-if="scope.row.edit" v-model="scope.row.qunatity" placeholder="订单数量" ></el-input>
              <span v-else>{{scope.row.qunatity}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="volume"
          header-align="center"
          align="center"
          label="体积"
          width="140">
          <template slot-scope="scope" width="100%">
            <el-form-item :prop="'tableData.' + scope.$index + '.volume'" align="center">
              <span>{{scope.row.volume}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit_name"
          header-align="center"
          align="center"
          label="单位"
          width="140">
          <template slot-scope="scope" width="100%">
            <el-form-item :prop="'tableData.' + scope.$index + '.unit_name'" align="center">
              <span>{{scope.row.unit_name}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          header-align="center"
          align="center"
          label="单价"
          width="140">
          <template  slot-scope="scope" width="100%" >
            <el-form-item :prop="'tableData.' + scope.$index + '.price'" >
              <span>{{scope.row.price}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="specs_name"
          header-align="center"
          align="center"
          label="规格"
          width="140">
          <template slot-scope="scope" width="100%" >
            <el-form-item :prop="'tableData.' + scope.$index + '.specs_name'" >
              <span>{{scope.row.specs_name}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          header-align="center"
          align="center"
          label="备注"
          width="140">
          <template slot-scope="scope" width="100%" >
            <el-form-item  :prop="'tableData.' + scope.$index + '.dremark'" >
              <el-input v-if="scope.row.edit" v-model="scope.row.dremark" placeholder="备注"></el-input>
              <span v-else>{{scope.row.dremark}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="text" size="medium" @click="confirmAdd(scope.row,scope.$index)">
              <i class="el-icon-check" aria-hidden="true"></i>
            </el-button>
            <div v-else>
              <el-button type="text" size="medium" @click="editData(scope.row)">
                <i class="el-icon-edit" aria-hidden="true"></i>
              </el-button>
              <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
                <i class="el-icon-delete" aria-hidden="true"></i>
              </el-button>
            </div>
          </template>
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
      </el-form-item>
    </el-form>
    <el-button type="text" @click="addData">添加数据</el-button>
    <el-divider></el-divider>
    <el-button @click="submitData('dataForm')">提交 </el-button>
    <el-table
      v-if="dataFormState"
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
      <el-button @click="handleReset">取消</el-button>
      <el-button type="primary" @click="cehsi()">确定</el-button>
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
          exp_date: '',
          tableData: []
        },
        tableDataCache: [],
        tableDataSave: [],
        testdata: [],
        restaurants: [],
        newrestaurants: [],
        state: '',
        timeout: null,
        rules: {
          name: {
            required: true,
            message: '请输入名字'
          },
          sex: {
            required: true,
            message: '请选择性别'
          }
        },
        stata: '',
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false,
        dataFormState: false
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
      querySearchAsync (queryString, cb) {
        console.log(queryString + 123)
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        this.$http({
          url: this.$http.adornUrl("/code/queryArtic"),
          method: "get",
          params: this.$http.adornParams({
            goods_name: queryString
          })
        }).then(({ data }) => {
            this.newrestaurants = data.article.list
            for (var i = 0; i < data.article.list.length; i++) {
              this.newrestaurants[i].value = this.newrestaurants[i].article_name
            }
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(this.newrestaurants)
        }, 3000 * Math.random())
        })
      },
      // createStateFilter (queryString) {
      //   return (state) => {
      //     return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      //   }
      // },
      handleSelect (item) {
        // this.dataForm.tableData[index] = item
        // alert(JSON.stringify(item))
        item.edit = true
        this.tableDataCache.push(item)
        console.log('item========' + JSON.stringify(item))
        let testArr = JSON.parse(JSON.stringify(this.tableDataCache))
        // this.testdata.push(item)
        console.log('testdata========' + JSON.stringify(testArr))
        this.dataForm.tableData = testArr
        console.log(this.dataForm.tableData)
        // console.log(this.dataForm.tableDataCache)
      },
      // getOrderType (val) {
      //   switch (val) {
      //     case 1:
      //   }
      // },
      handleReset() {
        // this.$nextTick(() => {
          this.visible = false
        //   this.$refs['dataForm'].resetFields()
        //   console.log("取消 ++++++++++++>>>>" + this.dataForm.order_no)
        // })
      },
      init (val, val2) {
        this.dataFormState = false

        if (val2 === 1) {
        this.dataListLoading = true
          console.log(val)
        this.dataForm.id = val.id + ''
        this.dataForm.order_no = val.order_no + ''
        this.dataForm.order_type = val.order_type + ''
        this.dataForm.stime = val.stime + ''
        this.dataForm.job_no = val.job_no + ''
        this.dataForm.alltotal = val.alltotal + ''
        this.dataForm.reall_total = val.reall_total + ''
        this.dataForm.exam_type = val.exam_type + ''
        this.dataForm.review_fir = val.review_fir + ''
        this.dataForm.etime = val.etime + ''
        this.dataForm.name = val.name + ''
        this.dataForm.exp_date = val.exp_date + ''
        this.dataList = val.detail + ''
        this.dataFormState = true
        } else if (val2 === 2) {
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
          this.dataList = val.detail
        }
        console.log("order_no ++++++++++++>>>>" + this.dataForm.order_no)
       // if(type == 1){
       //   this.dataForm.orderId = id || ''
       // }
        this.visible = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        //   if (this.dataForm.orderId) {
        //     this.$http({
        //       url: this.$http.adornUrl(`/order/goodsOrder/info/${this.dataForm.orderId}`),
        //       method: 'get',
        //       params: this.$http.adornParams()
        //     }).then(({data}) => {
        //       if (data && data.code === 0) {
        //         this.dataForm.alltotal = data.orderInfo.alltotal
        //       this.dataForm.promoterName = data.orderInfo.username
        //         this.dataForm.orderStata = data.orderInfo.orderStata
        //       this.stata = data.orderInfo.orderStata
        //         this.dataForm.orderType = data.orderInfo.orderType
        //         this.dataForm.num = data.orderInfo.num
        //       this.dataList = data.zdd_list
        //       }
        //     })
        //   }
        // })
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
      },
      // 添加物料
      addData () {
        this.dataForm.tableData.push({
          edit: true
        })
        // console.log(this.dataForm.tableData)
      },
      // 提交数量
      confirmAdd (row, index) {
        console.log('row ======>' + JSON.stringify(row))
            // this.dataForm.tableDataSave = JSON.parse(JSON.stringify(this.dataForm.tableData))
            // this.dataForm.tableDataCache = JSON.parse(JSON.stringify(this.dataForm.tableDataSave))
        this.tableDataCache[index].qunatity = row.qunatity
        this.tableDataCache[index].dremark = row.dremark
        this.dataForm.tableData = JSON.parse(JSON.stringify(this.tableDataCache))
        if (this.tableDataCache[index].qunatity != null && this.tableDataCache[index].qunatity != ''){
          this.tableDataCache[index].edit = false
        } else {
          alert("请输入数量")
        }
        var alltotal = 0
        for (var i = 0; i < this.dataForm.tableData.length; i++) {
          if (this.dataForm.tableData[i].price != null && this.dataForm.tableData[i].price != '') {
            if (this.dataForm.tableData[i].qunatity != null && this.dataForm.tableData[i].qunatity != '') {

              alltotal = (this.dataForm.tableData[i].price * this.dataForm.tableData[i].qunatity) + alltotal
            }
          }
        }
        this.dataForm.alltotal = JSON.stringify(alltotal)
      },
      editData (row) {
        row.edit = true
      },
      deleteData (row, index) {
        this.dataForm.tableData.splice(index, 1)
        this.tableDataCache.splice(index, 1)
      },
      submitData (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = this.dataForm
            alert(JSON.stringify(data))
            console.log('ccc======>' + JSON.stringify(data))
            this.$http({
              url: this.$http.adornUrl("/orders/addOrUpdate"),
              method: "post",
              data: this.$http.adornData({
                "order_no": data.order_no,
                "order_type": data.order_type,
                "job_no": data.job_no,
                "stime":data.stime,
                "detail":JSON.stringify(this.tableDataSave)
              })
            }).then(({ data }) => {
              // this.newrestaurants = data.article.list
              // for (var i = 0; i < data.article.list.length; i++) {
              //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
              // }
              if (data.code === 0) {
                alert("保存成功")
              }
            })
          }
        })
      }
    }
  }
</script>
