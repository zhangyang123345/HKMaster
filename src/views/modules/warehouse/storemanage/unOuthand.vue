<template>
  <el-dialog
    width="90%"
    top="1vh"
    :show-close="false"
    title="处理"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item style="width:100%" label="物品处理">
            <el-autocomplete
              v-model="underForm.scan_data"
              :fetch-suggestions="querySearchAsync"
              popper-class="autoComp"
              style="width:100%"
              placeholder="查询物品信息"
              @select="handleSelect"
            >
              <template slot-scope="{ item }">
                <div>
                  <div class="inputA">{{ item.material_no }}</div>
                  <div class="inputA">{{ item.article_name }}</div>
                  <div class="inputM">{{ item.manufacturer_name }}</div>
                  <div class="inputP">{{ item.price }}</div>
                  <div class="inputU">{{ item.unit_name }}</div>
                  <div class="inputS">{{ item.specs_name }}</div>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="处理金额">
            <el-input v-model="dataForm.reall_total" placeholder="处理金额" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单类型">
              <el-select v-model="dataForm.order_type">
                <el-option v-for="item in typeOption"
                           :key="item.value"
                           :label="item.lable"
                           :value="item.value"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="scanList"
            border
            height="400"
            v-loading="dataListLoading"
            style="width: 100%;">
            <el-table-column
              fixed="left"
              header-align="center"
              align="center"
              width="80"
              label=" ">
              <template slot-scope="scope">
                <el-button type="text" size="small"  @click="remove(scope.row.id,scope.row.article_no)">移除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="article_no"
              header-align="center"
              align="center"
              width="300"
              label="物品编码">
            </el-table-column>
            <!-- :render-header="headerScan"-->
            <el-table-column
              prop="article_name"
              header-align="center"
              align="center"
              label="物品名称">
            </el-table-column>
            <el-table-column
              label="领用人"
              header-align="center"
              align="center"
              :render-header="renderHeader"
              prop="recipient_name">
              <!--<el-input v-model="dataForm.duty_name" placeholder="仓库负责人"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item>-->
              <template slot-scope="scope"  align="left">
                  <el-autocomplete
                    v-model="scope.row.recipient_name"
                    :fetch-suggestions="emplosearch"
                    popper-class="autoComp"
                    placeholder="请输入查找"
                    @select="((item) => employeeSelect(item,scope.row.article_no))"
                  >
                    <template slot-scope="{ item }" >
                      <div >
                        <div class="inputC">{{ item.jobNo }}</div>
                        <div class="inputC">{{ item.name }}</div>
                        <div class="inputC">{{ item.department }}</div>
                        <div class="inputC">{{ item.position }}</div>
                        <div class="inputC">{{ item.director }}</div>
                      </div>
                    </template>
                  </el-autocomplete>
              </template>
            </el-table-column>
            <el-table-column
              prop="manufacturer_name"
              header-align="center"
              align="center"
              label="厂商">
            </el-table-column>
            <el-table-column
              prop="operation"
              header-align="center"
              align="center"
              label="操作数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.operation" type="number" size="small" :ref="scope.row.goods_no"
                          @change="checkNum(scope.row.article_no,scope.row.operation,scope.row.sept)"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              header-align="center"
              align="center"
              label="操作金额">
            </el-table-column>
            <el-table-column
              prop="price"
              header-align="center"
              align="center"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="unit_name"
              header-align="center"
              align="center"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="specs_name"
              header-align="center"
              align="center"
              label="规格">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="dataFormSubmit(false)">保存</el-button>
      <!--<el-button type="primary" @click="dataFormSubmit(true)">结单</el-button>-->
    </span>
  </el-dialog>
  <!-- 弹窗, 新增 / 修改 -->
</template>
<script>
  export default {
    data () {
      return {
        visible: false,
        instore: false,
        underForm: {
          scan_data: '',
          order_no: '',
          order_type: 1,
          reall_total: 0
        },
        dataForm: {
          id: '',
          name: '',
          alltotal: '',
          reall_total: '',
          stime: '',
          remarks: '',
          order_no: '',
          director: '',
          separtment: '',
          order_state: '',
          order_type: 2,
          types: '',
          states: '',
          exp_date: '',
          scan_data: '',
          exam_type: ''
        },
        typeOption: [{value:2,lable:"出库"},{value:3,lable:"报废"}],
        details: [],
        scanList: [],
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
    },
    mounted () {
      // window.addEventListener( 'beforeunload', e => this.browerStatus() );
      // TODO
    },
    methods: {
      S4 () {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      },
      guid () {
        return this.S4()+this.S4()+this.S4()+this.S4()+this.S4();
      },
      emplosearch (queryString , cb) {
        this.$http({
          url: this.$http.adornUrl('/employee/search'),
          method: 'post',
          params: this.$http.adornParams({
            'page': 1,
            'rows': 10,
            'recipient_name': queryString
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          cb(data.data.list)
        }
      })
      },
      querySearchAsync (queryString, cb) {
        this.$http({
          url: this.$http.adornUrl('/code/queryArtic'),
          method: 'get',
          params: this.$http.adornParams({
            material_no: queryString
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
      //表头
      renderHeader (_h) {
        return _h(
          'div',
          [
            _h('span', '领用人'),
            _h('el-button', {
              staticClass: "headerC",
              on: { click: () => {this.selectAllrecipt()}}
      } , [_h('span', '全选')] )
      ])
      },
      selectAllrecipt (buff) {
        var recipate = ''
        var recipient_name = ''
        var special = ''
        var office_location = ''
        var line_type = ''
        var separtment = ''
        var director = ''
        for (var index in this.scanList) {
          if (this.scanList[index].recipient != null && this.scanList[index].recipient != '') {
            recipate = this.scanList[index].recipient
            recipient_name = this.scanList[index].recipient_name
            special = this.scanList[index].special
            director = this.scanList[index].director
            office_location = this.scanList[index].office_location
            line_type = this.scanList[index].line_type
            separtment = this.scanList[index].separtment
            break
          }
        }
        for (var index in this.scanList) {
          this.scanList[index].recipient = recipate
          this.scanList[index].recipient_name = recipient_name
          this.scanList[index].director = director
          this.scanList[index].special = special
          this.scanList[index].office_location = office_location
          this.scanList[index].line_type = line_type
          this.scanList[index].separtment = separtment
        }
      },
      handleSelect (item) {
        var msg = ""
        var buff = true
        for (var sdata in this.scanList) {
          if (this.scanList[sdata].article_no.indexOf(item.article_no) >= 0) {
            buff = false
            msg = "此物品列表已存在！"
            break
          }
        }
        if (buff) {
          this.scanList.push(item)
        } else {
          this.$message({
            message: msg,
            type: 'error'
          });
        }
      },
      employeeSelect ( item , goods_no ) {
        for (var index in this.scanList) {
          if (this.scanList[index].article_no == goods_no) {
            this.scanList[index].recipient = item.jobNo
            this.scanList[index].recipient_name = item.name
            this.scanList[index].director = item.director
            this.scanList[index].special = item.special
            this.scanList[index].office_location = item.officeLocation
            this.scanList[index].line_type = item.lineType
            this.scanList[index].separtment = item.separtment
            this.checkNum(goods_no,this.scanList[index].operation,this.scanList[index].sept);
          }
        }
      },
      open () {
        this.visible = true
        this.dataForm.order_no = this.guid().toUpperCase()
        this.dataForm.reall_total = 0
        this.underForm.scan_data = ''
      },
      //确认入缓存
      inCache () {
        //TODO

        this.$refs.scanInput.focus()
      },
      headerScan (h, { column, $index }) {
        return h('span',[
          h('span',column.label),
          h('el-checkbox',
            {
              style:'margin-left:5px;',
              on:{change:this.change}
            }),
        ])
      },
      init () {
        this.dataListLoading = true
        this.visible = true
        this.dataForm.order_no = this.guid().toUpperCase()
        this.dataForm.reall_total = 0
        this.dataForm.scan_data = ''
        this.underForm.scan_data = ''
        this.dataListLoading = false
      },
      //输入检测->入缓存
      checkNum(goods_no,input,qunatity){
        if (input <= 0) {
          this.$message({
            message:  "操作数量不可小于1！" ,
            type: 'error'
          })
        } else {
          this.learning()
        }
      },
      remove (id,goods_no) {
          for (var ind in this.scanList) {
            if (this.scanList[ind].article_no == goods_no) {
                this.scanList.splice(ind, 1)
                this.learning()
                break
            }
          }
      },
      // 表单提交
      dataFormSubmit () {
        if (this.scanList.length>0) {
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/unhandout`),
            method: 'post',
            data: this.$http.adornData({
              "orders": JSON.stringify(this.dataForm),
              "scanList": JSON.stringify(this.scanList)
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.scanList.splice(0, this.scanList.length)
              this.$message({
                message: data.msg,
                type: 'success'
              });
            } else {
              this.$message({
                message: data.msg,
                type: 'error'
              });
            }
        })
        } else {
          this.$message({
            message: '请先处理数据!',
            type: 'error'
          });
        }
      },
      // 新增 / 修改
      addOrUpdateHandle () {
        this.visible = true
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(this.dataForm.orderId)
      })
      },
      //扫码提交
      scanSubmit () {
        var buff = true
        var msg = "编码错误或不符合本订单!"
        if (this.underForm.scan_data.length > 27 && this.underForm.scan_data.length < 36) {
            for (var ind in this.scanList) {
              if (this.scanList[ind].goods_no.indexOf(this.underForm.scan_data) >= 0) {
                  msg = "此物件已扫码！"
                  buff = false
                  break
              }
            }
        }
        if (this.dataForm.order_type == '') {
          msg = "请选择处理类型！"
          buff = false
        }
        if (buff){
          this.dataForm.scan_data = this.underForm.scan_data
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/inoutStore`),
            method: 'post',
            params: this.$http.adornParams({
              "order_no": this.dataForm.order_no,
              "order_type": this.dataForm.order_type,
              "goods_no": this.dataForm.scan_data
            })
           }).then(({data}) => {
            if (data && data.code === 0) {
                  this.underForm.scan_data = ''
                  data.article.operation = data.article.sept
                  data.article.amount = data.article.operation * data.article.price
                  data.article.recipient = ''
                  data.article.recipient_name = ''
                  this.scanList.unshift(data.article)
                  var mount = data.article.operation * data.article.price
                  this.checkNum(this.dataForm.scan_data , data.article.operation , data.article.sept)
            } else {
              this.underForm.scan_data = ''
              this.$message({
                message: data.msg,
                type: 'error'
              });
            }
          })
        }else{
          this.underForm.scan_data = ''
          this.$message({
            message: msg ,
            type: 'error'
          });
        }
      },
      // 计算
      learning () {
        var num = 0
        for (var ind in this.scanList) {
          this.scanList[ind].amount = (this.scanList[ind].operation * this.scanList[ind].price).toFixed(2)
          num += parseFloat(this.scanList[ind].amount)
        }
        this.dataForm.reall_total = num.toFixed(2)
      },
      //浏览器关闭监控
      browerStatus () {
        this.$message({
          message: '确定关闭？',
          type: 'error'
        })
        return false
      },
      //关闭弹窗
      close () {
        if (this.scanList.length > 0) {
          this.$confirm('关闭则清除当前扫码数据，确认关闭？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '关闭',
            cancelButtonText: '取消'
          }).then(() => {
            var ids = ""
            for(var index in this.scanList){
              if(this.scanList[index].id != null)ids += this.scanList[index].id + ','
            }
            if(ids!= ""){
              this.$http({
                url: this.$http.adornUrl(`/inoutmsg/deleCache`),
                method: 'post',
                params: this.$http.adornParams({"ids": ids})
                }).then(({data}) => {
                  if(data && data.code === 0){
                  this.visible = false
                  this.scanList.splice(0,this.scanList.length)
                  }else{
                    this.$message({
                      message: data.msg,
                      type: 'error'
                    });
                  }
                })
            }else{
              this.visible = false
              this.scanList.splice(0,this.scanList.length)
            }
          }).catch(action => {
          });
        }else{
          this.visible = false
        }
      }
    }
  }
</script>
<style>
  .el-col{
    margin-bottom:0px;
  }
  .inputC{
     float:left;
     width:20%;
   }
  .autoComp{ width:700px;}
  .autoComp  .el-scrollbar{
    width:700px;
  }
  .inputA{
    float:left;
    width: 25%;
  }
  .inputM{
    float:left;
    width: 15%;
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
    width: 15%;
  }

</style>
