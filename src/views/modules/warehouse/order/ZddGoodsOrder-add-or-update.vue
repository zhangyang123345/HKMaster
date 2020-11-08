<template>
  <el-dialog
    width= "90%"
    top="1vh"
    :title="!dataForm.order_no ? '新增' : '修改'"
    :close-on-click-modal="false"
    append-to-body
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单号" prop="order_no">
            <el-input v-model="dataForm.order_no"  placeholder="订单号" :disabled=true></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="5" v-if=dataFormState>-->
          <!--<el-form-item label="发起人" prop="name">-->
            <!--<el-input v-model="dataForm.job_no" placeholder="发起人" :disabled=true></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" v-if=dataFormState >-->
        <!--<el-form-item label="发起人姓名">-->
        <!--<el-input v-model="dataForm.name" placeholder="发起人姓名" :disabled=dataFormState></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" v-if=dataFormState>-->
          <!--<el-form-item label="审核人" prop="review_fir">-->
            <!--<el-input v-model="dataForm.review_fir" placeholder="审核人" :disabled=true></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" v-if=dataFormState>-->
        <el-col :span="6">
          <el-form-item label="结单时间" prop="etime">
            <el-input v-model="dataForm.etime" placeholder="结单时间" :disabled=true></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建时间" prop="stime">
            <el-input v-model="dataForm.stime" placeholder="创建时间" :disabled=true></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单类型" prop="order_type">
            <el-input v-if="dataFormState" v-model="dataForm.order_type" placeholder="订单类型" :disabled=dataFormState>
              <template slot-scope="scope">
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
        <el-col :span="6">
          <el-form-item label="预计需求时间" prop="exp_date">
            <el-date-picker :disabled=dataFormState
                            v-model="dataForm.exp_date"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="总金额" prop="alltotal">
            <el-input v-model="dataForm.alltotal" placeholder="总金额" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"  v-if=dataFormState>
          <el-form-item label="实际金额" prop="reall_total">
            <el-input v-model="dataForm.reall_total" placeholder="实际金额" :disabled=dataFormState></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="5" v-if=dataFormState >-->
          <!--<el-form-item label="审核类型" prop="exam_type">-->
            <!--<el-input v-model="dataForm.exam_type" placeholder="审核类型" :disabled=dataFormState>-->
              <!--<template slot-scope="scope">-->
                <!--<div v-if="dataForm.exam_type==1">待EHS审核</div>-->
                <!--<div v-if="dataForm.exam_type==2">待主管审核</div>-->
                <!--<div v-if="dataForm.exam_type==3">待经理审核</div>-->
                <!--<div v-if="dataForm.exam_type==4">待厂长审核</div>-->
              <!--</template>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
      <el-form-item align="left" prop="tableData" label-width="0px">
        <!--<el-button v-if="stata=='待提交'" type="primary" @click="addOrUpdateHandle()">新增子订单</el-button>-->

        <el-table
          height="350"
          :data="dataForm.tableData"
          border
          v-loading="dataListLoading"
          align="left"
          style="width: 100%;">
          <el-table-column
            prop="id"
            header-align="center"
            align="center"
            label="序号"
            width="120">
            <template slot-scope="scope">
              <el-form-item>
                {{scope.$index+1}}
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="article_name"
            header-align="center"
            align="left"
            label="物品名称"
            width="300">
            <template slot-scope="scope" width="100%" align="left">
              <el-form-item :prop="'tableData.' + scope.$index + '.article_name'" align="center">
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
                <el-input  v-model="scope.row.qunatity" @change="calAmount(scope.row,scope.$index)" placeholder="订单数量" ></el-input>
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
            <template  scope="scope" width="100%" >
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
            prop="amount"
            header-align="center"
            align="center"
            label="合价"
            width="140">
            <template slot-scope="scope" width="100%">
              <el-form-item :prop="'tableData.' + scope.$index + '.amount'" >
                <span>{{scope.row.amount}}</span>
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
                <el-input v-model="scope.row.dremark" placeholder="备注"></el-input>
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

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveOrUpdateData('dataForm')">保存</el-button>
      <el-button @click="subData('dataForm')">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
          order_state: '',
          exam_type: '',
          review_fir: '',
          etime: '',
          name: '',
          tableData: [],
          exp_date: ''
        },
        dataFormState: false,
        dataListLoading: false,
        tableDataCache: [],
        newrestaurants: [],
        dataRule: {
          goodsName: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      querySearchAsync (queryString, cb) {
        // var restaurants = this.restaurants;
        this.$http({

          url: this.$http.adornUrl('/code/queryArtic'),

          method: 'get',

          params: this.$http.adornParams({

            goods_name: queryString
          })
        }).then(({data}) => {
          this.newrestaurants = data.article.list
        // console.log(this.newrestaurants)
          for (var i = 0; i < data.article.list.length; i++) {
            this.newrestaurants[i].value = this.newrestaurants[i].article_name
          }
        // console.log("this.newrestaurants="+JSON.stringify(this.newrestaurants))
        // var results = queryString ? data.page.list.filter(this.createStateFilter(queryString)) : data.page.list;

        clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
          cb(this.newrestaurants)
    }, 100 * Math.random())
    })
    },
      calAmount (row, index) {
        console.log('row ======>' + JSON.stringify(row))
        // this.dataForm.tableDataSave = JSON.parse(JSON.stringify(this.dataForm.tableData))
        // this.dataForm.tableDataCache = JSON.parse(JSON.stringify(this.dataForm.tableDataSave))
        // this.dataForm.tableData = JSON.parse(JSON.stringify(this.tableDataCache))
        // this.dataForm.tableData[index].amount = JSON.stringify(amo)
        var alltotal = 0
        for (var i = 1; i < this.dataForm.tableData.length; i++) {
          if (this.dataForm.tableData[i].price != null && this.dataForm.tableData[i].price != '') {
            if (this.dataForm.tableData[i].qunatity != null && this.dataForm.tableData[i].qunatity != '') {
              alltotal = (this.dataForm.tableData[i].price * this.dataForm.tableData[i].qunatity) + alltotal
              this.dataForm.tableData[i].amount = this.dataForm.tableData[i].price * this.dataForm.tableData[i].qunatity
            }
          }
        }
        this.dataForm.alltotal = JSON.stringify(alltotal)
      },
      handleSelect (item) {
        // for (var i = 0; i < this.dataForm.tableData.length; i++) {
        //   console.log(item.article_name + this.dataForm.tableData[i].article_name + '123456')
        //   if (item.article_name.equals(this.dataForm.tableData[i].article_name)) {
        //     console.log(item.article_name + this.dataForm.tableData[i].article_name + '11111')
        //     alert('列表已存在该物品')
        //   }
        // }
        // console.log(this.dataForm.tableData)
        item.edit = false
        item.amount = 0
        this.dataForm.tableData.push(item)
        this.dataForm.tableData[0].article_name = ''
        // this.dataForm.tableData.insert(1, item)
        // console.log('+++++++++++++' + this.dataForm.tableData)
        // this.tableDataCache.push(item)
        // console.log('item========' + JSON.stringify(item))
        // let testArr = JSON.parse(JSON.stringify(this.tableDataCache))
        // this.testdata.push(item)
        // console.log('testdata========' + JSON.stringify(testArr))
        // this.dataForm.tableData = testArr
        // console.log(this.dataForm.tableData)
        // console.log(this.dataForm.tableDataCache)
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
      },
      confirmAdd (row, index) {
      },
      subData (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // var arrT = []
            // for (var i = 1; i < this.dataForm.tableData.length - 1; i++) {
            //   arrT.push(this.dataForm.tableData[i])
            // }
            // this.dataForm.tableData = JSON.parse(JSON.stringify(arrT))
            this.dataForm.tableData.shift()
            // alert(JSON.stringify(data))
            console.log('ccc======>' + JSON.stringify(this.dataForm))
            this.$http({
              url: this.$http.adornUrl("/orders/addOrUpdate"),
              method: "post",
              data: this.$http.adornData({
                "order_no": this.dataForm.order_no,
                "order_state" : 1,
                "id" : this.dataForm.id,
                "order_type": this.dataForm.order_type,
                "job_no": this.dataForm.job_no,
                "alltotal": this.dataForm.alltotal,
                "exp_date" : this.dataForm.exp_date,
                "detail": JSON.stringify(this.dataForm.tableData)
              })
            }).then(({ data }) => {
              // this.newrestaurants = data.article.list
              // for (var i = 0; i < data.article.list.length; i++) {
              //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
              // }
              if (data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500
                })
                this.dataForm.tableData.unshift({edit: true})
                this.visible = false
              } else {
                alert(data.code)
              }
            })
          }
        })
      },
      saveOrUpdateData (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // var arrT = []
            // for (var i = 1; i < this.dataForm.tableData.length - 1; i++) {
            //   arrT.push(this.dataForm.tableData[i])
            // }
            // this.dataForm.tableData = JSON.parse(JSON.stringify(arrT))
            this.dataForm.tableData.shift()
            // alert(JSON.stringify(data))
            console.log('ccc======>' + JSON.stringify(this.dataForm))
            this.$http({
              url: this.$http.adornUrl("/orders/addOrUpdate"),
              method: "post",
              data: this.$http.adornData({
                "order_no": this.dataForm.order_no,
                "order_state" : this.dataForm.order_state,
                "id" : this.dataForm.id,
                "order_type": this.dataForm.order_type,
                "job_no": this.dataForm.job_no,
                "alltotal": this.dataForm.alltotal,
                "exp_date" : this.dataForm.exp_date,
                "detail": JSON.stringify(this.dataForm.tableData)
              })
            }).then(({ data }) => {
              // this.newrestaurants = data.article.list
              // for (var i = 0; i < data.article.list.length; i++) {
              //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
              // }
              if (data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500
                })
                this.dataForm.tableData.unshift({edit: true})
              } else {
                alert(data.code)
              }
            })
          }
        })
      },
      init (val, val1) {
        console.log('==========>>>>>>' + val1)
        if (val1 === 1) {
          this.dataForm.id = ''
          this.dataForm.order_no = ''
          this.dataForm.order_type = ''
          this.dataForm.order_state = ''
          this.dataForm.job_no = ''
          this.dataForm.alltotal = ''
          this.dataForm.reall_total = ''
          this.dataForm.stime = ''
          this.dataForm.exam_type = ''
          this.dataForm.review_fir = ''
          this.dataForm.etime = ''
          this.dataForm.name = ''
          this.dataForm.tableData = []
          this.dataForm.exp_date = ''
          this.visible = true
          this.dataListLoading = false
          this.dataForm.tableData.push({
            edit: true
          })
          console.log('===========zdd' + val1)
        } else if (val1 === 2) {
          this.$nextTick(() => {
            // this.$refs['dataForm'].resetFields()
            this.visible = true
              this.$http({
                url: this.$http.adornUrl(`/orders/getDetail`),
                method: 'post',
                // params: this.$http.adornParams()
                params: this.$http.adornParams({
                  // 'page': this.pageIndex,
                  // 'rows': this.pageSize,
                  // 'keytime': this.dataForm.keyTime + '',
                  // 'order_type': this.dataForm.order_type,
                  'order_no': val.order_no
                })
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.dataForm.id = data.orders.id
                  this.dataForm.order_no = data.orders.order_no
                  this.dataForm.order_type = data.orders.order_type
                  this.dataForm.order_state = data.orders.order_state
                  this.dataForm.job_no = data.orders.job_no
                  this.dataForm.alltotal = data.orders.alltotal
                  this.dataForm.reall_total = data.orders.reall_total
                  this.dataForm.stime = data.orders.stime
                  this.dataForm.exam_type = data.orders.exam_type
                  this.dataForm.review_fir = data.orders.review_fir
                  this.dataForm.etime = data.orders.etime
                  this.dataForm.name = data.orders.name
                  this.dataForm.tableData = data.orders.detail
                  this.dataForm.exp_date = data.orders.exp_date
                  this.dataListLoading = false
                  this.dataForm.tableData.unshift({
                    edit: true
                  })
                  console.log(this.dataForm.id)
                  console.log('update ++++++' + JSON.stringify(this.dataForm))
                }
              })
          })
          console.log('========update' + val.detail[1].order_no)
        }
        // this.dataForm.id = id || ''
        // this.dataForm.name = val.name + ''
        // for (var i = 0; i < this.dataForm.tableData.length; i++) {
        //   this.dataForm.tableData[i].edit = false
        // }
      },
      addData () {
        for (var i = 0; i < this.dataForm.tableData.length; i++) {
          this.dataForm.tableData[i].edit = false
        }
        this.dataForm.tableData.push({
          edit: true
        })
        // console.log(this.dataForm.tableData)
      },
      deleteData (row, index) {
        this.dataForm.tableData.splice(index, 1)
        this.tableDataCache.splice(index, 1)
      },
      editData (row) {
        row.edit = true
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/order/zddGoodsOrder/${!this.dataForm.zddOrderId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'orderId': this.dataForm.orderId || undefined,
                'goodsId': this.dataForm.goodsId || undefined,
                'zddType': this.dataForm.zddType,
                'num': this.dataForm.num,
                'price': this.dataForm.price
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                  Object.assign(this.$data, this.$options.data())
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
