<template>
  <el-dialog
    width="90%"
    top="1vh"
    :show-close="false"
    :title="!dataForm.order_no ? '新增(只需添加物品信息)' : '订单处理'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" label-width="80px">
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
               <el-form-item label="扫码输入">
                 <el-input v-model="dataForm.scan_data" @keyup.enter.native="scanSubmit()" placeholder="扫码输入">
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
              align="center"
              label="订单数量">
            </el-table-column>
            <el-table-column
              prop="actual_qunatity"
              header-align="center"
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
              align="center"
              label="订单金额">
            </el-table-column>
            <el-table-column
              prop="actual_mount"
              header-align="center"
              align="center"
              label="实际金额">
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
              prop="dremark"
              header-align="center"
              align="center"
              label="备注">
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
                <el-button type="text" size="small" @click="remove(scope.row.id)">移除</el-button>
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
              prop="inventory"
              header-align="center"
              align="center"
              label="规格总量">
            </el-table-column>
            <el-table-column
              prop="inventory"
              header-align="center"
              align="center"
              label="规格余量">
            </el-table-column>
            <el-table-column
              prop="inventory"
              header-align="center"
              align="center"
              label="操作数量">
            </el-table-column>
            <el-table-column
              prop="inventory"
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
      <el-form-item>
        <el-button v-if="stata=='待提交'" type="primary" @click="addOrUpdateHandle()">新增子订单</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="dataFormSubmit(false)">保存</el-button>
      <el-button type="primary" @click="dataFormSubmit(true)">结单</el-button>
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
          id: '',
          name: '',
          alltotal: '',
          reall_total: '',
          stime: '',
          remarks: '',
          order_no: '',
          order_state: '',
          order_type: '',
          types: '',
          states: '',
          exp_date: '',
          scan_data: '',
          exam_type:''
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
      AddOrUpdate
    },
    mounted () {
      window.addEventListener( 'beforeunload', e => this.browerStatus() );
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
                this.details = data.orders.detail
                this.dataForm.id = data.orders.id
                this.dataForm.order_no = data.orders.order_no
                this.dataForm.name = data.orders.name
                this.dataForm.exam_type = data.orders.exam_type
                this.dataForm.alltotal = data.orders.alltotal
                this.dataForm.reall_total = data.orders.reall_total
                this.dataForm.stime = data.orders.stime
                this.dataForm.order_type = data.orders.order_type
                this.dataForm.order_state = data.orders.order_state
                this.dataForm.remarks = data.orders.remarks
                this.dataForm.types = data.orders.order_type = 1 ? "入库":(data.orders.order_type = 2?"出库":"报废")
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
            }
          })
          }
      })
        this.dataListLoading = false
      },

      remove (id){
        this.$http({
          url: this.$http.adornUrl(`/inoutmsg/deleCache`),
          method: 'post',
          params: this.$http.adornParams({"ids": id})
        }).then(({data}) => {
          if(data && data.code === 0){
            for(var ind in this.scanList){
              if(this.scanList[ind].id == id){
                var mount = this.scanList[ind].inventory * this.scanList[ind].price
                for (var sdata in this.details) {
                  if(this.details[sdata].article_no.indexOf(this.scanList[ind].article_no)>=0){
                    this.details[sdata].actual_mount = this.details[sdata].actual_mount - mount
                    this.details[sdata].actual_qunatity = this.details[sdata].actual_qunatity - this.scanList[ind].inventory
                    this.learning()
                    this.scanList.splice(ind,1)
                    break
                  }
                }
                break
              }
            }
        }else{
          this.$message({
            message: data.msg,
            type: 'error'
          });
        }
      })
      },
      // 表单提交
      dataFormSubmit (buff) {
        var msg = buff?"是否确认结单？":"是否确认保存？"
        this.$confirm(msg, '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
            if(this.scanList.length>0){
                if(buff)this.dataForm.order_state = 6
                this.$http({
                  url: this.$http.adornUrl(`/inoutmsg/saveStore`),
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
        if(this.dataForm.scan_data.length > 27 && this.dataForm.scan_data.length < 36){
            for (var sdata in this.details) {
                if(this.details[sdata].article_no.indexOf(this.dataForm.scan_data.substring(0,27))>=0){
                  buff = true
                  break
                }
            }
        }
        if (buff){
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/inoutStore`),
            method: 'post',
            params: this.$http.adornParams({
              "order_no": this.dataForm.order_no,
              "order_type": this.dataForm.order_type,
              "goods_no": this.dataForm.scan_data
            })
           }).then(({data}) => {
            if(data && data.code === 0){
              this.scanList.unshift(data.article)
              var mount = data.article.inventory*data.article.price
              for (var sdata in this.details) {
                if(this.details[sdata].article_no.indexOf(this.dataForm.scan_data.substring(0,27))>=0){
                  this.details[sdata].actual_mount = this.details[sdata].actual_mount + mount
                  this.details[sdata].actual_qunatity = this.details[sdata].actual_qunatity + data.article.inventory
                  this.learning()
                  break
                }
              }
            }else{
              this.$message({
                message: data.msg,
                type: 'error'
              });
            }
          })
        }else{
          this.$message({
            message: '编码错误或不符合本订单!',
            type: 'error'
          });
        }
      },
      // 计算
      learning(){
        var num = 0 ;
        for(var index in this.details){
            num += this.details[index].actual_mount
        }
        this.dataForm.reall_total = num
      },
      //浏览器关闭监控
      browerStatus(){
        this.$message({
          message: '确定关闭？',
          type: 'error'
        })
        return false;
      },
      //关闭弹窗
      close(){
        if(this.scanList.length > 0){
          this.$confirm('关闭则清除当前扫码数据，确认关闭？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '关闭',
            cancelButtonText: '取消'
          }).then(() => {
            var ids = ""
            for(var index in this.scanList){
              ids += this.scanList[index].id + ','
            }
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
              });
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
</style>
