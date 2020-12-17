<template>
  <el-dialog
    width="90%"
    top="1vh"
    :show-close="false"
    class="tableHead"
    title="处理"
    :before-close="close"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="扫码输入">
            <el-input ref="scanModel" v-model="underForm.scan_data" @keyup.enter.native="scanSubmit()" placeholder="扫码输入">
            </el-input>
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
                <el-button type="text" size="small"  @click="remove(scope.row.id,scope.row.goods_no)">移除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="goods_no"
              header-align="center"
              align="center"
              width="300"
              label="物品编码">
            </el-table-column>
            <!-- :render-header="headerScan"-->
            <el-table-column
              prop="goods_name"
              header-align="center"
              align="center"
              label="物品名称">
            </el-table-column>
            <el-table-column
              label="领用人"
              header-align="center"
              :render-header="renderHeader"
              align="center"
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
                    @select="((item) => handleSelect(item,scope.row.goods_no))"
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
              prop="inventory"
              header-align="center"
              align="center"
              label="规格总量">
            </el-table-column>
            <el-table-column
              prop="sept"
              header-align="center"
              align="center"
              label="规格余量">
            </el-table-column>
            <el-table-column
              prop="operation"
              header-align="center"
              align="center"
              label="操作数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.operation" type="number" size="small" :ref="scope.row.goods_no" @keyup.enter.native="scanFocus()"
                          @change="checkNum(scope.row.goods_no,scope.row.operation,scope.row.sept)"></el-input>
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
            this.checkNum(this.scanList[index].goods_no,this.scanList[index].operation,this.scanList[index].sept)
          }
      },
      handleSelect (item,goods_no) {
        for (var index in this.scanList) {
          if (this.scanList[index].goods_no == goods_no) {
              this.scanList[index].recipient = item.jobNo
              this.scanList[index].recipient_name = item.name
              this.scanList[index].director = item.director
              this.scanList[index].special = item.special
              this.scanList[index].office_location = item.officeLocation
              this.scanList[index].line_type = item.lineType
              this.scanList[index].separtment = item.separtment
              this.checkNum(goods_no,this.scanList[index].operation,this.scanList[index].sept)
              this.scanFocus()
          }
        }
      },
      open () {
        this.visible = true
        var order_no = this.$store.state.user.order_no
        this.underForm.reall_total = 0
        this.underForm.scan_data = ''
        if (order_no  != '' && order_no !=  null) {
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/getCache`),
            method: 'post',
            params: this.$http.adornParams({"order_no":order_no})
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.scanList = data.cacheData
            this.dataForm.order_no = order_no
            this.learning()
          }
        })
        } else {
          var order_code = this.guid().toUpperCase()
          this.dataForm.order_no = order_code
          this.$store.state.user.order_no = order_code
        }
      },
      //确认入缓存
      inCache () {
        //TODO
        this.$refs.scanInput.focus()
      },
      // headerScan (h, { column, $index }) {
      //   return h('span',[
      //     h('span',column.label),
      //     h('el-checkbox',
      //       {
      //         style:'margin-left:5px;',
      //         on:{change:this.change}
      //       }),
      //   ])
      // },
      init (order_no) {
        this.dataListLoading = true
        this.visible = true
        this.dataForm.reall_total = 0
        this.dataForm.scan_data = ''
        this.underForm.scan_data = ''
        var order_no = this.$store.state.user.order_no
        if (order_no  != '' && order_no !=  null) {
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/getCache`),
            method: 'post',
            params: this.$http.adornParams({"order_no":order_no})
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.scanList = data.cacheData
            this.dataForm.order_no = order_no
            this.learning()
          }
        })
        } else {
          var order_code = this.guid().toUpperCase()
          this.dataForm.order_no = order_code
          this.$store.state.user.order_no = order_code
        }
        this.dataListLoading = false
      },
      //光标切换
      scanFocus () {
          this.$refs.scanModel.focus()
      },
      //输入检测->入缓存
      checkNum(goods_no,input,qunatity){
        if (input > qunatity) {
          this.$message({
            message: "操作数量不可大于规格余量！",
            type: 'error'
          })
        } else if (input <= 0) {
          this.$message({
            message:  "操作数量不可小于1！" ,
            type: 'error'
          })
        } else {
          var dataS = null ;
          for (var index in this.scanList) {
            if (this.scanList[index].goods_no == goods_no) {
              dataS = this.scanList[index]
            }
          }
          //TODO
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/saveCache`),
            method: 'post',
            params: this.$http.adornParams({ "goods": JSON.stringify(dataS) ,
                "order_no":this.dataForm.order_no,
                "order_type":this.dataForm.order_type})
          }).then(({data}) => {
            if (data && data.code === 0) {
              dataS.id = data.goods.id
              this.learning()
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
        })
        }
      },
      remove (id,goods_no) {
        if (id == null || id === 'undefined') {
          for (var ind in this.scanList) {
            if (this.scanList[ind].goods_no == goods_no) {
              this.scanList.splice(ind, 1)
              this.learning()
              break
            }
          }
        } else {
            this.$http({
              url: this.$http.adornUrl(`/inoutmsg/deleCache`),
              method: 'post',
              params: this.$http.adornParams({"ids": id})
            }).then(({data}) => {
              if (data && data.code === 0) {
                for (var ind in this.scanList) {
                  if (this.scanList[ind].id == id) {
                      this.scanList.splice(ind, 1)
                      this.learning()
                  }
                }
              } else {
                  this.$message({
                    message: data.msg,
                    type: 'error'
                  });
                }
            })
        }
      },
      // 表单提交
      dataFormSubmit (buff) {
        if (this.check()) {
          var msg = buff?"是否确认结单？":"是否确认保存？"
          this.$confirm(msg, '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          }).then(() => {
              if(this.scanList.length>0){
                  if(buff)this.dataForm.order_state = 6
                  this.$http({
                    url: this.$http.adornUrl(`/inoutmsg/saveUnStore`),
                    method: 'post',
                    data: this.$http.adornData({
                      "order_no": this.dataForm.order_no,
                      "order_type": this.dataForm.order_type,
                      "order": JSON.stringify(this.dataForm),
                      "detail": JSON.stringify(this.details)
                    })
                  }).then(({data}) => {
                    if(data && data.code === 0){
                      if(buff)this.visible = false
                      this.scanList.splice(0,this.scanList.length)
                      this.$message({
                        message: data.msg,
                        type: 'success'
                      });
                      this.init()
                    }else{
                      this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                    }
                })
              }else{
                if(buff){
                  this.$http({
                    url: this.$http.adornUrl(`/orders/complete`),
                    method: 'post',
                    params: this.$http.adornParams({
                      "order_no": this.dataForm.order_no
                    })
                    }).then(({data}) => {
                        if(data && data.code === 0){
                        this.visible = false
                        }else{
                          this.$message({
                            message: data.msg,
                            type: 'error'
                          });
                        }
                   })
                }else{
                  this.$message({
                    message: "请先扫码！",
                    type: 'error'
                  });
                }
              }
          }).catch(action => {
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
      check () {
        for (var ind in this.scanList) {
          if (this.scanList[ind].recipient == ""  || this.scanList[ind].recipient == null) {
            this.$message({
              message: "请填写领用人！",
              type: 'error'
            })
            return false
          }
        }
        return true
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
            if (ids!= "") {
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
        } else {
          this.visible = false
        }
        this.$store.state.user.order_no = ''
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
  .headerC{
    display:inline-flex;
    margin-left:5px;
    padding:5px 5px;
    background-color: rgb(185, 232, 227);
  }
  .tableHead{
     line-height: 20px!important;
  }
</style>
