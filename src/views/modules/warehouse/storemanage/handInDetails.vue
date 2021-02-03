<template>
  <el-dialog
    width="90%"
    top="1vh"
    :show-close="false"
    :title="!dataForm.order_no ? '新增(只需添加物品信息)' : '订单处理'"
    :close-on-click-modal="false"
    :before-close="close"
    :close-on-press-escape="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  class="outForm"  ref="dataForm" label-width="80px">
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
               <el-form-item label="备注">
                 <el-input type="textarea" :rows="3" v-model="dataForm.remarks"  placeholder="备注">
                 </el-input>
               </el-form-item>
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
                         <div class="inputS">{{ item.specs_name }}</div>
                         <div class="inputN">{{ item.goods_num }}</div>
                         <div class="inputU">{{ item.unit_name }}</div>
                         <div class="inputT">{{ item.store_name }}</div>
                       </div>
                     </template>
                   </el-autocomplete>
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
                <el-button type="text" size="small" @click="remove(scope.row.article_no)">移除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="article_no"
              header-align="center"
              align="center"
              width="300"
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
                <el-input v-model="scope.row.operation" type="number" size="small"
                          @change="checkNum(scope.row.operation,scope.row.article_no,scope.row.goods_num)"></el-input>
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
                <el-select  v-model="scope.row.store_no"  :disabled="dataForm.order_type==2">
                  <el-option v-for="(item,index) in scope.row.stores" :key="index" :label="item.store_name" :value="item.store_no" >
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
      <el-button v-if="$store.state.user.name == dataForm.order_luck && dataForm.order_state == 5" type="primary" @click="dataFormSubmit(false)">保存</el-button>
      <el-button v-if="$store.state.user.name == dataForm.order_luck && dataForm.order_state == 5" type="primary" @click="dataFormSubmit(true)">结单</el-button>
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
          order_state: '',
          director: '',
          separtment: '',
          line_type: '',
          special: '',
          office_location: '',
          order_luck: '',
          order_type: '',
          types: '',
          states: '',
          exp_date: '',
          scan_data: '',
          exam_type: ''
        },
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
      open () {
        this.instore = true
      },
      init (order_no) {
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
                if (data && data.code === 0) {
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
      handleSelect (item) {
        var msg = "选择物品不符合本订单！"
        var buff = true
        for (var sdata in this.scanList) {
          if (this.scanList[sdata].article_no.indexOf(item.article_no) >= 0) {
            buff = false
            msg = "此物品列表已存在！"
            break
          }
        }
        if (buff) {
          for (var sdata in this.details) {
            if (this.details[sdata].article_no.indexOf(item.article_no.substring(0,24)) >= 0) {
              buff = true
              break
            } else { buff = false }
          }
        }
        if (buff) {
          item.stores = JSON.parse(item.stores)
          this.scanList.push(item)
        } else {
          this.$message({
            message: msg,
            type: 'error'
          });
        }
      },
      remove (article_no) {
        for (var ind in this.scanList) {
          if (this.scanList[ind].article_no == article_no) {
            var mount = this.scanList[ind].inventory * this.scanList[ind].price
            for (var sdata in this.details) {
              if (this.details[sdata].article_no.indexOf(this.scanList[ind].article_no)>=0) {
                this.details[sdata].actual_mount = (this.details[sdata].actual_mount - mount).toFixed(2)
                this.details[sdata].actual_qunatity = this.details[sdata].actual_qunatity - this.scanList[ind].inventory
                this.scanList.splice(ind,1)
                this.learning()
                break
              }
            }
            break
          }
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
                if (buff)this.dataForm.order_state = 6
                this.$http({
                  url: this.$http.adornUrl(`/inoutmsg/handin`),
                  method: 'post',
                  data: this.$http.adornData({
                    "orders": JSON.stringify(this.dataForm),
                    "detail": JSON.stringify(this.details),
                    "scanList":JSON.stringify(this.scanList)
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
                        this.scanList.splice(0,this.scanList.length)
                        this.visible = false
                        this.$emit('refreshDataList')
                      } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                      }
                    })
                    } else {
                      this.scanList.splice(0, this.scanList.length)
                      this.$message({
                        message: data.msg,
                        type: 'success'
                      });
                      this.init(this.dataForm.order_no)
                    }
                  } else {
                    this.$message({
                      message: data.msg,
                      type: 'error'
                    })
                    if (data.backData) {
                      for (var i in this.scanList) {
                        for (var j in data.backData) {
                          if (this.scanList[i].article_no == data.backData[j].article_no) {
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
                this.dataForm.order_state = 6
                this.$http({
                  url: this.$http.adornUrl(`/inoutmsg/handin`),
                  method: 'post',
                  data: this.$http.adornData({
                    "orders": JSON.stringify(this.dataForm),
                    "detail": JSON.stringify(this.details),
                    "scanList":JSON.stringify(this.scanList)
                  })
                }).then(({data}) => {
                  if (data && data.code === 0) {
                  this.$http({
                    url: this.$http.adornUrl(`/orders/unLuck`),
                    method: 'post',
                    params: this.$http.adornParams({"order_no": this.dataForm.order_no,"order_luck":this.dataForm.order_luck})
                  }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.scanList.splice(0,this.scanList.length)
                    this.visible = false
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
                  message: "请先输入处理数据！",
                  type: 'error'
                });
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
      checkNum (input,article_no,goods_num) {
          if (input <= 0) {
              for (var ind in this.scanList) {
                if (this.scanList[ind].article_no.indexOf(article_no)>= 0) {
                   this.scanList[ind].operation = 1
                   this.learning()
                   break
                }
              }
            this.$message({
              message: '数量不可小于1 !',
              type: 'error'
            })
          } else if (input > goods_num) {
            this.$message({
              message: '库存不足!',
              type: 'error'
            })
          } else {
            var numBuff = false
            var dataS = null ;
            for (var index in this.scanList) {
              if (this.scanList[index].article_no == article_no) {
                dataS = this.scanList[index]
              }
            }
            for (var sdata in this.details) {
              if (this.details[sdata].article_no.indexOf(article_no.substring(0,23)) >= 0 && (parseFloat(dataS.price) == parseFloat(this.details[sdata].price)) && this.details[sdata].actual_qunatity < this.details[sdata].qunatity) {
                numBuff = true
                break
              }
            }
            if (!numBuff) {
              this.$message({
                message: "此类物品已处理完！",
                type: 'error'
              })
            } else {
              this.learning()
            }
          }
      },
      // 计算
      learning () {
        var daMap = new Map()
        for (var ind in this.scanList) {
          this.scanList[ind].amount = (this.scanList[ind].operation * this.scanList[ind].price).toFixed(2)
          var numpc = isNaN(daMap.get(this.scanList[ind].article_no.substring(0,27))) ? 0 : daMap.get(this.scanList[ind].article_no.substring(0,27))
          var num23pc = isNaN(daMap.get(this.scanList[ind].article_no.substring(0,23))) ? 0 : daMap.get(this.scanList[ind].article_no.substring(0,23))
          daMap.set(this.scanList[ind].article_no.substring(0,27),parseInt(this.scanList[ind].operation) + parseInt(numpc))
          daMap.set(this.scanList[ind].article_no.substring(0,23),parseInt(this.scanList[ind].operation) + parseInt(num23pc))
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
        return false;
      },
      //关闭弹窗
      close () {
        if (this.scanList.length > 0) {
          this.$confirm('关闭则清除当前扫码数据，确认关闭？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          }).then(() => {
                  this.$http({
                    url: this.$http.adornUrl(`/orders/unLuck`),
                    method: 'post',
                    params: this.$http.adornParams({"order_no": this.dataForm.order_no,"order_luck":this.dataForm.order_luck})
                  }).then(({data}) => {
                    if (data && data.code === 0) {
                      this.scanList.splice(0,this.scanList.length)
                      this.visible = false
                      this.$emit('refreshDataList')
                    } else {
                      this.$message({
                        message: data.msg,
                        type: 'error'
                      })
                    }
                })
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
  .autoComp{ width:800px;}
  .autoComp  .el-scrollbar{
    width:900px;
  }
  .inputA{
    float:left;
    width: 20%;
  }
  .inputM{
    float:left;
    width: 10%;
  }
  .inputP{
    float:left;
    width: 9%;
  }
  .inputU{
    float:left;
    width: 7%;
  }
  .inputS{
    float:left;
    width: 8%;
  }
  .inputN{
    float:left;
    text-align: center;
    width: 10%;
  }
  .inputT{
    float:left;
    text-align: right;
    width: 14%;
  }
</style>
