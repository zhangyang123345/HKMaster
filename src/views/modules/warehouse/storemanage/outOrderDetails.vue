<template>
  <el-dialog
    width="90%"
    top="1vh"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="close"
    :visible.sync="visible">
    <el-form :model="dataForm" class="outForm"  ref="dataForm" label-width="80px">
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
               <el-form-item label="订单金额">
                 <el-input v-model="dataForm.alltotal" placeholder="订单金额" readonly></el-input>
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
                 <el-input v-model="dataForm.states" placeholder="订单状态" readonly>
                 </el-input>
               </el-form-item>
             </el-col>
             <el-col :span="12">
               <el-form-item label="订单类型">
                 <el-input v-model="dataForm.types" placeholder="订单类型" readonly>
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
           <el-row>
             <el-col :span="24">
               <el-form-item label="线别">
                 <el-input v-model="dataForm.office_line" placeholder="线别" readonly>
                 </el-input>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="24">
               <el-form-item label="备注">
                 <el-input type="textarea" :rows="3" v-model="dataForm.remarks"  placeholder="备注">
                 </el-input>
               </el-form-item>
               <el-form-item label="扫码输入">
                 <el-input v-model="underForm.scan_data" ref="scanInput" @keyup.enter.native="scanSubmit()" placeholder="扫码输入">
                 </el-input>
               </el-form-item>
             </el-col>
           </el-row>
         </el-col>
        <el-col :span="16">
          <el-table
            :data="details"
            border
            height="400"
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
              prop="manufacturer_name"
              header-align="center"
              align="center"
              label="厂商">
            </el-table-column>
            <el-table-column
              prop="qunatity"
              header-align="center"
              width="100px"
              align="center"
              label="订单数量">
            </el-table-column>
            <el-table-column
              prop="actual_qunatity"
              header-align="center"
              width="100px"
              align="center"
              label="实际数量">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="actual_qunatity"-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--label="现有库存">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="amount"
              header-align="center"
              width="130px"
              align="center"
              label="订单金额">
            </el-table-column>
            <el-table-column
              prop="actual_mount"
              header-align="center"
              width="130px"
              align="center"
              label="实际金额">
            </el-table-column>
            <el-table-column
              prop="price"
              header-align="center"
              align="center"
              width="80px"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="unit_name"
              header-align="center"
              align="center"
              width="80px"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="specs_name"
              header-align="center"
              align="center"
              width="100px"
              label="规格">
            </el-table-column>
            <el-table-column
              prop="dremark"
              header-align="center"
              align="center"
              label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.dremark"  size="small" ></el-input>
              </template>
            </el-table-column>
          </el-table>
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
            <el-table-column
              prop="goods_name"
              header-align="center"
              align="center"
              label="物品名称">
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
              prop="goods_num"
              header-align="center"
              align="center"
              label="预库存">
            </el-table-column>
            <el-table-column
              prop="operation"
              header-align="center"
              align="center"
              label="操作数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.operation" type="number" size="small" :ref="scope.row.goods_no"
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
            <el-table-column
              prop="store_no"
              header-align="center"
              align="center"
              label="仓库">
              <template slot-scope="scope">
                <el-select v-model="scope.row.store_no" disabled>
                  <el-option v-for="(item,index) in stores" :key="index" :label="item.store_name" :value="item.store_id" >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              header-align="center"
              align="center"
              label="扫描时间">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
      <el-button  v-if="$store.state.user.name == dataForm.order_luck && dataForm.order_state == 5" type="primary" @click="dataFormSubmit(false)">保存</el-button>
      <el-button  v-if="$store.state.user.name == dataForm.order_luck && dataForm.order_state == 5" type="primary" @click="dataFormSubmit(true)">结单</el-button>
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
          scan_data: ''
        },
        dataForm: {
          id: '',
          name: '',
          alltotal: '',
          reall_total: '',
          stime: '',
          remarks: '',
          order_no: '',
          job_no: '',
          director: '',
          separtment: '',
          line_type: '',
          special: '',
          office_location: '',
          order_state: '',
          order_type: '',
          types: '',
          states: '',
          exp_date: '',
          scan_data: '',
          exam_type: '',
          office_line: ''
        },
        details: [],
        scanList: [],
        stores: [],
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
      open () {
        this.instore = true
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
      getStore () {
        this.$http({
          url: this.$http.adornUrl('/store/store/getStore'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.stores = data.storeData
        }
      })
      },
      init (order_no) {
        this.getStore()
        this.dataListLoading = true
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
            if (order_no != null) {
            this.$http({
              url: this.$http.adornUrl(`/orders/getDetail`),
              method: 'post',
              params: this.$http.adornParams({"order_no":order_no,"luck":true,"order_luck":this.dataForm.order_luck})
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.details = data.orders.detail
                this.dataForm.id = data.orders.id
                this.dataForm.order_no = data.orders.order_no
                this.dataForm.name = data.orders.name
                this.dataForm.exam_type = data.orders.exam_type
                this.dataForm.alltotal = data.orders.alltotal
                this.dataForm.reall_total = data.orders.reall_total
                this.dataForm.stime = data.orders.stime
                this.dataForm.director = data.orders.director
                this.dataForm.job_no = data.orders.job_no
                this.dataForm.separtment = data.orders.separtment
                this.dataForm.line_type = data.orders.line_type
                this.dataForm.special = data.orders.special
                this.dataForm.office_location = data.orders.office_location
                this.dataForm.order_luck = data.orders.order_luck
                this.dataForm.order_type = data.orders.order_type
                this.dataForm.order_state = data.orders.order_state
                this.dataForm.remarks = data.orders.remarks
                this.dataForm.types = data.orders.order_type == 1 ? "入库":(data.orders.order_type == 2?"出库":"报废")
                this.dataForm.exp_date = data.orders.exp_date
                this.dataForm.office_line = this.dataForm.office_location + this.dataForm.line_type

                if(data.orders.order_state == -2)this.dataForm.states ="订单异常结束"
                if(data.orders.order_state == -1)this.dataForm.states ="存在异常"
                if(data.orders.order_state == 0)this.dataForm.states ="待提交"
                if(data.orders.order_state == 1)this.dataForm.states ="待EHS审核"
                if(data.orders.order_state == 2)this.dataForm.states ="待主管审核"
                if(data.orders.order_state == 3)this.dataForm.states ="待经理审核"
                if(data.orders.order_state == 4)this.dataForm.states ="待厂长审核"
                if(data.orders.order_state == 5)this.dataForm.states ="待处理"
                if(data.orders.order_state == 6)this.dataForm.states ="待结单"
                if(data.orders.order_state == 7)this.dataForm.states ="完成"
                if (this.$store.state.user.name != this.dataForm.order_luck) {
                  this.$message({
                    message:  "此订单已被"+data.orders.order_user+"锁定！" ,
                    type: 'error'
                  })
                }
                this.$http({
                  url: this.$http.adornUrl(`/inoutmsg/getCache`),
                  method: 'post',
                  params: this.$http.adornParams({"order_no":order_no})
                }).then(({data}) => {
                  if (data && data.code === 0){
                    for (var dat in data.cacheData) {
                      data.cacheData[dat].stores = JSON.parse(data.cacheData[dat].stores)
                    }
                    this.scanList = data.cacheData
                    this.learning()
                }
              })
            }
          })
          }
      })
        this.dataListLoading = false
      },
      //输入检测->入缓存
      checkNum (goods_no,input,qunatity) {
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
          var numBuff = false
          var dataS = null ;
          for (var index in this.scanList) {
            if (this.scanList[index].goods_no == goods_no) {
              dataS = this.scanList[index]
            }
          }
          for (var sdata in this.details) {
            if (this.details[sdata].article_no.indexOf(goods_no.substring(0,23)) >= 0 && (parseFloat(dataS.price) == parseFloat(this.details[sdata].price)) && this.details[sdata].actual_qunatity < this.details[sdata].qunatity) {
              numBuff = true
              break
            }
          }
          if (!numBuff) {
            this.$message({
              message: "此类物品已处理完！",
              type: 'error'
            })
          }
            this.$http({
              url: this.$http.adornUrl(`/inoutmsg/saveCache`),
              method: 'post',
              data: this.$http.adornData({ "goods": JSON.stringify(dataS) ,
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
        if (id == null) {
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
                    for (var sdata in this.details) {
                      if (this.details[sdata].article_no.indexOf(this.scanList[ind].goods_no.substring(0,27)) >= 0) {
                        this.scanList.splice(ind, 1)
                        this.learning()
                        break
                      }
                    }
                    break
                  }
                }
            } else {
                this.$message({
                  message: data.msg,
                  type: 'error'
                })
              }
          })
        }
      },
      // 表单提交
      dataFormSubmit (buff) {
        var msg = buff?"是否确认结单？":"是否确认保存？"
        this.$confirm(msg, '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
            if (this.scanList.length>0) {
                if (buff) this.dataForm.order_state = 6
                this.$http({
                  url: this.$http.adornUrl(`/inoutmsg/saveStore`),
                  method: 'post',
                  data: this.$http.adornData({
                    "order_no": this.dataForm.order_no,
                    "job_no": this.dataForm.job_no,
                    "order_type": this.dataForm.order_type,
                    "order": JSON.stringify(this.dataForm),
                    "detail": JSON.stringify(this.details)
                  })
                }).then(({data}) => {
                  if (data && data.code === 0) {
                    if (buff) {
                        this.$http({
                          url: this.$http.adornUrl(`/orders/unLuck`),
                          method: 'post',
                          params: this.$http.adornParams({"order_no": this.dataForm.order_no,"order_luck":this.dataForm.order_luck})
                        }).then(({data}) => {
                          if (data && data.code === 0) {
                          this.visible = false
                          this.scanList.splice(0,this.scanList.length)
                          this.$emit('refreshDataList')
                        } else {
                          this.$message({
                            message: data.msg,
                            type: 'error'
                          })
                        }
                      })
                    }
                    this.scanList.splice(0,this.scanList.length)
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    })
                    this.init(this.dataForm.order_no)
                  } else {
                    this.$message({
                      message: data.msg,
                      type: 'error'
                    })
                      if (data.backData) {
                        for (var i in this.scanList) {
                          for (var j in data.backData) {
                            if (this.scanList[i].goods_no == data.backData[j].article_no) {
                              this.scanList[i].goods_num = data.backData[j].num
                              this.scanList[i].operation = data.backData[j].num
                            }
                          }
                        }
                        this.learning()
                      }
                  }
              })
            } else {
              if (buff) {
                  this.$http({
                    url: this.$http.adornUrl(`/orders/complete`),
                    method: 'post',
                    params: this.$http.adornParams({
                      "order_no": this.dataForm.order_no
                    })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                    this.$http({
                      url: this.$http.adornUrl(`/orders/unLuck`),
                      method: 'post',
                      params: this.$http.adornParams({"order_no": this.dataForm.order_no,"order_luck":this.dataForm.order_luck})
                    }).then(({data}) => {
                      if (data && data.code === 0) {
                          this.visible = false
                          this.scanList.splice(0,this.scanList.length)
                          this.$emit('refreshDataList')
                      } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                      }
                    })
                  } else {
                    this.$message({
                      message: data.msg,
                      type: 'error'
                    });
                  }
                 })
              } else {
                this.$message({
                  message: "请先扫码！",
                  type: 'error'
                })
              }
            }
        }).catch(action => {
        });
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
        var buff = false
        var numBuff = false
        var msg = "编码错误或不符合本订单!"
        if (this.underForm.scan_data.length > 27 && this.underForm.scan_data.length < 36) {
            for (var sdata in this.details) {
                if (this.details[sdata].article_no.indexOf(this.underForm.scan_data.substring(0,23)) >= 0) {
                  if (this.details[sdata].actual_qunatity == this.details[sdata].qunatity) {
                    msg = "此类物品已满！"
                    if (!numBuff)numBuff = false
                  } else {
                    numBuff = true
                  }
                  buff = true
                }
            }
            if (buff) {
              for (var ind in this.scanList) {
                if (this.scanList[ind].goods_no.indexOf(this.underForm.scan_data) >= 0) {
                  msg = "此物件已扫码！"
                  buff = false
                  break
                }
              }
            }
        }
        if (buff && numBuff) {
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
            var code24Buff = true
              for (var sdata in this.details) {
                if (this.details[sdata].article_no.indexOf(this.dataForm.scan_data.substring(0,27)) >= 0) {
                  var nedNum = this.details[sdata].qunatity - this.details[sdata].actual_qunatity
                  data.article.operation = data.article.sept > nedNum ? nedNum : data.article.sept
                  data.article.amount = data.article.operation * data.article.price
                  this.scanList.unshift(data.article)
                  var mount = data.article.operation * data.article.price
                  this.details[sdata].actual_mount = this.details[sdata].actual_mount + mount
                  this.details[sdata].actual_qunatity = this.details[sdata].actual_qunatity + data.article.operation
                  //console.log(this.$refs['input_' + this.dataForm.scan_data])
                  //TODO
                  this.checkNum(this.dataForm.scan_data , data.article.operation , data.article.sept)
                  code24Buff = false
                  break
                }
              }
              if (code24Buff) {
                for (var sdata in this.details) {
                  if (this.details[sdata].article_no.indexOf(this.dataForm.scan_data.substring(0,23)) >= 0) {
                    var nedNum = this.details[sdata].qunatity - this.details[sdata].actual_qunatity
                    data.article.operation = data.article.sept > nedNum ? nedNum : data.article.sept
                    data.article.amount = data.article.operation * data.article.price
                    this.scanList.unshift(data.article)
                    var mount = data.article.operation * data.article.price
                    this.details[sdata].actual_mount = this.details[sdata].actual_mount + mount
                    this.details[sdata].actual_qunatity = this.details[sdata].actual_qunatity + data.article.operation
                    this.checkNum(this.dataForm.scan_data , data.article.operation , data.article.sept)
                    code24Buff = false
                    break
                  }
                }
              }
            } else {
              this.underForm.scan_data = ''
              this.$message({
                message: data.msg,
                type: 'error'
              });
            }
          })
        } else {
          this.underForm.scan_data = ''
          this.$message({
            message: msg ,
            type: 'error'
          });
        }
      },
      // 计算
      learning () {
        var daMap = new Map()
        for (var ind in this.scanList) {
          this.scanList[ind].amount = (this.scanList[ind].operation * this.scanList[ind].price).toFixed(2)
          var numpc = isNaN(daMap.get(this.scanList[ind].goods_no.substring(0,27))) ? 0 : daMap.get(this.scanList[ind].goods_no.substring(0,27))
          var num23pc = isNaN(daMap.get(this.scanList[ind].goods_no.substring(0,23))) ? 0 : daMap.get(this.scanList[ind].goods_no.substring(0,23))
          daMap.set(this.scanList[ind].goods_no.substring(0,27),parseInt(this.scanList[ind].operation) + parseInt(numpc))
          daMap.set(this.scanList[ind].goods_no.substring(0,23),parseInt(this.scanList[ind].operation) + parseInt(num23pc))
        }
        var num = 0
        for (var index in this.details) {
          this.details[index].actual_qunatity = this.details[index].qunacache
          this.details[index].actual_mount = (this.details[index].actual_qunatity * this.details[index].price).toFixed(2)
          if (!isNaN(daMap.get(this.details[index].article_no))) {
            var quNum = parseInt(this.details[index].qunacache)
            var cacNum = parseInt(daMap.get(this.details[index].article_no))
            var reqNum = parseInt(this.details[index].qunatity)
            var arlNum = (quNum + cacNum) > reqNum ? (reqNum - quNum) : cacNum
            this.details[index].actual_qunatity = (quNum + arlNum)
            this.details[index].actual_mount = (this.details[index].actual_qunatity * this.details[index].price).toFixed(2)
            daMap.set(this.details[index].article_no.substring(0,27), cacNum - arlNum)
            daMap.set(this.details[index].article_no.substring(0,23),parseInt(daMap.get(this.details[index].article_no.substring(0,23))) - arlNum)
          }
          num += parseFloat(this.details[index].actual_mount)
        }
        for (index in this.details) {
          if ((this.details[index].actual_qunatity < this.details[index].qunatity) && !isNaN(daMap.get(this.details[index].article_no.substring(0,23)))) {
            quNum = parseInt(this.details[index].actual_qunatity)
            cacNum = parseInt(daMap.get(this.details[index].article_no.substring(0,23)))
            if (cacNum > 0) {
              reqNum = parseInt(this.details[index].qunatity)
              arlNum = (quNum + cacNum) > reqNum ? (reqNum - quNum) : cacNum
              this.details[index].actual_qunatity = (quNum + arlNum)
              this.details[index].actual_mount = (this.details[index].actual_qunatity * this.details[index].price).toFixed(2)
              num += parseFloat((arlNum * this.details[index].price).toFixed(2))
              daMap.set(this.details[index].article_no.substring(0, 23), parseInt(cacNum - arlNum))
            }
          }
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
                  if (data && data.code === 0) {
                      this.$http({
                        url: this.$http.adornUrl(`/orders/unLuck`),
                        method: 'post',
                        params: this.$http.adornParams({"order_no": this.dataForm.order_no,"order_luck":this.dataForm.order_luck})
                      }).then(({data}) => {
                        if (data && data.code === 0) {
                        this.visible = false
                        this.scanList.splice(0,this.scanList.length)
                        this.$emit('refreshDataList')
                      } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                      }
                    })
                  } else {
                    this.$message({
                      message: data.msg,
                      type: 'error'
                    });
                  }
                })
            } else {
              this.$http({
                url: this.$http.adornUrl(`/orders/unLuck`),
                method: 'post',
                params: this.$http.adornParams({"order_no": this.dataForm.order_no,"order_luck":this.dataForm.order_luck})
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.visible = false
                  this.scanList.splice(0,this.scanList.length)
                  this.$emit('refreshDataList')
                } else {
                  this.$message({
                    message: data.msg,
                    type: 'error'
                  })
                }
              })
            }
          }).catch(action => {
          });
       } else {
          this.$http({
            url: this.$http.adornUrl(`/orders/unLuck`),
            method: 'post',
            params: this.$http.adornParams({"order_no": this.dataForm.order_no,"order_luck":this.dataForm.order_luck})
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.visible = false
              this.$emit('refreshDataList')
              } else {
                this.$message({
                  message: data.msg,
                  type: 'error'
                })
            }
          })
        }
      }
    }
  }
</script>
<style>
  .outForm{

  }
  .outForm .el-row,.el-col{
    margin-bottom:0px;
  }
</style>
