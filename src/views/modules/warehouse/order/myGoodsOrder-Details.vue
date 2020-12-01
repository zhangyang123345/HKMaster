<template>
  <el-dialog
    width= "90%"
    top="5vh"
    :close-on-click-modal="false"
    append-to-body
    :visible.sync="visible">
    <el-form :model="dataForm" class="orderStyle"  ref="dataForm"  label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订 单 号" prop="order_no">
            <el-input v-model="dataForm.order_no"  placeholder="订单号" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预计需求时间" prop="exp_date">
            <el-date-picker v-model="dataForm.exp_date"
                            type="datetime"
                            style="width:100%;"
                            @change="dateCheck"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结单时间" prop="etime">
            <el-input v-model="dataForm.etime" placeholder="结单时间" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="创建时间" prop="stime">
            <el-input v-model="dataForm.stime" placeholder="创建时间" readonly></el-input>
          </el-form-item>
        </el-col>
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

      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单金额" prop="alltotal">
            <el-input v-model="dataForm.alltotal" placeholder="总金额" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="实际金额" prop="reall_total">
            <el-input v-model="dataForm.reall_total" placeholder="实际金额" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单类型" prop="order_type">
            <el-select v-model="dataForm.order_type" placeholder="订单类型" style="width:100%;">
              <el-option v-for="item in typeOption"
                         :key="item.value"
                         :label="item.lable"
                         :value="item.value"></el-option>
            </el-select>
            <!--<el-input v-if="dataForm.order_type===1">待EHS审核</el-input>-->
            <!--<el-input v-if="dataForm.order_type===2">待主管审核</el-input>-->
            <!--<el-input v-if="dataForm.order_type===3">待经理审核</el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item  label="订单状态" prop="order_state">
            <template slot-scope="scope">
              <el-input v-if="dataForm.order_state==-2" value = "订单异常结束"></el-input>
              <el-input v-if="dataForm.order_state==-1"  value = "退单"></el-input>
              <el-input v-if="dataForm.order_state==0"  value = "待提交"></el-input>
              <el-input v-if="dataForm.order_state==1"  value = "待EHS审核"></el-input>
              <el-input v-if="dataForm.order_state==2"  value = "待主管审核"></el-input>
              <el-input v-if="dataForm.order_state==3"  value = "待经理审核"></el-input>
              <el-input v-if="dataForm.order_state==4"  value = "待厂长审核"></el-input>
              <el-input v-if="dataForm.order_state==5"   value = "待处理"></el-input>
              <el-input v-if="dataForm.order_state==6"  value = "待结单"></el-input>
              <el-input v-if="dataForm.order_state==7"  value = "完成"></el-input>
            </template>
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
      <el-row>
        <el-col :span="6" >
          <el-form-item label="发 起 人" prop="name">
            <el-input v-model="dataForm.name" placeholder="发起人" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="主     管" prop="name">
            <el-input v-model="dataForm.director" placeholder="主     管" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" >
          <el-form-item label="备    注" prop="remarks">
            <el-input v-model="dataForm.remarks" placeholder="备注" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-button v-if="stata=='待提交'" type="primary" @click="addOrUpdateHandle()">新增子订单</el-button>-->
      <el-table
        height="550"
        :data="tableData"
        border
        v-loading="dataListLoading"
        align="left"
        style="width: 100%;">
        <!--<el-table-column-->
        <!--prop="id"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="序号"-->
        <!--width="80">-->
        <!--<template slot-scope="scope">-->
        <!--<span v-if="scope.$index === 0 && dataForm.order_state == 0"></span>-->
        <!--<span v-else>{{scope.$index}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="article_no"
          header-align="center"
          align="center"
          label="物品编码"
          width="250">
        </el-table-column>
        <el-table-column
          prop="article_name"
          header-align="center"
          align="center"
          label="物品名称"
          width="240">
          <template slot-scope="scope" width="100%" align="left">
            <el-autocomplete v-if="scope.row.edit"
                             v-model="scope.row.article_name"
                             :fetch-suggestions="querySearchAsync"
                             popper-class="autoComp"
                             placeholder="物品名称"
                             @select="handleSelect"
            >
              <template slot-scope="{ item }">
                <div>
                  <div class="inputA">{{ item.article_name }}</div>
                  <div class="inputM">{{ item.manufacturer_name }}</div>
                  <div class="inputP">{{ item.price }}</div>
                  <div class="inputU">{{ item.unit_name }}</div>
                  <div class="inputS">{{ item.specs_name }}</div>
                </div>
              </template>
            </el-autocomplete>
            <span v-else>{{scope.row.article_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="manufacturer_name"
          header-align="center"
          align="center"
          label="厂商"
          width="140">
        </el-table-column>
        <el-table-column
          prop="qunatity"
          header-align="center"
          align="center"
          label="订单数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="amount"
          header-align="center"
          align="center"
          label="订单金额"
          width="120">
        </el-table-column>
        <el-table-column
          prop="actual_qunatity"
          header-align="center"
          align="center"
          label="已处理数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="actual_mount"
          header-align="center"
          align="center"
          label="已处理金额"
          width="140">
        </el-table-column>
        <el-table-column
          prop="unit_name"
          header-align="center"
          align="center"
          label="单位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="price"
          header-align="center"
          align="center"
          label="单价"
          width="80">
        </el-table-column>
        <el-table-column
          prop="specs_name"
          header-align="center"
          align="center"
          label="规格"
          width="100">
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
    </el-form>
    <el-divider></el-divider>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
      <!--<el-button  v-if="dataForm.order_state==0" type="primary" @click="saveOrUpdateData('dataForm')">保存</el-button>
      <el-button  v-if="dataForm.order_state==0" @click="subData('dataForm')">提交</el-button>-->
    </span>
  </el-dialog>
</template>
<style>
  .my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

  .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .addr {
    font-size: 12px;
    color: #b4b4b4;
  }

  .highlighted .addr {
    color: #ddd;
  }
  }
  }
  .autoComp{ width:800px;}
  .autoComp  .el-scrollbar{
    width:800px;
  }
  .inputA{
    float:left;
    width: 30%;
  }
  .inputM{
    float:left;
    width: 30%;
  }
  .inputP{
    float:left;
    width: 10%;
  }
  .inputU{
    float:left;
    width: 10%;
  }
  .inputS{
    float:left;
    width: 20%;
  }
  .orderStyle{

  }
  .orderStyle .el-form-item,.el-col{
    margin-bottom:0px!important;
  }
  .orderStyle .el-row{
    margin-bottom: 20px;
  }
</style>

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
          order_state: 0,
          exam_type: '',
          review_fir: '',
          remarks: '',
          etime: '',
          name: '',
          director: '',
          exp_date: ''
        },
        tableData: [],
        dataFormState: false,
        dataListLoading: false,
        tableDataCache: [],
        newrestaurants: [],
        typeOption: [{value:1,lable:"入库"},{value:2,lable:"出库"},{value:3,lable:"报废"}],
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
        this.$http({
          url: this.$http.adornUrl('/code/queryArtic'),
          method: 'get',
          params: this.$http.adornParams({
            goods_name: queryString
          })
        }).then(({data}) => {
          this.newrestaurants = data.article.list
        // for (var i = 0; i < data.article.list.length; i++) {
        //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
        //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
        // }
        // console.log("this.newrestaurants="+JSON.stringify(this.newrestaurants))
        // var results = queryString ? data.page.list.filter(this.createStateFilter(queryString)) : data.page.list;
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(this.newrestaurants)
      }, 100 * Math.random())
      })
      },
      calAmount () {
        var alltotal = 0
        for (var i = 1; i < this.tableData.length; i++) {
          if (this.tableData[i].price != null && this.tableData[i].price != '') {
            if (this.tableData[i].qunatity != null && this.tableData[i].qunatity != '') {
              this.tableData[i].amount = (this.tableData[i].price * this.tableData[i].qunatity).toFixed(2)
              alltotal = parseFloat(this.tableData[i].amount) + parseFloat(alltotal)
            }
          }
        }
        this.dataForm.alltotal = alltotal
      },
      dateCheck (){
        var date = new Date()
        if (date > this.dataForm.exp_date) {
          this.dataForm.exp_date = ''
          this.$message({
            message: "预计需求时间不可小于当前时间！",
            type: 'error'
          });
        }
      },
      handleSelect (item) {
        var msg ;
        var buff = true ;
        for (var i = 1 , len = this.tableData.length ; i < len ; i ++) {
          if (this.tableData[i].article_no.indexOf(item.article_no) >= 0 ) {
            buff = false ;
            msg = "此物品列表已存在！";
          }
        }
        if (buff) {
          this.tableData.push(item)
          this.tableData[0].article_name = ''
        } else {
          this.$message({
            message: msg,
            type: 'error'
          });
        }
      },
      submitData (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = this.dataForm
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
              if (data.code === 0) {
              this.$message({
                message: '保存成功！',
                type: 'success',
                duration: 1500
              })
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
            this.tableData.shift()
            this.$http({
              url: this.$http.adornUrl("/orders/addOrUpdate"),
              method: "post",
              data: this.$http.adornData({
                "order_no": this.dataForm.order_no,
                "order_state" : 5,
                "id" : this.dataForm.id,
                "order_type": this.dataForm.order_type,
                "job_no": this.dataForm.job_no,
                "alltotal": this.dataForm.alltotal,
                "exp_date" : this.dataForm.exp_date,
                "detail": JSON.stringify(this.tableData)
              })
            }).then(({ data }) => {
              if (data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500
              })
              this.tableData.unshift({edit: true})
              this.visible = false
              this.$emit('refreshDataList')
            } else {
              this.$message({
                message: data.msg,
                type: 'error'
              });
            }
          })
          }
        })
      },
      check () {
        var buff = true
        var cmsg = ""
        if (this.dataForm.order_type == null || this.dataForm.order_type === "") {
          cmsg = "订单类型不可为空！"
          buff = false
        }

        for (var i = 1; i < this.tableData.length; i++) {
          if (this.tableData[i].price != null && this.tableData[i].price != '') {
            if (this.tableData[i].qunatity <= 0) {
              cmsg = "所有物品数量必须大于零！"
              buff = false
            }
          }
        }
        if (!buff) {
          this.$message.error(cmsg)
        }
        return buff;
      },
      saveOrUpdateData (formName) {
        if (this.check()) {
          this.$refs[formName].validate((valid) => {
            if(valid) {
              this.tableData.shift()
              this.$http({
                url: this.$http.adornUrl("/orders/addOrUpdate"),
                method: "post",
                data: this.$http.adornData({
                  "order_no": this.dataForm.order_no,
                  "order_state": this.dataForm.order_state,
                  "id": this.dataForm.id,
                  "order_type": this.dataForm.order_type,
                  "job_no": this.dataForm.job_no,
                  "alltotal": this.dataForm.alltotal,
                  "exp_date": this.dataForm.exp_date,
                  "detail": JSON.stringify(this.tableData)
                })
              }).then(({data}) => {
                // this.newrestaurants = data.article.list
                // for (var i = 0; i < data.article.list.length; i++) {
                //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
                // }
                if ( data.code === 0 ) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500
                })
                this.init(data.order, 2)
                this.tableData.unshift({edit: true})
              } else {
                this.$message.error(data.msg)
              }
            })
            }
          })
        }
      },
      init (val, val1) {
          this.visible = true
          this.$http({
            url: this.$http.adornUrl(`/orders/getDetail`),
            method: 'post',
            params: this.$http.adornParams({
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
            this.dataForm.director = data.orders.director
            this.tableData = data.orders.detail
            this.dataForm.remarks = data.orders.remarks
            this.dataForm.exp_date = data.orders.exp_date
            this.dataListLoading = false
          }
        })
      },
      addData () {
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].edit = false
        }
        this.tableData.push({
          edit: true
        })
        // console.log(this.dataForm.tableData)
      },
      deleteData (row, index) {
        this.tableData.splice(index, 1)
        this.tableDataCache.splice(index, 1)
        this.calAmount ()
      },
      editData (row) {
        row.edit = true
      }
    }
  }
</script>
